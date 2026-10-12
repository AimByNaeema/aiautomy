import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const agencyFaqs = [
    {
      id: 'faq-1',
      question: 'What does an AI digital employee actually do for my business?',
      answer:
        'An AI digital employee is a specialized, autonomous agent engineered around your specific operational workflows. It can answer customer inquiries 24/7 grounded strictly in your verified documentation (such as menus, services, pricing, or product specs), qualify inbound sales leads, assist staff with operational summaries, and route complex requests to your team with human approval gates.',
    },
    {
      id: 'faq-2',
      question: 'Can you build or modernize our existing website?',
      answer:
        'Yes. We build bespoke, high-performance websites and web applications using modern full-stack architectures (React, Vite, TypeScript, Tailwind CSS, Node.js/Express, and PostgreSQL). We optimize for sub-second load times, mobile responsiveness, semantic search engine optimization (SEO), and clean conversion flows.',
    },
    {
      id: 'faq-3',
      question: 'How do you prevent the AI from making mistakes or hallucinating?',
      answer:
        'We enforce strict prompt guardrails and Retrieval-Augmented Generation (RAG) tied exclusively to your verified business documentation. If an inquiry falls outside the agent’s verified knowledge base or involves sensitive operations (like refunds, contract signing, or reservations for large parties), the system is programmed to escalate smoothly to a human team member.',
    },
    {
      id: 'faq-4',
      question: 'What is the typical timeline for a custom website or AI agent project?',
      answer:
        'A standard custom business website or focused AI agent integration typically takes 2 to 4 weeks from initial discovery to production deployment. Larger, full-stack digital systems and multi-agent platforms are delivered across structured 4 to 6 week milestones.',
    },
    {
      id: 'faq-5',
      question: 'Do we own the final codebase and customer data?',
      answer:
        'Yes, 100%. You own complete rights to your codebase, database schemas, API configurations, and custom prompt definitions upon project completion and sign-off. We never hold your code hostage or force you into mandatory recurring platform retainers.',
    },
    {
      id: 'faq-6',
      question: 'How do we get started on a project?',
      answer:
        'Simply submit our project intake form on the Contact page or email us directly at aiautomys@gmail.com. We will review your business requirements, prepare a discovery roadmap, and provide a transparent, itemized proposal tailored to your goals.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#040D1F] text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked Questions.
          </h2>
          <p className="text-base text-slate-300">
            Clear, transparent answers about our custom AI agents, web engineering standards, human approval controls, and project deliverables.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3 text-left">
          {agencyFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-colors"
              >
                <button
                  id={`btn-faq-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-950/40 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
