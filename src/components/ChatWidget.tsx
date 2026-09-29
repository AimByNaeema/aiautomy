import { useState, useRef, useEffect } from 'react';
import type React from 'react';
import { fetchPublishedServices, API_BASE_URL } from '../lib/api';
import { logChatMessages } from '../lib/agent';
import { ServiceRecord } from '../types';

// Floating AI chat widget for AIAUTOMY.
// Drop this file into src/components/ChatWidget.tsx and render <ChatWidget />
// once near the bottom of your root layout (e.g. in App.tsx, alongside
// <Navbar /> and <Footer />) so it appears on every page.
//
// It talks to /api/chat (the Node.js/Express backend on Railway) — your
// Anthropic/Gemini API key never reaches the browser.
//
// It is grounded in the site's REAL published services (fetched from the
// backend on mount) rather than a hardcoded list, and it logs each
// conversation to PostgreSQL (agent_chat_sessions) so the owner has a real,
// reviewable transcript in the Admin Control Center. Nothing about a
// visitor's chat is ever sent anywhere except this site's own database.

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm the AIAUTOMY assistant. Ask me about AI agents, websites, automation, or anything else — and if you're ready to start, I can point you to the project form.",
};

type Provider = 'claude' | 'gemini';

function makeSessionId(): string {
  return `chat-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Defaults to Gemini: this deployment is configured with GEMINI_API_KEY
  // (visitors can still switch to Claude if ANTHROPIC_API_KEY is later added).
  const [provider, setProvider] = useState<Provider>('gemini');
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(makeSessionId());

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  // Load the site's real, currently-published services once so replies stay
  // grounded in what's actually offered right now, not a hardcoded snapshot.
  useEffect(() => {
    fetchPublishedServices()
      .then(setServices)
      .catch(() => {
        // If this fails, /api/chat falls back to its own static list —
        // the widget still works, just without live grounding this session.
      });
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, provider, services }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong.');
      }

      const withReply: ChatMessage[] = [...nextMessages, { role: 'assistant', content: data.reply }];
      setMessages(withReply);

      // Best-effort transcript log for the owner's Admin Control Center.
      // Never blocks or breaks the chat UI if it fails.
      logChatMessages(sessionIdRef.current, provider, withReply, window.location.pathname).catch(() => {});
    } catch (err: any) {
      setError(err.message || 'Could not reach the assistant. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {open && (
        <div
          style={{
            width: 340,
            maxWidth: 'calc(100vw - 40px)',
            height: 460,
            background: '#0B132B',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>AIAUTOMY</div>
              <div style={{ color: '#9aa3b2', fontSize: 12 }}>AI Assistant</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Claude / Gemini switch */}
              <div
                role="tablist"
                aria-label="AI provider"
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 999,
                  padding: 2,
                  gap: 2,
                }}
              >
                {(['claude', 'gemini'] as Provider[]).map((p) => (
                  <button
                    key={p}
                    role="tab"
                    aria-selected={provider === p}
                    onClick={() => setProvider(p)}
                    title={p === 'claude' ? 'Anthropic Claude' : 'Google Gemini'}
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      background: provider === p ? '#F97316' : 'transparent',
                      color: provider === p ? '#0B132B' : '#9aa3b2',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9aa3b2',
                  fontSize: 18,
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.role === 'user' ? '#F97316' : 'rgba(255,255,255,0.06)',
                  color: m.role === 'user' ? '#0B132B' : '#e5e7eb',
                  padding: '8px 12px',
                  borderRadius: 12,
                  fontSize: 13.5,
                  lineHeight: 1.45,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  color: '#9aa3b2',
                  fontSize: 12.5,
                  padding: '4px 12px',
                }}
              >
                Typing…
              </div>
            )}
            {error && (
              <div style={{ color: '#f87171', fontSize: 12.5, padding: '4px 12px' }}>{error}</div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: 10,
              display: 'flex',
              gap: 8,
              alignItems: 'flex-end',
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about AI agents, websites, pricing…"
              rows={1}
              style={{
                flex: 1,
                resize: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                color: '#fff',
                padding: '8px 10px',
                fontSize: 13.5,
                outline: 'none',
                maxHeight: 90,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: '#F97316',
                color: '#0B132B',
                border: 'none',
                borderRadius: 10,
                padding: '10px 14px',
                fontWeight: 600,
                fontSize: 13,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#F97316',
          border: 'none',
          boxShadow: '0 10px 25px rgba(249,115,22,0.4)',
          color: '#0B132B',
          fontSize: 24,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
        }}
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}

