import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Bot, Layout, Zap, Layers, FolderKanban, HelpCircle, Tag, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: null },
    { name: 'AI Agents', href: '/ai-agents', icon: Bot },
    { name: 'Web Development', href: '/web-development', icon: Layout },
    { name: 'Solutions', href: '/solutions', icon: Zap },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
    { name: 'Pricing', href: '/pricing', icon: Tag },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/20 py-3'
          : 'bg-slate-950/90 md:bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Wordmark */}
          <Link
            id="brand-logo-link"
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-bold text-base group-hover:bg-orange-600 transition-colors">
              <span className="font-mono text-sm tracking-tighter">AI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight flex items-center gap-1 font-sans">
                AI<span className="text-orange-500 text-xs font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30">AUTOMY</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                Digital Employees & Websites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'text-orange-400 bg-slate-900 border border-slate-800 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Nav for Medium-Large Screens */}
          <nav id="desktop-nav-compact" className="hidden lg:flex xl:hidden items-center gap-1" aria-label="Compact Navigation">
            {navLinks.slice(0, 6).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    active
                      ? 'text-orange-400 bg-slate-900 border border-slate-800 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/pricing"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isActive('/pricing') ? 'text-orange-400 bg-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Right Action Button: Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              id="btn-nav-start-project"
              to="/contact"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg shadow-md shadow-orange-500/25 transition-all duration-150 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              id="btn-mobile-start-project"
              to="/contact"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow-sm"
            >
              Start Project
            </Link>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-150"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2.5 ${
                    isActive(link.href)
                      ? 'text-orange-400 bg-slate-900 border border-slate-800 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {IconComp && <IconComp className="w-4 h-4 text-orange-400 shrink-0" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

