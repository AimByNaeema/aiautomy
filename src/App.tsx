/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageViewTracker } from './components/PageViewTracker';
import { ToastNotification } from './components/Modals';
import ChatWidget from './components/ChatWidget';

// Dedicated Page Components
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LoginPage } from './pages/LoginPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { AdminPage } from './pages/AdminPage';
import { AiAgentsPage } from './pages/AiAgentsPage';
import { WebDevelopmentPage } from './pages/WebDevelopmentPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4500);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageViewTracker />
      <div className="min-h-screen bg-slate-950 text-slate-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/ai-agents" element={<AiAgentsPage />} />
            <Route path="/web-development" element={<WebDevelopmentPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Notification Toast */}
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />

        {/* Floating AI chat widget (visible on every page) */}
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}
