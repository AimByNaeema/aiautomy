import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ShieldCheck, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Engineering & AI Deployments</span>
        </div>

        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
        >
          Ready to Build Your Custom <span className="text-orange-500">AI Agent or Website?</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Tell us what you want to build. We’ll design the right digital solution for your business.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            id="btn-final-primary-cta"
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl shadow-xl shadow-orange-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            id="btn-final-secondary-cta"
            href="mailto:aiautomys@gmail.com"
            className="w-full sm:w-auto px-7 py-4 text-base font-medium text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-orange-400" />
            <span>Email Us Directly</span>
          </a>
        </div>

        {/* Guarantees Strip */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Discovery Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Human-in-the-Loop Governance
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full Code & Data Ownership
          </span>
        </div>
      </div>
    </section>
  );
};
