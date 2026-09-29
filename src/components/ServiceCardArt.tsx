import React from 'react';

/**
 * Original illustrations for the six "What We Do" service cards.
 * Inline SVG (no external images), square frame, site palette.
 */

type ArtKind = 'agents' | 'web' | 'ecommerce' | 'automation' | 'digital' | 'custom';

const FONT = 'Plus Jakarta Sans, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const Frame: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({ id, label, children }) => (
  <svg viewBox="0 -50 400 400" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#111c36" />
        <stop offset="1" stopColor="#070f22" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="0.5" cy="0.45" r="0.6">
        <stop offset="0" stopColor="#f97316" stopOpacity="0.28" />
        <stop offset="1" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-or`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fb923c" />
        <stop offset="1" stopColor="#ea580c" />
      </linearGradient>
      <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.6" />
      </pattern>
    </defs>
    <rect y="-50" width="400" height="400" fill={`url(#${id}-bg)`} />
    <rect y="-50" width="400" height="400" fill={`url(#${id}-dots)`} />
    <ellipse cx="200" cy="150" rx="200" ry="180" fill={`url(#${id}-glow)`} />
    {children}
  </svg>
);

const Agents = () => (
  <Frame id="sa1" label="AI agent chatting with a customer">
    {/* Robot */}
    <rect x="60" y="92" width="110" height="92" rx="24" fill="url(#sa1-or)" />
    <rect x="76" y="110" width="78" height="46" rx="14" fill="#0B132B" />
    <circle cx="99" cy="133" r="7" fill="#fb923c" />
    <circle cx="131" cy="133" r="7" fill="#fb923c" />
    <rect x="103" y="164" width="24" height="5" rx="2.5" fill="#0B132B" />
    <rect x="111" y="70" width="8" height="22" rx="4" fill="#fb923c" />
    <circle cx="115" cy="66" r="8" fill="#fde68a" />
    <rect x="48" y="122" width="12" height="30" rx="6" fill="#ea580c" />
    <rect x="170" y="122" width="12" height="30" rx="6" fill="#ea580c" />
    <rect x="80" y="190" width="70" height="40" rx="12" fill="#1e293b" stroke="#334155" />
    <circle cx="115" cy="210" r="7" fill="#22c55e" opacity="0.8" />
    {/* Chat */}
    <rect x="210" y="70" width="150" height="40" rx="14" fill="#1e293b" stroke="#334155" />
    <text x="224" y="95" fontSize="12" fill="#cbd5e1" fontFamily={FONT}>Is my order shipped?</text>
    <rect x="200" y="124" width="170" height="58" rx="14" fill="#f97316" fillOpacity="0.16" stroke="#f97316" strokeOpacity="0.5" />
    <text x="214" y="148" fontSize="12" fill="#fed7aa" fontFamily={FONT}>Yes — it arrives on</text>
    <text x="214" y="166" fontSize="12" fill="#fed7aa" fontFamily={FONT}>Friday. Tracking sent ✓</text>
    <rect x="236" y="198" width="124" height="30" rx="15" fill="#22c55e" fillOpacity="0.14" stroke="#22c55e" strokeOpacity="0.5" />
    <circle cx="254" cy="213" r="4" fill="#4ade80" />
    <text x="266" y="217" fontSize="11" fill="#86efac" fontFamily={FONT}>online 24/7</text>
  </Frame>
);

const Web = () => (
  <Frame id="sa2" label="Responsive website on desktop and phone">
    <rect x="40" y="52" width="260" height="176" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
    <rect x="40" y="52" width="260" height="22" rx="12" fill="#0f172a" />
    <circle cx="56" cy="63" r="3.5" fill="#ef4444" opacity="0.8" />
    <circle cx="68" cy="63" r="3.5" fill="#f59e0b" opacity="0.8" />
    <circle cx="80" cy="63" r="3.5" fill="#22c55e" opacity="0.8" />
    <rect x="96" y="58" width="120" height="10" rx="5" fill="#1e293b" />
    <rect x="56" y="88" width="120" height="12" rx="6" fill="#f8fafc" />
    <rect x="56" y="106" width="90" height="12" rx="6" fill="#f97316" />
    <rect x="56" y="126" width="110" height="6" rx="3" fill="#64748b" />
    <rect x="56" y="138" width="96" height="6" rx="3" fill="#64748b" />
    <rect x="56" y="154" width="60" height="18" rx="6" fill="url(#sa2-or)" />
    <rect x="190" y="86" width="96" height="86" rx="10" fill="#0f172a" stroke="#334155" />
    <path d="M204 156 l20 -26 l16 18 l12 -12 l22 20 z" fill="#f97316" opacity="0.7" />
    <circle cx="258" cy="106" r="8" fill="#fde68a" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={56 + i * 80} y="186" width="70" height="28" rx="7" fill="#0f172a" stroke="#334155" />
    ))}
    {/* Phone */}
    <rect x="290" y="96" width="76" height="146" rx="14" fill="#0f172a" stroke="#f97316" strokeOpacity="0.7" strokeWidth="2" />
    <rect x="300" y="112" width="56" height="8" rx="4" fill="#f8fafc" />
    <rect x="300" y="126" width="40" height="8" rx="4" fill="#f97316" />
    <rect x="300" y="144" width="56" height="44" rx="8" fill="#1e293b" />
    <rect x="300" y="196" width="56" height="16" rx="6" fill="url(#sa2-or)" />
    <rect x="316" y="226" width="24" height="4" rx="2" fill="#334155" />
    {/* Code tag */}
    <rect x="52" y="240" width="92" height="30" rx="10" fill="#1e293b" stroke="#334155" />
    <text x="64" y="260" fontSize="13" fill="#fb923c" fontFamily={MONO}>{'</>'}</text>
    <text x="94" y="260" fontSize="11" fill="#94a3b8" fontFamily={MONO}>fast</text>
  </Frame>
);

const Ecommerce = () => (
  <Frame id="sa3" label="Online store with products, cart and sales">
    {/* Store awning */}
    <rect x="46" y="60" width="200" height="170" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${46 + i * 40} 60 h40 v22 a20 20 0 0 1 -40 0 z`} fill={i % 2 ? '#fb923c' : '#ea580c'} />
    ))}
    {[0, 1].map((r) =>
      [0, 1, 2].map((c) => (
        <g key={`${r}-${c}`}>
          <rect x={60 + c * 60} y={112 + r * 58} width="50" height="48" rx="8" fill="#0f172a" stroke="#334155" />
          <circle cx={85 + c * 60} cy={130 + r * 58} r="9" fill="#f97316" opacity={0.95 - c * 0.2} />
          <rect x={68 + c * 60} y={146 + r * 58} width="34" height="5" rx="2.5" fill="#94a3b8" />
        </g>
      )),
    )}
    {/* Cart */}
    <g transform="translate(268 76)">
      <rect width="96" height="84" rx="14" fill="#0f172a" stroke="#f97316" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M22 28 h8 l8 28 h32 l6 -20 h-42" fill="none" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="66" r="5" fill="#fb923c" />
      <circle cx="66" cy="66" r="5" fill="#fb923c" />
      <circle cx="80" cy="16" r="11" fill="#22c55e" />
      <text x="80" y="20" fontSize="11" fontWeight="700" fill="#052e16" textAnchor="middle" fontFamily={FONT}>3</text>
    </g>
    {/* Sales chip */}
    <g transform="translate(262 178)">
      <rect width="108" height="56" rx="12" fill="#1e293b" stroke="#334155" />
      <text x="12" y="22" fontSize="10" fill="#94a3b8" fontFamily={FONT}>Orders today</text>
      <text x="12" y="44" fontSize="18" fontWeight="800" fill="#f8fafc" fontFamily={FONT}>+42</text>
      <path d="M62 42 l10 -8 l8 5 l16 -16" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </Frame>
);

const Automation = () => (
  <Frame id="sa4" label="Automated workflow connecting forms, AI and tools">
    <g stroke="#f97316" strokeOpacity="0.6" strokeWidth="2.5" strokeDasharray="6 6" fill="none">
      <path d="M110 110 H170" />
      <path d="M230 110 H290" />
      <path d="M200 140 V180" />
    </g>
    {/* Nodes */}
    <g>
      <rect x="40" y="80" width="70" height="60" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="58" y="96" width="34" height="28" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
      <path d="M58 98 l17 13 l17 -13" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="75" y="160" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily={FONT}>New lead</text>
    </g>
    <g>
      <circle cx="200" cy="110" r="34" fill="url(#sa4-or)" />
      <text x="200" y="116" fontSize="16" fontWeight="800" fill="#0B132B" textAnchor="middle" fontFamily={MONO}>AI</text>
    </g>
    <g>
      <rect x="290" y="80" width="70" height="60" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="306" y="96" width="38" height="28" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
      <line x1="306" y1="105" x2="344" y2="105" stroke="#e2e8f0" strokeWidth="2.5" />
      <text x="325" y="160" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily={FONT}>CRM</text>
    </g>
    {/* Gear */}
    <g transform="translate(200 214)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="-5" y="-34" width="10" height="14" rx="3" fill="#475569" transform={`rotate(${a})`} />
      ))}
      <circle r="24" fill="#475569" />
      <circle r="10" fill="#0B132B" />
    </g>
    <rect x="252" y="200" width="118" height="30" rx="15" fill="#22c55e" fillOpacity="0.14" stroke="#22c55e" strokeOpacity="0.5" />
    <path d="M266 215 l4 4 l8 -8" fill="none" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="284" y="219" fontSize="11" fill="#86efac" fontFamily={FONT}>Approved</text>
    <rect x="30" y="200" width="118" height="30" rx="15" fill="#1e293b" stroke="#334155" />
    <text x="44" y="219" fontSize="11" fill="#fdba74" fontFamily={FONT}>⏱ 10 hrs saved/wk</text>
  </Frame>
);

const Digital = () => (
  <Frame id="sa5" label="Business dashboard with charts and data">
    <rect x="36" y="46" width="328" height="208" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
    <rect x="36" y="46" width="70" height="208" rx="14" fill="#0f172a" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x="52" y={74 + i * 30} width="38" height="8" rx="4" fill={i === 0 ? '#f97316' : '#334155'} />
    ))}
    {/* KPI tiles */}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={122 + i * 78} y="62" width="68" height="46" rx="8" fill="#0f172a" stroke="#334155" />
        <rect x={130 + i * 78} y="72" width="30" height="5" rx="2.5" fill="#64748b" />
        <rect x={130 + i * 78} y="84" width={40 - i * 6} height="12" rx="4" fill={i === 1 ? '#f97316' : '#f8fafc'} />
      </g>
    ))}
    {/* Line chart */}
    <rect x="122" y="120" width="146" height="118" rx="10" fill="#0f172a" stroke="#334155" />
    <polyline points="134,214 156,196 176,204 198,174 220,180 244,146 258,140" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M134 214 L156 196 L176 204 L198 174 L220 180 L244 146 L258 140 L258 228 L134 228 Z" fill="#f97316" opacity="0.14" />
    {/* Donut */}
    <rect x="278" y="120" width="72" height="118" rx="10" fill="#0f172a" stroke="#334155" />
    <circle cx="314" cy="164" r="22" fill="none" stroke="#334155" strokeWidth="9" />
    <circle cx="314" cy="164" r="22" fill="none" stroke="#f97316" strokeWidth="9" strokeDasharray="96 138" transform="rotate(-90 314 164)" />
    <rect x="292" y="200" width="44" height="6" rx="3" fill="#64748b" />
    <rect x="292" y="214" width="32" height="6" rx="3" fill="#475569" />
  </Frame>
);

const Custom = () => (
  <Frame id="sa6" label="Custom system blueprint with connected modules">
    {/* Blueprint grid */}
    <rect x="40" y="40" width="320" height="220" rx="14" fill="#0b1a3a" stroke="#1d4ed8" strokeOpacity="0.35" />
    <g stroke="#3b82f6" strokeOpacity="0.12">
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={`v${i}`} x1={60 + i * 20} y1="40" x2={60 + i * 20} y2="260" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="40" y1={60 + i * 20} x2="360" y2={60 + i * 20} />
      ))}
    </g>
    {/* Stacked layers */}
    <g transform="translate(200 150)">
      <path d="M0 40 L80 0 L0 -40 L-80 0 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" transform="translate(0 34)" />
      <path d="M0 40 L80 0 L0 -40 L-80 0 Z" fill="#334155" stroke="#64748b" strokeWidth="2" transform="translate(0 10)" />
      <path d="M0 40 L80 0 L0 -40 L-80 0 Z" fill="url(#sa6-or)" transform="translate(0 -14)" />
      <text x="0" y="-9" fontSize="13" fontWeight="800" fill="#0B132B" textAnchor="middle" fontFamily={MONO}>API</text>
    </g>
    {/* Modules */}
    {[
      [70, 70, 'DB'],
      [290, 70, 'AI'],
      [70, 200, 'APP'],
      [290, 200, 'CRM'],
    ].map(([x, y, t]) => (
      <g key={t as string}>
        <rect x={x as number} y={y as number} width="46" height="32" rx="8" fill="#0f172a" stroke="#f97316" strokeOpacity="0.6" />
        <text x={(x as number) + 23} y={(y as number) + 21} fontSize="10" fontWeight="700" fill="#fdba74" textAnchor="middle" fontFamily={MONO}>{t}</text>
      </g>
    ))}
    <g stroke="#f97316" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 5" fill="none">
      <path d="M116 86 L150 120" />
      <path d="M290 86 L250 120" />
      <path d="M116 216 L150 180" />
      <path d="M290 216 L250 180" />
    </g>
  </Frame>
);

const ARTS: Record<ArtKind, React.FC> = {
  agents: Agents,
  web: Web,
  ecommerce: Ecommerce,
  automation: Automation,
  digital: Digital,
  custom: Custom,
};

export const ServiceCardArt: React.FC<{ kind: ArtKind }> = ({ kind }) => {
  const Art = ARTS[kind];
  return <Art />;
};

export const artKindForService = (slug: string): ArtKind => {
  switch (slug) {
    case 'custom-ai-agents':
      return 'agents';
    case 'web-development':
      return 'web';
    case 'ecommerce-solutions':
      return 'ecommerce';
    case 'ai-automation':
    case 'ai-business-automation':
      return 'automation';
    default:
      return 'digital';
  }
};
