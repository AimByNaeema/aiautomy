import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Percent,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { ANALYTICS_DATASET } from '../data/mockData';

export const AnalyticsSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const data = ANALYTICS_DATASET[timeframe];

  return (
    <section id="analytics" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Real-Time Growth Telemetry</span>
            </div>
            <h2
              id="analytics-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Unified Analytics & Growth Diagnostics.
            </h2>
            <p className="text-base text-slate-300">
              No more wading through spreadsheets or disjointed ad dashboards. AIAUTOMY surfaces the metrics that truly drive gross profit and highlights your highest-leverage growth actions.
            </p>
          </div>

          {/* Timeframe Selector & Demo Label */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              {(['7D', '30D', '90D', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  id={`btn-analytics-timeframe-${t.toLowerCase()}`}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                    timeframe === t
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="text-[11px] font-mono text-slate-500 self-center">
              (Demo Telemetry Data)
            </span>
          </div>
        </div>

        {/* 4 Core Metric KPI Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Revenue */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Gross Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.revenue}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{data.revenueChange} vs Prior Period</span>
            </div>
          </div>

          {/* 2. Orders */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.orders}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{data.ordersChange} Volume</span>
            </div>
          </div>

          {/* 3. Conversion Rate */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Store Conversion Rate</span>
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.conversionRate}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{data.conversionChange} Lift</span>
            </div>
          </div>

          {/* 4. Average Order Value (AOV) */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Average Order Value</span>
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {data.aov}
            </div>
            <div className="text-xs text-orange-400 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{data.aovChange} Upsell Gain</span>
            </div>
          </div>
        </div>

        {/* Dynamic Analytics Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Revenue Velocity Chart (Left) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Revenue Velocity & Order Volume</h3>
                <span className="text-xs text-slate-400 font-mono">Aggregation: {timeframe} Trailing</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                High Velocity
              </span>
            </div>

            {/* Clean SVG Trend Visualizer */}
            <div className="pt-4 pb-2">
              <div className="h-44 w-full flex items-end gap-3 sm:gap-6 border-b border-slate-800 pb-2">
                {(data.chartData || []).map((item, idx) => {
                  const maxRevenue = Math.max(...(data.chartData || []).map(d => d.revenue), 1);
                  const heightPercent = (item.revenue / maxRevenue) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono text-slate-300 font-bold">
                        ${(item.revenue / 1000).toFixed(1)}k
                      </div>
                      <div
                        className="w-full rounded-t-lg bg-slate-800 group-hover:bg-orange-500 transition-all duration-200 cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[11px] font-mono text-slate-400">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Products Contribution Table */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Top Performing Catalog SKUs
              </div>
              <div className="space-y-2">
                {(data.topProducts || []).map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-slate-500 font-bold">0{idx + 1}</span>
                      <span className="font-semibold text-white">{prod.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white">{prod.sales}</span>
                      <span className="font-mono text-emerald-400 font-bold">{prod.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Growth Insight Callout Panel (Right) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">
                      Priority Growth Action
                    </span>
                    <h3 className="text-sm font-bold text-white">AI Growth Insight</h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {data.aiInsight.confidence}
                </span>
              </div>

              {/* Core Insight Statement */}
              <div className="p-4 rounded-xl bg-slate-900 border border-orange-500/40 space-y-2">
                <h4 className="text-base font-bold text-orange-300 leading-snug">
                  “{data.aiInsight.headline}”
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {data.aiInsight.summary}
                </p>
              </div>

              {/* Impact Badge */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Estimated Financial Impact</span>
                <span className="font-bold text-emerald-400 font-mono">{data.aiInsight.impactScore}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#seo-listing"
                  className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-colors"
                >
                  <span>Review Recommended Optimization</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
