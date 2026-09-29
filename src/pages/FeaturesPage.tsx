import React, { useState } from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Search,
  FileEdit,
  Megaphone,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
  Sliders,
  Layers,
  Lock,
  Cpu,
  RefreshCw,
  Terminal,
  Activity,
  Code
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const FeaturesPage: React.FC = () => {
  usePageMetadata({
    title: 'Enterprise Features & Capabilities',
    description: 'Explore the full suite of ecommerce features: whitespace discovery, SEO intent clustering, neuro-linguistic listing rewrites, ROAS diagnostics, and human-in-the-loop governance.',
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'intelligence' | 'conversion' | 'marketing' | 'security'>('all');

  const featureCards = [
    {
      id: 'whitespace-scanner',
      category: 'intelligence',
      categoryLabel: 'Intelligence & Research',
      title: 'Automated Whitespace & Margin Opportunity Scanner',
      desc: 'Cross-references real marketplace demand volume with supplier unit economics to calculate net gross profit margins and competition saturation.',
      icon: Zap,
      tags: ['Gross Margin Modeling', 'Catalog Whitespace', 'Supplier Verification'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-slate-400 text-[10px]">Detected SKU Gap</span>
            <span className="font-mono text-[10px] text-orange-400 font-bold">95/100 Opportunity</span>
          </div>
          <div className="font-semibold text-white">MagSafe Acoustic Felt Partitions</div>
          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
            <div className="bg-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-400 block text-[8px]">Margin</span>
              <span className="text-emerald-400 font-bold">68%</span>
            </div>
            <div className="bg-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-400 block text-[8px]">YoY Trend</span>
              <span className="text-orange-400 font-bold">+114%</span>
            </div>
            <div className="bg-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-400 block text-[8px]">Competition</span>
              <span className="text-slate-300 font-bold">Low</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'seo-clustering',
      category: 'conversion',
      categoryLabel: 'Conversion & SEO',
      title: 'Commercial Intent Keyword Clustering & Ranking Recovery',
      desc: 'Detects decaying keyword positions and aggregates non-branded search terms with high purchase intent into actionable listing updates.',
      icon: Search,
      tags: ['Amazon A9 Optimization', 'Google Search Intent', 'Metadata Injection'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Target Commercial Query</span>
            <span className="text-emerald-400">Difficulty 24/100</span>
          </div>
          <div className="font-bold text-white text-xs">"insulated ceramic travel mug with leak proof handle"</div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Vol: 18,400/mo</span>
            <span className="text-emerald-400 font-mono font-semibold">+38% Projected CTR</span>
          </div>
        </div>
      ),
    },
    {
      id: 'listing-rewrites',
      category: 'conversion',
      categoryLabel: 'Conversion & SEO',
      title: 'Neuro-Linguistic Dual-Algorithm Listing Copywriter',
      desc: 'Generates scannable, high-converting product titles, bullet points, and descriptions designed to satisfy search algorithms while driving human add-to-carts.',
      icon: FileEdit,
      tags: ['A/B Variation Testing', 'Readability Scoring', 'A+ Content Copy'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Optimization Score</span>
            <span className="text-emerald-400 font-bold">96/100 (+48 pts)</span>
          </div>
          <div className="text-[11px] text-slate-300 leading-snug bg-slate-900/80 p-2 rounded border border-slate-800">
            "Double-Wall Vacuum Insulated Travel Mug — 12-Hour Thermal Ceramic Interior with Ergonomic Grip"
          </div>
          <div className="text-[9px] text-slate-500 font-mono flex items-center justify-between">
            <span>5 Benefits Indexed</span>
            <span>Mobile-First Formatted</span>
          </div>
        </div>
      ),
    },
    {
      id: 'marketing-playbooks',
      category: 'marketing',
      categoryLabel: 'Marketing & Ads',
      title: 'Dynamic Omnichannel Promotional Playbook Engine',
      desc: 'Translates store customer cohorts, AOV distributions, and seasonal peaks into full-funnel email, SMS, and ad promotional playbooks.',
      icon: Megaphone,
      tags: ['Lapsed Buyer Sequences', 'VIP Tier Unlocks', 'Automated Promo Cadence'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">14-Day VIP Campaign</span>
            <span className="text-orange-400 font-bold">4.8x ROAS Target</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Cadence: 3-Stage Progressive Tier Incentive with Dynamic SKU Upsells.
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Projected Revenue: +$24,500</span>
          </div>
        </div>
      ),
    },
    {
      id: 'ad-hooks',
      category: 'marketing',
      categoryLabel: 'Marketing & Ads',
      title: 'Creative Hook Formulation & Ad Fatigue Diagnostics',
      desc: 'Builds viral 3-second short-form UGC video hooks and multi-variant copy for TikTok, Meta Advantage+, and Google PMax.',
      icon: Sparkles,
      tags: ['UGC Hook Formulas', 'Diminishing Returns Alert', 'Angle Diversification'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="text-[10px] font-mono text-orange-400 font-bold">TikTok Problem-Solution Hook</div>
          <p className="text-[11px] text-slate-200 font-mono bg-slate-900 p-2 rounded">
            "POV: Your desk was a mess until you found this magnetic felt partition."
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Hook Rate: 62%</span>
            <span className="text-emerald-400 font-mono">Target CPA $18.50</span>
          </div>
        </div>
      ),
    },
    {
      id: 'human-governance',
      category: 'security',
      categoryLabel: 'Governance & Infrastructure',
      title: 'Human-in-the-Loop Visual Diff Approval Sandbox',
      desc: 'Ensures zero autonomous modifications occur on live storefronts without explicit merchant review and cryptographic authorization.',
      icon: ShieldCheck,
      tags: ['Visual Side-by-Side Diff', 'One-Click Rollback', 'Granular Role Permissions'],
      uiHighlight: (
        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-emerald-400 font-bold">Approval Gate Status</span>
            <span className="text-slate-400">Awaiting Merchant Signoff</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Staged 12 SKU title rewrites with simulated +14% CTR lift preview.
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Zero Silent Store Changes Guaranteed</span>
          </div>
        </div>
      ),
    },
  ];

  const filteredFeatures = activeCategory === 'all'
    ? featureCards
    : featureCards.filter(f => f.category === activeCategory);

  const comparisonRows = [
    {
      feature: 'Multi-Agent Autonomous Coordination',
      eg: true,
      pointTools: false,
      chatbots: false,
      agencies: 'Manual & Slow',
    },
    {
      feature: 'Real-Time Store API Synchronization',
      eg: true,
      pointTools: 'Partial',
      chatbots: false,
      agencies: 'Weekly Syncs',
    },
    {
      feature: 'Human-in-the-Loop Visual Diff Approval',
      eg: true,
      pointTools: false,
      chatbots: false,
      agencies: 'Email Chains',
    },
    {
      feature: 'Zero Public LLM Training on Store Data',
      eg: true,
      pointTools: 'Varies',
      chatbots: false,
      agencies: 'N/A',
    },
    {
      feature: 'Continuous Whitespace & Margin Radar',
      eg: true,
      pointTools: 'Static Lists',
      chatbots: false,
      agencies: 'Ad-hoc Reports',
    },
    {
      feature: 'Cross-Border Market Intelligence',
      eg: true,
      pointTools: 'US-Only',
      chatbots: 'Generic',
      agencies: 'High Consulting Fees',
    },
    {
      feature: 'Estimated Monthly Cost',
      eg: '$79 – $499/mo',
      pointTools: '$300–$800/mo (Stack)',
      chatbots: '$20/mo (Manual)',
      agencies: '$5,000–$15,000/mo',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Features' }]} />

        {/* Page Hero */}
        <div className="pt-6 pb-12 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Sliders className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-orange-500">Autonomous Commerce</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            A comprehensive overview of the specialized features that make AIAUTOMY the highest-ROI intelligence layer for modern brands.
          </p>
        </div>

        <PageBanner photo="features" caption="Clear dashboards and insights so you always know what is working." />

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap my-6">
          {[
            { id: 'all', label: 'All Features' },
            { id: 'intelligence', label: 'Intelligence & Research' },
            { id: 'conversion', label: 'Conversion & SEO' },
            { id: 'marketing', label: 'Marketing & Ads' },
            { id: 'security', label: 'Governance & Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {filteredFeatures.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-orange-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {card.categoryLabel}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white leading-snug">{card.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>

                  {/* UI Preview Box */}
                  <div className="pt-2">
                    {card.uiHighlight}
                  </div>
                </div>

                {/* Tags Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {(card.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="my-16 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
              Competitive Benchmark
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Brands Choose AIAUTOMY
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              See how our synchronized multi-agent system compares against fragmented legacy alternatives.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Core Capability</th>
                  <th className="py-3 px-4 text-orange-400 font-bold bg-orange-500/10 rounded-t-lg">
                    AIAUTOMY
                  </th>
                  <th className="py-3 px-4">Point SEO/Ad Tools</th>
                  <th className="py-3 px-4">Generic AI Chatbots</th>
                  <th className="py-3 px-4">Agency Retainers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 bg-orange-500/5 font-bold text-white">
                      {typeof row.eg === 'boolean' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-orange-400 font-mono">{row.eg}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {typeof row.pointTools === 'boolean' ? (
                        row.pointTools ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />
                      ) : (
                        <span>{row.pointTools}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {typeof row.chatbots === 'boolean' ? (
                        row.chatbots ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />
                      ) : (
                        <span>{row.chatbots}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {row.agencies}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-orange-950/30 border border-orange-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Experience All Features with Zero Risk</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Test full platform capabilities for 14 days with read-only scopes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/get-started"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-sm text-white shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              <span>Start 14-Day Free Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="px-5 py-3 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white"
            >
              <span>Explore Plans</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
