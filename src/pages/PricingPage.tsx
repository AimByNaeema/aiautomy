import React from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Bot,
  Layout,
  Layers,
  HelpCircle,
  Clock,
  Lock,
  DollarSign
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const PricingPage: React.FC = () => {
  usePageMetadata({
    title: 'Pricing & Engagement Models | AIAUTOMY',
    description: 'Transparent project pricing and engagement models for custom websites, AI digital employees, and complete digital business systems.',
  });

  const packages = [
    {
      id: 'starter-web',
      name: 'Starter Business Website',
      category: 'Web Development',
      badge: 'Core Online Presence',
      price: 'Starting from $1,800',
      timeline: '2 - 3 Weeks Delivery',
      description:
        'A fast, modern, and responsive website designed to communicate your value proposition clearly and capture customer inquiries reliably.',
      features: [
        'Custom bespoke responsive design (mobile, tablet, desktop)',
        'Sub-second page speeds with Core Web Vitals optimization',
        'SEO-first semantic structure & Open Graph metadata',
        'Inquiry form connected to our database & email alerts',
        'Dedicated admin lead manager portal',
        'Domain connection, SSL setup, and production deployment',
        '14 days post-launch technical warranty & support',
      ],
      popular: false,
      ctaLink: '/contact?service=web_development',
      ctaText: 'Start Website Project',
    },
    {
      id: 'custom-agent',
      name: 'Custom AI Digital Employee',
      category: 'AI Digital Employees',
      badge: 'Most Popular',
      price: 'Starting from $2,400',
      timeline: '2 - 4 Weeks Delivery',
      description:
        'A specialized AI agent trained on your business knowledge to handle customer inquiries, qualify prospects, or assist daily staff workflows.',
      features: [
        'Custom system prompt engineering & tone calibration',
        'Grounded on your verified menus, docs, FAQs, or catalogs',
        'Human approval gates for sensitive operational actions',
        'Floating website widget or messaging webhook integration',
        'Full conversation logs and telemetry tracking in CRM',
        'No hallucination guardrails & structured escalation paths',
        '30 days post-launch calibration & prompt refinement',
      ],
      popular: true,
      ctaLink: '/contact?service=custom_ai_agent',
      ctaText: 'Deploy an AI Agent',
    },
    {
      id: 'complete-system',
      name: 'Complete Digital System',
      category: 'Full-Stack Solution',
      badge: 'Highest Impact',
      price: 'Starting from $3,800',
      timeline: '4 - 6 Weeks Delivery',
      description:
        'A cohesive digital infrastructure combining a high-performance business website with an integrated AI digital employee and CRM workflow automation.',
      features: [
        'Full bespoke website engineering (all core pages)',
        'Fully integrated 24/7 AI digital employee on storefront',
        'PostgreSQL database with fine-grained access control',
        'Admin CRM portal for lead and conversation management',
        'Automated notifications via email, Slack, or webhook',
        'End-to-end testing, staging sandbox & client sign-off',
        '60 days post-launch maintenance & optimization support',
      ],
      popular: false,
      ctaLink: '/contact?service=custom_digital_solution',
      ctaText: 'Build Complete System',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Pricing & Engagement Models' }]} />

        {/* Header */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <DollarSign className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Engagement Models</span>
            <span className="text-slate-600">|</span>
            <span>Transparent & Predictable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transparent Pricing. <span className="text-orange-500">Zero Hidden Fees.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We deliver clear, itemized project scopes tailored to your business requirements. No forced monthly retainers or proprietary vendor lock-in.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Code Ownership • No Unsolicited Markups • Fixed Scope Milestones</span>
            </div>
          </div>
        </div>

        <PageBanner photo="pricing" caption="Clear scope, fixed milestones and a fair price — agreed before we start." />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-7 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all relative ${
                pkg.popular
                  ? 'bg-slate-900 border-2 border-orange-500 shadow-2xl shadow-orange-500/15'
                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase text-orange-400 font-semibold block">
                    {pkg.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">{pkg.name}</h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{pkg.description}</p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xl font-bold text-white font-mono tracking-tight">{pkg.price}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pkg.timeline}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Included in this Scope
                  </span>
                  {(pkg.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  to={pkg.ctaLink}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scoping Callout */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">Custom Requirements?</span>
              <h3 className="text-2xl font-bold text-white">Bespoke Scope for Unique Business Workflows</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Need multi-agent orchestration, complex database migrations, proprietary internal tools, or specialized third-party integrations? We provide itemized, fixed-price quotes.
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white flex items-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/25"
              >
                <span>Request Custom Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing FAQ */}
        <div className="mt-16 text-left space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Pricing Questions</span>
            <h3 className="text-2xl font-bold text-white">How Our Invoicing & Scoping Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">How are project payments structured?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard projects are divided into simple milestone payments: 50% upon project kickoff and architecture approval, and 50% upon final delivery, testing sign-off, and production deployment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Are there ongoing subscription fees?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                No compulsory agency retainers. You only pay for standard third-party infrastructure (such as your domain or cloud usage at cost), and you own your code outright.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">What is included in the post-launch warranty?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every project includes complimentary post-launch support covering bug fixes, edge-case resolution, and prompt calibration to guarantee everything runs smoothly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Can I start with a website and add an AI agent later?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yes. Our codebases are designed modularly. You can launch your website first, and we can seamlessly integrate an AI digital employee whenever you are ready.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-16 pb-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Have a Project in Mind?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Contact us today for a free discovery consultation and itemized project estimate.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
