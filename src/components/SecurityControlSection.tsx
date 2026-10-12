import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  FileCheck,
  SlidersHorizontal,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Eye
} from 'lucide-react';

export const SecurityControlSection: React.FC = () => {
  const [simulationStatus, setSimulationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <section id="security" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Safety, Trust & Governance</span>
          </div>
          <h2
            id="security-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            AI Governed by You, <span className="text-orange-500">Not Left Unchecked.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We build digital employees with supervised autonomy. Sensitive customer interactions and operational changes always require explicit human approval.
          </p>
        </div>

        {/* 2-Column Trust Architecture + Interactive Approval Sandbox */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Left Column: 4 Core Security Pillars */}
          <div className="lg:col-span-6 space-y-3.5 flex flex-col justify-between">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <UserCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Supervised Human Approval</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Financial actions, contract dispatch, and sensitive customer escalations require one-click human verification before execution.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <Lock className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Private Knowledge & No Public Training</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your internal documents, catalogs, and customer conversations remain private and are never used to train public AI foundation models.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <Database className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Strict Database Access Rules</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Server-side authorization rules enforce validated lead submissions and block public access to private customer data.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-slate-950 text-white shrink-0 mt-0.5 border border-slate-800">
                <FileCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Full Code & Data Ownership</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  You own your custom website codebase, database records, and prompt trees completely with zero proprietary vendor lock-in.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive "Action Approval Request" Sandbox */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                      Live Approval Simulation
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Agent Action #ACT-8820
                  </span>
                </div>

                {/* Approval Card Simulation Header */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-orange-400 font-bold font-mono">Agent Proposal: CafeBot</span>
                    <span className="text-xs font-mono text-slate-400">Escalation Gate</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Large Party Reservation Request (14 Guests)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-mono">Customer Dietary Note</span>
                      <span className="font-bold text-orange-300 font-mono">2x Gluten Free</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-mono">Required Approval</span>
                      <span className="font-bold text-emerald-400 font-mono">Table 4 & 5 Join</span>
                    </div>
                  </div>
                </div>

                {/* Status Display */}
                {simulationStatus === 'pending' && (
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Experience how our digital employees interact with human management: Click "Approve" to accept the proposed reservation or "Decline" to route to manual review.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSimulationStatus('approved')}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Reservation</span>
                      </button>
                      <button
                        onClick={() => setSimulationStatus('rejected')}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Route to Manager</span>
                      </button>
                    </div>
                  </div>
                )}

                {simulationStatus === 'approved' && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Approved & Confirmation Dispatched
                      </span>
                      <button
                        onClick={() => setSimulationStatus('pending')}
                        className="text-[10px] text-slate-400 hover:text-white underline font-mono cursor-pointer"
                      >
                        Reset Simulation
                      </button>
                    </div>
                    <p className="text-xs text-slate-300">
                      Customer notified with table confirmation and dietary preparation details. Saved to reservations database.
                    </p>
                  </div>
                )}

                {simulationStatus === 'rejected' && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Routed for Custom Staff Review
                      </span>
                      <button
                        onClick={() => setSimulationStatus('pending')}
                        className="text-[10px] text-slate-400 hover:text-white underline font-mono cursor-pointer"
                      >
                        Reset Simulation
                      </button>
                    </div>
                    <p className="text-xs text-slate-300">
                      Reservation held in review queue. Staff alerted via SMS and email with customer contact details.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Grounded Answers Only</span>
                <Link to="/how-it-works" className="text-orange-400 hover:underline">
                  Learn more &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CostEfficiencySection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-8 sm:p-10 shadow-xl space-y-6 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">
                Engineering Quality
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                High Performance Standards by Default.
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              Sub-Second Speed & Modern Stack
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Sub-Second Page Speeds</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Optimized React/Vite builds with lazy loading and asset compression for 95+ Core Web Vitals.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Mobile-First Responsiveness</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Pixel-perfect presentation calibrated across mobile smartphones, tablets, and ultra-wide desktops.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Semantic SEO & Open Graph</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Structured JSON-LD schema, clean meta tags, and high-contrast typography for maximum search discoverability.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-bold text-white block">Database Security</span>
              <p className="text-[11px] text-slate-400 mt-1">
                Hardened security rules preventing unauthorized reading or tampering with your customer records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
