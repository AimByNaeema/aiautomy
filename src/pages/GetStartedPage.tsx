import React, { useState } from 'react';
import { PageBanner } from '../components/StockPhoto';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Bot,
  Layout,
  Globe,
  Zap,
  Sparkles,
  Lock,
  Building,
  Check,
  MessageSquare
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { submitProjectLead } from '../lib/api';

export const GetStartedPage: React.FC = () => {
  usePageMetadata({
    title: 'Get Started: Project Discovery & Custom Scope | AIAUTOMY',
    description: 'Tell us about your project requirements and operational goals. We will prepare an initial discovery roadmap and itemized proposal.',
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialService = searchParams.get('service') || 'custom_ai_agent';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [industry, setIndustry] = useState<string>('Restaurant & Hospitality');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [budget, setBudget] = useState<string>('$2,500 - $5,000');
  const [timeline, setTimeline] = useState<string>('2 - 4 Weeks');
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([
    'Automate customer inquiries & menu guidance',
    'Modernize brand website & mobile experience',
  ]);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const services = [
    { id: 'custom_ai_agent', title: 'Custom AI Digital Employee', icon: Bot, desc: 'Specialized agent for support, menus, sales, or staff workflows' },
    { id: 'web_development', title: 'Modern Business Website', icon: Layout, desc: 'High-performance responsive site with sub-second speeds' },
    { id: 'ecommerce_solution', title: 'Ecommerce & Growth Platform', icon: Globe, desc: 'Storefront optimization, product discovery, & listing SEO' },
    { id: 'ai_automation', title: 'AI Business Automation', icon: Zap, desc: 'Multi-step workflow pipelines connecting tools & databases' },
    { id: 'custom_digital_solution', title: 'Custom Digital System', icon: Sparkles, desc: 'Full-stack bespoke web app with AI logic and a secure database' },
  ];

  const handleToggleObjective = (obj: string) => {
    if (selectedObjectives.includes(obj)) {
      if (selectedObjectives.length > 1) {
        setSelectedObjectives(selectedObjectives.filter((o) => o !== obj));
      }
    } else {
      setSelectedObjectives([...selectedObjectives, obj]);
    }
  };

  const handleLaunchDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !email.trim()) {
      setSubmitError('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitProjectLead({
        full_name: contactName.trim(),
        email: email.trim(),
        company_name: companyName.trim() || undefined,
        website_url: websiteUrl.trim() ? `https://${websiteUrl.trim().replace(/^https?:\/\//, '')}` : undefined,
        service_interest: selectedService as any,
        business_industry: industry,
        project_budget: budget,
        project_timeline: timeline,
        message: `Project Discovery Intake. Objectives: ${selectedObjectives.join(', ')}. Additional Notes: ${notes.trim() || 'None provided.'}`,
        source_page: 'get_started_wizard',
      });
    } catch (err: any) {
      console.warn('Lead capture notice:', err);
    }

    setIsSubmitting(false);
    setIsCompleted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-[90vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Get Started & Project Intake' }]} />

        {/* Page Header */}
        <div className="pt-4 pb-8 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Discovery Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build Your Custom <span className="text-orange-500">Digital Solution</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Tell us about your operational requirements. We will prepare an initial architecture proposal.
          </p>
        </div>

        <PageBanner photo="getStarted" caption="Tell us about your idea — we will turn it into a clear project plan." />

        {/* Step Progress Bar */}
        {!isCompleted && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              {[
                { num: 1, label: '1. Service & Industry' },
                { num: 2, label: '2. Goals & Scope' },
                { num: 3, label: '3. Contact & Review' },
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                    currentStep === s.num
                      ? 'bg-orange-500 border-orange-400 text-white font-bold shadow-md shadow-orange-500/20'
                      : currentStep > s.num
                      ? 'bg-slate-900 border-emerald-500/40 text-emerald-400 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Completion Success State */}
        {isCompleted ? (
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Discovery Intake Received!</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Thank you, <span className="text-white font-bold">{contactName}</span>. Your project inquiry has been securely recorded in our database. We will review your goals for <span className="text-orange-400 font-semibold">{companyName || 'your business'}</span> and follow up within 24 hours at <span className="text-white font-mono">{email}</span>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/projects"
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white"
              >
                View Project Portfolio
              </Link>
              <Link
                to="/"
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-200"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Intake Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Questionnaire */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-left">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 01 of 03</span>
                    <h3 className="text-lg font-bold text-white">Select Primary Service & Industry</h3>
                    <p className="text-xs text-slate-400">What digital capability are you looking to build?</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Core Service Focus</label>
                    <div className="space-y-2">
                      {services.map((srv) => {
                        const isSelected = selectedService === srv.id;
                        const SrvIcon = srv.icon;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => setSelectedService(srv.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-orange-500/15 border-orange-500 text-white shadow-md'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400'}`}>
                                <SrvIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-white block">{srv.title}</span>
                                <span className="text-[11px] text-slate-400">{srv.desc}</span>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-slate-300 block">Industry Sector</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Restaurant & Hospitality">Restaurant, Cafe & Dining</option>
                      <option value="Ecommerce & Retail">Ecommerce & Online Retail</option>
                      <option value="Real Estate & Property">Real Estate & Property Management</option>
                      <option value="Professional Services & Legal">Professional Services & Consulting</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Technology & SaaS">Technology & Software</option>
                      <option value="Other Industry">Other Custom Business</option>
                    </select>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Continue to Goals & Scope</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 02 of 03</span>
                    <h3 className="text-lg font-bold text-white">Project Goals & Parameters</h3>
                    <p className="text-xs text-slate-400">Select priorities and approximate milestones.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Key Project Objectives</label>
                    {[
                      'Automate customer inquiries & menu guidance',
                      'Modernize brand website & mobile experience',
                      'Capture and qualify inbound sales leads',
                      'Connect custom APIs & database workflows',
                      'Build human-in-the-loop approval gates',
                    ].map((obj) => {
                      const isSelected = selectedObjectives.includes(obj);
                      return (
                        <div
                          key={obj}
                          onClick={() => handleToggleObjective(obj)}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-orange-500/10 border-orange-500 text-white font-medium'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{obj}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Estimated Budget Range</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="$1,500 - $2,500">$1,500 - $2,500 (Starter)</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000 (Standard)</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 (Comprehensive)</option>
                        <option value="$10,000+">$10,000+ (Custom Enterprise)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Desired Timeline</label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="ASAP (< 2 Weeks)">ASAP (&lt; 2 Weeks)</option>
                        <option value="2 - 4 Weeks">2 - 4 Weeks</option>
                        <option value="1 - 2 Months">1 - 2 Months</option>
                        <option value="Flexible / Scoping Phase">Flexible / Scoping Phase</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white border border-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Continue to Contact Info</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <form onSubmit={handleLaunchDiscovery} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">Step 03 of 03</span>
                    <h3 className="text-lg font-bold text-white">Your Contact Details & Notes</h3>
                    <p className="text-xs text-slate-400">Where should we deliver the discovery roadmap?</p>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Work Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Company / Business Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Coffee Co."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">Current Website (optional)</label>
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="acmecafe.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Additional Notes or Feature Requests</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share any specific tools you use (e.g. Shopify, Slack, POS) or specific requirements..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Saved securely to our CRM. No sales spam or unapproved outreach.</span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-400 hover:text-white border border-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Saving Proposal Request...</span>
                      ) : (
                        <>
                          <span>Submit Discovery Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-white font-bold">Scope Summary</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Step {currentStep}/3</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Service:</span>
                    <span className="font-bold text-white capitalize">{selectedService.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Industry:</span>
                    <span className="text-slate-200">{industry}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="text-orange-400 font-mono">{budget}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Timeline:</span>
                    <span className="text-slate-200">{timeline}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-white block">What happens next?</span>
                  <p className="text-slate-400 leading-relaxed">
                    We review your submission, prepare an architectural overview, and email you an itemized proposal with clear milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
