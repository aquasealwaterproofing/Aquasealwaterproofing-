import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

interface BrandHeaderProps {
  onOpenInspectionModal?: () => void;
  onCallNow?: () => void;
  activeSection?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  onOpenInspectionModal,
  onCallNow,
  activeSection = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentNav, setCurrentNav] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      // Detect current visible section for active navigation indicator
      const sectionIds = ['contact', 'about', 'before-after', 'our-work', 'services', 'home'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 140) {
            setCurrentNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Our Work', href: '#our-work', id: 'our-work' },
    { label: 'Before & After', href: '#before-after', id: 'before-after' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id: string, href: string) => {
    setCurrentNav(id);
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-site-header"
      className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'shadow-md shadow-slate-900/5 border-b border-slate-200'
          : 'border-b border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left Side: Official Dr. Fixit Logo Asset + AQUASEAL WATERPROOFING */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', '#home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 xs:gap-3 sm:gap-3.5 shrink-0 group py-1"
            aria-label="AQUASEAL WATERPROOFING Home"
          >
            {/* Exact Dr. Fixit Logo Asset */}
            <div className="flex items-center border border-slate-200 rounded-sm p-1 bg-white shadow-2xs group-hover:border-slate-300 transition-colors">
              <img
                src="/dr-fixit-logo-cropped.jpg"
                alt="Dr. Fixit Official Logo Asset"
                referrerPolicy="no-referrer"
                className="h-8 xs:h-9 sm:h-12 w-auto object-contain rounded-xs"
              />
            </div>

            <div className="h-7 sm:h-9 w-px bg-slate-200 hidden xs:block" />

            {/* AQUASEAL WATERPROOFING Brand Lockup */}
            <div className="flex flex-col justify-center">
              <span className="text-base xs:text-lg sm:text-xl font-black tracking-tight text-[#0A2540] leading-none uppercase">
                AQUASEAL
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] xs:tracking-[0.2em] text-[#0A2540] uppercase leading-none mt-0.5 sm:mt-1">
                WATERPROOFING
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links (Large Screens >= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-3 xl:gap-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  className={`text-xs font-extrabold uppercase tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0A2540]'
                      : 'text-slate-600 hover:text-[#0A2540]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FFD700] rounded-xs" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Side: Responsive Actions (Adaptive for Desktop, Tablet, and Mobile) */}
          <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
            
            {/* Phone/Call: On Desktop/Tablet shows number; on mobile shows compact quick dial */}
            <a
              href="tel:+919711494386"
              className="hidden sm:flex h-9 sm:h-10 px-2.5 sm:px-3 items-center gap-1.5 sm:gap-2 border border-slate-200 hover:border-[#0A2540] hover:bg-slate-50 text-[#0A2540] rounded-sm text-xs font-black uppercase tracking-wider transition-colors cursor-pointer group shrink-0"
              aria-label="Call +91 97114 94386"
              title="Call Helpline: +91 97114 94386"
              id="header-phone-action-btn"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A2540] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-tight">97114 94386</span>
            </a>

            {/* Mobile-only Quick Call Icon (< 640px) */}
            <a
              href="tel:+919711494386"
              className="sm:hidden flex items-center justify-center w-9 h-9 border border-blue-200 bg-blue-50 text-[#0A2540] hover:bg-blue-100 rounded-sm transition-colors shrink-0"
              aria-label="Call +91 97114 94386"
              title="Call Helpline: +91 97114 94386"
              id="mobile-header-call-btn"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Primary CTA Button: Get Free Inspection (Visible on Tablet & Desktop >= 640px) */}
            <div className="hidden sm:block shrink-0">
              <Button
                variant="primary"
                size="md"
                iconLeft={<Calendar className="w-4 h-4 text-white" />}
                onClick={onOpenInspectionModal}
                id="header-free-inspection-btn"
                className="h-9 sm:h-10 px-3 sm:px-4 text-xs font-black shrink-0 whitespace-nowrap"
              >
                Get Free Inspection
              </Button>
            </div>

            {/* Hamburger Toggle - Visible on Mobile and Tablet (< 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0A2540] hover:bg-slate-100 rounded-sm transition-colors border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A2540] w-9 h-9 flex items-center justify-center cursor-pointer shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Clean Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-4 shadow-xl transition-all duration-200"
        >
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation Drawer">
            {navLinks.map((link) => {
              const isActive = currentNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-sm text-xs font-extrabold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0A2540]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2540]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FFD700]" />}
                </a>
              );
            })}
          </nav>

          {/* Drawer Action CTAs */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Button
              variant="primary"
              fullWidth
              size="md"
              iconLeft={<Calendar className="w-4 h-4 text-white" />}
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenInspectionModal) onOpenInspectionModal();
              }}
              id="mobile-drawer-inspect-btn"
            >
              Get Free Inspection
            </Button>

            <a
              href="tel:+919711494386"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 hover:border-[#0A2540] hover:bg-slate-50 text-[#0A2540] rounded-sm text-xs font-black uppercase tracking-wider transition-colors"
              id="mobile-drawer-call-btn"
            >
              <Phone className="w-4 h-4 text-[#0A2540]" />
              <span>Call: +91 97114 94386</span>
            </a>

            <a
              href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inquiry%20-%20Aquaseal"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 hover:border-sky-600 hover:bg-sky-50/60 text-slate-700 rounded-sm text-xs font-bold transition-colors"
              id="mobile-drawer-email-btn"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-mono text-[11px] truncate">chohancreation@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
