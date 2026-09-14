import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Building, Calendar, Phone, Mail, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { submitInquiry, openWhatsAppDirectly, TARGET_DISPLAY_PHONE, TARGET_WHATSAPP_NUMBER } from '../../lib/inquiryService';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProblemArea?: string;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  initialProblemArea,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    structureType: 'Residential Independent House',
    problemArea: initialProblemArea || 'Terrace / Roof Leakage',
  });

  React.useEffect(() => {
    if (initialProblemArea) {
      setFormData((prev) => ({ ...prev, problemArea: initialProblemArea }));
    }
  }, [initialProblemArea]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        type: 'inspection',
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        structureType: formData.structureType,
        problemArea: formData.problemArea,
      });

      setWhatsappLink(res.whatsappUrl);
      setSubmitted(true);
      // Attempt to immediately open WhatsApp
      openWhatsAppDirectly(res.whatsappUrl);
    } catch (err) {
      console.error('Error submitting inspection request:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setWhatsappLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-4 sm:p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD700] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              Official Technical Evaluation
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Request Free Site Inspection</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              An Aquaseal waterproofing engineer will assess moisture levels and structural integrity.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md transition-colors shrink-0 ml-2"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm animate-in zoom-in-75 duration-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-xl font-black text-[#0A2540] uppercase tracking-tight">Inspection Request Logged!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your site inspection details have been recorded. Click below to send directly to our official WhatsApp helpline at <strong>{TARGET_DISPLAY_PHONE}</strong>.
                </p>
              </div>

              {/* Inquiry Details Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-left text-xs space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Customer:</span>
                  <span className="font-bold text-[#0A2540]">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <span className="font-mono font-bold text-[#0A2540]">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Location:</span>
                  <span className="font-medium">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Issue Area:</span>
                  <span className="font-bold text-[#0A2540]">{formData.problemArea}</span>
                </div>
              </div>

              {/* Primary Action: Direct WhatsApp Chat */}
              <div className="space-y-2.5 pt-1">
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Ensure it also opens directly on mobile or web
                      openWhatsAppDirectly(whatsappLink);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                    <span>Send Request on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <p className="text-[11px] text-slate-500 text-center leading-tight">
                  Yeh request Aquaseal ke official WhatsApp <strong>{TARGET_DISPLAY_PHONE}</strong> par jaati hai. Upar click karke message turant bhejein.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:+${TARGET_WHATSAPP_NUMBER}`}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0A2540] hover:bg-[#123659] text-[#FFD700] rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {TARGET_DISPLAY_PHONE}
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name / Contact Person
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent text-[#1A2433]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent text-[#1A2433]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    City / Locality
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Mumbai, Delhi, NCR"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent text-[#1A2433]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Structure Type
                  </label>
                  <select
                    value={formData.structureType}
                    onChange={(e) => setFormData({ ...formData, structureType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540] text-[#1A2433] bg-white"
                  >
                    <option value="Residential Independent House">Residential Independent House</option>
                    <option value="Residential Apartment / Society">Residential Apartment / Society</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                    <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Issue Area
                  </label>
                  <select
                    value={formData.problemArea}
                    onChange={(e) => setFormData({ ...formData, problemArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A2540] text-[#1A2433] bg-white"
                  >
                    <option value="Terrace / Roof Leakage">Terrace / Roof Leakage</option>
                    <option value="External Wall Dampness">External Wall Dampness</option>
                    <option value="Basement Seepage">Basement Seepage</option>
                    <option value="Bathroom / Wet Area Leakage">Bathroom / Wet Area</option>
                    <option value="Water Tank Waterproofing">Water Tank Waterproofing</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-[#0A2540] hover:bg-[#123659] text-white flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#FFD700]" />
                  <span>{isSubmitting ? 'Connecting WhatsApp...' : 'Confirm & Send via WhatsApp'}</span>
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0A2540]" />
                    <a
                      href={`tel:+${TARGET_WHATSAPP_NUMBER}`}
                      className="font-mono font-bold text-[#0A2540] hover:underline"
                    >
                      {TARGET_DISPLAY_PHONE}
                    </a>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-700" />
                    <a
                      href="mailto:chohancreation@gmail.com?subject=Inspection%20Inquiry%20-%20Aquaseal"
                      className="font-mono font-bold text-sky-800 hover:underline text-[11px]"
                    >
                      chohancreation@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-center text-slate-400 mt-1.5">
                  Direct dispatch to WhatsApp (+91 97114 94386) • Zero obligation free evaluation.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
