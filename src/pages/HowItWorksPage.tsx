import React from 'react';
import { PageBanner } from '../components/StockPhoto';
import { Link } from 'react-router-dom';
import {
  Compass,
  FileCode2,
  Palette,
  Hammer,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Eye,
  Sliders,
  HelpCircle,
  Database
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const HowItWorksPage: React.FC = () => {
  usePageMetadata({
    title: 'How We Work: Methodology & Security Controls | AIAUTOMY',
    description: 'Our disciplined 6-step methodology for designing, building, and deploying custom websites, AI digital employees, and automation workflows.',
  });

  const steps = [
    {
      number: '01',
      title: 'Discover & Understand',
      icon: Compass,
      headline: 'Deep dive into your business model and operational friction.',
      description:
        'We begin by analyzing your target audience, existing software stack, customer inquiry patterns, and business goals. We identify where manual friction slows your team down and define clear, measurable project outcomes.',
      deliverables: ['Discovery Brief', 'Workflow Friction Audit', 'Core Functional Requirements'],
    },
    {
      number: '02',
      title: 'Plan & Architect',
      icon: FileCode2,
      headline: 'Define system specifications and agent reasoning boundaries.',
      description:
        'We design the technical architecture: website sitemaps, data schemas, AI knowledge boundaries, API integration points, and human approval checkpoints. Everything is clearly mapped out before a single line of production code is written.',
      deliverables: ['System Architecture Diagram', 'Database Schema', 'Agent Decision Tree & Guardrails'],
    },
    {
      number: '03',
      title: 'Design & Prototype',
      icon: Palette,
      headline: 'Craft high-contrast layouts and conversational interfaces.',
      description:
        'We design clean, intuitive user interfaces pairing refined typography with purposeful layout hierarchy. For AI agents, we construct interactive prompt flows and preview environments so you can test conversational tone and accuracy.',
      deliverables: ['Responsive UI Component Mockups', 'Interactive Chat & Intake Flows', 'Visual Identity Alignment'],
    },
    {
      number: '04',
      title: 'Build & Engineer',
      icon: Hammer,
      headline: 'Develop scalable full-stack code and server-side integrations.',
      description:
        'We write clean, modular React and TypeScript code supported by secure server-side API routes and PostgreSQL persistence. AI agents are grounded strictly in your verified documentation and connected to webhooks.',
      deliverables: ['Clean Full-Stack Codebase', 'Backend API Proxies', 'Access Control Validation (API-layer authorization)'],
    },
    {
      number: '05',
      title: 'Review, Test & Refine',
      icon: CheckCircle2,
      headline: 'Rigorous client validation and edge-case testing.',
      description:
        'You test the complete system in a dedicated staging environment. We stress-test edge cases, verify lead capture routing, validate mobile responsiveness, and calibrate AI responses until the system meets our exact standards.',
      deliverables: ['Staging Sandbox Access', 'Edge Case Stress Testing', 'Explicit Client Sign-Off'],
    },
    {
      number: '06',
      title: 'Launch & Continual Support',
      icon: Rocket,
      headline: 'Safe production deployment with telemetry monitoring.',
      description:
        'We launch your new website or AI agent to production with zero downtime. We connect your custom domain, establish SSL encryption, set up real-time telemetry, and remain available for ongoing adjustments as your business grows.',
      deliverables: ['Production Deployment', 'Domain & SSL Setup', 'Admin Portal Access & Training'],
    },
  ];

  const safetyGuarantees = [
    {
      icon: Eye,
      title: 'Supervised Autonomy',
      description: 'AI agents generate proposals and drafts. Critical business actions (like issuing refunds or sending contracts) require explicit human sign-off.',
    },
    {
      icon: Lock,
      title: 'Private Knowledge Vaults',
      description: 'Your business documentation and customer conversations remain strictly confidential and are never used to train public models.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Security Rules',
      description: 'Strict server-side authorization rules enforce that public users can only submit validated inquiries, while all customer data is admin-restricted.',
    },
    {
      icon: Sliders,
      title: 'No Perpetual Lock-in',
      description: 'You own your custom digital assets and code. We build on open, standard web technologies so you maintain total independence.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'How We Work & Methodology' }]} />

        {/* Header */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Our Methodology</span>
            <span className="text-slate-600">|</span>
            <span>Disciplined, Transparent, Reliable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How We Build <span className="text-orange-500">Exceptional Systems.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every project follows a structured, transparent 6-step lifecycle to ensure technical excellence, zero unapproved actions, and measurable business outcomes.
          </p>
        </div>

        <PageBanner photo="howItWorks" caption="Every project starts with a clear plan, mapped out together with you." />

        {/* 6 Step Process Cards */}
        <div className="space-y-6 text-left">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-6 items-start justify-between hover:border-slate-700 transition-colors shadow-lg"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-bold text-base shrink-0">
                    {step.number}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                    </div>
                    <p className="text-sm font-semibold text-orange-400">{step.headline}</p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-72 p-4 rounded-xl bg-slate-950 border border-slate-800/80 shrink-0 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Key Deliverables
                  </span>
                  <div className="space-y-1.5">
                    {(step.deliverables || []).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Human Approval & Security Governance Section */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-slate-900 border border-orange-500/30 text-left space-y-6 shadow-2xl">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safety & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Human Approval & Security Controls
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We never deploy unchecked autonomy. Our digital employees operate under strict guardrails to protect your reputation, brand, and customer trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {safetyGuarantees.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-left space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">Common Questions</span>
            <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">How long does a typical project take?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard company websites and single AI agent integrations typically take 2 to 4 weeks from discovery to launch. Complex multi-agent systems and custom SaaS applications are scoped into structured milestones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Can the AI agent integrate with my current tools?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yes. We build custom webhook triggers and API connections to connect your AI agents with tools like Google Workspace, Slack, Discord, Shopify, Stripe, and custom CRMs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">What if the AI makes a mistake?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our agents are constrained to verified documentation using retrieval-augmented generation (RAG). For ambiguous questions, the agent is trained to politely escalate to human team members rather than inventing answers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Do I own the final code and system?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yes, completely. Once delivered and finalized, you own full rights to your custom codebase, database schemas, and prompt configurations without ongoing proprietary platform locks.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-16 pb-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to Start Step 01?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Tell us about your project or business needs. We will prepare an initial discovery roadmap.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <span>Begin Your Project Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
