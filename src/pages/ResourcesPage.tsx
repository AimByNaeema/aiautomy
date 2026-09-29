import React, { useState } from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Zap,
  Globe,
  FileEdit,
  Megaphone,
  TrendingUp,
  BarChart3,
  Cpu,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const ResourcesPage: React.FC = () => {
  usePageMetadata({
    title: 'Ecommerce Growth Resources & AI Guides Hub',
    description: 'Access playbooks, whitepapers, and step-by-step guides for Ecommerce Growth, Product Research, SEO, Omnichannel Marketing, Advertising, and AI implementation.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'growth', label: 'Ecommerce Growth', icon: TrendingUp },
    { id: 'research', label: 'Product Research', icon: Zap },
    { id: 'seo', label: 'SEO & Search', icon: Search },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'advertising', label: 'Advertising', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-guides', label: 'AI Guides', icon: Cpu },
  ];

  const resourceArticles = [
    {
      id: 'res-1',
      category: 'growth',
      categoryLabel: 'Ecommerce Growth',
      title: 'The 2026 DTC Profit Playbook: Scaling Gross Margins Without Inflated Ad Spend',
      readTime: '6 min read',
      type: 'Executive Guide',
      summary: 'Learn how modern 8-figure brands are structuring product bundles, reducing return defection rates, and leveraging automated whitespace scanning to scale profitability.',
      takeaways: [
        'Shift focus from top-line GMV to contribution margin per SKU',
        'Identify and eliminate the 3 silent catalog margin leaks',
        'Implement post-purchase dynamic bundle upsells for +12% AOV lift'
      ],
      fullContent: `To achieve compounding profitability in today's high-CAC environment, ecommerce brands must shift from raw top-line acquisition to granular contribution margin expansion. By continuously cross-referencing order return logs with customer sentiment and landed manufacturing costs, operators can isolate underperforming SKUs and double down on high-velocity catalog whitespace.`
    },
    {
      id: 'res-2',
      category: 'research',
      categoryLabel: 'Product Research',
      title: 'Catalog Whitespace Discovery: Finding High-Margin SKUs Before Saturation',
      readTime: '8 min read',
      type: 'Strategy Blueprint',
      summary: 'A step-by-step framework for parsing competitor reviews, calculating price elasticity curves, and verifying supplier landed costs to launch winning SKUs.',
      takeaways: [
        'How to extract recurring product defect patterns from competitor 1-star reviews',
        'Mathematical formulas for computing true landed margin feasibility',
        'Validating initial test orders of 250–500 units with low risk'
      ],
      fullContent: `Traditional product research relying on Amazon bestseller lists results in copycat saturation. True catalog whitespace exists in unmet customer feature requests—such as ergonomic sizing or cable management—that incumbents fail to address. Automated AI sentiment parsing turns 10,000 negative competitor reviews into a precise product specification in minutes.`
    },
    {
      id: 'res-3',
      category: 'seo',
      categoryLabel: 'SEO & Search',
      title: 'Amazon A9 & Shopify Search: Modern Keyword Clustering Strategies',
      readTime: '5 min read',
      type: 'Technical Guide',
      summary: 'How non-branded commercial search queries drive 65% of organic checkout conversions and how to structure titles and backend terms for dual algorithms.',
      takeaways: [
        'Targeting search intent over generic high-volume head keywords',
        'Balancing readability indexes with algorithmic keyword density',
        'Preventing index decay when updating seasonal product metadata'
      ],
      fullContent: `Modern search algorithms penalize keyword stuffing while rewarding high organic conversion velocity. By structuring product listings with mobile-first bullet points and non-branded commercial intent queries, merchants can recapture lost category rankings and lift organic click-through rates by up to 38%.`
    },
    {
      id: 'res-4',
      category: 'marketing',
      categoryLabel: 'Marketing',
      title: 'The 14-Day VIP Lapsed Buyer Reactivation Sequence',
      readTime: '7 min read',
      type: 'Email & SMS Playbook',
      summary: 'A complete copy and cadence blueprint for winning back 60-90 day inactive customers without deep discounting that erodes brand equity.',
      takeaways: [
        'The 3-stage progressive psychological incentive schedule',
        'Dynamic SKU pairing based on the customer’s first-order category',
        'Achieving 4.8x blended ROAS from zero ad spend'
      ],
      fullContent: `Winning back lapsed customers is 5x cheaper than acquiring new cold traffic. By segmenting customers by purchase recency and dynamically offering complementary vault access rather than generic 10% coupon codes, brands protect their margin while generating predictable cash flow.`
    },
    {
      id: 'res-5',
      category: 'advertising',
      categoryLabel: 'Advertising',
      title: 'Combatting Ad Creative Fatigue on Meta & TikTok: The 3-Sec Hook Formula',
      readTime: '6 min read',
      type: 'Creative Framework',
      summary: 'How to build high-retention problem-solution angles, UGC video hooks, and B-roll scripts to sustain sub-$20 customer acquisition costs.',
      takeaways: [
        'The 4 core visual hook categories: Problem-First, Curiosity, Contrast, and Proof',
        'Testing 15 creative variants without multiplying production budgets',
        'Detecting diminishing ROAS returns before burning campaign spend'
      ],
      fullContent: `On short-form video platforms, the first 3 seconds dictate 80% of ad performance. Extracting real customer phrasing from product reviews allows marketers to formulate authentic video hooks that stop thumb-scrolling and lower blended CPA by 22%.`
    },
    {
      id: 'res-6',
      category: 'analytics',
      categoryLabel: 'Analytics',
      title: 'Unified Commerce Telemetry: Diagnosing Real Root Causes from Storefront Data',
      readTime: '5 min read',
      type: 'Diagnostics Guide',
      summary: 'Moving beyond confusing dashboards to plain-English operational directives that project exact dollar impacts for every proposed change.',
      takeaways: [
        'Connecting order velocity with inventory stockout risks',
        'How attribution modeling isolates real listing conversion lift',
        'Setting up 15-minute diagnostic polling loops'
      ],
      fullContent: `Raw data is useless without prioritized operational directives. Unified commerce telemetry consolidates orders, inventory turns, and ad spend into clear recommendations ranked by net dollar impact so teams always know the single highest-leverage task to execute.`
    },
    {
      id: 'res-7',
      category: 'ai-guides',
      categoryLabel: 'AI Guides',
      title: 'Enterprise AI Governance: Implementing Human-in-the-Loop Safeguards',
      readTime: '9 min read',
      type: 'Security Whitepaper',
      summary: 'Best practices for deploying autonomous AI agents in mission-critical ecommerce operations with read-only scopes and cryptographic approval gates.',
      takeaways: [
        'Why autonomous write permissions without approval create brand liability',
        'Side-by-side visual diff inspection protocols',
        'Ensuring store catalog and sales data is never used in public LLM training'
      ],
      fullContent: `Autonomous AI creates massive operational efficiency, but store brand equity requires strict human oversight. Implementing immutable audit logs, read-only API connectors, and explicit visual diff approval ensures zero unauthorized modifications ever reach live customer storefronts.`
    },
    {
      id: 'res-8',
      category: 'ai-guides',
      categoryLabel: 'AI Guides',
      title: 'Multi-Agent Architecture for Commerce: How 8 Specialized Agents Synchronize',
      readTime: '7 min read',
      type: 'Architecture Overview',
      summary: 'An architectural deep dive into agent graph coordination, sub-task delegation, prompt caching, and cost efficiency in production ecommerce pipelines.',
      takeaways: [
        'Chief Orchestrator role in atomic task breakdown',
        'Achieving 92% token cost reduction through domain prompt caching',
        'Sub-150ms reasoning latency in production'
      ],
      fullContent: `Single monolithic LLMs struggle with the breadth of modern ecommerce operations. A multi-agent graph—where specialized agents handle discrete domains like SEO, market research, and ad diagnostics—yields higher accuracy, lower hallucination rates, and superior commercial outcomes.`
    },
  ];

  const filteredArticles = resourceArticles.filter((art) => {
    const matchesCat = catParam === 'all' || art.category === catParam;
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Resources Hub' }]} />

        {/* Page Hero */}
        <div className="pt-6 pb-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ecommerce Intelligence Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Playbooks, Guides & <span className="text-orange-500">Frameworks</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Actionable strategies and architectural deep dives across product research, SEO, marketing, advertising, and enterprise AI governance.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search playbooks, guides, SEO tips, or ad formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <PageBanner photo="resources" caption="Guides and playbooks to help you grow with AI and ecommerce." />

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 my-6">
          {categories.map((cat) => {
            const isSelected = catParam === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {art.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug hover:text-orange-400 transition-colors cursor-pointer" onClick={() => setSelectedArticle(art)}>
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {art.summary}
                </p>

                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                    Core Actionable Takeaways
                  </span>
                  {(art.takeaways || []).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">{art.type}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 my-8 space-y-2">
            <p className="text-sm font-semibold text-slate-300">No resources found matching your query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({ category: 'all' });
              }}
              className="text-xs text-orange-400 underline font-mono"
            >
              Reset search and filters
            </button>
          </div>
        )}

        {/* Free Strategic Frameworks & Calculators Callout */}
        <div className="my-16 p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
                Interactive Growth Utilities
              </span>
              <h2 className="text-2xl font-bold text-white">
                Built-in ROI Calculators & Audit Blueprints
              </h2>
            </div>
            <Link
              to="/get-started"
              className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white transition-colors shrink-0"
            >
              Audit My Store Live
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">AOV Lift Framework</span>
              <p className="text-xs text-slate-400">Step-by-step mathematical model for creating dynamic bundle tiers and cross-sell rules without degrading margin.</p>
              <span className="text-[10px] font-mono text-emerald-400 block">+14% Average Lift</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">Ad Fatigue Diagnostic Matrix</span>
              <p className="text-xs text-slate-400">Formula for calculating creative diminishing return thresholds on Meta DPA and TikTok short-form campaigns.</p>
              <span className="text-[10px] font-mono text-orange-400 block">-22% Target CPA</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">Gross Margin Sensitivity Model</span>
              <p className="text-xs text-slate-400">Excel & AI template for factoring tariff fluctuations, supplier lead times, and shipping fee elasticity.</p>
              <span className="text-[10px] font-mono text-emerald-400 block">Instant Verification</span>
            </div>
          </div>
        </div>

        {/* Article Reader Modal / Drawer */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-left space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 text-white max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2 pr-8">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                  {selectedArticle.categoryLabel} • {selectedArticle.readTime}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedArticle.title}</h3>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Key Action Takeaways
                </span>
                {(selectedArticle?.takeaways || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                <p>{selectedArticle.fullContent}</p>
                <p>
                  Deploying autonomous AI capabilities directly to your catalog eliminates weeks of manual operational overhead while protecting store equity through explicit human approval signoffs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                >
                  Close Guide
                </button>
                <Link
                  to="/get-started"
                  className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 shadow-md"
                >
                  <span>Apply with AI Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
