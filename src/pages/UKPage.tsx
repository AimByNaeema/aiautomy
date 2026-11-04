import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Coffee,
  ShoppingBag,
  CalendarCheck,
  ClipboardCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const UKPage: React.FC = () => {
  usePageMetadata({
    title: 'AI Agents, Websites & SEO for UK Small Businesses | AI Automy',
    description:
      'Custom AI agents, websites, ecommerce and SEO for small businesses in the UK. Human-approved automation, private data, full code ownership. Book a free discovery consultation.',
  });

  const ukVerticals = [
    {
      id: 'cafes',
      title: 'UK Cafes & Restaurants',
      icon: Coffee,
      badge: 'Hospitality',
      summary:
        'An AI agent built for hospitality: handles enquiries, supports reservations, and shares allergen guidance based on the information you provide.',
      benefits: [
        'Instant answers to opening hours, menu, and booking enquiries',
        'Reservation support that fits your existing workflow',
        'Allergen guidance grounded in information you approve',
        'Frees staff to focus on the customers in the room',
      ],
      serviceLink: '/contact?service=custom_ai_agent',
      ctaText: 'Discuss a Cafe Agent',
    },
    {
      id: 'ecommerce',
      title: 'UK Ecommerce & Services',
      icon: ShoppingBag,
      badge: 'Websites & SEO',
      summary:
        'SEO-friendly websites and ecommerce support — whether you sell on Shopify, Etsy, Amazon, eBay, or your own website.',
      benefits: [
        'Fast, mobile-first websites built for search visibility',
        'Product Q&A and store support powered by your catalog data',
        'SEO foundations: clean structure, metadata, and sitemaps',
        'Connected lead capture and order enquiry handling',
      ],
      serviceLink: '/contact?service=ecommerce_solution',
      ctaText: 'Discuss Ecommerce Support',
    },
  ];

  const howItWorks = [
    {
      id: 'discovery',
      title: '1. Free Discovery Consultation',
      icon: CalendarCheck,
      text: 'Tell us about your business and where you lose time. We map what to automate first — and what to leave alone.',
    },
    {
      id: 'approval',
      title: '2. Human Approval Built In',
      icon: ClipboardCheck,
      text: 'AI agents work within guardrails you define. Anything high-impact waits for a human sign-off before it happens.',
    },
    {
      id: 'ownership',
      title: '3. You Own the Code & Data',
      icon: Lock,
      text: 'Your business data stays private, and you own the code we build for you — no vendor lock-in, no rented black box.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'United Kingdom' }]} />
        {/* Header */}
        <div className="pt-4 pb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">United Kingdom</span>
            <span className="text-slate-600">|</span>
            <span>AI Agents · Websites · SEO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            AI Agents, Websites & SEO for <span className="text-orange-500">UK Small Businesses.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Custom AI agents, SEO-friendly websites, and ecommerce support for small businesses across the UK — with human approval built in, your data kept private, and full ownership of the code we build.
          </p>
        </div>
        {/* UK verticals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {ukVerticals.map((sol) => {
            const IconComp = sol.icon;
            return (
              <div
                key={sol.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-950 border border-slate-800 text-orange-400 uppercase tracking-wider">
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
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-orange-500/10 border border-slate-800 text-orange-400 hover:text-orange-300 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{sol.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* How it works */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold">How It Works</span>
            <h3 className="text-2xl font-bold text-white">A Simple, Human-Led Process</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No hype, no guesswork — a clear path from first conversation to a system you control.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            {howItWorks.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <IconComp className="w-4 h-4 text-orange-400" />
                    <span>{step.title}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* CTA */}
        <div className="pt-14 pb-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Free Consultation</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Book a Free Discovery Consultation</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Tell us about your UK business and we will map practical next steps — or send us a message directly.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-started"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-sm text-white shadow-lg flex items-center gap-2 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl border border-slate-700 hover:border-orange-500/50 hover:bg-orange-500/10 font-bold text-sm text-white flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Prefer to chat first? Use the chat assistant on this page — we reply personally.
          </p>
        </div>
      </div>
    </div>
  );
};
