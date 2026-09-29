import { verifyAdminAuth } from '../_lib/verifyAdminAuth.js';

// Vercel Serverless Function: /api/agent/lead-draft
//
// Drafts a reply to a REAL contact-form lead. The lead's fields and the
// company's published services are both passed in by the admin's browser,
// sourced directly from Firestore (see src/lib/agent.ts generateLeadDraft,
// called from the Admin Control Center). This function does not query any
// database itself and does not send anything — it only returns drafted
// text for a human to review, edit, and send manually.

const SYSTEM_PROMPT = `You are drafting a reply, on behalf of a human team member at AIAUTOMY, to a real prospective-client inquiry submitted through the website's contact form.

You will be given the lead's actual submitted fields and the company's actual published service catalog below. Follow these rules strictly:
- Use ONLY the facts provided to you. Do not invent prices, timelines, guarantees, team member names, or past client results.
- If the lead asked about something not present in the provided data (e.g. an exact price or delivery date), say plainly that the team will confirm it on a call — never guess a number.
- Reference the specific service(s) most relevant to what they asked, using only the real descriptions provided.
- Keep it warm, professional, and concise (under 180 words).
- End with a light call to action (e.g. suggest a short discovery call), but do not add a signature block, phone number, or contact-form link — the human sending this will add those.
- This is a DRAFT for a human to review and edit before sending. Do not claim to have already scheduled anything or made any commitment.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authResult = await verifyAdminAuth(req); if (!authResult.ok) { return res.status(authResult.status).json({ error: authResult.error }); } const { lead, services } = req.body || {};
  if (!lead || typeof lead !== 'object' || !lead.full_name || !lead.message) {
    return res.status(400).json({ error: 'A lead object with at least full_name and message is required.' });
  }
  if (!Array.isArray(services)) {
    return res.status(400).json({ error: 'A services array is required (pass the real published services).' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set on the server yet.' });
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

  try {
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
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `${leadFacts}\n\n${servicesFacts}\n\nDraft the reply now.` },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Claude API error (lead-draft):', errText);
      return res.status(502).json({ error: 'Claude API error while drafting. Please try again.' });
    }

    const data = await response.json();
    const draft = data?.content?.[0]?.text || '';
    if (!draft) {
      return res.status(502).json({ error: 'The model returned an empty draft. Please try again.' });
    }

    return res.status(200).json({
      draft_message: draft,
      evidence: `Drafted from the lead's own submitted fields (name, service_interest, company_name, project_budget, project_timeline, message) and ${services.length} real published service record(s). No facts outside this input were used.`,
      model_used: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5',
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Lead draft handler error:', err);
    return res.status(500).json({ error: 'Something went wrong drafting this reply. Please try again.' });
  }
}

