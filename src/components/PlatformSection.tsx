import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Layout,
  Globe,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INITIAL_SERVICES } from '../lib/api';
import { ServiceCardArt, artKindForService } from './ServiceCardArt';

export const PlatformSection: React.FC = () => {
  const services = INITIAL_SERVICES;

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'custom-ai-agents':
        return <Bot className="w-5 h-5" />;
      case 'web-development':
        return <Layout className="w-5 h-5" />;
      case 'ecommerce-solutions':
        return <Globe className="w-5 h-5" />;
      case 'ai-automation':
      case 'ai-business-automation':
        return <Zap className="w-5 h-5" />;
      case 'custom-digital-solutions':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const getServiceLink = (slug: string) => {
    switch (slug) {
      case 'custom-ai-agents':
        return '/ai-agents';
      case 'web-development':
        return '/web-development';
      case 'ecommerce-solutions':
        return '/solutions';
      case 'ai-automation':
      case 'ai-business-automation':
        return '/solutions';
      case 'custom-digital-solutions':
        return '/solutions';
      default:
        return '/solutions';
    }
  };

  return (
    <section id="services" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 uppercase tracking-wider font-mono">
            <span>What We Do</span>
          </div>

          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Digital Systems Designed Around <span className="text-orange-500">Your Business Needs.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We build custom AI agents, professional websites, ecommerce systems, automation workflows, and bespoke digital tools with strict engineering standards.
          </p>
        </div>

        {/* Services Cards Grid — image (~75%) on top, text below */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {services.map((srv) => (
            <Link
              key={srv.id}
              to={getServiceLink(srv.slug)}
              className="rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 flex flex-col hover:border-orange-500/40 hover:bg-slate-900 transition-all shadow-lg group focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <div className="relative aspect-square overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                  <ServiceCardArt kind={artKindForService(srv.slug)} />
                </div>
                <span className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur text-orange-400 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-colors">
                  {getServiceIcon(srv.slug)}
                </span>
                <span className="absolute top-3 right-3 text-[11px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded">
                  0{srv.sort_order}
                </span>
              </div>

              <div className="px-5 py-4 flex flex-col gap-1.5">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {srv.short_description}
                </p>
                <span className="text-xs font-semibold text-orange-400 group-hover:text-orange-300 flex items-center gap-1">
                  Explore Capabilities
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}

          {/* Sixth Special Card: Custom Engineering Scope */}
          <Link
            to="/contact"
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/30 flex flex-col shadow-xl group focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <div className="relative aspect-square overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                <ServiceCardArt kind="custom" />
              </div>
              <span className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-orange-500/20 backdrop-blur text-orange-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </span>
              <span className="absolute top-3 right-3 text-[11px] font-mono text-orange-400 font-bold bg-slate-950/70 px-2 py-0.5 rounded">
                Bespoke
              </span>
            </div>

            <div className="px-5 py-4 flex flex-col gap-1.5">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">Custom System Scoping</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                Have unique operational requirements? We engineer custom multi-agent workflows, API adapters, and dedicated database schemas from scratch.
              </p>
              <span className="text-xs font-semibold text-orange-400 group-hover:text-orange-300 flex items-center gap-1">
                Request Custom Scoping
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
