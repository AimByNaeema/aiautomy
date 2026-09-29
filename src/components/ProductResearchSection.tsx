import React, { useState } from 'react';
import { StockPhoto, type PhotoKey } from './StockPhoto';

export const PROJECT_PHOTOS: Record<string, PhotoKey> = {
  'proj-cafebot': 'restaurants',
  'proj-ecommerce-growth-ai': 'ecommerceGrowth',
  'proj-custom-ai-agents': 'customAi',
};
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Bot,
  Globe,
  Utensils,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { INITIAL_PROJECTS } from '../lib/api';
import { ProjectRecord } from '../types';

export const ProductResearchSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectRecord>(INITIAL_PROJECTS[0]);

  const projects = INITIAL_PROJECTS;

  const getStatusBadge = (status: ProjectRecord['status']) => {
    switch (status) {
      case 'in_development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>IN DEVELOPMENT</span>
          </span>
        );
      case 'available_for_custom_projects':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AVAILABLE</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-800 text-left">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Projects & Portfolio</span>
            </div>
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Active Developments & <span className="text-orange-500">Custom Work.</span>
            </h2>
            <p className="text-base text-slate-300">
              We take pride in transparent engineering. Explore our proprietary products in active development and our bespoke systems available for clients.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/projects"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View Full Portfolio</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Projects Split Matrix */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          {/* Projects List (Left) */}
          <div className="lg:col-span-6 space-y-3.5">
            {projects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500 shadow-xl shadow-orange-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-semibold uppercase text-orange-400">
                        {proj.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {proj.name}
                      </h3>
                    </div>
                    <div>{getStatusBadge(proj.status)}</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.short_description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {(proj.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project Deep Dive Detail Card (Right) */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5 text-white h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="-mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-2 relative overflow-hidden rounded-t-2xl border-b border-slate-800">
                  <StockPhoto
                    key={selectedProject.id}
                    photo={PROJECT_PHOTOS[selectedProject.id] || 'customAi'}
                    width={720}
                    ratio={16 / 7}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase">{selectedProject.category}</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{selectedProject.name}</h4>
                  </div>
                  <div>{getStatusBadge(selectedProject.status)}</div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-orange-400 font-bold block">
                    Architecture & Purpose
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.full_description || selectedProject.short_description}
                  </p>
                </div>

                {/* Status Callout Box */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-white block">Project Stage</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedProject.status === 'in_development'
                      ? 'Actively in development. Core prompting pipelines, security boundaries, and database models are active.'
                      : 'Available for immediate client scoping and bespoke customization.'}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Core Technical Components
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(selectedProject.technologies || []).map((t) => (
                      <div key={t} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/projects`}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/contact?project=${encodeURIComponent(selectedProject.name)}`}
                  className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white"
                >
                  Discuss System
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
