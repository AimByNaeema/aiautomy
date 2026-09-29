import React, { useEffect, useRef, useState } from 'react';
import { unsplashUrl } from './StockPhoto';
import { Link } from 'react-router-dom';
import {
  Compass,
  FileCode2,
  Palette,
  Hammer,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Lock,
  ChevronRight
} from 'lucide-react';

/** Reveals a card once it scrolls into view. */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
};

// Column-based entrance: left column slides in from the left, middle rises up
// from the bottom (with a slight zoom), right column slides in from the right.
const HIDDEN_BY_COLUMN = [
  'opacity-0 -translate-x-24',
  'opacity-0 translate-y-20 scale-90',
  'opacity-0 translate-x-24',
];

type Step = {
  number: string;
  photo: string;
  photoAlt: string;
  title: string;
  icon: React.ElementType;
  subtitle: string;
  description: string;
};

const StepCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const { ref, shown } = useReveal();
  // Drop the entrance delay once the card is in, so hover effects feel instant.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!shown) return;
    const t = window.setTimeout(() => setSettled(true), 1600);
    return () => window.clearTimeout(t);
  }, [shown]);
  const IconComp = step.icon;
  const isReviewGate = step.number === '05';
  const column = index % 3;
  const row = Math.floor(index / 3);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown && !settled ? `${column * 120 + row * 80}ms` : '0ms' }}
      className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5 ${
        shown ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : HIDDEN_BY_COLUMN[column]
      } ${
        isReviewGate
          ? 'bg-gradient-to-b from-orange-950/30 to-slate-950 border-2 border-orange-500/80 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/25'
          : 'bg-slate-950/80 border border-slate-800 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10'
      }`}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={unsplashUrl(step.photo, 640, 352)}
          srcSet={`${unsplashUrl(step.photo, 420, 231)} 420w, ${unsplashUrl(step.photo, 640, 352)} 640w, ${unsplashUrl(step.photo, 900, 495)} 900w`}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          alt={step.photoAlt}
          loading="lazy"
          decoding="async"
          width={640}
          height={352}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <span className="absolute -bottom-3 right-4 text-6xl font-extrabold font-mono text-white/10 select-none">{step.number}</span>
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur ${
              isReviewGate ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-slate-950/80 text-orange-400'
            }`}
          >
            <IconComp className="w-5 h-5" />
          </div>
          <span
            className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded backdrop-blur ${
              isReviewGate ? 'bg-orange-500/90 text-white' : 'bg-slate-950/80 text-slate-200'
            }`}
          >
            Step {step.number}
          </span>
        </div>
      </div>

      <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">{step.subtitle}</span>
            <h3 className={`text-base font-bold leading-snug ${isReviewGate ? 'text-orange-300' : 'text-white group-hover:text-orange-300 transition-colors'}`}>
              {step.title}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase">{isReviewGate ? 'Mandatory Gate' : 'Milestone'}</span>
          <div className="flex items-center gap-2">
            <span className="h-1 w-16 rounded-full bg-slate-800 overflow-hidden">
              <span
                className="block h-full bg-orange-500 transition-[width] duration-[1200ms] ease-out"
                style={{ width: shown ? `${(Number(step.number) / 6) * 100}%` : '0%', transitionDelay: `${column * 120 + 500}ms` }}
              />
            </span>
            <span className="text-[11px] font-mono text-slate-400">{step.number}/06</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkflowSection: React.FC = () => {
  const steps: Step[] = [
    {
      number: '01',
      photo: '1551836022-d5d88e9218df',
      photoAlt: 'Team meeting with a client to understand the business',
      title: 'Discover & Understand',
      icon: Compass,
      subtitle: 'Analysis & Alignment',
      description:
        'We analyze your workflows, audience, and operational bottlenecks to define clear, measurable technical goals.',
    },
    {
      number: '02',
      photo: '1596496181871-9681eacf9764',
      photoAlt: 'Planning a system architecture on a whiteboard',
      title: 'Plan & Architect',
      icon: FileCode2,
      subtitle: 'System Specification',
      description:
        'We design data schemas, prompt trees, API integrations, and human approval gates before writing code.',
    },
    {
      number: '03',
      photo: '1522542550221-31fd19575a2d',
      photoAlt: 'Colourful website wireframes and prototype sketches',
      title: 'Design & Prototype',
      icon: Palette,
      subtitle: 'Interface & Flow',
      description:
        'We create responsive layouts, pairing typography with intuitive conversational interfaces and preview sandboxes.',
    },
    {
      number: '04',
      photo: '1489875347897-49f64b51c1f8',
      photoAlt: 'Developer writing code on a laptop',
      title: 'Build & Engineer',
      icon: Hammer,
      subtitle: 'Full-Stack Development',
      description:
        'We write clean React/TypeScript code, secure API proxy endpoints, and fine-grained API-layer access control.',
    },
    {
      number: '05',
      photo: '1519336367661-eba9c1dfa5e9',
      photoAlt: 'Testing the new app on a smartphone',
      title: 'Review, Test & Refine',
      icon: CheckCircle2,
      subtitle: 'Client Sign-Off Gate',
      description:
        'You review and test the live staging environment. We test edge cases and calibrate prompt responses.',
    },
    {
      number: '06',
      photo: '1758691737138-7b9b1884b1db',
      photoAlt: 'Team celebrating a successful launch',
      title: 'Launch & Support',
      icon: Rocket,
      subtitle: 'Zero Downtime Launch',
      description:
        'We deploy to production, connect domains, configure SSL, and provide ongoing technical maintenance.',
    },
  ];

  return (
    <section id="how-it-works" className="overflow-x-clip py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-14 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400 font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Disciplined Methodology</span>
          </div>
          <h2
            id="workflow-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            How We Build <span className="text-orange-500">Your Solution.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A structured 6-step lifecycle combining modern full-stack development with strict human-in-the-loop governance for every mission-critical capability.
          </p>
        </div>

        {/* 6-Step Pipeline Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Link to Full Methodology Page */}
        <div className="mt-12 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider font-mono hover:underline"
          >
            <span>Read Detailed Security & Human Approval Guidelines</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
