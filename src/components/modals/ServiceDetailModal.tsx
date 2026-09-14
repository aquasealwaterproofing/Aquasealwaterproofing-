import React from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  typicalApplications: string[];
  assessmentFocus: string;
  recommendedNextStep: string;
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onRequestInspection: (serviceTitle: string) => void;
  onCallNow: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestInspection,
  onCallNow,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-5 sm:p-6 flex items-start justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#FFD700] uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Service Overview & Inspection Guide
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-tight">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-sm transition-colors border border-transparent hover:border-white/20"
            aria-label="Close details dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Main Description */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 p-4 rounded-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
              Scope of Protection
            </span>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Typical Application Areas */}
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0A2540] block mb-2.5">
              Common Assessment Areas
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.typicalApplications.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 px-3 py-2 rounded-sm shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0A2540] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* On-Site Technical Evaluation Note */}
          <div className="bg-blue-50/70 border border-blue-100 p-3.5 rounded-sm space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0A2540] block">
              Evaluation Methodology
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {service.assessmentFocus}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            fullWidth
            size="md"
            iconLeft={<Calendar className="w-4 h-4 text-white" />}
            onClick={() => {
              onClose();
              onRequestInspection(service.title);
            }}
            id="service-modal-inspect-cta"
          >
            Get Free Inspection
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="md"
            iconLeft={<Phone className="w-4 h-4 text-[#0A2540]" />}
            onClick={() => {
              onClose();
              onCallNow();
            }}
            id="service-modal-call-cta"
          >
            Call: 97114 94386
          </Button>
        </div>
      </div>
    </div>
  );
};
