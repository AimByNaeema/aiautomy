import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Sparkles,
  Bot,
  Globe,
  Utensils,
  ShoppingBag,
  ExternalLink,
  Code2,
  Clock,
  ChevronRight,
  Database,
  Sliders,
  X
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { INITIAL_PROJECTS } from '../lib/api';
import { ProjectRecord } from '../types';

export const ProjectsPage: React.FC = () => {
  usePageMetadata({
    title: 'Selected Projects & Portfolio | AIAUTOMY',
    description: 'Explore our selected projects, active developments, and bespoke systems. Honest technical documentation and architecture overviews.',
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'ai_agents' | 'web' | 'ecommerce' | 'in_development'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  const projects: ProjectRecord[] = INITIAL_PROJECTS;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai_agents') return p.category.includes('Agent') || p.category.includes('AI');
    if (activeFilter === 'web') return p.category.includes('Web') || p.category.includes('Custom');
    if (activeFilter === 'ecommerce') return p.category.includes('Ecommerce');
    if (activeFilter === 'in_development') return p.status === 'in_development';
    return true;
  });

  const getStatusBadge = (status: ProjectRecord['status']) => {
    switch (status) {
      case 'in_development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>IN DEVELOPMENT</span>
          </span>
        );
      case 'concept':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <span>CONCEPT & ARCHITECTURE</span>
          </span>
        );
      case 'available_for_custom_projects':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AVAILABLE FOR CUSTOM PROJECTS</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Selected Projects & Portfolio' }]} />

        {/* Header */}
        <div className="pt-4 pb-12 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-orange-400 uppercase tracking-wider">Project Portfolio</span>
            <span className="text-slate-600">|</span>
            <span>Real Architecture & Developments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Selected Work & <span className="text-orange-500">Active Systems.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We focus on substance, clean code, and practical utility. Explore our active projects, concepts under development, and custom solutions available for modern businesses.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparency First: Projects in progress are marked clearly as In Development.</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8">
          {[
            { id: 'all' as const, label: 'All Projects' },
            { id: 'ai_agents' as const, label: 'AI Digital Employees' },
            { id: 'web' as const, label: 'Web Development' },
            { id: 'ecommerce' as const, label: 'Ecommerce' },
            { id: 'in_development' as const, label: 'In Development' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-orange-400 font-semibold">{proj.category}</span>
                  {getStatusBadge(proj.status)}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{proj.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {proj.short_description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(proj.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-1.5 pt-1">
                  {proj.slug === 'cafebot' && (
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Interactive menu explanation & allergen guidance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Reservation inquiry formatting & staff escalation</span>
                      </div>
                    </div>
                  )}

                  {proj.slug === 'ecommerce-growth-ai' && (
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Competitor review analysis & keyword discovery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Autonomous listing copy generator with human sign-off</span>
                      </div>
                    </div>
                  )}

                  {proj.slug === 'custom-ai-agents' && (
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Tailored around proprietary business processes & SOPs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Built with PostgreSQL & secure authentication</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {proj.status === 'available_for_custom_projects' ? (
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white shadow-sm"
                  >
                    Start Project
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Concept Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150 text-left max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{selectedProject.name}</h2>
                    {getStatusBadge(selectedProject.status)}
                  </div>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">{selectedProject.category}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase text-orange-400 font-bold">Project Overview & Purpose</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.long_description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">Current Development Status</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedProject.status === 'in_development'
                    ? 'This project is actively in design and development. The core reasoning architecture, prompt engineering, and database schemas are established. We do not display simulated metrics as real customer data.'
                    : 'This service framework is fully available for client engagements. We build bespoke implementations matching your specific organizational requirements.'}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Technical Architecture
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(selectedProject.technologies || []).map((t) => (
                    <div key={t} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-xs font-mono text-white font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-mono">
                  Slug: <code className="text-orange-400">{selectedProject.slug}</code>
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800"
                  >
                    Close
                  </button>
                  <Link
                    to={`/contact?project=${encodeURIComponent(selectedProject.name)}`}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white text-center shadow-md shadow-orange-500/20"
                  >
                    Discuss This System
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Project Scoping Callout */}
        <div className="mt-14 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">Have a Custom Project?</span>
              <h3 className="text-2xl font-bold text-white">We Build Digital Systems Around Your Specific Needs</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you need a custom AI digital employee, a modern company website, an ecommerce platform, or automated internal tooling, we can engineer it.
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white flex items-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/25"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
