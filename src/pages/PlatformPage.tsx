import React, { useState } from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link } from 'react-router-dom';
import {
  Network,
  Globe,
  Sparkles,
  Search,
  FileEdit,
  Megaphone,
  TrendingUp,
  BarChart3,
  Layout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Zap,
  Lock,
  Workflow,
  Server,
  Database,
  Eye,
  Sliders,
  Check
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CAPABILITIES } from '../data/mockData';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const PlatformPage: React.FC = () => {
  usePageMetadata({
    title: 'Platform Architecture & 9 AI Capabilities',
    description: 'Explore the multi-agent AI architecture of AIAUTOMY. Learn how our 9 specialized agents coordinate research, website building, SEO, listings, marketing, ads, and analytics.',
  });

  const [activeCapabilityId, setActiveCapabilityId] = useState<string>(CAPABILITIES[0].id);
  const activeCapability = CAPABILITIES.find((c) => c.id === activeCapabilityId) || CAPABILITIES[0];

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'FileEdit':
        return <FileEdit className="w-5 h-5" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const architectureLayers = [
    {
      layer: 'Layer 01',
      title: 'Real-Time Commerce Ingestion',
      desc: 'Connects directly with store APIs (Shopify, Amazon SP-API, TikTok Shop, Meta Ads, Google Analytics 4) to ingest catalog catalogs, orders, search query logs, and ad telemetry every 15 minutes.',
      icon: Database,
      tag: 'Read-Only Ingestion',
    },
    {
      layer: 'Layer 02',
      title: 'Autonomous Reasoning & Graph Engine',
      desc: 'The Chief AI Orchestrator breaks complex commercial directives into atomic hypotheses, delegating specialized research, website building, listing analysis, and promotional tasks to 9 domain-specific sub-agents.',
      icon: Cpu,
      tag: 'Multi-Agent Graph',
    },
    {
      layer: 'Layer 03',
      title: 'Human-in-the-Loop Approval Gatekeeper',
      desc: 'Every recommendation (title change, bid adjustment, campaign draft) generates a side-by-side visual diff and projected ROI impact before requiring explicit merchant authorization.',
      icon: Eye,
      tag: 'Zero Silent Changes',
    },
    {
      layer: 'Layer 04',
      title: 'Safe Execution & Attribution Telemetry',
      desc: 'Dispatches approved updates through verified webhook endpoints, tracking post-deployment conversion lifts, keyword ranking movements, and blended ROAS improvements in real time.',
      icon: Server,
      tag: 'Attribution & Audit',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Platform Architecture' }]} />

        {/* Page Hero */}
        <div className="pt-6 pb-12 sm:pb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Commerce Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Multi-Agent AI Platform Built for <span className="text-orange-500">Ecommerce Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Unlike siloed point solutions or generic chat assistants, AIAUTOMY deploys a coordinated graph of 9 specialized agents engineered to analyze catalog data, uncover market whitespace, build high-converting storefronts, and execute profit-maximizing growth actions.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/get-started"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              <span>Launch Platform Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              <span>Explore 9-Stage Pipeline</span>
            </Link>
          </div>
        </div>

        <PageBanner photo="platform" caption="Reliable, secure infrastructure behind every agent and website we ship." />

        {/* 4-Layer System Architecture Diagram */}
        <div className="my-12 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Architectural Topology
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              End-to-End Enterprise Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              A four-tier operational stack ensuring high-throughput data processing, strict enterprise security, and zero unapproved modifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureLayers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-orange-400">
                        {layer.layer}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {layer.tag}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{layer.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{layer.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-900 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active & Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The 9 Specialized Capabilities Deep Dive */}
        <div id="capabilities" className="my-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Core Capabilities Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              9 Synchronized AI Growth Agents
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select any capability below to inspect its operational model, sample prompt workflow, and autonomous output artifact.
            </p>
          </div>

          {/* Capability Grid / Tab Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {CAPABILITIES.map((cap) => {
              const isSelected = cap.id === activeCapabilityId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapabilityId(cap.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-2 ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-500/10 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {getCapabilityIcon(cap.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      Agent 0{cap.number}
                    </span>
                    <span className="text-xs font-bold truncate block">{cap.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Capability Inspector Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Capability Specs */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                    {getCapabilityIcon(activeCapability.icon)}
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                      Agent 0{activeCapability.number} • {activeCapability.category}
                    </div>
                    <h3 className="text-xl font-bold text-white">{activeCapability.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeCapability.fullDesc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Key Performance Benefits
                  </span>
                  <div className="space-y-2">
                    {(activeCapability?.keyBenefits || []).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/solutions"
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5"
                  >
                    <span>View Real Merchant Use Cases</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive Prompt & Output Mockup */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-mono text-slate-400 text-[11px]">Commercial Input Directive</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                      Telemetry Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    "{activeCapability.sampleInput}"
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 border border-orange-500/30 p-4 space-y-3 shadow-lg shadow-orange-500/5">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-orange-400 font-mono text-[11px] font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Synthesized AI Growth Directive</span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Confidence 98.4%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    {activeCapability.aiOutput}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500">
                    <span>Latency: 142ms</span>
                    <span>Tokens: 384</span>
                    <span>Audit Status: Staged for Approval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Ecosystem Matrix */}
        <div className="my-16 p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Connected Commerce Ecosystem
            </div>
            <h2 className="text-2xl font-bold text-white">
              Native Storefront & Ad Channel Connectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              One-click OAuth connection with zero code required. Read-only permissions ensure your store security is maintained.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {[
              { name: 'Shopify Plus', status: 'Verified Native App', rate: 'Real-Time Sync' },
              { name: 'Amazon SP-API', status: 'Certified Partner', rate: '15m Polling' },
              { name: 'WooCommerce', status: 'REST API v3', rate: 'Webhooks' },
              { name: 'Meta Ads Manager', status: 'Marketing API v20', rate: 'Continuous' },
              { name: 'Google Ads & PMax', status: 'Reporting API', rate: 'Hourly' },
              { name: 'TikTok Shop', status: 'Seller Central API', rate: 'Live Stream' },
            ].map((conn, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs font-bold text-white">{conn.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">{conn.status}</div>
                <div className="text-[9px] text-slate-500 font-mono">{conn.rate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/40 border border-orange-500/30 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to deploy your synchronized AI commerce team?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Connect your store in 60 seconds with read-only scopes and get your first AI growth audit instantly.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-started"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="px-5 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              <span>View Pricing Plans</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
