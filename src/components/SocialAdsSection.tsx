import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Film,
  Target,
  BarChart,
  CheckCircle2,
  Info
} from 'lucide-react';
import { SOCIAL_AD_PLATFORMS } from '../data/mockData';
import { SocialAdPlatform } from '../types';

export const SocialAdsSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialAdPlatform>(SOCIAL_AD_PLATFORMS[0]);

  return (
    <section id="features" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Omnichannel Ad Intelligence</span>
            </div>
            <h2
              id="social-ads-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Creative Direction & High-ROAS Ad Concepts.
            </h2>
            <p className="text-base text-slate-300">
              Eliminate ad fatigue and rising acquisition costs. AIAUTOMY formulates high-retention hooks, UGC scripts, and intent-driven ad copy for every major channel.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 font-mono">
            <Info className="w-4 h-4 text-orange-400" />
            <span>Illustrative Platform Analysis Modules</span>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SOCIAL_AD_PLATFORMS.map((platform) => {
            const isActive = selectedPlatform.id === platform.id;
            return (
              <button
                key={platform.id}
                id={`btn-platform-${platform.id}`}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{platform.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'}`}>
                  {platform.benchmarkRoas}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Platform Intelligence Detail */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Creative Hook & Concept */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-orange-400 font-mono uppercase font-bold">
                      {selectedPlatform.platformType}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{selectedPlatform.name}</h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    Format: {selectedPlatform.recommendedFormat}
                  </span>
                </div>

                {/* 1. Organic Content Idea */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Organic Hook & Content Concept:</span>
                  <p className="text-xs text-slate-200 p-3 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed font-medium">
                    {selectedPlatform.contentIdea}
                  </p>
                </div>

                {/* 2. Paid Ad Concept */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Paid Ad Copy Angle:</span>
                  <p className="text-xs text-orange-300 p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 leading-relaxed font-semibold">
                    {selectedPlatform.adConcept}
                  </p>
                </div>
              </div>

              {/* Benchmark ROAS Strip */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Historical Category Benchmark</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedPlatform.benchmarkRoas}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Direction & Performance Insights */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    Creative Direction Guidelines
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    High Conversion Angle
                  </span>
                </div>

                {/* Visual / Production Direction */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">B-Roll & Shooting Guidance:</span>
                  <p className="text-xs text-slate-300 p-3.5 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed">
                    {selectedPlatform.creativeDirection}
                  </p>
                </div>

                {/* Performance Target Metrics */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-slate-400 uppercase">Target Performance Gate:</span>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{selectedPlatform.targetMetric}</span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cross-platform angle generated for multi-format export</span>
                </div>
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
