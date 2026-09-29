import { Router } from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { publicWriteLimiter } from '../middleware/rateLimit.js';
import { logAgentAction } from '../lib/actionLog.js';
import { sanitizeText } from '../lib/sanitize.js';

const router = Router();

function newRunId() {
  return `run-${crypto.randomUUID().replace(/-/g, '')}`;
}

const FINDING_CATEGORIES = ['meta_tags', 'headings', 'broken_links', 'crawlability', 'search_console', 'analytics'];
const FINDING_SEVERITIES = ['info', 'low', 'medium', 'high'];
const FINDING_DATA_SOURCES = ['live_page_fetch', 'unverified'];
const DRAFT_STATUSES = ['draft', 'approved', 'rejected', 'marked_sent'];

// ============================================================================
// Capability 1: SEO & growth analysis — real HTTP scan of this site's own
// live routes. Ported unchanged from the old api/agent/seo-scan.js Vercel
// function; only the auth check changed (requireAdmin JWT instead of
// Firebase verifyAdminAuth). No mock data, no invented metrics.
// ============================================================================

const DEFAULT_PATHS = ['/', '/platform', '/solutions', '/features', '/how-it-works', '/pricing', '/resources', '/get-started'];

function extractTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  const text = await res.text();
  return { status: res.status, text };
}

async function scanPath(baseUrl, path) {
  const url = baseUrl.replace(/\/$/, '') + path;
  const findings = [];
  let status, html;

  try {
    const result = await fetchText(url);
    status = result.status;
    html = result.text;
  } catch (err) {
    findings.push({
      category: 'broken_links',
      page_url: url,
      finding: 'Page could not be fetched.',
      evidence: `Network error fetching ${url}: ${String(err && err.message ? err.message : err)}`,
      recommendation: 'Confirm the URL is reachable and not blocked by DNS/firewall.',
      severity: 'high',
      data_source: 'live_page_fetch',
    });
    return findings;
  }

  if (status >= 400) {
    findings.push({
      category: 'broken_links',
      page_url: url,
      finding: `Page returned HTTP ${status}.`,
      evidence: `Live fetch of ${url} returned status ${status}.`,
      recommendation: 'Fix routing or deployment so this page returns 200.',
      severity: 'high',
      data_source: 'live_page_fetch',
    });
    return findings;
  }

  const title = extractTag(html, /<title[^>]*>([^<]*)<\/title>/i);
  const description = extractTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonical = extractTag(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const hasH1 = /<h1[\s>]/i.test(html);
  const looksLikeUnrenderedSpaShell = /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html) || (/<div\s+id=["']root["']/i.test(html) && !hasH1);

  if (!title) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No <title> tag found in the server-delivered HTML.',
      evidence: `Fetched ${url} directly; response has no <title> element.`,
      recommendation: 'Ensure every route serves a descriptive <title>.',
      severity: 'high', data_source: 'live_page_fetch',
    });
  } else if (title.length < 15 || title.length > 65) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: `Title length is ${title.length} characters, outside the 15-65 character range search engines typically display in full.`,
      evidence: `Title found: "${title}"`,
      recommendation: 'Adjust title length for better search-result display.',
      severity: 'low', data_source: 'live_page_fetch',
    });
  }

  if (!description) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No meta description found in the server-delivered HTML.',
      evidence: `Fetched ${url} directly; no <meta name="description"> present in the response.`,
      recommendation: 'Add a meta description (120-160 characters) describing this specific page.',
      severity: 'medium', data_source: 'live_page_fetch',
    });
  }

  if (!canonical) {
    findings.push({
      category: 'meta_tags', page_url: url,
      finding: 'No canonical link tag found.',
      evidence: `Fetched ${url} directly; no <link rel="canonical"> present.`,
      recommendation: 'Add a canonical tag to avoid duplicate-content ambiguity.',
      severity: 'low', data_source: 'live_page_fetch',
    });
  }

  if (looksLikeUnrenderedSpaShell) {
    findings.push({
      category: 'crawlability', page_url: url,
      finding: 'This route renders entirely client-side (React) — the raw HTML response contains only an empty app shell, with no heading or body text.',
      evidence: `Fetched ${url} directly (no JavaScript executed, the way many crawlers and link-preview bots operate); the response body has <div id="root"> with no rendered content and no <h1>.`,
      recommendation: 'Add server-side rendering or static pre-rendering (e.g. a prerender step per route, or migrating to a framework with SSR/SSG) so search engines and social-preview bots that do not execute JavaScript can see real page content.',
      severity: 'high', data_source: 'live_page_fetch',
    });
  }

  return findings;
}

async function scanSiteWideFile(baseUrl, path) {
  const url = baseUrl.replace(/\/$/, '') + path;
  try {
    const { status, text } = await fetchText(url);
    const looksLikeSpaShell = /<div\s+id=["']root["']/i.test(text);
    if (status >= 400 || looksLikeSpaShell) {
      return [{
        category: 'crawlability',
        page_url: url,
        finding: `${path} is not served as a real file.`,
        evidence: looksLikeSpaShell
          ? `Fetched ${url}; status ${status}, but the response body is the React app shell (index.html), not a ${path} file — the SPA catch-all rewrite is intercepting this path.`
          : `Fetched ${url}; status ${status}.`,
        recommendation: `Add a real ${path} file under /public so it is served as a static file ahead of the SPA rewrite.`,
        severity: 'medium',
        data_source: 'live_page_fetch',
      }];
    }
    return [];
  } catch (err) {
    return [{
      category: 'crawlability',
      page_url: url,
      finding: `Could not verify ${path}.`,
      evidence: String(err && err.message ? err.message : err),
      recommendation: 'Retry the scan; if this persists, check the deployment manually.',
      severity: 'info',
      data_source: 'unverified',
    }];
  }
}

// POST /api/agent/seo-scan — admin. Computes and RETURNS findings; writes
// nothing itself (same as before — the admin's browser persists them via
// POST /api/agent/findings after reviewing).
router.post('/seo-scan', requireAdmin, async (req, res) => {
  const { baseUrl, paths } = req.body || {};
  if (!baseUrl || typeof baseUrl !== 'string' || !/^https?:\/\//i.test(baseUrl)) {
    return res.status(400).json({ error: 'baseUrl is required and must be a full URL, e.g. https://your-site.vercel.app' });
  }

  const scanPaths = Array.isArray(paths) && paths.length > 0 ? paths.slice(0, 20) : DEFAULT_PATHS;

  try {
    const perPageResults = await Promise.all(scanPaths.map((p) => scanPath(baseUrl, p)));
    const siteWideResults = await Promise.all([
      scanSiteWideFile(baseUrl, '/robots.txt'),
      scanSiteWideFile(baseUrl, '/sitemap.xml'),
    ]);

    const findings = [...perPageResults.flat(), ...siteWideResults.flat()];

    const integration_status = {
      google_search_console: {
        connected: false,
        reason: 'No Search Console credentials are configured on the server (no GOOGLE_SEARCH_CONSOLE_* environment variables set). Real query/ranking data is unavailable until this is connected.',
      },
      google_analytics: {
        connected: false,
        reason: 'No Analytics credentials are configured on the server (no GA4_* environment variables set). Real traffic/conversion data is unavailable until this is connected.',
      },
    };

    return res.status(200).json({
      scanned_at: new Date().toISOString(),
      base_url: baseUrl,
      paths_scanned: scanPaths,
      findings,
      integration_status,
    });
  } catch (err) {
    console.error('[agent] seo-scan error:', err);
    return res.status(500).json({ error: 'Scan failed. Please try again.' });
  }
});

// POST /api/agent/findings — admin. Persists a completed scan's findings as
// status "new" and writes one audit-log entry, mirroring persistSeoFindings()
// in the old src/lib/agent.ts.
router.post('/findings', requireAdmin, async (req, res) => {
  const { findings, base_url, paths_scanned } = req.body || {};
  if (!Array.isArray(findings)) {
    return res.status(400).json({ error: 'findings array is required.' });
  }
  const runId = newRunId();
  const saved = [];
  try {
    for (const f of findings) {
      if (
        !f || typeof f !== 'object' ||
        !FINDING_CATEGORIES.includes(f.category) ||
        !FINDING_SEVERITIES.includes(f.severity) ||
        !FINDING_DATA_SOURCES.includes(f.data_source) ||
        !f.page_url || !f.finding || !f.evidence || !f.recommendation
      ) {
        continue; // skip malformed entries rather than failing the whole batch
      }
      const result = await pool.query(
        `INSERT INTO agent_findings (run_id, category, page_url, finding, evidence, recommendation, severity, data_source)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [runId, f.category, f.page_url, f.finding, f.evidence, f.recommendation, f.severity, f.data_source]
      );
      saved.push(result.rows[0]);
    }
    await logAgentAction(
      'seo_scan_run',
      `Scanned ${Array.isArray(paths_scanned) ? paths_scanned.length : 0} route(s) of ${base_url || 'the site'} and produced ${saved.length} finding(s).`,
      { actor: 'agent', target_id: runId }
    );
    return res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error('[agent] persist findings error:', err);
    return res.status(500).json({ error: 'Could not save findings.' });
  }
});

// GET /api/agent/findings — admin. Mirrors fetchAgentFindings().
router.get('/findings', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_findings ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent] list findings error:', err);
    return res.status(500).json({ error: 'Could not load findings.' });
  }
});

// PATCH /api/agent/findings/:id/status — admin. The ONLY way a finding's
// status changes from "new" — always an explicit owner click. Mirrors
// setFindingStatus().
router.patch('/findings/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!['approved', 'dismissed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  try {
    const result = await pool.query(
      `UPDATE agent_findings SET status = $1, reviewed_by = $2, reviewed_at = now() WHERE id = $3 RETURNING *`,
      [status, req.adminEmail, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Finding not found.' });
    const finding = result.rows[0];
    await logAgentAction(
      status === 'approved' ? 'finding_approved' : 'finding_dismissed',
      `${status === 'approved' ? 'Approved' : 'Dismissed'} finding on ${finding.page_url}: ${finding.finding}`,
      { actor: 'owner', target_id: finding.id, evidence: finding.evidence }
    );
    return res.status(200).json({ success: true, data: finding });
  } catch (err) {
    console.error('[agent] update finding status error:', err);
    return res.status(500).json({ error: 'Could not update finding.' });
  }
});

// ============================================================================
// Capability 2: chat widget transcripts — evidence for "handles real
// customer messages". Written directly by the public-facing ChatWidget.
// ============================================================================

// POST /api/agent/chat-sessions — public (visitors aren't signed in).
// Mirrors logChatMessages(): upserts by session id, caps to last 40 messages.
router.post('/chat-sessions', publicWriteLimiter, async (req, res) => {
  const { id, provider, messages, page_url } = req.body || {};
  if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id) || id.length > 128) {
    return res.status(400).json({ error: 'A valid session id is required.' });
  }
  if (!['claude', 'gemini'].includes(provider)) {
    return res.status(400).json({ error: 'provider must be "claude" or "gemini".' });
  }
  if (!Array.isArray(messages) || messages.length > 40) {
    return res.status(400).json({ error: 'messages must be an array of at most 40 entries.' });
  }
  const cleanPageUrl = sanitizeText(page_url).slice(0, 300);
  try {
    const result = await pool.query(
      `INSERT INTO agent_chat_sessions (id, provider, messages, page_url)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (id) DO UPDATE SET
         provider = EXCLUDED.provider, messages = EXCLUDED.messages,
         page_url = EXCLUDED.page_url, updated_at = now()
       RETURNING *`,
      [id, provider, JSON.stringify(messages.slice(-40)), cleanPageUrl]
    );
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    // Never let transcript logging break the visitor's chat experience.
    console.warn('[agent] chat session log failed:', err);
    return res.status(200).json({ success: false });
  }
});

// GET /api/agent/chat-sessions — admin. Mirrors fetchChatSessions().
router.get('/chat-sessions', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_chat_sessions ORDER BY updated_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent] list chat sessions error:', err);
    return res.status(500).json({ error: 'Could not load chat sessions.' });
  }
});

// ============================================================================
// Capability 3: contact-form lead reply drafting — never auto-sent.
// ============================================================================

const LEAD_DRAFT_SYSTEM_PROMPT = `You are drafting a reply, on behalf of a human team member at AIAUTOMY, to a real prospective-client inquiry submitted through the website's contact form.

You will be given the lead's actual submitted fields and the company's actual published service catalog below. Follow these rules strictly:
- Use ONLY the facts provided to you. Do not invent prices, timelines, guarantees, team member names, or past client results.
- If the lead asked about something not present in the provided data (e.g. an exact price or delivery date), say plainly that the team will confirm it on a call — never guess a number.
- Reference the specific service(s) most relevant to what they asked, using only the real descriptions provided.
- Keep it warm, professional, and concise (under 180 words).
- End with a light call to action (e.g. suggest a short discovery call), but do not add a signature block, phone number, or contact-form link — the human sending this will add those.
- This is a DRAFT for a human to review and edit before sending. Do not claim to have already scheduled anything or made any commitment.`;

// POST /api/agent/lead-draft — admin. Ported unchanged from the old
// api/agent/lead-draft.js Vercel function. Does not save or send anything.
async function draftWithClaude(apiKey, userContent) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5',
      max_tokens: 500,
      system: LEAD_DRAFT_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userContent }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Claude API error (lead-draft):', errText);
    return { error: 'Claude API error while drafting. Please try again.' };
  }

  const data = await response.json();
  return { draft: data?.content?.[0]?.text || '', model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5' };
}

async function draftWithGemini(apiKey, userContent) {
  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: LEAD_DRAFT_SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: userContent }] }],
      generationConfig: { maxOutputTokens: 500 },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini API error (lead-draft):', errText);
    return { error: 'Gemini API error while drafting. Please try again.' };
  }

  const data = await response.json();
  const draft = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  return { draft, model };
}

router.post('/lead-draft', requireAdmin, async (req, res) => {
  const { lead, services } = req.body || {};
  if (!lead || typeof lead !== 'object' || !lead.full_name || !lead.message) {
    return res.status(400).json({ error: 'A lead object with at least full_name and message is required.' });
  }
  if (!Array.isArray(services)) {
    return res.status(400).json({ error: 'A services array is required (pass the real published services).' });
  }

  // Prefer Claude when configured (original behavior); fall back to Gemini
  // so this works with only a GEMINI_API_KEY configured on the server.
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!anthropicKey && !geminiKey) {
    return res.status(500).json({ error: 'Neither ANTHROPIC_API_KEY nor GEMINI_API_KEY is set on the server yet.' });
  }

  const leadFacts = `Lead facts (real, from the contact form submission — use only these):
- Name: ${String(lead.full_name).slice(0, 150)}
- Service interest: ${lead.service_interest || 'not specified'}
- Company: ${lead.company_name || 'not provided'}
- Budget: ${lead.project_budget || 'not provided'}
- Timeline: ${lead.project_timeline || 'not provided'}
- Message: "${String(lead.message).slice(0, 2000)}"`;

  const servicesFacts = services.length
    ? `Real published services (use only these — do not invent others):\n${services
        .slice(0, 20)
        .map((s) => `- ${s.title}: ${s.short_description}`)
        .join('\n')}`
    : 'No published services were provided — do not name any specific service by title.';

  const userContent = `${leadFacts}\n\n${servicesFacts}\n\nDraft the reply now.`;

  try {
    const result = anthropicKey
      ? await draftWithClaude(anthropicKey, userContent)
      : await draftWithGemini(geminiKey, userContent);

    if (result.error) {
      return res.status(502).json({ error: result.error });
    }
    if (!result.draft) {
      return res.status(502).json({ error: 'The model returned an empty draft. Please try again.' });
    }

    return res.status(200).json({
      draft_message: result.draft,
      evidence: `Drafted from the lead's own submitted fields (name, service_interest, company_name, project_budget, project_timeline, message) and ${services.length} real published service record(s). No facts outside this input were used.`,
      model_used: result.model,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Lead draft handler error:', err);
    return res.status(500).json({ error: 'Something went wrong drafting this reply. Please try again.' });
  }
});

// POST /api/agent/lead-drafts — admin. Persists a drafted reply as status
// "draft" and logs the action, mirroring persistLeadDraft(). Nothing is ever
// sent to the lead from this or any other route.
router.post('/lead-drafts', requireAdmin, async (req, res) => {
  const { lead, draft_message, evidence, model_used } = req.body || {};
  if (!lead || !lead.id || !lead.email || !lead.full_name || !draft_message) {
    return res.status(400).json({ error: 'lead (with id, email, full_name) and draft_message are required.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO agent_lead_drafts (lead_id, lead_email, lead_name, draft_message, evidence, model_used)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [lead.id, lead.email, lead.full_name, draft_message, evidence || '', model_used || '']
    );
    const record = result.rows[0];
    await logAgentAction('lead_draft_generated', `Drafted a reply to ${lead.full_name} (${lead.email}).`, {
      actor: 'agent',
      target_id: record.id,
      evidence,
    });
    return res.status(200).json({ success: true, data: record });
  } catch (err) {
    console.error('[agent] persist lead draft error:', err);
    return res.status(500).json({ error: 'Could not save this draft.' });
  }
});

// GET /api/agent/lead-drafts — admin. Mirrors fetchLeadDrafts().
router.get('/lead-drafts', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_lead_drafts ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent] list lead drafts error:', err);
    return res.status(500).json({ error: 'Could not load drafts.' });
  }
});

// PATCH /api/agent/lead-drafts/:id/status — admin. Mirrors setDraftStatus().
// "marked_sent" is bookkeeping only — the owner sends the message themselves
// and marks it here; this never transmits anything to the lead.
router.patch('/lead-drafts/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!DRAFT_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  try {
    const result = await pool.query(
      `UPDATE agent_lead_drafts SET status = $1, reviewed_by = $2, reviewed_at = now() WHERE id = $3 RETURNING *`,
      [status, req.adminEmail, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Draft not found.' });
    const draftRow = result.rows[0];
    const actionMap = {
      approved: 'lead_draft_approved',
      rejected: 'lead_draft_rejected',
      marked_sent: 'lead_draft_marked_sent',
    };
    if (actionMap[status]) {
      await logAgentAction(actionMap[status], `Marked draft for ${draftRow.lead_name} as ${status}.`, {
        actor: 'owner',
        target_id: draftRow.id,
      });
    }
    return res.status(200).json({ success: true, data: draftRow });
  } catch (err) {
    console.error('[agent] update draft status error:', err);
    return res.status(500).json({ error: 'Could not update draft.' });
  }
});

// ============================================================================
// Audit trail — append-only, mirrors fetchActionLog().
// ============================================================================

router.get('/action-log', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agent_action_log ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[agent] list action log error:', err);
    return res.status(500).json({ error: 'Could not load action log.' });
  }
});

export default router;
