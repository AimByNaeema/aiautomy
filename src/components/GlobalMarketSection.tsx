import React, { useState } from 'react';
import { StockPhoto, type PhotoKey } from './StockPhoto';

const INDUSTRY_PHOTOS: Record<string, PhotoKey> = {
  'restaurants-cafes': 'restaurants',
  'ecommerce-retail': 'ecommerceRetail',
  'real-estate': 'realEstate',
  'customer-support': 'customerSupport',
  'sales-lead-intake': 'sales',
};
import { Link } from 'react-router-dom';
import {
  Utensils,
  ShoppingBag,
  Building,
  Headphones,
  TrendingUp,
  Sliders,
  ArrowRight,
  CheckCircle2,
  Lock,
  Bot,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { INITIAL_AGENT_CATEGORIES } from '../lib/api';

export const GlobalMarketSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('restaurants-cafes');

  const categories = [
    {
      id: 'restaurants-cafes',
      name: 'Restaurants & Cafes',
      icon: Utensils,
      conceptTitle: 'CafeBot & Dining Assistant',
      status: 'In Development',
      badge: 'Concept & Development',
      description:
        'An AI digital employee that answers customer questions, explains menu ingredients and allergens, formats reservation inquiries, and assists floor staff.',
      features: [
        'Instant answers for opening hours, parking, and reservations',
        'Interactive allergen and dietary guidance for menus',
        'Direct inquiry escalation to restaurant managers',
        'Custom web widget or QR code table assistant',
      ],
      link: '/ai-agents',
    },
    {
      id: 'ecommerce-retail',
      name: 'Ecommerce & Retail',
      icon: ShoppingBag,
      conceptTitle: 'E-Commerce Growth Assistant',
      status: 'In Development',
      badge: 'Active System',
      description:
        'Specialized agents that assist storefront shoppers with product fit, generate optimized listing copy, and analyze search keyword opportunities.',
      features: [
        'Pre-purchase product and sizing advice for shoppers',
        'Automated listing title and description optimization',
        'Order status and shipping policy inquiry assistance',
        'Cart abandonment assistance without spammy popups',
      ],
      link: '/ai-agents',
    },
    {
      id: 'real-estate',
      name: 'Real Estate & Property',
      icon: Building,
      conceptTitle: 'Property Concierge Agent',
      status: 'Available for Custom Projects',
      badge: 'Custom Architecture',
      description:
        'Qualifies tenant and buyer inquiries, answers listing specifics, captures criteria, and coordinates viewing appointment requests.',
      features: [
        'Automated screening of buyer budgets and criteria',
        'Listing spec queries (square footage, HOA, school zones)',
        'Viewing appointment scheduling with confirmation alerts',
        'Automated CRM prospect briefing notes for agents',
      ],
      link: '/ai-agents',
    },
    {
      id: 'customer-support',
      name: 'Customer Support & FAQ',
      icon: Headphones,
      conceptTitle: 'Tier-1 Knowledge Support',
      status: 'Available for Custom Projects',
      badge: 'Operational Agent',
      description:
        '24/7 first-line assistance grounded exclusively in your verified knowledge base, warranty terms, and operational procedures.',
      features: [
        'Accurate answers derived strictly from your documents',
        'Seamless human handoff with full conversation summaries',
        'Ticket tagging, prioritization, and categorization',
        'Zero hallucination boundaries for policy inquiries',
      ],
      link: '/ai-agents',
    },
    {
      id: 'sales-lead-intake',
      name: 'Sales & Lead Intake',
      icon: TrendingUp,
      conceptTitle: 'Inbound SDR Agent',
      status: 'Available for Custom Projects',
      badge: 'Growth Agent',
      description:
        'Engages website visitors with interactive discovery questions, scores incoming project fit, and schedules qualified discovery meetings.',
      features: [
        'Conversational requirement gathering on your website',
        'Budget and timeline qualification before team calls',
        'Instant calendar booking for high-fit prospects',
        'Direct submission into your CRM database',
      ],
      link: '/ai-agents',
    },
  ];

  const currentCat = categories.find((c) => c.id === activeCategory) || categories[0];
  const CurrentIcon = currentCat.icon;

  return (
    <section id="ai-agents-industry" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-slate-800 text-left">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider border border-slate-700">
              <Bot className="w-3.5 h-3.5" />
              <span>Industry AI Employees</span>
            </div>
            <h2
              id="ai-agents-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              AI Agents Built for <span className="text-orange-500">Your Specific Industry.</span>
            </h2>
            <p className="text-base text-slate-300">
              Instead of generic chat models, our AI digital employees are engineered with domain-specific knowledge, guardrails, and integrations for your sector.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Supervised Autonomy & Human Approval Controls</span>
          </div>
        </div>

        {/* Industry Selector Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const TabIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2.5 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Detail Grid for Selected Category */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          {/* Left Column: Overview & Badge */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <StockPhoto
                key={currentCat.id}
                photo={INDUSTRY_PHOTOS[currentCat.id] || 'customAi'}
                width={640}
                ratio={16 / 9}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-semibold text-white">{currentCat.name}</span>
            </div>
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-orange-400">
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{currentCat.conceptTitle}</h3>
                      <span className="text-xs text-slate-400 font-mono">Vertical: {currentCat.name}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentCat.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-mono uppercase text-orange-400 font-bold block mb-1">
                    Development Status
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span>{currentCat.status}</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to="/ai-agents"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>Explore AI Agent Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-500 font-mono">SOC2 Aligned Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Capabilities & Execution Safety */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Specialized Agent Capabilities
                  </span>
                  <span className="text-xs text-orange-400 font-mono">Grounded Knowledge</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentCat?.features || []).map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Integration Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-orange-400 uppercase tracking-wider font-mono">
                    Human-in-the-Loop Safeguards
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                    Zero Hallucination Gate
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Agents draft actions and resolve inquiries based on verified documentation. Any sensitive action is escalated to human staff for explicit approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
