import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
  Home,
  HelpCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { submitInquiry, openWhatsAppDirectly, TARGET_DISPLAY_PHONE, TARGET_WHATSAPP_NUMBER } from '../../lib/inquiryService';

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  propertyType: string;
  requirement: string;
  message: string;
}

interface ContactSectionProps {
  onCallModalOpen?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCallModalOpen,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phoneNumber: '',
    propertyType: 'Residential',
    requirement: 'Terrace Waterproofing',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [whatsappLink, setWhatsappLink] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const propertyTypes = ['Residential', 'Commercial', 'Other'];

  const requirements = [
    'Terrace Waterproofing',
    'Roof Waterproofing',
    'Wall Seepage',
    'Bathroom Waterproofing',
    'Crack Repair',
    'Basement Waterproofing',
    'Other',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage('Please provide both your name and phone number so our team can reach you.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitInquiry({
        type: 'contact',
        name: formData.fullName,
        phone: formData.phoneNumber,
        structureType: formData.propertyType,
        problemArea: formData.requirement,
        message: formData.message,
      });

      setWhatsappLink(res.whatsappUrl);
      setIsSubmitted(true);
      openWhatsAppDirectly(res.whatsappUrl);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      propertyType: 'Residential',
      requirement: 'Terrace Waterproofing',
      message: '',
    });
    setIsSubmitted(false);
    setWhatsappLink('');
    setErrorMessage('');
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background Subtle Geometric Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0A2540 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            GET IN TOUCH
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            Have a Waterproofing Problem?
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-4 max-w-2xl mx-auto">
            Tell us about your waterproofing requirement and our team can discuss the appropriate next steps.
          </p>
        </div>

        {/* Honest CTA Highlight Banner */}
        <div className="mb-10 max-w-4xl mx-auto bg-[#0A2540] text-white rounded-lg p-5 sm:p-7 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-sm bg-[#FFD700] flex items-center justify-center text-[#0A2540] shrink-0 font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                Get Your Waterproofing Requirement Assessed
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Accurate diagnosis prevents recurring water damage and avoids unnecessary rework.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-white/10 px-3 py-1.5 rounded-xs border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            Prompt Callback
          </div>
        </div>

        {/* 4 Contact Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
          
          {/* Action Card 1: CALL US */}
          <div
            id="contact-card-call"
            className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-[#0A2540]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A2540] mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Direct Helpline
              </span>
              <h4 className="text-base font-black text-[#0A2540] uppercase tracking-tight mb-1.5">
                CALL US
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Speak directly with our technical team for immediate requirements.
              </p>
            </div>
            
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="tel:+919711494386"
                className="bg-blue-50/70 border border-blue-200 rounded-sm p-2.5 text-center block hover:bg-blue-100/70 transition-colors group"
                title="Click to dial +91 97114 94386"
              >
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
                  Helpline Number
                </span>
                <span className="text-sm font-mono font-black text-[#0A2540] group-hover:text-blue-900 select-all">
                  +91 97114 94386
                </span>
              </a>
              <a
                href="tel:+919711494386"
                className="w-full py-2 bg-[#0A2540] hover:bg-[#081e33] text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                id="contact-call-helpline-btn"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFD700]" />
                Call Helpline
              </a>
            </div>
          </div>

          {/* Action Card 2: WHATSAPP */}
          <div
            id="contact-card-whatsapp"
            className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-[#0A2540]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Instant Chat & Photos
              </span>
              <h4 className="text-base font-black text-[#0A2540] uppercase tracking-tight mb-1.5">
                WHATSAPP
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Send photos or short clips of leakage spots for immediate assessment.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/919711494386?text=Hello%20Aquaseal%20Waterproofing%2C%20I%20need%20expert%20waterproofing%20inspection%20and%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-50/70 border border-emerald-200 rounded-sm p-2.5 text-center block hover:bg-emerald-100/70 transition-colors group"
                title="Click to chat on WhatsApp"
              >
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
                  WhatsApp Number
                </span>
                <span className="text-sm font-mono font-black text-emerald-800 group-hover:text-emerald-950 select-all">
                  +91 97114 94386
                </span>
              </a>
              <a
                href="https://wa.me/919711494386?text=Hello%20Aquaseal%20Waterproofing%2C%20I%20need%20expert%20waterproofing%20inspection%20and%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                id="contact-whatsapp-btn"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Action Card 3: EMAIL US */}
          <div
            id="contact-card-email"
            className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-[#0A2540]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Written Inquiries & BOQ
              </span>
              <h4 className="text-base font-black text-[#0A2540] uppercase tracking-tight mb-1.5">
                EMAIL US
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Send architectural plans, specifications, tenders, or corporate estimates.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inspection%20Inquiry%20-%20Aquaseal"
                className="bg-sky-50/70 border border-sky-200 rounded-sm p-2.5 text-center block hover:bg-sky-100/70 transition-colors group"
                title="Click to send an email"
              >
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
                  Official Email
                </span>
                <span className="text-xs font-mono font-bold text-[#0A2540] group-hover:text-sky-900 select-all break-all block">
                  chohancreation@gmail.com
                </span>
              </a>
              <a
                href="mailto:chohancreation@gmail.com?subject=Waterproofing%20Inspection%20Inquiry%20-%20Aquaseal"
                className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                id="contact-email-btn"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </a>
            </div>
          </div>

          {/* Action Card 4: OFFICE LOCATION & COVERAGE */}
          <div
            id="contact-card-location"
            className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-[#0A2540]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Office & Operations
              </span>
              <h4 className="text-base font-black text-[#0A2540] uppercase tracking-tight mb-1.5">
                HEAD OFFICE
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-3 leading-relaxed">
                R 227, Lane 5, Joga Bai Extension, Jamia Nagar, Okhla, New Delhi 110025
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://maps.google.com/?q=R+227+Lane+5+Joga+Bai+Extension+Jamia+Nagar+Okhla+New+Delhi+110025"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-50/70 border border-amber-200 rounded-sm p-2.5 text-center block hover:bg-amber-100/70 transition-colors group"
                title="View location on Google Maps"
              >
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
                  Full Address
                </span>
                <span className="text-[11px] font-semibold text-amber-950 leading-tight block select-all">
                  R 227, Lane 5, Joga Bai Ext., Jamia Nagar, Okhla, New Delhi - 110025
                </span>
              </a>
              <a
                href="https://maps.google.com/?q=R+227+Lane+5+Joga+Bai+Extension+Jamia+Nagar+Okhla+New+Delhi+110025"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-[#0A2540] hover:bg-[#081e33] text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                id="contact-location-map-btn"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </a>
            </div>
          </div>

        </div>

        {/* Professional Enquiry Form */}
        <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-lg shadow-sm overflow-hidden">
          
          <div className="bg-[#0A2540] text-white p-6 sm:p-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD700] block mb-1">
                Direct Submission
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Schedule an On-Site Inspection
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[#FFD700] bg-white/10 px-3 py-1 rounded-xs text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4" />
              No Obligation
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8 px-4 space-y-5 animate-in fade-in duration-200 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-[#0A2540] uppercase tracking-tight">
                    Enquiry Logged!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Send directly to our official WhatsApp helpline at <strong>{TARGET_DISPLAY_PHONE}</strong> to get an immediate response.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-md text-left space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Customer:</span>
                    <span className="font-bold text-[#0A2540]">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Phone:</span>
                    <span className="font-mono font-bold text-[#0A2540]">{formData.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Requirement:</span>
                    <span className="font-bold text-[#0A2540]">{formData.requirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Property:</span>
                    <span className="font-medium">{formData.propertyType}</span>
                  </div>
                </div>

                {/* Primary Action: Direct WhatsApp Chat */}
                <div className="space-y-2.5 pt-1">
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => openWhatsAppDirectly(whatsappLink)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                      <span>Send Request on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={`tel:+${TARGET_WHATSAPP_NUMBER}`}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0A2540] hover:bg-[#123659] text-[#FFD700] rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call {TARGET_DISPLAY_PHONE}
                    </a>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={resetForm}
                    >
                      Submit Another
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-sm text-xs font-semibold text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Grid Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-black uppercase tracking-wider text-[#0A2540] mb-2"
                    >
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm border border-slate-300 rounded-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-black uppercase tracking-wider text-[#0A2540] mb-2"
                    >
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 98765 43210"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm border border-slate-300 rounded-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Grid Row 2: Property Type & Requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label
                      htmlFor="propertyType"
                      className="block text-xs font-black uppercase tracking-wider text-[#0A2540] mb-2"
                    >
                      Property Type <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm border border-slate-300 rounded-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all cursor-pointer"
                      >
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="requirement"
                      className="block text-xs font-black uppercase tracking-wider text-[#0A2540] mb-2"
                    >
                      Waterproofing Requirement <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="requirement"
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleInputChange}
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm border border-slate-300 rounded-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all cursor-pointer"
                      >
                        {requirements.map((req) => (
                          <option key={req} value={req}>
                            {req}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-black uppercase tracking-wider text-[#0A2540] mb-2"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Brief description of the problem (e.g., active water leakage during rain, ceiling moisture, exterior cracks, age of building)..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all resize-y"
                  />
                </div>

                {/* Form Action Button */}
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    iconRight={<MessageCircle className="w-4 h-4 text-[#FFD700]" />}
                    id="contact-form-submit-btn"
                  >
                    {isSubmitting ? 'Logging & Connecting WhatsApp...' : 'Submit & Connect on WhatsApp'}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-[11px] text-slate-500 font-medium">
                    Strict privacy guaranteed. We do not sell or distribute personal contact information.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
