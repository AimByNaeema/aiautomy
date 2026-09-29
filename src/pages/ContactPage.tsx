import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Send,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Bot,
  Layout,
  Zap,
  Globe,
  MessageSquare,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { submitProjectLead } from '../lib/api';
import { ServiceInterest } from '../types';

export const ContactPage: React.FC = () => {
  usePageMetadata({
    title: 'Contact & Start Your Project | AIAUTOMY',
    description: 'Tell us about your business, website vision, or AI agent requirements. We build custom digital solutions designed around your needs.',
  });

  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') as ServiceInterest | null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState<ServiceInterest>(
    preselectedService || 'custom_ai_agent'
  );
  const [industry, setIndustry] = useState('Ecommerce');
  const [budget, setBudget] = useState('$2,500 - $5,000');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setServiceInterest(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitProjectLead({
        full_name: fullName.trim(),
        email: email.trim(),
        company_name: companyName.trim() || undefined,
        website_url: websiteUrl.trim() ? `https://${websiteUrl.trim().replace(/^https?:\/\//, '')}` : undefined,
        phone: phone.trim() || undefined,
        service_interest: serviceInterest,
        business_industry: industry,
        project_budget: budget,
        project_timeline: timeline,
        message: message.trim(),
        source_page: 'contact_page',
      });

      if (res.success) {
        setSubmittedSuccess(true);
      } else {
        setErrorMessage(res.error || 'Failed to send inquiry. Please try again or email us directly.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please email us at aiagentstudioo@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-[90vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact & Start Your Project' }]} />

        {/* Header */}
        <div className="pt-4 pb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Intake & Scoping</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let’s Build Something <span className="text-orange-500">Exceptional.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Tell us what your business needs. We will analyze your requirements and prepare a clear, practical solution architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white">Direct Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have a quick question or prefer to send a project brief directly? We respond to all inquiries within 24 business hours.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Direct Studio Email</span>
                    <a href="mailto:aiagentstudioo@gmail.com" className="font-semibold text-white hover:text-orange-400 font-mono text-xs">
                      aiagentstudioo@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Response Time</span>
                    <span className="font-semibold text-slate-200">Within 24 Business Hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2.5">
                <div className="text-xs font-bold text-slate-200">What Happens Next:</div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>We review your business goals, target audience, and workflow requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>We prepare a proposed technical architecture, timeline, and itemized scope.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>No obligation or sales pressure. Clear communication from start to finish.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Your information is held strictly confidential and never shared.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7">
            {submittedSuccess ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h2>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-orange-400 font-bold">{fullName}</span>. We have saved your project details to our secure database and will reach out to <span className="text-white font-mono">{email}</span> within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="text-orange-400 font-semibold">{serviceInterest.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Industry:</span>
                    <span className="text-slate-200">{industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline:</span>
                    <span className="text-slate-200">{timeline}</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link
                    to="/projects"
                    className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white"
                  >
                    Explore Projects
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 text-left"
              >
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Project Inquiry Form</h3>
                  <span className="text-[10px] font-mono text-orange-400 uppercase">Step 1 of 1</span>
                </div>

                {/* Primary Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    What service are you most interested in? <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'custom_ai_agent' as const, label: 'Custom AI Agent', icon: Bot },
                      { id: 'web_development' as const, label: 'Web Development', icon: Layout },
                      { id: 'ecommerce_solution' as const, label: 'Ecommerce Solution', icon: Globe },
                      { id: 'ai_automation' as const, label: 'AI Automation', icon: Zap },
                      { id: 'custom_digital_solution' as const, label: 'Custom Solution', icon: Sparkles },
                    ].map((item) => {
                      const IconComp = item.icon;
                      const isSelected = serviceInterest === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setServiceInterest(item.id)}
                          className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-sm'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Your Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Work Email <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Company & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Website URL (if existing)</label>
                    <input
                      type="text"
                      placeholder="www.yourcompany.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Industry, Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Restaurants & Cafes">Restaurants & Cafes</option>
                      <option value="Ecommerce">Ecommerce & Retail</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Technology & SaaS">Technology & SaaS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Estimated Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Under $2,500">Under $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                      <option value="Exploring / Scoping">Exploring / Scoping</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">Target Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="2 - 3 Months">2 - 3 Months</option>
                      <option value="Flexible / Planning">Flexible / Planning</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Tell us about your project or what problem you want to solve <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your website goals, AI agent tasks, current operational bottlenecks, or specific features you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct submission to Studio CRM</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 font-bold text-xs text-white flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Saving your inquiry...</span>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
