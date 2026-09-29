import React, { useState } from 'react';
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

  const activeNodeData = workspaceNodes.find((n) => n.id === activeWorkspaceNode) || workspaceNodes[0];
  const ActiveIcon = activeNodeData.icon;

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-950 text-white overflow-hidden border-b border-slate-800/80"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Identity & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300">
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
              AI Digital Employees & Websites Built for <span className="text-orange-500">Modern Businesses.</span>
            </h1>

            {/* Supporting Copy */}
            <p
              id="hero-supporting-text"
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              From AI agents that support daily business operations to high-performance websites and custom systems, we build digital solutions around how your business works.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                id="btn-hero-primary-cta"
                to="/ai-agents"
                className="px-7 py-3.5 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <span>Build Your AI Agent</span>
                <ArrowRight className="w-4 h-4" />
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
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
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
          <div className="lg:col-span-6">
            <div
              id="hero-workspace-container"
              className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-slate-950/70 p-4 sm:p-6 text-left backdrop-blur-sm"
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
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
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
                      onClick={() => setActiveWorkspaceNode(node.id)}
                      className={`p-2.5 rounded-lg flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500/15 border border-orange-500/40 text-orange-400 shadow-sm'
                          : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      <NodeIcon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-semibold tracking-tight truncate w-full">{node.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Workspace Module Card */}
              <div className="py-4 space-y-3.5 animate-in fade-in duration-150">
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

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
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
    </section>
  );
};

