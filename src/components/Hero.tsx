import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Bot,
  Layout,
  Globe,
  Layers,
  ChevronRight,
  Activity,
  CheckCircle2,
  Users,
  TrendingUp,
  Cpu,
  BarChart3,
  MessageSquare,
  Lock
} from 'lucide-react';

interface HeroProps {
  onStartProject?: () => void;
  onExploreWeb?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWeb,
}) => {
  const [activeWorkspaceNode, setActiveWorkspaceNode] = useState<
    'agent' | 'website' | 'automation' | 'support' | 'sales' | 'analytics'
  >('agent');

  const workspaceNodes = [
    {
      id: 'agent' as const,
      label: 'AI Agent',
      icon: Bot,
      role: 'Autonomous Reasoning & Task Orchestration',
      status: 'Active Engine',
      description: 'Coordinates specialized sub-tasks, processes customer inquiries, and prepares actionable summaries.',
      badge: 'Reasoning Engine',
    },
    {
      id: 'website' as const,
      label: 'Website',
      icon: Layout,
      role: 'High-Performance Client Surface',
      status: 'Sub-second Load',
      description: 'Fast, responsive, conversion-focused interface engineered for maximum brand trust and SEO discoverability.',
      badge: 'Public Surface',
    },
    {
      id: 'automation' as const,
      label: 'Automation',
      icon: Zap,
      role: 'Multi-Step Workflow Pipelines',
      status: 'Human Approved',
      description: 'Connects forms, databases, notification webhooks, and internal tools with clear approval checkpoints.',
      badge: 'Workflow Pipeline',
    },
    {
      id: 'support' as const,
      label: 'Customer Support',
      icon: MessageSquare,
      role: '24/7 Inquiry & Menu Assistance',
      status: 'Context Aware',
      description: 'Provides instant, accurate responses based on your business knowledge base and policies.',
      badge: 'Support Module',
    },
    {
      id: 'sales' as const,
      label: 'Sales',
      icon: TrendingUp,
      role: 'Lead Qualification & Follow-ups',
      status: 'Opportunity Radar',
      description: 'Evaluates prospect requirements, scores incoming project leads, and prepares preliminary scopes.',
      badge: 'Growth Engine',
    },
    {
      id: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
      role: 'Operational & Search Telemetry',
      status: 'Structured Logs',
      description: 'Aggregates interaction volume, conversion metrics, and system performance without third-party tracking.',
      badge: 'Metrics System',
    },
  ];

  // Auto-cycle through the workspace modules until the visitor interacts.
  const [autoPlay, setAutoPlay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [activityIdx, setActivityIdx] = useState(0);
  const CYCLE_MS = 4000;

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!autoPlay || paused || reduce) return;
    const id = window.setInterval(() => {
      setActiveWorkspaceNode((cur) => {
        const i = workspaceNodes.findIndex((n) => n.id === cur);
        return workspaceNodes[(i + 1) % workspaceNodes.length].id;
      });
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoPlay, paused]);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setActivityIdx((i) => i + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  const activity = [
    { text: 'Lead qualified and sent to CRM', tone: 'text-emerald-400' },
    { text: 'Customer question answered in 2s', tone: 'text-orange-400' },
    { text: 'Order #1042 confirmed', tone: 'text-sky-400' },
    { text: 'Draft reply waiting for your approval', tone: 'text-amber-400' },
    { text: 'Website speed check passed', tone: 'text-emerald-400' },
  ];
  const currentActivity = activity[activityIdx % activity.length];

  const activeNodeData = workspaceNodes.find((n) => n.id === activeWorkspaceNode) || workspaceNodes[0];
  const ActiveIcon = activeNodeData.icon;

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-950 text-white overflow-hidden border-b border-slate-800/80"
    >
      <style>{`
        @keyframes hero-up { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
        @keyframes hero-shimmer { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes hero-orb-a { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(60px,40px) scale(1.15) } }
        @keyframes hero-orb-b { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-50px,-30px) scale(1.1) } }
        @keyframes hero-shine { 0%,60% { transform: translateX(-120%) skewX(-20deg) } 100% { transform: translateX(320%) skewX(-20deg) } }
        @keyframes hero-border { to { transform: rotate(360deg) } }
        @keyframes hero-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes hero-fade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        @keyframes hero-rise { 0% { transform: translateY(0); opacity: 0 } 10% { opacity: .8 } 100% { transform: translateY(-420px); opacity: 0 } }
        .hero-up { opacity: 0; animation: hero-up .8s cubic-bezier(.2,.8,.2,1) forwards }
        .hero-shimmer { background: linear-gradient(90deg, #f97316, #fdba74, #f97316, #ea580c, #f97316); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: hero-shimmer 4s linear infinite }
        .hero-orb-a { animation: hero-orb-a 14s ease-in-out infinite }
        .hero-orb-b { animation: hero-orb-b 17s ease-in-out infinite }
        .hero-shine::after { content: ''; position: absolute; inset: 0; width: 40%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); animation: hero-shine 3.5s ease-in-out infinite }
        .hero-border-spin { animation: hero-border 6s linear infinite }
        .hero-progress { transform-origin: left; animation: hero-progress linear forwards }
        .hero-fade { animation: hero-fade .45s ease-out both }
        .hero-rise { animation: hero-rise linear infinite }
        @media (prefers-reduced-motion: reduce) {
          .hero-up, .hero-shimmer, .hero-orb-a, .hero-orb-b, .hero-shine::after, .hero-border-spin, .hero-progress, .hero-fade, .hero-rise { animation: none !important; opacity: 1 !important }
        }
      `}</style>

      {/* Animated colour orbs + rising sparks */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-orange-500/20 blur-[120px] hero-orb-a" />
      <div className="pointer-events-none absolute top-20 -right-40 w-[560px] h-[560px] rounded-full bg-blue-600/15 blur-[130px] hero-orb-b" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="hero-rise absolute bottom-0 w-1 h-1 rounded-full bg-orange-400/70"
            style={{ left: `${(i * 37) % 100}%`, animationDuration: `${9 + (i % 5) * 2}s`, animationDelay: `${-i * 1.3}s` }}
          />
        ))}
      </div>

      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Identity & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="hero-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300" style={{ animationDelay: '.05s' }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-orange-400 font-bold uppercase tracking-wider">AIAUTOMY</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Custom Engineering</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12] font-sans"
            >
              <span className="hero-up inline-block" style={{ animationDelay: '.15s' }}>AI Digital Employees</span>{' '}
              <span className="hero-up inline-block" style={{ animationDelay: '.3s' }}>& Websites Built for</span>{' '}
              <span className="hero-up inline-block" style={{ animationDelay: '.45s' }}><span className="hero-shimmer">Modern Businesses.</span></span>
            </h1>

            {/* Supporting Copy */}
            <p
              id="hero-supporting-text"
              style={{ animationDelay: '.6s' }}
              className="hero-up text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              From AI agents that support daily business operations to high-performance websites and custom systems, we build digital solutions around how your business works.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-up pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5" style={{ animationDelay: '.75s' }}>
              <Link
                id="btn-hero-primary-cta"
                to="/ai-agents"
                className="group hero-shine relative overflow-hidden px-7 py-3.5 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <span>Build Your AI Agent</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                id="btn-hero-secondary-cta"
                to="/web-development"
                className="px-6 py-3.5 text-base font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <span>Explore Web Development</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Trust & Human Control Indicators */}
            <div className="hero-up pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80" style={{ animationDelay: '.9s' }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-300">Custom solutions scoped to your needs.</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Human Approval Controls
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" /> Secure Data Architecture
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Digital Workspace Visual */}
          <div className="lg:col-span-6 hero-up" style={{ animationDelay: '.4s' }}>
            <div
              className="relative rounded-2xl p-[1.5px] overflow-hidden shadow-2xl shadow-orange-500/10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className="hero-border-spin pointer-events-none absolute -inset-[60%]"
                style={{ background: 'conic-gradient(from 0deg, transparent 0 55%, rgba(249,115,22,.9) 70%, rgba(253,186,116,.9) 75%, transparent 85%)' }}
              />
            <div
              id="hero-workspace-container"
              className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-950/70 p-4 sm:p-6 text-left backdrop-blur-sm"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">aiautomy.com/workspace</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                  <span className="hidden sm:inline text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Coordinated Workspace
                  </span>
                </div>
              </div>

              {/* Node Selector Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 py-4 border-b border-slate-800/80">
                {workspaceNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isSelected = activeWorkspaceNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        setAutoPlay(false);
                        setActiveWorkspaceNode(node.id);
                      }}
                      className={`relative overflow-hidden p-2.5 rounded-lg flex flex-col items-center gap-1.5 transition-all duration-300 text-center cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500/15 border border-orange-500/40 text-orange-400 shadow-sm shadow-orange-500/20 -translate-y-0.5'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      <NodeIcon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-semibold tracking-tight truncate w-full">{node.label}</span>
                      {isSelected && autoPlay && (
                        <span
                          key={`${node.id}-${paused}`}
                          className="hero-progress absolute bottom-0 left-0 h-0.5 w-full bg-orange-400"
                          style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Workspace Module Card */}
              <div key={activeWorkspaceNode} className="hero-fade py-4 space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-orange-400 shadow-inner">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{activeNodeData.label}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {activeNodeData.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{activeNodeData.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {activeNodeData.status}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 min-h-[68px] rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {activeNodeData.description}
                </div>

                {/* Coordinated Integration Flow Visualization */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">Control Model</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">Supervised Approval</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">Deployment</span>
                    <span className="font-semibold text-slate-200 mt-0.5 block">Custom Tailored</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] font-mono uppercase">Integration</span>
                    <span className="font-semibold text-orange-400 mt-0.5 block">Modular APIs</span>
                  </div>
                </div>
              </div>

              {/* Live activity ticker */}
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-950/70 border border-slate-800 px-3 py-2 text-[11px] overflow-hidden">
                <span className="font-mono text-[10px] uppercase text-slate-500 shrink-0">Activity</span>
                <span key={activityIdx} className={`hero-fade truncate font-medium ${currentActivity.tone}`}>
                  ● {currentActivity.text}
                </span>
                <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-500">just now</span>
              </div>

              {/* Bottom Quick Status Strip */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Private Database & Credentials Protection</span>
                </div>
                <Link
                  to="/solutions"
                  className="text-orange-400 hover:text-orange-300 font-medium hover:underline flex items-center gap-1"
                >
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

