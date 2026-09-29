import React from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Headphones,
  Layout,
  Zap,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Bot,
  Users,
  Clock,
  Database
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const SolutionsPage: React.FC = () => {
  usePageMetadata({
    title: 'Business Solutions & Digital Capabilities | AIAUTOMY',
    description: 'Explore our solutions tailored by business objective: lead capture, 24/7 AI customer assistance, high-performance web development, and workflow automation.',
  });

  const solutions = [
    {
      id: 'leads',
      title: 'Get More Leads & Convert Visitors',
      icon: TrendingUp,
      badge: 'Revenue & Growth',
      summary:
        'Turn passive website traffic into qualified sales opportunities with conversational AI intake, interactive qualification quizzes, and frictionless inquiry forms.',
      benefits: [
        'Engage visitors instantly the moment they show intent',
        'Ask structured qualification questions before booking calls',
        'Route high-value prospects directly to your calendar or CRM',
        'A/B tested high-conversion landing page layouts',
      ],
      serviceLink: '/contact?service=custom_ai_agent',
      ctaText: 'Explore Lead Intake Solutions',
    },
    {
      id: 'support',
      title: 'Improve Customer Support & Response Times',
      icon: Headphones,
      badge: 'Customer Experience',
      summary:
        'Deliver instant, accurate answers to customer questions 24/7 using an AI agent trained exclusively on your business menus, policies, catalogs, and documentation.',
      benefits: [
        'Zero waiting time for standard FAQs, hours, and policies',
        'Accurate guidance grounded strictly in verified company knowledge',
        'Automated ticket creation and escalation to human staff',
        'Frees up human team members for complex customer issues',
      ],
      serviceLink: '/contact?service=custom_ai_agent',
      ctaText: 'Explore Support Agents',
    },
    {
      id: 'website',
      title: 'Launch or Upgrade a Website',
      icon: Layout,
      badge: 'Brand & Credibility',
      summary:
        'Replace slow, outdated websites with custom, responsive web systems that load in milliseconds and reflect the true quality of your business.',
      benefits: [
        'Modern high-contrast typography and clear layout hierarchy',
        'Sub-second page speeds with Core Web Vitals optimization',
        'Integrated lead capture and secure PostgreSQL persistence',
        'Mobile-first responsive design for all devices',
      ],
      serviceLink: '/contact?service=web_development',
      ctaText: 'Start a Website Upgrade',
    },
    {
      id: 'automation',
      title: 'Automate Daily Business Workflows',
      icon: Zap,
      badge: 'Efficiency & Operations',
      summary:
        'Eliminate repetitive data entry and manual cross-checking. Connect forms, databases, notifications, and internal tools with structured approval checkpoints.',
      benefits: [
        'Automatic synchronization between web forms and your CRM',
        'Instant alerts via email, Slack, or SMS for critical events',
        'Multi-step workflow execution with human approval gates',
        'Reduction in human error and manual data transfer time',
      ],
      serviceLink: '/contact?service=ai_automation',
      ctaText: 'Discuss Workflow Automation',
    },
    {
      id: 'ecommerce',
      title: 'Streamline Ecommerce Operations',
      icon: ShoppingBag,
      badge: 'Retail & Commerce',
      summary:
        'Empower your online store — on Shopify, Etsy, Amazon, eBay, or your own website — with AI-assisted product discovery, catalog SEO enhancements, sizing and specification guidance, and automated customer notifications.',
      benefits: [
        'AI shopping assistance that guides customers to the right product',
        'Automated product description drafting and keyword clustering',
        'Frictionless checkout experience optimized for mobile conversions',
        'Inventory and catalog telemetry monitoring',
      ],
      serviceLink: '/contact?service=ecommerce_solution',
      ctaText: 'Explore Ecommerce Systems',
    },
    {
      id: 'custom',
      title: 'Build a Custom Business System',
      icon: Sparkles,
      badge: 'Custom Engineering',
      summary:
        'When off-the-shelf software doesn’t fit your business, we build bespoke full-stack applications, client portals, and administrative dashboards tailored to your exact workflow.',
      benefits: [
        'Engineered specifically around your internal business logic',
        'Secure multi-role authentication and administrative control',
        'PostgreSQL database with fine-grained access control',
        'Scalable codebase you own without perpetual vendor lock-in',
      ],
      serviceLink: '/contact?service=custom_digital_solution',
      ctaText: 'Build a Custom System',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Solutions by Business Goal' }]} />

        {/* Header */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Business Solutions</span>
            <span className="text-slate-600">|</span>
            <span>Outcome-Focused Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Solutions Built Around <span className="text-orange-500">Your Business Goals.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you need to capture more leads, assist customers around the clock, upgrade your online presence, or automate operations, we engineer practical, reliable digital solutions.
          </p>
        </div>

        <PageBanner photo="solutions" caption="Practical systems for real businesses — shops, cafes, agencies and online stores." />

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {solutions.map((sol, idx) => {
            const IconComp = sol.icon;
            return (
              <div
                key={sol.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-950 border border-slate-800 text-orange-400 uppercase">
                      {sol.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{sol.title}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{sol.summary}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    {(sol.benefits || []).map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <Link
                    to={sol.serviceLink}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-orange-500/10 border border-slate-800 hover:border-orange-500/30 text-xs font-bold text-orange-400 transition-all flex items-center justify-between"
                  >
                    <span>{sol.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantees & Human Controls Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Reliability & Governance</span>
            <h3 className="text-2xl font-bold text-white">Engineering Standards You Can Trust</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every system we deploy is built with transparency, privacy, and security in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Zero Data Leaks</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Your business data and customer inquiries remain your private intellectual property.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Supervised Autonomy</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                AI agents operate within strict guardrails. High-impact operations require human sign-off.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>PostgreSQL Database</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Structured relational persistence with granular access control and automated backups.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-14 pb-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Have a specific business objective in mind?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Let’s discuss your current systems and design a practical implementation plan.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Schedule a Scoping Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
