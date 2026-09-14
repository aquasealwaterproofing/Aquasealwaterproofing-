import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export const FloatingContactBar: React.FC = () => {
  const phoneNumber = '97114 94386';
  const phoneHref = 'tel:+919711494386';
  const whatsappHref = 'https://wa.me/919711494386?text=Hello%20Aquaseal%20Waterproofing%2C%20I%20need%20expert%20waterproofing%20inspection%20and%20consultation.';
  const emailHref = 'mailto:chohancreation@gmail.com?subject=Waterproofing%20Inspection%20Inquiry%20-%20Aquaseal';

  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed bottom-4 right-4 z-40 print:hidden pointer-events-auto"
    >
      {/* Mobile-Only: Single Compact Floating WhatsApp Action (doesn't block screen content) */}
      <div className="sm:hidden">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-floating-whatsapp-btn"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-700/30 border-2 border-white flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95"
          title="Chat on WhatsApp: 97114 94386"
          aria-label="Chat on WhatsApp: 97114 94386"
        >
          <MessageCircle className="w-6 h-6 fill-white/20" />
        </a>
      </div>

      {/* Tablet & Desktop: Expanded Floating Action Row */}
      <div className="hidden sm:flex items-center gap-2.5">
        {/* Call Button */}
        <a
          href={phoneHref}
          id="floating-call-btn"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0A2540] hover:bg-[#081e33] text-white rounded-full shadow-lg shadow-[#0A2540]/25 border border-white/20 transition-transform duration-150 hover:scale-105 active:scale-95 group text-xs font-black uppercase tracking-wider"
          title={`Call Aquaseal at ${phoneNumber}`}
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#FFD700] group-hover:scale-110 transition-transform">
            <Phone className="w-3.5 h-3.5 fill-[#FFD700]/30" />
          </div>
          <span className="font-mono tracking-tight text-[13px]">{phoneNumber}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-700/25 border border-white/20 transition-transform duration-150 hover:scale-105 active:scale-95 group text-xs font-black uppercase tracking-wider"
          title="Chat on WhatsApp: 97114 94386"
        >
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* Email Button */}
        <a
          href={emailHref}
          id="floating-email-btn"
          className="flex items-center gap-2 px-3 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-full shadow-lg shadow-sky-800/25 border border-white/20 transition-transform duration-150 hover:scale-105 active:scale-95 group text-xs font-black uppercase tracking-wider"
          title="Email: chohancreation@gmail.com"
        >
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="hidden md:inline text-[11px] font-mono lowercase">chohancreation@gmail.com</span>
        </a>
      </div>
    </aside>
  );
};
