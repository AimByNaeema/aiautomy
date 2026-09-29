import React from 'react';

/**
 * Original illustration for the home page: a business website on a laptop,
 * an AI agent answering a customer, an automation flow and a growth chart —
 * the four things AIAUTOMY builds. Pure inline SVG (no external image, no
 * extra network request), scales to any width, matches the site palette.
 */
export const HeroIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1200 560"
    className={className}
    role="img"
    aria-labelledby="aiautomy-illustration-title aiautomy-illustration-desc"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="aiautomy-illustration-title">AIAUTOMY builds AI agents, websites and automation</title>
    <desc id="aiautomy-illustration-desc">
      A laptop showing a business website, surrounded by an AI agent chatting with a customer,
      an automated lead workflow with human approval, and a rising sales chart.
    </desc>
    <defs>
      <linearGradient id="ai-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0f172a" />
        <stop offset="1" stopColor="#0B132B" />
      </linearGradient>
      <radialGradient id="ai-glow" cx="0.5" cy="0.45" r="0.55">
        <stop offset="0" stopColor="#f97316" stopOpacity="0.22" />
        <stop offset="1" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ai-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#111827" />
        <stop offset="1" stopColor="#0b1222" />
      </linearGradient>
      <linearGradient id="ai-orange" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fb923c" />
        <stop offset="1" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="ai-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fb923c" />
        <stop offset="1" stopColor="#f97316" stopOpacity="0.35" />
      </linearGradient>
      <pattern id="ai-dots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.3" fill="#334155" opacity="0.55" />
      </pattern>
      <filter id="ai-shadow" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#020617" floodOpacity="0.7" />
      </filter>
    </defs>

    {/* Backdrop */}
    <rect width="1200" height="560" rx="28" fill="url(#ai-bg)" />
    <rect width="1200" height="560" rx="28" fill="url(#ai-dots)" />
    <ellipse cx="600" cy="270" rx="520" ry="260" fill="url(#ai-glow)" />

    {/* Connector lines */}
    <g stroke="#f97316" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 8" fill="none">
      <path d="M300 150 C 360 150, 380 190, 420 205" />
      <path d="M300 400 C 360 400, 380 360, 420 345" />
      <path d="M900 140 C 840 140, 820 185, 780 200" />
      <path d="M900 400 C 840 400, 820 360, 780 345" />
    </g>

    {/* Laptop */}
    <g filter="url(#ai-shadow)">
      <rect x="410" y="110" width="380" height="250" rx="14" fill="#1e293b" />
      <rect x="422" y="122" width="356" height="226" rx="6" fill="url(#ai-screen)" />
      <path d="M372 360 H828 L808 392 H392 Z" fill="#334155" />
      <rect x="560" y="360" width="80" height="8" rx="4" fill="#475569" />
    </g>
    {/* Website on screen */}
    <g>
      <rect x="422" y="122" width="356" height="22" rx="6" fill="#1f2937" />
      <circle cx="436" cy="133" r="3.5" fill="#ef4444" opacity="0.8" />
      <circle cx="448" cy="133" r="3.5" fill="#f59e0b" opacity="0.8" />
      <circle cx="460" cy="133" r="3.5" fill="#22c55e" opacity="0.8" />
      <rect x="480" y="128" width="150" height="10" rx="5" fill="#0f172a" />
      <text x="488" y="136.5" fontSize="8" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">www.yourbusiness.com</text>

      <rect x="438" y="156" width="22" height="22" rx="5" fill="url(#ai-orange)" />
      <rect x="468" y="163" width="60" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="650" y="162" width="30" height="8" rx="4" fill="#475569" />
      <rect x="688" y="162" width="30" height="8" rx="4" fill="#475569" />
      <rect x="726" y="159" width="40" height="14" rx="7" fill="#f97316" />

      <rect x="438" y="196" width="170" height="12" rx="6" fill="#f8fafc" />
      <rect x="438" y="214" width="130" height="12" rx="6" fill="#f97316" />
      <rect x="438" y="236" width="160" height="6" rx="3" fill="#64748b" />
      <rect x="438" y="248" width="140" height="6" rx="3" fill="#64748b" />
      <rect x="438" y="266" width="70" height="20" rx="6" fill="url(#ai-orange)" />
      <rect x="516" y="266" width="62" height="20" rx="6" fill="none" stroke="#475569" />

      <rect x="626" y="192" width="136" height="96" rx="10" fill="#1e293b" stroke="#334155" />
      <circle cx="694" cy="232" r="22" fill="#f97316" opacity="0.18" />
      <rect x="679" y="220" width="30" height="24" rx="7" fill="url(#ai-orange)" />
      <circle cx="688" cy="231" r="3" fill="#0B132B" />
      <circle cx="700" cy="231" r="3" fill="#0B132B" />
      <rect x="688" y="238" width="12" height="2.5" rx="1.25" fill="#0B132B" />
      <rect x="692" y="212" width="4" height="8" rx="2" fill="#fb923c" />
      <rect x="646" y="262" width="96" height="6" rx="3" fill="#475569" />
      <rect x="660" y="274" width="68" height="6" rx="3" fill="#334155" />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={438 + i * 112} y="300" width="100" height="38" rx="8" fill="#1e293b" stroke="#334155" />
          <circle cx={454 + i * 112} cy="319" r="7" fill="#f97316" opacity={0.9 - i * 0.2} />
          <rect x={468 + i * 112} y="313" width="54" height="5" rx="2.5" fill="#cbd5e1" />
          <rect x={468 + i * 112} y="322" width="38" height="5" rx="2.5" fill="#64748b" />
        </g>
      ))}
    </g>

    {/* Card: AI agent chat (top-left) */}
    <g filter="url(#ai-shadow)">
      <rect x="60" y="62" width="250" height="176" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <circle cx="94" cy="96" r="18" fill="url(#ai-orange)" />
      <rect x="84" y="89" width="20" height="15" rx="4" fill="#0B132B" />
      <circle cx="90" cy="96" r="2.4" fill="#fb923c" />
      <circle cx="98" cy="96" r="2.4" fill="#fb923c" />
      <text x="122" y="93" fontSize="14" fontWeight="700" fill="#f8fafc" fontFamily="Plus Jakarta Sans, sans-serif">AI Agent</text>
      <circle cx="126" cy="106" r="3.5" fill="#22c55e" />
      <text x="134" y="110" fontSize="11" fill="#94a3b8" fontFamily="Plus Jakarta Sans, sans-serif">online · replies 24/7</text>
      <rect x="150" y="128" width="140" height="30" rx="12" fill="#1e293b" />
      <text x="162" y="147" fontSize="11" fill="#cbd5e1" fontFamily="Plus Jakarta Sans, sans-serif">Do you ship to Dubai?</text>
      <rect x="76" y="168" width="196" height="50" rx="12" fill="#f97316" fillOpacity="0.14" stroke="#f97316" strokeOpacity="0.4" />
      <text x="88" y="188" fontSize="11" fill="#fed7aa" fontFamily="Plus Jakarta Sans, sans-serif">Yes! Delivery takes 3–5 days.</text>
      <text x="88" y="205" fontSize="11" fill="#fed7aa" fontFamily="Plus Jakarta Sans, sans-serif">Want me to start your order?</text>
    </g>

    {/* Card: automation flow (bottom-left) */}
    <g filter="url(#ai-shadow)">
      <rect x="60" y="318" width="250" height="170" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="82" y="350" fontSize="14" fontWeight="700" fill="#f8fafc" fontFamily="Plus Jakarta Sans, sans-serif">Automation</text>
      <text x="82" y="368" fontSize="11" fill="#94a3b8" fontFamily="Plus Jakarta Sans, sans-serif">New lead → qualified → CRM</text>
      <g stroke="#475569" strokeWidth="2">
        <line x1="112" y1="410" x2="163" y2="410" />
        <line x1="203" y1="410" x2="254" y2="410" />
      </g>
      <circle cx="94" cy="410" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <path d="M86 404 h16 v12 h-16 z M86 404 l8 6 l8 -6" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="183" cy="410" r="20" fill="url(#ai-orange)" />
      <text x="183" y="415" fontSize="12" fontWeight="700" fill="#0B132B" textAnchor="middle" fontFamily="JetBrains Mono, monospace">AI</text>
      <circle cx="272" cy="410" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <rect x="263" y="402" width="18" height="16" rx="3" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="263" y1="408" x2="281" y2="408" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="82" y="446" width="136" height="24" rx="12" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeOpacity="0.5" />
      <path d="M94 458 l4 4 l8 -8" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="112" y="462" fontSize="11" fill="#86efac" fontFamily="Plus Jakarta Sans, sans-serif">Human approved</text>
    </g>

    {/* Card: growth chart (top-right) */}
    <g filter="url(#ai-shadow)">
      <rect x="890" y="62" width="250" height="176" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="912" y="94" fontSize="14" fontWeight="700" fill="#f8fafc" fontFamily="Plus Jakarta Sans, sans-serif">Monthly sales</text>
      <text x="1118" y="94" fontSize="12" fontWeight="700" fill="#4ade80" textAnchor="end" fontFamily="Plus Jakarta Sans, sans-serif">▲ growing</text>
      <line x1="912" y1="214" x2="1118" y2="214" stroke="#334155" />
      {[38, 52, 46, 68, 80, 96].map((h, i) => (
        <rect key={i} x={918 + i * 33} y={214 - h} width="20" height={h} rx="5" fill="url(#ai-bar)" />
      ))}
      <polyline
        points="928,172 961,160 994,166 1027,146 1060,134 1093,116"
        fill="none"
        stroke="#fde68a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="1093" cy="116" r="4.5" fill="#fde68a" />
    </g>

    {/* Card: SEO / search (bottom-right) */}
    <g filter="url(#ai-shadow)">
      <rect x="890" y="318" width="250" height="170" rx="18" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="912" y="350" fontSize="14" fontWeight="700" fill="#f8fafc" fontFamily="Plus Jakarta Sans, sans-serif">Found on Google</text>
      <rect x="912" y="366" width="206" height="30" rx="15" fill="#1e293b" stroke="#334155" />
      <circle cx="932" cy="381" r="6.5" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <line x1="937" y1="386" x2="942" y2="391" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <text x="950" y="385" fontSize="11" fill="#cbd5e1" fontFamily="Plus Jakarta Sans, sans-serif">best store near me</text>
      <rect x="912" y="408" width="206" height="62" rx="10" fill="#f97316" fillOpacity="0.1" stroke="#f97316" strokeOpacity="0.45" />
      <text x="924" y="428" fontSize="11" fontWeight="700" fill="#fdba74" fontFamily="Plus Jakarta Sans, sans-serif">Your Business — Official Site</text>
      <rect x="924" y="438" width="170" height="5" rx="2.5" fill="#64748b" />
      <rect x="924" y="450" width="130" height="5" rx="2.5" fill="#475569" />
    </g>
  </svg>
);
