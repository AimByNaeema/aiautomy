import React, { useEffect, useRef, useState } from 'react';
import { Mail, Database, Search } from 'lucide-react';
import { unsplashUrl } from './StockPhoto';

/**
 * Animated home-page showcase: a live-looking business website on a laptop
 * (real photos), surrounded by an AI agent chatting with a real customer,
 * an automation flow, a growing sales chart and a Google result.
 *
 * Drawn at a fixed 1200x560 "design size" and scaled to the container width,
 * so it looks identical on phones and desktops. All motion is CSS-only and is
 * switched off for visitors who prefer reduced motion.
 */

const W = 1200;
const H = 560;

const IMG = {
  robot: '1684369175833-4b445ad6bfb5',
  customer: '1654762699761-b6d13143bb2e',
  store: '1441986300917-64674bd600d8',
  sneaker: '1561808843-7adeb9606939',
  headphones: '1615375834706-98afda0d534f',
  watch: '1758887952896-8491d393afe2',
};

const img = (id: string, w: number, h: number) => unsplashUrl(id, w * 2, h * 2);

const CSS = `
@keyframes ai-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes ai-dash { to { stroke-dashoffset: -28 } }
@keyframes ai-pop { 0%,8% { opacity:0; transform: translateY(6px) scale(.97) } 14%,100% { opacity:1; transform:none } }
@keyframes ai-pop2 { 0%,30% { opacity:0; transform: translateY(6px) scale(.97) } 38%,100% { opacity:1; transform:none } }
@keyframes ai-typing { 0%,14% { opacity:1 } 15%,100% { opacity:0 } }
@keyframes ai-typing2 { 0%,22% { opacity:0 } 23%,36% { opacity:1 } 37%,100% { opacity:0 } }
@keyframes ai-dot { 0%,100% { opacity:.3 } 50% { opacity:1 } }
@keyframes ai-bar { 0% { transform: scaleY(.15) } 60%,100% { transform: scaleY(1) } }
@keyframes ai-scroll { 0%,18% { transform: translateY(0) } 45%,68% { transform: translateY(-96px) } 95%,100% { transform: translateY(0) } }
@keyframes ai-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,.55) } 60% { box-shadow: 0 0 0 10px rgba(249,115,22,0) } }
@keyframes ai-move { 0% { left: 18% } 50% { left: 50% } 100% { left: 82% } }
@keyframes ai-type { 0%,10% { width: 0 } 45%,100% { width: 106px } }
@keyframes ai-glow { 0%,100% { opacity:.55 } 50% { opacity:.9 } }
@keyframes ai-check { 0%,60% { transform: scale(.6); opacity:0 } 70%,100% { transform: none; opacity:1 } }
.ai-anim .ai-float { animation: ai-float 6s ease-in-out infinite }
.ai-anim .ai-float-b { animation: ai-float 7s ease-in-out -2s infinite }
.ai-anim .ai-float-c { animation: ai-float 6.5s ease-in-out -4s infinite }
.ai-anim .ai-dash { animation: ai-dash 1.2s linear infinite }
.ai-anim .ai-pop { animation: ai-pop 9s ease-out infinite }
.ai-anim .ai-pop2 { animation: ai-pop2 9s ease-out infinite }
.ai-anim .ai-typing { animation: ai-typing 9s linear infinite }
.ai-anim .ai-typing2 { animation: ai-typing2 9s linear infinite }
.ai-anim .ai-dot span { animation: ai-dot 1s ease-in-out infinite }
.ai-anim .ai-dot span:nth-child(2) { animation-delay: .15s }
.ai-anim .ai-dot span:nth-child(3) { animation-delay: .3s }
.ai-anim .ai-bar { transform-origin: bottom; animation: ai-bar 4.5s cubic-bezier(.2,.8,.2,1) infinite alternate }
.ai-anim .ai-scroll { animation: ai-scroll 12s ease-in-out infinite }
.ai-anim .ai-pulse { animation: ai-pulse 2.2s ease-out infinite }
.ai-anim .ai-move { animation: ai-move 3s ease-in-out infinite }
.ai-anim .ai-type { animation: ai-type 7s steps(18) infinite }
.ai-anim .ai-glow { animation: ai-glow 5s ease-in-out infinite }
.ai-anim .ai-check { animation: ai-check 3s ease-out infinite }
@media (prefers-reduced-motion: reduce) { .ai-anim * { animation: none !important } }
`;

const Card: React.FC<{ className?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ className = '', style, children }) => (
  <div
    className={`absolute rounded-[18px] bg-[#0f172a]/95 border-2 border-[#1e293b] shadow-[0_18px_40px_rgba(2,6,23,.7)] ${className}`}
    style={style}
  >
    {children}
  </div>
);

export const HeroIllustration: React.FC<{ className?: string }> = ({ className }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Animated overview: a business website on a laptop, an AI agent answering a customer, an automated lead workflow with human approval, a growing sales chart and a Google search result."
    >
      <style>{CSS}</style>
      <div
        className="ai-anim absolute top-0 left-0 font-sans select-none"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#0f172a] to-[#0B132B]" />
        <div
          className="absolute inset-0 rounded-[28px] opacity-60"
          style={{ backgroundImage: 'radial-gradient(#334155 1.3px, transparent 1.3px)', backgroundSize: '28px 28px' }}
        />
        <div
          className="ai-glow absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[1040px] h-[520px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(249,115,22,.22), rgba(249,115,22,0))' }}
        />

        {/* Connector lines */}
        <svg className="absolute inset-0" width={W} height={H} aria-hidden="true">
          <g stroke="#f97316" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="6 8" fill="none">
            <path className="ai-dash" d="M310 150 C 360 150, 380 190, 420 205" />
            <path className="ai-dash" d="M310 400 C 360 400, 380 360, 420 345" />
            <path className="ai-dash" d="M890 140 C 840 140, 820 185, 780 200" />
            <path className="ai-dash" d="M890 400 C 840 400, 820 360, 780 345" />
          </g>
        </svg>

        {/* Laptop with live website */}
        <div className="absolute" style={{ left: 410, top: 104, width: 380 }}>
          <div className="rounded-[14px] bg-[#1e293b] p-[12px] shadow-[0_24px_50px_rgba(2,6,23,.75)]">
            <div className="relative h-[230px] rounded-[6px] overflow-hidden bg-[#0b1222]">
              {/* browser bar */}
              <div className="absolute top-0 inset-x-0 h-[22px] bg-[#1f2937] flex items-center gap-[6px] px-[10px] z-10">
                <span className="w-[7px] h-[7px] rounded-full bg-red-500/80" />
                <span className="w-[7px] h-[7px] rounded-full bg-amber-500/80" />
                <span className="w-[7px] h-[7px] rounded-full bg-green-500/80" />
                <span className="ml-[10px] h-[12px] px-[8px] rounded-full bg-[#0f172a] text-[8px] leading-[12px] text-slate-400 font-mono">
                  www.yourbusiness.com
                </span>
              </div>
              {/* scrolling page */}
              <div className="ai-scroll absolute inset-x-0 top-[22px]">
                <div className="flex items-center justify-between px-[12px] h-[26px] bg-[#0f172a]">
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[14px] h-[14px] rounded-[4px] bg-orange-500" />
                    <span className="text-[9px] font-bold text-white">Your Store</span>
                  </div>
                  <div className="flex gap-[8px] text-[7px] text-slate-400">
                    <span>Shop</span>
                    <span>About</span>
                    <span className="px-[6px] rounded-full bg-orange-500 text-white">Cart (2)</span>
                  </div>
                </div>
                <div className="relative h-[120px]">
                  <img src={img(IMG.store, 356, 120)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b1222]/90 via-[#0b1222]/50 to-transparent" />
                  <div className="absolute left-[14px] top-[22px] space-y-[5px]">
                    <div className="text-[14px] font-extrabold text-white leading-tight">New Season</div>
                    <div className="text-[14px] font-extrabold text-orange-400 leading-tight">Collection</div>
                    <div className="text-[7px] text-slate-300 w-[120px]">Free delivery on orders this week.</div>
                    <span className="ai-pulse inline-block mt-[4px] px-[9px] py-[3px] rounded-[5px] bg-orange-500 text-[7px] font-bold text-white">
                      Shop now
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-[8px] p-[10px] bg-[#0b1222]">
                  {[
                    [IMG.sneaker, 'Sneakers', '$89'],
                    [IMG.headphones, 'Headphones', '$129'],
                    [IMG.watch, 'Watch', '$149'],
                  ].map(([id, name, price]) => (
                    <div key={name} className="rounded-[6px] bg-[#1e293b] border border-[#334155] overflow-hidden">
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
            </div>
          </div>
          <div className="mx-[-38px] h-[30px] bg-[#334155]" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} />
          <div className="mx-auto -mt-[30px] w-[80px] h-[7px] rounded-b-[4px] bg-[#475569]" />
        </div>

        {/* Card: AI agent chat */}
        <Card className="ai-float" style={{ left: 56, top: 58, width: 256, height: 184 }}>
          <div className="p-[16px]">
            <div className="flex items-center gap-[10px]">
              <img src={img(IMG.robot, 38, 38)} alt="" className="w-[38px] h-[38px] rounded-full object-cover ring-2 ring-orange-500" />
              <div>
                <div className="text-[14px] font-bold text-white leading-none">AI Agent</div>
                <div className="flex items-center gap-[5px] mt-[5px] text-[11px] text-slate-400">
                  <span className="w-[7px] h-[7px] rounded-full bg-green-500" /> online · replies 24/7
                </div>
              </div>
            </div>
            <div className="mt-[12px] flex items-end justify-end gap-[6px]">
              <div className="ai-pop rounded-[12px] bg-[#1e293b] px-[10px] py-[7px] text-[11px] text-slate-200">
                Do you ship to Dubai?
              </div>
              <img src={img(IMG.customer, 24, 24)} alt="" className="w-[24px] h-[24px] rounded-full object-cover" />
            </div>
            <div className="relative mt-[8px] h-[48px]">
              <div className="ai-typing2 ai-dot absolute left-0 top-[6px] flex gap-[4px] rounded-[12px] bg-orange-500/15 border border-orange-500/40 px-[12px] py-[10px]">
                <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
                <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
                <span className="w-[6px] h-[6px] rounded-full bg-orange-300" />
              </div>
              <div className="ai-pop2 absolute inset-0 rounded-[12px] bg-orange-500/15 border border-orange-500/40 px-[11px] py-[7px] text-[11px] leading-[16px] text-orange-100">
                Yes! Delivery takes 3–5 days.
                <br />
                Want me to start your order?
              </div>
            </div>
          </div>
        </Card>

        {/* Card: Automation */}
        <Card className="ai-float-b" style={{ left: 56, top: 316, width: 256, height: 176 }}>
          <div className="p-[16px]">
            <div className="text-[14px] font-bold text-white">Automation</div>
            <div className="text-[11px] text-slate-400 mt-[3px]">New lead → qualified → CRM</div>
            <div className="relative mt-[16px] h-[44px]">
              <div className="absolute left-[20px] right-[20px] top-1/2 h-[2px] bg-[#475569]" />
              <span className="ai-move absolute top-1/2 -mt-[5px] -ml-[5px] w-[10px] h-[10px] rounded-full bg-orange-400 shadow-[0_0_12px_#fb923c]" />
              <div className="absolute left-0 top-0 w-[44px] h-[44px] rounded-full bg-[#1e293b] border-2 border-[#64748b] flex items-center justify-center text-slate-200">
                <Mail className="w-[20px] h-[20px]" />
              </div>
              <div className="ai-pulse absolute left-1/2 -translate-x-1/2 top-[-2px] w-[48px] h-[48px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[13px] font-extrabold text-[#0B132B] font-mono">
                AI
              </div>
              <div className="absolute right-0 top-0 w-[44px] h-[44px] rounded-full bg-[#1e293b] border-2 border-[#64748b] flex items-center justify-center text-slate-200">
                <Database className="w-[20px] h-[20px]" />
              </div>
            </div>
            <div className="mt-[16px] inline-flex items-center gap-[6px] rounded-full bg-green-500/15 border border-green-500/50 px-[10px] py-[4px] text-[11px] text-green-300">
              <span className="ai-check">✓</span> Human approved
            </div>
          </div>
        </Card>

        {/* Card: Monthly sales */}
        <Card className="ai-float-c" style={{ left: 888, top: 58, width: 256, height: 184 }}>
          <div className="p-[16px]">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-bold text-white">Monthly sales</span>
              <span className="text-[12px] font-bold text-green-400">▲ growing</span>
            </div>
            <div className="mt-[4px] text-[22px] font-extrabold text-white">
              $24,860 <span className="text-[11px] font-semibold text-green-400">+38%</span>
            </div>
            <div className="mt-[8px] h-[86px] flex items-end gap-[12px] border-b border-[#334155] px-[4px]">
              {[38, 52, 46, 68, 80, 96].map((h, i) => (
                <div
                  key={i}
                  className="ai-bar flex-1 rounded-t-[5px] bg-gradient-to-t from-orange-500/40 to-orange-400"
                  style={{ height: `${h * 0.85}px`, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Card: Found on Google */}
        <Card className="ai-float" style={{ left: 888, top: 316, width: 256, height: 176 }}>
          <div className="p-[16px]">
            <div className="text-[14px] font-bold text-white">Found on Google</div>
            <div className="mt-[10px] h-[30px] rounded-full bg-[#1e293b] border border-[#334155] flex items-center gap-[8px] px-[12px]">
              <Search className="w-[13px] h-[13px] text-slate-400" />
              <span className="ai-type overflow-hidden whitespace-nowrap text-[11px] text-slate-200 border-r border-orange-400 pr-[2px]" style={{ width: 106 }}>
                best store near me
              </span>
            </div>
            <div className="ai-pop2 mt-[10px] flex gap-[10px] rounded-[10px] bg-orange-500/10 border border-orange-500/45 p-[8px]">
              <img src={img(IMG.store, 48, 48)} alt="" className="w-[48px] h-[48px] rounded-[6px] object-cover" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-orange-300 truncate">Your Business — Official Site</div>
                <div className="text-[9px] text-green-400 mt-[2px]">www.yourbusiness.com</div>
                <div className="text-[9px] text-amber-400 mt-[2px]">★★★★★ 4.9 · Open now</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
