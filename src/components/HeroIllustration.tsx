import React, { useEffect, useRef, useState } from 'react';
import { Mail, Database, Search, ShoppingBag, UserPlus, Star, MousePointer2 } from 'lucide-react';
import { unsplashUrl } from './StockPhoto';

/**
 * Animated home-page showcase: a live-looking online store on a laptop
 * (real photos), an AI agent answering real customers, an automation flow,
 * a growing sales chart, a Google result and live notifications.
 *
 * Drawn at a fixed 1200x560 "design size" and scaled to the container width,
 * so it looks identical on phones and desktops. Motion is CSS + a few timers;
 * everything stops for visitors who prefer reduced motion.
 */

const W = 1200;
const H = 560;

const IMG = {
  robot: '1684369175833-4b445ad6bfb5',
  store: '1441986300917-64674bd600d8',
  sneaker: '1561808843-7adeb9606939',
  headphones: '1615375834706-98afda0d534f',
  watch: '1758887952896-8491d393afe2',
  c1: '1654762699761-b6d13143bb2e',
  c2: '1650381473833-3e2c74a40fbf',
  c3: '1657152042407-64b755c7558a',
};

const img = (id: string, w: number, h: number) => unsplashUrl(id, w * 2, h * 2);

const CHATS = [
  { avatar: IMG.c1, q: 'Do you ship to Dubai?', a: ['Yes! Delivery takes 3–5 days.', 'Want me to start your order?'] },
  { avatar: IMG.c2, q: 'Is the watch waterproof?', a: ['Yes — water resistant to 50m.', 'In stock. Shall I reserve one?'] },
  { avatar: IMG.c3, q: 'Can I book a table for 4?', a: ['Done! Friday 8pm is confirmed.', 'Details sent to your email ✓'] },
];

const TOASTS = [
  { icon: ShoppingBag, title: 'New order #1042', sub: 'Headphones · $129', photo: IMG.headphones, color: 'text-orange-500' },
  { icon: UserPlus, title: 'New lead captured', sub: 'Qualified by AI agent', photo: IMG.c2, color: 'text-emerald-600' },
  { icon: Star, title: '5★ review received', sub: '“Fast and friendly!”', photo: IMG.c1, color: 'text-amber-500' },
];

const CSS = `
@keyframes sc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
@keyframes sc-dash { to { stroke-dashoffset: -28 } }
@keyframes sc-in { 0% { opacity:0; transform: translateY(8px) scale(.96) } 100% { opacity:1; transform:none } }
@keyframes sc-dot { 0%,100% { opacity:.25; transform: translateY(0) } 50% { opacity:1; transform: translateY(-2px) } }
@keyframes sc-bar { 0% { transform: scaleY(.1) } 100% { transform: scaleY(1) } }
@keyframes sc-scroll { 0%,14% { transform: translateY(0) } 40%,62% { transform: translateY(-96px) } 90%,100% { transform: translateY(0) } }
@keyframes sc-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,.6) } 60% { box-shadow: 0 0 0 12px rgba(249,115,22,0) } }
@keyframes sc-move { 0% { left: 14%; opacity:0 } 8% { opacity:1 } 92% { opacity:1 } 100% { left: 86%; opacity:0 } }
@keyframes sc-type { 0%,8% { width: 0 } 40%,100% { width: 106px } }
@keyframes sc-glow { 0%,100% { opacity:.5; transform: translate(-50%,-50%) scale(1) } 50% { opacity:.95; transform: translate(-50%,-50%) scale(1.06) } }
@keyframes sc-shine { 0%,55% { transform: translateX(-140%) skewX(-18deg) } 85%,100% { transform: translateX(460%) skewX(-18deg) } }
@keyframes sc-cursor {
  0% { transform: translate(250px, 200px) } 18% { transform: translate(52px, 120px) } 22% { transform: translate(52px, 120px) scale(.8) }
  26% { transform: translate(52px, 120px) } 52% { transform: translate(262px, 150px) } 56% { transform: translate(262px, 150px) scale(.8) }
  60% { transform: translate(262px, 150px) } 100% { transform: translate(250px, 200px) }
}
@keyframes sc-toast { 0% { opacity:0; transform: translate(-50%, 12px) scale(.94) } 10%,80% { opacity:1; transform: translate(-50%, 0) scale(1) } 100% { opacity:0; transform: translate(-50%, -12px) scale(.97) } }
@keyframes sc-badge { 0% { transform: scale(1) } 40% { transform: scale(1.6) } 100% { transform: scale(1) } }
@keyframes sc-rank { 0% { opacity:0; transform: scale(.4) rotate(-20deg) } 60% { opacity:1; transform: scale(1.15) } 100% { opacity:1; transform: none } }
@keyframes sc-ring { 0% { transform: scale(.9); opacity:.9 } 100% { transform: scale(1.8); opacity:0 } }
@keyframes sc-spin { to { transform: rotate(360deg) } }
.sc .sc-float { animation: sc-float 6s ease-in-out infinite }
.sc .sc-float-b { animation: sc-float 7s ease-in-out -2s infinite }
.sc .sc-float-c { animation: sc-float 6.5s ease-in-out -4s infinite }
.sc .sc-dash { animation: sc-dash 1.1s linear infinite }
.sc .sc-in { animation: sc-in .45s cubic-bezier(.2,.9,.3,1.2) both }
.sc .sc-dots span { animation: sc-dot .9s ease-in-out infinite }
.sc .sc-dots span:nth-child(2) { animation-delay: .15s }
.sc .sc-dots span:nth-child(3) { animation-delay: .3s }
.sc .sc-bar { transform-origin: bottom; animation: sc-bar 1.1s cubic-bezier(.2,.8,.2,1) both }
.sc .sc-scroll { animation: sc-scroll 12s ease-in-out infinite }
.sc .sc-pulse { animation: sc-pulse 2s ease-out infinite }
.sc .sc-move { animation: sc-move 2.6s ease-in-out infinite }
.sc .sc-type { animation: sc-type 6s steps(18) infinite }
.sc .sc-glow { animation: sc-glow 6s ease-in-out infinite }
.sc .sc-shine { animation: sc-shine 5s ease-in-out infinite }
.sc .sc-cursor { animation: sc-cursor 6s ease-in-out infinite }
.sc .sc-toast { animation: sc-toast 4.2s ease-out both }
.sc .sc-badge { animation: sc-badge .5s ease-out }
.sc .sc-rank { animation: sc-rank .6s ease-out both }
.sc .sc-ring { animation: sc-ring 1.8s ease-out infinite }
.sc .sc-spin { animation: sc-spin 14s linear infinite }
@media (prefers-reduced-motion: reduce) { .sc * { animation: none !important } .sc .sc-motion, .sc .sc-cursor { display: none } }
`;

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Counts up to `to` (from ~72% of it), restarting whenever `runKey` changes. */
const useCountUp = (to: number, runKey: number, ms = 1400) => {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (reducedMotion()) {
      setV(to);
      return;
    }
    const from = Math.round(to * 0.72);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, runKey, ms]);
  return v;
};

const Card: React.FC<{ className?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ className = '', style, children }) => (
  <div
    className={`absolute rounded-[18px] bg-[#0f172a]/95 border-2 border-[#1e293b] shadow-[0_18px_40px_rgba(2,6,23,.7)] ${className}`}
    style={style}
  >
    {children}
  </div>
);

const PATHS = [
  'M310 150 C 360 150, 380 190, 420 205',
  'M310 400 C 360 400, 380 360, 420 345',
  'M890 140 C 840 140, 820 185, 780 200',
  'M890 400 C 840 400, 820 360, 780 345',
];

export const HeroIllustration: React.FC<{ className?: string }> = ({ className }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0); // advances every 6s
  const [chatStage, setChatStage] = useState(2); // 0 question, 1 typing, 2 answer
  const [cart, setCart] = useState(2);
  const [visible, setVisible] = useState(false);

  // Scale the 1200x560 scene to the container; only animate while on screen.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Story loop: new chat / toast / sales cycle every 6s.
  useEffect(() => {
    if (!visible || reducedMotion()) return;
    const timers: number[] = [];
    const run = () => {
      setChatStage(0);
      timers.push(window.setTimeout(() => setChatStage(1), 1100));
      timers.push(window.setTimeout(() => setChatStage(2), 2500));
      timers.push(window.setTimeout(() => setCart((c) => (c >= 9 ? 2 : c + 1)), 3400));
    };
    run();
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      run();
    }, 6000);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, [visible]);

  const sales = useCountUp(24860 + (tick % 5) * 1375, tick);
  const chat = CHATS[tick % CHATS.length];
  const toast = TOASTS[tick % TOASTS.length];
  const ToastIcon = toast.icon;

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };

  const par = (depth: number): React.CSSProperties => ({
    transform: `translate(${tilt.x * depth}px, ${tilt.y * depth}px)`,
    transition: 'transform .4s ease-out',
  });

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      role="img"
      aria-label="Animated overview: an online store on a laptop receiving orders, an AI agent answering customers, an automated lead workflow with human approval, a growing sales chart and a Google search result."
    >
      <style>{CSS}</style>
      <div
        className="sc absolute top-0 left-0 font-sans select-none"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#0f172a] via-[#0d1631] to-[#0B132B]" />
        <div
          className="absolute inset-0 rounded-[28px] opacity-60"
          style={{ backgroundImage: 'radial-gradient(#334155 1.3px, transparent 1.3px)', backgroundSize: '28px 28px', ...par(-4) }}
        />
        <div
          className="sc-glow absolute left-1/2 top-[48%] w-[1040px] h-[520px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,.26), rgba(249,115,22,0))' }}
        />
        <div className="absolute left-1/2 top-[46%] -ml-[280px] -mt-[280px] w-[560px] h-[560px]">
          <div
            className="sc-spin w-full h-full rounded-full opacity-30 blur-[2px]"
            style={{ background: 'conic-gradient(from 0deg, transparent, rgba(251,146,60,.4), transparent 28%, rgba(59,130,246,.3), transparent 58%, rgba(251,146,60,.25), transparent 85%)' }}
          />
        </div>

        {/* Connector lines + travelling light */}
        <svg className="absolute inset-0" width={W} height={H} aria-hidden="true">
          <g stroke="#f97316" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 8" fill="none">
            {PATHS.map((d) => (
              <path key={d} className="sc-dash" d={d} />
            ))}
          </g>
          <g className="sc-motion">
            {PATHS.map((d, i) => (
              <circle key={d} r="4.5" fill="#fdba74" style={{ filter: 'drop-shadow(0 0 6px #fb923c)' }}>
                <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          </g>
        </svg>

        {/* Laptop with live store */}
        <div className="absolute" style={{ left: 410, top: 104, width: 380, ...par(4) }}>
          <div className="rounded-[14px] bg-[#1e293b] p-[12px] shadow-[0_28px_60px_rgba(2,6,23,.8)] ring-1 ring-orange-500/25">
            <div className="relative h-[230px] rounded-[6px] overflow-hidden bg-[#0b1222]">
              <div className="absolute top-0 inset-x-0 h-[22px] bg-[#1f2937] flex items-center gap-[6px] px-[10px] z-20">
                <span className="w-[7px] h-[7px] rounded-full bg-red-500/80" />
                <span className="w-[7px] h-[7px] rounded-full bg-amber-500/80" />
                <span className="w-[7px] h-[7px] rounded-full bg-green-500/80" />
                <span className="ml-[10px] h-[12px] px-[8px] rounded-full bg-[#0f172a] text-[8px] leading-[12px] text-slate-400 font-mono">
                  www.yourbusiness.com
                </span>
              </div>
              <div className="sc-scroll absolute inset-x-0 top-[22px]">
                <div className="flex items-center justify-between px-[12px] h-[26px] bg-[#0f172a]">
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[14px] h-[14px] rounded-[4px] bg-orange-500" />
                    <span className="text-[9px] font-bold text-white">Your Store</span>
                  </div>
                  <div className="flex items-center gap-[8px] text-[7px] text-slate-400">
                    <span>Shop</span>
                    <span>About</span>
                    <span className="relative px-[6px] rounded-full bg-orange-500 text-white">
                      Cart
                      <span
                        key={cart}
                        className="sc-badge absolute -top-[6px] -right-[8px] w-[12px] h-[12px] rounded-full bg-emerald-500 text-[7px] leading-[12px] text-center font-bold"
                      >
                        {cart}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="relative h-[120px] overflow-hidden">
                  <img src={img(IMG.store, 356, 120)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b1222]/90 via-[#0b1222]/45 to-transparent" />
                  <div className="absolute left-[14px] top-[22px] space-y-[5px]">
                    <div className="text-[14px] font-extrabold text-white leading-tight">New Season</div>
                    <div className="text-[14px] font-extrabold text-orange-400 leading-tight">Collection</div>
                    <div className="text-[7px] text-slate-300 w-[120px]">Free delivery on orders this week.</div>
                    <span className="sc-pulse inline-block mt-[4px] px-[9px] py-[3px] rounded-[5px] bg-orange-500 text-[7px] font-bold text-white">
                      Shop now
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-[8px] p-[10px] bg-[#0b1222]">
                  {[
                    [IMG.sneaker, 'Sneakers', '$89'],
                    [IMG.headphones, 'Headphones', '$129'],
                    [IMG.watch, 'Watch', '$149'],
                  ].map(([id, name, price], i) => (
                    <div
                      key={name}
                      className={`rounded-[6px] bg-[#1e293b] border overflow-hidden transition-all duration-500 ${
                        tick % 3 === i ? 'border-orange-500 -translate-y-[3px] shadow-[0_6px_16px_rgba(249,115,22,.35)]' : 'border-[#334155]'
                      }`}
                    >
                      <img src={img(id, 104, 70)} alt="" className="w-full h-[62px] object-cover" />
                      <div className="px-[6px] py-[4px] flex justify-between text-[7px]">
                        <span className="text-slate-200">{name}</span>
                        <span className="text-orange-400 font-bold">{price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-[10px] pb-[10px] bg-[#0b1222] flex gap-[8px]">
                  <div className="flex-1 h-[44px] rounded-[6px] bg-[#1e293b] border border-[#334155] p-[6px]">
                    <div className="text-[7px] text-slate-400">Customer reviews</div>
                    <div className="text-[9px] text-amber-400 mt-[2px]">★★★★★ 4.9</div>
                  </div>
                  <div className="flex-1 h-[44px] rounded-[6px] bg-orange-500/15 border border-orange-500/40 p-[6px]">
                    <div className="text-[7px] text-orange-300">Ask our AI assistant</div>
                    <div className="text-[8px] text-white mt-[2px]">Online 24/7 →</div>
                  </div>
                </div>
              </div>
              {/* screen shine + cursor */}
              <div className="sc-shine pointer-events-none absolute inset-y-0 left-0 w-[80px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
              <div className="sc-cursor absolute left-0 top-0 z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,.6)]">
                <MousePointer2 className="w-[16px] h-[16px] text-white fill-white" />
              </div>
            </div>
          </div>
          <div className="mx-[-38px] h-[30px] bg-gradient-to-b from-[#3b4a61] to-[#2a3547]" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} />
          <div className="mx-auto -mt-[30px] w-[80px] h-[7px] rounded-b-[4px] bg-[#475569]" />
        </div>

        {/* Live notification toast above the laptop */}
        <div
          key={`toast-${tick}`}
          className="sc-toast absolute z-40 flex items-center gap-[10px] rounded-[14px] bg-white/95 pl-[8px] pr-[14px] py-[7px] shadow-[0_14px_30px_rgba(2,6,23,.55)] whitespace-nowrap"
          style={{ left: 600, top: 40 }}
        >
          <img src={img(toast.photo, 34, 34)} alt="" className="w-[34px] h-[34px] rounded-[9px] object-cover" />
          <div>
            <div className="flex items-center gap-[5px] text-[12px] font-bold text-slate-900">
              <ToastIcon className={`w-[13px] h-[13px] ${toast.color}`} />
              {toast.title}
            </div>
            <div className="text-[10px] text-slate-500">{toast.sub}</div>
          </div>
        </div>

        {/* Card: AI agent chat (3 rotating conversations) */}
        <div className="absolute" style={{ left: 56, top: 58, ...par(10) }}>
          <Card className="sc-float" style={{ left: 0, top: 0, width: 256, height: 184 }}>
            <div className="p-[16px]">
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <span className="sc-ring absolute inset-0 rounded-full border-2 border-orange-400" />
                  <img src={img(IMG.robot, 38, 38)} alt="" className="relative w-[38px] h-[38px] rounded-full object-cover ring-2 ring-orange-500" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white leading-none">AI Agent</div>
                  <div className="flex items-center gap-[5px] mt-[5px] text-[11px] text-slate-400">
                    <span className="w-[7px] h-[7px] rounded-full bg-green-500" /> online · replies 24/7
                  </div>
                </div>
              </div>
              <div key={`q-${tick}`} className="sc-in mt-[12px] flex items-end justify-end gap-[6px]">
                <div className="rounded-[12px] rounded-br-[4px] bg-[#1e293b] px-[10px] py-[7px] text-[11px] text-slate-200">{chat.q}</div>
                <img src={img(chat.avatar, 24, 24)} alt="" className="w-[24px] h-[24px] rounded-full object-cover ring-1 ring-slate-600" />
              </div>
              <div className="relative mt-[8px] h-[48px]">
                {chatStage === 1 && (
                  <div className="sc-in sc-dots absolute left-0 top-[6px] flex gap-[4px] rounded-[12px] bg-orange-500/15 border border-orange-500/40 px-[12px] py-[10px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
                    <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
                    <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
                  </div>
                )}
                {chatStage === 2 && (
                  <div className="sc-in absolute inset-0 rounded-[12px] rounded-bl-[4px] bg-orange-500/15 border border-orange-500/40 px-[11px] py-[7px] text-[11px] leading-[16px] text-orange-100">
                    {chat.a[0]}
                    <br />
                    {chat.a[1]}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Card: Automation */}
        <div className="absolute" style={{ left: 56, top: 316, ...par(8) }}>
          <Card className="sc-float-b" style={{ left: 0, top: 0, width: 256, height: 176 }}>
            <div className="p-[16px]">
              <div className="flex justify-between items-center">
                <div className="text-[14px] font-bold text-white">Automation</div>
                <span className="text-[10px] font-mono text-orange-300 tabular-nums">{12 + (tick % 7)} runs today</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-[3px]">New lead → qualified → CRM</div>
              <div className="relative mt-[16px] h-[44px]">
                <div className="absolute left-[20px] right-[20px] top-1/2 h-[2px] bg-gradient-to-r from-[#475569] via-orange-500/70 to-[#475569]" />
                <span className="sc-move absolute top-1/2 -mt-[5px] -ml-[5px] w-[10px] h-[10px] rounded-full bg-orange-300 shadow-[0_0_14px_#fb923c]" />
                <div className="absolute left-0 top-0 w-[44px] h-[44px] rounded-full bg-[#1e293b] border-2 border-[#64748b] flex items-center justify-center text-slate-200">
                  <Mail className="w-[20px] h-[20px]" />
                </div>
                <div className="sc-pulse absolute left-1/2 -translate-x-1/2 top-[-2px] w-[48px] h-[48px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[13px] font-extrabold text-[#0B132B] font-mono">
                  AI
                </div>
                <div className="absolute right-0 top-0 w-[44px] h-[44px] rounded-full bg-[#1e293b] border-2 border-[#64748b] flex items-center justify-center text-slate-200">
                  <Database className="w-[20px] h-[20px]" />
                </div>
              </div>
              <div
                key={`ok-${tick}`}
                className="sc-in mt-[16px] inline-flex items-center gap-[6px] rounded-full bg-green-500/15 border border-green-500/50 px-[10px] py-[4px] text-[11px] text-green-300"
                style={{ animationDelay: '1.8s' }}
              >
                ✓ Human approved
              </div>
            </div>
          </Card>
        </div>

        {/* Card: Monthly sales */}
        <div className="absolute" style={{ left: 888, top: 58, ...par(10) }}>
          <Card className="sc-float-c" style={{ left: 0, top: 0, width: 256, height: 184 }}>
            <div className="p-[16px]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-white">Monthly sales</span>
                <span className="text-[12px] font-bold text-green-400">▲ growing</span>
              </div>
              <div className="mt-[4px] text-[22px] font-extrabold text-white tabular-nums">
                ${sales.toLocaleString('en-US')} <span className="text-[11px] font-semibold text-green-400">+{38 + (tick % 5) * 3}%</span>
              </div>
              <div key={`bars-${tick}`} className="mt-[8px] h-[86px] flex items-end gap-[12px] border-b border-[#334155] px-[4px]">
                {[38, 52, 46, 68, 80, 96].map((h, i) => (
                  <div
                    key={i}
                    className="sc-bar flex-1 rounded-t-[5px] bg-gradient-to-t from-orange-500/40 to-orange-400"
                    style={{ height: `${Math.min(96, h + ((tick + i) % 3) * 4) * 0.85}px`, animationDelay: `${i * 0.09}s` }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Card: Found on Google */}
        <div className="absolute" style={{ left: 888, top: 316, ...par(8) }}>
          <Card className="sc-float" style={{ left: 0, top: 0, width: 256, height: 176 }}>
            <div className="p-[16px]">
              <div className="text-[14px] font-bold text-white">Found on Google</div>
              <div className="mt-[10px] h-[30px] rounded-full bg-[#1e293b] border border-[#334155] flex items-center gap-[8px] px-[12px]">
                <Search className="w-[13px] h-[13px] text-slate-400" />
                <span
                  key={`t-${tick}`}
                  className="sc-type overflow-hidden whitespace-nowrap text-[11px] text-slate-200 border-r border-orange-400 pr-[2px]"
                  style={{ width: 106 }}
                >
                  best store near me
                </span>
              </div>
              <div
                key={`g-${tick}`}
                className="sc-in relative mt-[10px] flex gap-[10px] rounded-[10px] bg-orange-500/10 border border-orange-500/45 p-[8px]"
                style={{ animationDelay: '2.2s' }}
              >
                <img src={img(IMG.store, 48, 48)} alt="" className="w-[48px] h-[48px] rounded-[6px] object-cover" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-orange-300 truncate w-[128px]">Your Business — Official Site</div>
                  <div className="text-[9px] text-green-400 mt-[2px]">www.yourbusiness.com</div>
                  <div className="text-[9px] text-amber-400 mt-[2px]">★★★★★ 4.9 · Open now</div>
                </div>
                <span
                  className="sc-rank absolute -top-[9px] -right-[9px] w-[26px] h-[26px] rounded-full bg-emerald-500 text-[10px] font-extrabold text-white flex items-center justify-center shadow-lg"
                  style={{ animationDelay: '2.7s' }}
                >
                  #1
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
