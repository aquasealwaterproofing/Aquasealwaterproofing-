import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight,
  X,
  FileText,
  Calendar
} from 'lucide-react';

interface BrandFooterProps {
  onOpenInspectionModal?: (servicePrefill?: string) => void;
  onCallModalOpen?: () => void;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({
  onOpenInspectionModal,
  onCallModalOpen,
}) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceName: string) => {
    if (onOpenInspectionModal) {
      onOpenInspectionModal(serviceName);
    } else {
      const targetElement = document.querySelector('#services');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="site-footer" className="bg-[#0A2540] text-white border-t-4 border-[#FFD700]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main 4-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Description Column (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Dr. Fixit Logo + AQUASEAL WATERPROOFING Branding */}
            <div className="flex items-center gap-3.5">
              <div className="flex items-center border border-white/20 rounded-sm p-1.5 bg-white shadow-2xs shrink-0">
                <img
                  src="./dr-fixit-logo-cropped.jpg"
                  alt="Dr. Fixit Official Logo Asset"
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-12 w-auto object-contain rounded-xs"
                />
              </div>

              <div className="h-10 w-px bg-white/20" />

              <div className="flex flex-col justify-center">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white leading-none uppercase">
                  AQUASEAL
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-[#FFD700] uppercase leading-none mt-1">
                  WATERPROOFING
                </span>
              </div>
            </div>

            {/* Exact Required Short Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
              Professional waterproofing solutions for residential and commercial properties.
            </p>

            {/* Quality Standard Note */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>Standardized chemical application & surface diagnosis</span>
            </div>
          </div>

          {/* COMPANY Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#FFD700] transition-transform group-hover:translate-x-0.5" />
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="#our-work"
                  onClick={(e) => handleSmoothScroll(e, '#our-work')}
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#FFD700] transition-transform group-hover:translate-x-0.5" />
                  <span>Our Work</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#FFD700] transition-transform group-hover:translate-x-0.5" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                'Terrace Waterproofing',
                'Roof Waterproofing',
                'Wall Seepage Treatment',
                'Bathroom Waterproofing',
                'Crack Repair',
                'Basement Waterproofing',
              ].map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => handleServiceClick(service)}
                    className="text-slate-300 hover:text-white transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-[#FFD700] transition-colors" />
                    <span>{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT Column (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
              CONTACT
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Phone:</span>
                  <a
                    href="tel:+919711494386"
                    className="text-white hover:text-[#FFD700] font-mono font-bold text-xs transition-colors select-all"
                    title="Click to dial +91 97114 94386"
                  >
                    +91 97114 94386
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">WhatsApp:</span>
                  <a
                    href="https://wa.me/919711494386?text=Hello%20Aquaseal%20Waterproofing%2C%20I%20need%20expert%20waterproofing%20inspection%20and%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-mono font-bold text-xs transition-colors select-all"
                    title="Click to chat on WhatsApp"
                  >
                    +91 97114 94386
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Email:</span>
                  <a
                    href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inquiry%20-%20Aquaseal"
                    className="text-white hover:text-[#FFD700] font-mono text-xs transition-colors select-all break-all"
                    title="Click to email chohancreation@gmail.com"
                  >
                    chohancreation@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">Head Office:</span>
                  <a
                    href="https://maps.google.com/?q=R+227+Lane+5+Joga+Bai+Extension+Jamia+Nagar+Okhla+New+Delhi+110025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-[#FFD700] text-xs transition-colors block leading-relaxed"
                    title="Click to view on Google Maps"
                  >
                    R 227, Lane 5, Joga Bai Ext.,<br />
                    Jamia Nagar, Okhla, New Delhi 110025
                  </a>
                </div>
              </li>
            </ul>

            {/* Quick Inspection Prompt */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenInspectionModal && onOpenInspectionModal()}
                className="w-full py-2 px-3 bg-white/10 hover:bg-[#FFD700] text-white hover:text-[#0A2540] border border-white/20 rounded-sm text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Request Free Inspection
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          
          {/* Copyright notice */}
          <p>© 2026 Aquaseal Waterproofing. All rights reserved.</p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs">
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Terms
            </button>
          </div>

        </div>

      </div>

      {/* Privacy Policy & Terms Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-slate-900 rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
            <div className="bg-[#0A2540] text-white p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FFD700]" />
                <h4 className="text-base font-black uppercase tracking-tight">
                  {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h4>
              </div>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-300 hover:text-white p-1 rounded-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeLegalModal === 'privacy' ? (
                <>
                  <p className="font-semibold text-slate-800">
                    Aquaseal Waterproofing respects your property privacy and personal data.
                  </p>
                  <p>
                    Information provided via our website (such as full name, phone number, property type, and leakage descriptions) is used strictly for scheduling site moisture inspections and providing waterproofing proposals.
                  </p>
                  <p>
                    We do not share, sell, or distribute client contact details to third-party telemarketers or advertisers.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-slate-800">
                    Service Assessment & Execution Terms
                  </p>
                  <p>
                    Free preliminary inspections and technical recommendations are provided based on visible moisture patterns, thermal checks, and substrate condition at the time of evaluation.
                  </p>
                  <p>
                    Formal work estimates and chemical application specifications are provided in writing prior to commencement. All applications follow standardized substrate preparation procedures.
                  </p>
                </>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 bg-[#0A2540] text-white text-xs font-black uppercase tracking-wider rounded-sm hover:bg-[#07192C] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
