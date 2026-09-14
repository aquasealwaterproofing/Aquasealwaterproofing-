import React, { useState } from 'react';
import { X, Phone, MessageCircle, Mail, MapPin, Copy, Check, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+91 97114 94386';
  const cleanPhone = '+919711494386';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('9711494386');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        <div className="bg-[#0A2540] text-white p-4 sm:p-5 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFD700] uppercase tracking-wider mb-1">
              <Phone className="w-3.5 h-3.5" />
              Direct Engineering Helpline
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase">Contact Aquaseal Desk</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          {/* Primary Phone Card */}
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-sm text-center space-y-3">
            <span className="text-[11px] font-black text-[#0A2540] uppercase tracking-widest block">
              Official Helpline & Inquiry Desk
            </span>
            <div className="flex items-center justify-center gap-2">
              <a
                href={`tel:${cleanPhone}`}
                className="text-2xl sm:text-3xl font-mono font-black text-[#0A2540] hover:text-blue-900 transition-colors tracking-tight"
                title="Click to dial"
              >
                {phoneNumber}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-sm bg-white border border-slate-300 hover:border-[#0A2540] text-slate-600 hover:text-[#0A2540] transition-colors cursor-pointer"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] font-bold text-emerald-600 block">
                Number copied to clipboard!
              </span>
            )}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Direct technician dispatch & quotation inquiry
            </div>
          </div>

          {/* Action CTAs: Direct Dial & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              href={`tel:${cleanPhone}`}
              className="py-3 px-4 bg-[#0A2540] hover:bg-[#081e33] text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              id="call-modal-dial-btn"
            >
              <Phone className="w-4 h-4 text-[#FFD700]" />
              Call Now
            </a>

            <a
              href={`https://wa.me/919711494386?text=Hello%20Aquaseal%20Waterproofing%2C%20I%20need%20expert%20waterproofing%20inspection%20and%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              id="call-modal-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Email Support Row */}
          <div className="flex items-center justify-between p-3 bg-sky-50/60 border border-sky-200/80 rounded-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="w-4 h-4 text-sky-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Email Desk
                </span>
                <a
                  href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inquiry%20-%20Aquaseal"
                  className="text-xs font-mono font-bold text-[#0A2540] hover:text-sky-800 truncate block select-all"
                  title="Send email to chohancreation@gmail.com"
                >
                  chohancreation@gmail.com
                </a>
              </div>
            </div>
            <a
              href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inquiry%20-%20Aquaseal"
              className="px-2.5 py-1 text-[11px] font-bold text-sky-800 bg-white hover:bg-sky-100 rounded border border-sky-300 transition-colors shrink-0 ml-2"
            >
              Email Us
            </a>
          </div>

          {/* Office Address Row */}
          <div className="flex items-start justify-between p-3 bg-amber-50/60 border border-amber-200/80 rounded-sm">
            <div className="flex items-start gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Office Location
                </span>
                <p className="text-xs font-medium text-[#0A2540] leading-snug">
                  R 227, Lane 5, Joga Bai Extension,<br />
                  Jamia Nagar, Okhla, New Delhi - 110025
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=R+227+Lane+5+Joga+Bai+Extension+Jamia+Nagar+Okhla+New+Delhi+110025"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-white hover:bg-amber-100 rounded border border-amber-300 transition-colors shrink-0 ml-2 mt-0.5"
            >
              Map
            </a>
          </div>

          <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-sm border border-slate-200">
            <span className="font-bold text-[#0A2540] block uppercase tracking-wider text-[11px]">
              On-Site Inspection Scheduling:
            </span>
            <p className="text-[11px] leading-relaxed">
              Available 7 days a week for residential and commercial terrace inspections, leakage diagnostics, and cost estimation.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="secondary" onClick={onClose} fullWidth size="sm">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
