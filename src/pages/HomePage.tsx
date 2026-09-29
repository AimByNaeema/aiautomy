import React from 'react';
import { Hero } from '../components/Hero';
import { HeroIllustration } from '../components/HeroIllustration';
import { PlatformSection } from '../components/PlatformSection';
import { GlobalMarketSection } from '../components/GlobalMarketSection';
import { ProductResearchSection } from '../components/ProductResearchSection';
import { WorkflowSection } from '../components/WorkflowSection';
import { SecurityControlSection, CostEfficiencySection } from '../components/SecurityControlSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const HomePage: React.FC = () => {
  usePageMetadata({
    title: 'AIAUTOMY — Custom AI Agents, Websites & Business Automation',
    description: 'We build custom AI agents, professional websites, ecommerce systems, automation workflows, and digital tools designed around the needs of each business.',
  });

  return (
    <div className="text-white">
      {/* 1. Hero Section: Core Brand Identity & Coordinated Workspace */}
      <Hero />

      {/* 1b. Visual overview of what we build */}
      <section
        id="home-visual-overview"
        aria-label="What AIAUTOMY builds"
        className="bg-slate-950 border-b border-slate-800/80 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-2 sm:p-3 shadow-2xl shadow-slate-950/70">
            <HeroIllustration className="w-full h-auto block rounded-[22px]" />
          </div>
          <p className="mt-5 text-center text-sm text-slate-400">
            Websites, AI agents, automation and growth — built together and working as one system.
          </p>
        </div>
      </section>

      {/* 2. Services Section: What We Do */}
      <PlatformSection />

      {/* 3. AI Digital Employees by Industry Vertical */}
      <GlobalMarketSection />

      {/* 4. Selected Projects & Portfolio */}
      <ProductResearchSection />

      {/* 5. How We Work: 6-Step Engineering Lifecycle */}
      <WorkflowSection />

      {/* 6. Security, Trust & Human Approval Controls */}
      <SecurityControlSection />

      {/* 7. Engineering Performance Standards (Sub-Second Speed, Mobile First, SEO) */}
      <CostEfficiencySection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Final High-Impact Call to Action */}
      <FinalCtaSection />
    </div>
  );
};
