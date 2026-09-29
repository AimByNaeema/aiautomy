import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Lock,
  Sparkles,
  Smartphone,
  Gauge,
  Search,
  Code2,
  Server,
  Layers,
  Database,
  ShoppingCart
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const WebDevelopmentPage: React.FC = () => {
  usePageMetadata({
    title: 'Modern Web Development & Digital Systems | AIAUTOMY',
    description: 'High-performance business websites, ecommerce systems, web applications, and client portals built with modern full-stack architectures.',
  });

  const offerings = [
    {
      title: 'Business & Company Websites',
      tag: 'Brand & Authority',
      description:
        'Fast, elegant, and credible digital homes for modern businesses. Designed to communicate value clearly, establish trust, and turn visitors into qualified inquiries.',
      features: [
        'Custom bespoke design matching your brand aesthetic',
        'Sub-second page load times and 100/100 Core Web Vitals',
        'SEO-first semantic structure and schema metadata',
        'Direct inquiry capture connected to your CRM or email',
      ],
    },
    {
      title: 'Ecommerce Stores & Systems',
      tag: 'Conversion & Growth',
      description:
        'High-converting online shopping platforms engineered for frictionless checkout, fast product discovery, catalog management, and automated order workflows.',
      features: [
        'Optimized mobile-first product and checkout flows',
        'Custom product filtering, variant pickers, and search',
        'Secure payment gateway integrations (Stripe, PayPal, etc.)',
        'Inventory and customer order telemetry tracking',
      ],
    },
    {
      title: 'Custom Web Applications & Portals',
      tag: 'Software & Logic',
      description:
        'Bespoke digital platforms, client portals, membership systems, and internal operational tools built around your proprietary business workflows.',
      features: [
        'User authentication, role-based permissions, and profile dashboards',
        'Cloud database integration (PostgreSQL)',
        'Real-time data synchronization and interactive dashboards',
        'Clean API endpoints and secure third-party integrations',
      ],
    },
    {
      title: 'High-Conversion Landing Pages',
      tag: 'Marketing & Campaigns',
      description:
        'Focused single-purpose pages crafted specifically for advertising campaigns, product launches, event registrations, or lead generation initiatives.',
      features: [
        'Persuasive typographic hierarchy and responsive layout',
        'Frictionless multi-step or single-step lead capture forms',
        'A/B test ready with zero extraneous script bloat',
        'Event analytics and conversion tracking integration',
      ],
    },
    {
      title: 'SaaS & Product Websites',
      tag: 'Tech & Startups',
      description:
        'Polished product websites that explain complex software, demonstrate interactive UI features, showcase pricing plans, and drive sign-ups.',
      features: [
        'Interactive product previews and visual workflows',
        'Feature breakdown matrices and comparison tables',
        'Transparent tier pricing and billing calculators',
        'Documentation portals and developer guides',
      ],
    },
    {
      title: 'Admin Dashboards & Internal Tooling',
      tag: 'Operations & Management',
      description:
        'Dedicated administrative control centers for staff to manage inquiries, update product catalogs, track orders, and monitor system health safely.',
      features: [
        'Secure admin-only authentication and permission gates',
        'Searchable, filterable tables with instant status updates',
        'Internal staff notes and customer communication logs',
        'Cloud database management and automated exports',
      ],
    },
  ];

  const standards = [
    {
      icon: Gauge,
      title: 'Sub-Second Performance',
      description: 'Zero bloated page builders. We write clean, optimized code that loads in fractions of a second on mobile and desktop.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Responsive',
      description: 'Flawless presentation across all screen sizes, from high-density smartphones to ultra-wide desktop monitors.',
    },
    {
      icon: Search,
      title: 'Search Engine Architecture',
      description: 'Engineered with clean semantic HTML, Open Graph tags, canonical structures, and sitemaps so search engines index your content.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security & Rules',
      description: 'Protected by strict backend security rules, HTTPS encryption, environment variable protection, and zero exposed API keys.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Web Development & Digital Systems' }]} />

        {/* Hero Area */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Layout className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Web Engineering</span>
            <span className="text-slate-600">|</span>
            <span>Fast, Modern, and Scalable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Websites & Systems Engineered for <span className="text-orange-500">Real Business Results.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We don't use generic, sluggish templates. We build custom business websites, ecommerce platforms, and web applications engineered for speed, clean aesthetics, and seamless lead conversion.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact?service=web_development"
              className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-sm font-bold text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Start Your Website Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-sm font-medium text-slate-200"
            >
              <span>Explore Projects</span>
            </Link>
          </div>
        </div>

        {/* Standards Grid */}
        <div className="py-12 border-t border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {standards.map((std, idx) => {
              const IconComp = std.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-left">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{std.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{std.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Offerings Grid */}
        <div className="py-14 border-t border-slate-800/80 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Solutions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What We Build
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From high-impact corporate sites to custom SaaS portals and multi-channel ecommerce platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    {(item.features || []).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <Link
                    to={`/contact?service=web_development&project=${encodeURIComponent(item.title)}`}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5"
                  >
                    <span>Request Scoping & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Stack */}
        <div className="py-12 border-t border-slate-800/80 text-left">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">Tech Stack</span>
              <h3 className="text-2xl font-bold text-white">Modern, Scalable Web Engineering</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We build on battle-tested industry foundations to ensure your website is lightning fast, secure, easy to maintain, and ready to scale.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase block">FRONTEND</span>
                <span className="text-sm font-bold text-white block">React & TypeScript</span>
                <span className="text-[11px] text-slate-400">Tailwind CSS, responsive fluid layouts, sub-second hydration.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase block">BACKEND</span>
                <span className="text-sm font-bold text-white block">Node.js & Express</span>
                <span className="text-[11px] text-slate-400">Server-side proxy routes, secret protection, clean REST APIs.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase block">DATABASE</span>
                <span className="text-sm font-bold text-white block">PostgreSQL (Railway)</span>
                <span className="text-[11px] text-slate-400">Structured relational database, strict access control, automated backups.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase block">INTEGRATIONS</span>
                <span className="text-sm font-bold text-white block">AI & Webhooks</span>
                <span className="text-[11px] text-slate-400">Gemini LLMs, Stripe payments, email notifications, CRM hooks.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 pb-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Need a High-Performance Website?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Let’s discuss your design preferences, target conversion goals, and technical requirements.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact?service=web_development"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Start Your Website Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
