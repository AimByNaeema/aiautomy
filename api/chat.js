// Vercel Serverless Function: /api/chat
// Handles chat messages from the website's AI chat widget.
// Supports TWO providers — Claude (Anthropic) and Gemini (Google) — the
// widget sends `provider: "claude" | "gemini"` and this function routes
// to the matching API. Both API keys stay on the server (Vercel env vars)
// and are NEVER exposed to the browser.
//
// The widget also sends the site's REAL, currently-published services
// (fetched from Firestore by the client) as `services`. When present, the
// system prompt is grounded in that real data instead of a hardcoded list,
// so the assistant never describes an offering that isn't actually live.
// If `services` is missing (e.g. Firestore briefly unavailable), a static
// fallback list — mirroring the real catalog — is used so the widget still
// works, but callers should prefer passing real data.

function buildOfferingsList(services) {
  if (Array.isArray(services) && services.length > 0) {
    return services
      .slice(0, 20)
      .map((s) => `- ${s.title}: ${s.short_description}`)
      .join('\n');
  }
  return `- Custom AI Agents (digital employees for customer support, sales, operations)
- Web Development (business sites, ecommerce, landing pages, SaaS, dashboards)
- Ecommerce Solutions
- AI Business Automation (workflow automation)
- Custom Digital Solutions (internal tools, integrations)`;
}

function buildSystemPrompt(services) {
  return `You are the AI assistant for AIAUTOMY, a digital
studio that builds custom AI agents, professional websites, ecommerce systems,
automation workflows, and digital tools for businesses.

Only state facts you are given here or that the visitor tells you in the
conversation. Never invent prices, timelines, guarantees, or claims about
completed client work.

What AIAUTOMY offers (use this, don't invent more):
${buildOfferingsList(services)}

Pricing is project-based / custom quote — never state a specific number.
Contact email: aiagentstudioo@gmail.com

Your job:
1. Answer visitor questions about these services in a friendly, professional,
   concise way (2-4 sentences, no walls of text).
2. If a visitor shows interest in starting a project, encourage them to use
   the "Start Your Project" contact form, or ask for their email so a human
   can follow up.
3. If you don't know something (exact pricing, delivery timelines, technical
   specifics of a custom build), say so plainly and offer to connect them
   with the team via the contact form — never guess.
4. Never commit the business to a price, discount, refund, deadline, or any
   binding promise. Those require a human on the team.
5. Keep a warm, professional tone. No emojis unless the visitor uses them
   first.`;
}

async function callClaude(trimmedMessages, services) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { error: 'ANTHROPIC_API_KEY is not set on the server yet.', status: 500 };
  }

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
      system: buildSystemPrompt(services),
      messages: trimmedMessages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Claude API error:', errText);
    return { error: 'Claude API error. Please try again.', status: 502 };
  }

  const data = await response.json();
  const reply = data?.content?.[0]?.text || "Sorry, I couldn't generate a reply just now.";
  return { reply };
}

async function callGemini(trimmedMessages, services) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: 'GEMINI_API_KEY is not set on the server yet.', status: 500 };
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

  // Gemini uses "user"/"model" roles and a single "contents" array.
  const contents = trimmedMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(services) }] },
      contents,
      generationConfig: { maxOutputTokens: 500 },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini API error:', errText);
    return { error: 'Gemini API error. Please try again.', status: 502 };
  }

  const data = await response.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
    "Sorry, I couldn't generate a reply just now.";
  return { reply };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, provider, services } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Basic guardrails: cap history length and message size sent to the model.
  const trimmed = messages.slice(-20).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 4000),
  }));

  const selected = provider === 'gemini' ? 'gemini' : 'claude';

  try {
    const result =
      selected === 'gemini' ? await callGemini(trimmed, services) : await callClaude(trimmed, services);

    if (result.error) {
      return res.status(result.status || 500).json({ error: result.error });
    }

    return res.status(200).json({ reply: result.reply, provider: selected });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
