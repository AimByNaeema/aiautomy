import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Sparkles,
  MessageSquare,
  Users,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Utensils,
  ShoppingBag,
  Building,
  Headphones,
  Briefcase,
  Sliders,
  Database,
  Eye,
  Check
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const AiAgentsPage: React.FC = () => {
  usePageMetadata({
    title: 'Custom AI Agents & Digital Employees | AIAUTOMY',
    description: 'Specialized AI digital employees designed around your business workflows, customers, and operational goals. Custom built with human approval controls.',
  });

  const [selectedIndustry, setSelectedIndustry] = useState<string>('restaurants');

  const industries = [
    {
      id: 'restaurants',
      title: 'Restaurants & Cafes',
      icon: Utensils,
      conceptName: 'CafeBot & Dining AI',
      status: 'In Development',
      badge: 'Concept & Development',
      overview:
        'An AI assistant designed to support cafes, bistros, and restaurants with customer enquiries, digital menu explanations, reservation inquiries, dietary guidance, and service operations.',
      capabilities: [
        'Instant answers for operating hours, location, and parking',
        'Ingredient and allergen guidance for dynamic menus',
        'Reservation request formatting and desk team alerts',
        'Catering and event booking intake routing',
      ],
      deliverable: 'Custom embedded web widget, WhatsApp/SMS webhook, or tablet assistant interface.',
    },
    {
      id: 'ecommerce',
      title: 'Ecommerce & Retail',
      icon: ShoppingBag,
      conceptName: 'E-Commerce Growth Agent',
      status: 'In Development',
      badge: 'Active System',
      overview:
        'Intelligent digital employees that analyze customer search behavior, optimize product descriptions, assist buyers with sizing/fit guidance, and surface revenue opportunities across storefronts like Shopify, Etsy, Amazon, and eBay.',
      capabilities: [
        'Real-time product recommendation based on buyer intent',
        'SEO keyword recovery & dynamic listing copy enhancements',
        'Pre-purchase inquiry resolution (shipping, return policies)',
        'Cart abandonment assistance and proactive messaging',
      ],
      deliverable: 'Storefront embedded assistant + Headless API integration + Admin scoring dashboard.',
    },
    {
      id: 'realestate',
      title: 'Real Estate & Property',
      icon: Building,
      conceptName: 'Property Concierge Agent',
      status: 'Available for Custom Projects',
      badge: 'Custom Architecture',
      overview:
        'AI agents tailored for property agencies and managers to qualify tenant inquiries, answer listing specifics, schedule viewing appointments, and capture buyer criteria.',
      capabilities: [
        'Automated screening of buyer and tenant budgets and preferences',
        'Listing spec inquiries (floor plans, HOA, school districts)',
        'Viewing calendar synchronization and confirmation reminders',
        'Landlord and property manager request escalation',
      ],
      deliverable: 'Integrated lead portal + Multi-channel messaging + CRM synchronization.',
    },
    {
      id: 'support',
      title: 'Customer Support & FAQ',
      icon: Headphones,
      conceptName: 'Tier-1 Support Specialist',
      status: 'Available for Custom Projects',
      badge: 'Operational Agent',
      overview:
        '24/7 front-line digital employee trained specifically on your company documentation, past tickets, warranty terms, and service procedures.',
      capabilities: [
        'Accurate answers derived strictly from your knowledge base',
        'Seamless human handoff with full conversation summaries',
        'Ticket categorization, tagging, and priority routing',
        'Multi-lingual customer support without machine translation artifacts',
      ],
      deliverable: 'Custom floating chat widget + Internal Slack/Discord/Email integration.',
    },
    {
      id: 'sales',
      title: 'Sales & Lead Intake',
      icon: TrendingUp,
      conceptName: 'Inbound SDR Agent',
      status: 'Available for Custom Projects',
      badge: 'Growth Agent',
      overview:
        'Engages website visitors, asks structured discovery questions, scores fit according to your criteria, and books qualified meetings directly to your team.',
      capabilities: [
        'Interactive visitor discovery and requirement gathering',
        'Budget and timeline qualification before sales team time is spent',
        'Instant calendar booking for high-value prospects',
        'Automated briefing notes prepared for sales executives',
      ],
      deliverable: 'Website conversational intake + Calendar integration + Webhook triggers.',
    },
    {
      id: 'custom',
      title: 'Custom Business Agents',
      icon: Sliders,
      conceptName: 'Bespoke Enterprise Agent',
      status: 'Available for Custom Projects',
      badge: 'Tailored Solution',
      overview:
        'Built from the ground up to automate your proprietary business processes, internal SOPs, spreadsheet synchronization, or specialized industry workflows.',
      capabilities: [
        'Designed around your specific internal tools and databases',
        'Role-based permissions and strict boundary guidelines',
        'Audit logs for every reasoning step and data transformation',
        'Human approval required for any external or write action',
      ],
      deliverable: 'Custom full-stack deployment with dedicated PostgreSQL database and monitoring.',
    },
  ];

  const activeIndustryData = industries.find((i) => i.id === selectedIndustry) || industries[0];
  const ActiveIndustryIcon = activeIndustryData.icon;

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'AI Agents & Digital Employees' }]} />

        {/* Hero Area */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Bot className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">AI Digital Employees</span>
            <span className="text-slate-600">|</span>
            <span>Custom-Built for Your Business</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            AI Digital Employees Designed Around <span className="text-orange-500">How You Work.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We engineer specialized AI agents that handle repetitive inquiries, qualify prospective leads, coordinate business operations, and assist your team 24/7 — built with strict security and human approval controls.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact?service=custom_ai_agent"
              className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-sm font-bold text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Discuss Your AI Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-sm font-medium text-slate-200"
            >
              <span>How We Build & Control Agents</span>
            </Link>
          </div>
        </div>

        {/* Core Capabilities Pillars */}
        <div className="py-12 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Makes an AI Digital Employee Different?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Unlike generic chatbots, our agents are structured systems grounded in your real business knowledge, connected to your tools, and bounded by clear operational rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Grounded Knowledge</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Agents answer questions based strictly on your verified menus, product specs, pricing schedules, and company policies — eliminating guesswork and hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Human Approval Gates</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Critical actions (like sending contracts, processing refunds, or modifying database records) are held for human review before execution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Modular Integrations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamlessly connects to your existing website, CRM, email notifications, Google Workspace, or custom databases with secure authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Industry Solutions Matrix */}
        <div className="py-14 border-t border-slate-800/80 text-left">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Use Cases</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              AI Digital Employees for Every Industry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore how custom AI agents support specific operational needs across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selector List */}
            <div className="lg:col-span-4 space-y-2">
              {industries.map((ind) => {
                const IndIcon = ind.icon;
                const isSelected = selectedIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-orange-500 text-white shadow-md shadow-orange-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        <IndIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold block text-white">{ind.title}</span>
                        <span className="text-[11px] text-slate-400 block">{ind.conceptName}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Detail Card */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-orange-400">
                    <ActiveIndustryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{activeIndustryData.conceptName}</h3>
                    <span className="text-xs text-slate-400 font-mono">Industry Vertical: {activeIndustryData.title}</span>
                  </div>
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    {activeIndustryData.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeIndustryData.overview}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Core Agent Functions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(activeIndustryData.capabilities || []).map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Deliverable Architecture:</span>
                  <span className="text-slate-400 mt-0.5 block">{activeIndustryData.deliverable}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Custom configured for your proprietary business processes</span>
                </div>
                <Link
                  to={`/contact?service=custom_ai_agent&industry=${encodeURIComponent(activeIndustryData.title)}`}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white text-center flex items-center justify-center gap-1.5"
                >
                  <span>Discuss This Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinated Multi-Agent Architecture */}
        <div className="py-12 border-t border-slate-800/80 text-left">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">System Design</span>
              <h3 className="text-2xl font-bold text-white">How Your AI Agent Operates Safely</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We establish strict boundaries around AI models. Data retrieval is secured, outputs are validated, and any sensitive action requires your explicit confirmation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold">01. INTAKE</span>
                <h4 className="text-sm font-bold text-white">User Interaction</h4>
                <p className="text-xs text-slate-400 leading-snug">
                  Customer submits inquiry via website chat, contact form, or integrated messaging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold">02. REASONING</span>
                <h4 className="text-sm font-bold text-white">Grounded Context</h4>
                <p className="text-xs text-slate-400 leading-snug">
                  Agent queries your verified PostgreSQL database and internal documents for exact facts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold">03. CONTROL</span>
                <h4 className="text-sm font-bold text-white">Approval Gate</h4>
                <p className="text-xs text-slate-400 leading-snug">
                  High-impact actions trigger an instant notification to your team for approval.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-orange-400 font-bold">04. RESOLUTION</span>
                <h4 className="text-sm font-bold text-white">Delivery & Telemetry</h4>
                <p className="text-xs text-slate-400 leading-snug">
                  Response is delivered instantly, and full conversation metrics are logged to your CRM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 pb-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to Deploy an AI Digital Employee?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Tell us about your business bottlenecks. We will design a custom AI agent around your real operations.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact?service=custom_ai_agent"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Start Your Custom AI Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
