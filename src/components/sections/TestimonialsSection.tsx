import React from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MapPin,
  Building2,
  ThumbsUp
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface CustomerReview {
  id: string;
  name: string;
  initials: string;
  location: string;
  fullAddress: string;
  organization?: string;
  projectType: string;
  rating: number;
  ratingScore: string;
  headline: string;
  reviewText: string;
  verificationBadge: string;
}

interface TestimonialsSectionProps {
  onOpenInspectionModal: (servicePrefill?: string) => void;
  onOpenReviewModal?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenInspectionModal,
}) => {
  const reviews: CustomerReview[] = [
    {
      id: 'testimonial-1',
      name: 'Captain Amit Dhanda',
      initials: 'AD',
      location: 'Sainik Farm, Delhi',
      fullAddress: 'B-54, Sainik Farm, Delhi',
      projectType: 'Terrace Waterproofing',
      rating: 5,
      ratingScore: '5.0 / 5.0',
      headline: 'Permanent solution for our terrace leakage issue',
      reviewText:
        'Aquaseal did an outstanding waterproofing job on our terrace at Sainik Farm. Before their work, we struggled with recurring dampness and rainwater seepage during monsoons. Their diagnostic inspection was thorough, and the multi-coat elastomeric coating has held up flawlessly.',
      verificationBadge: 'Verified Customer',
    },
    {
      id: 'testimonial-2',
      name: 'Anil Kumar Jain',
      initials: 'AJ',
      location: 'Greater Kailash, Delhi',
      fullAddress: 'S-54, Greater Kailash, Delhi',
      organization: 'Karbonn Mobile',
      projectType: 'Roof Sealing & Waterproofing',
      rating: 4.5,
      ratingScore: '4.5 / 5.0',
      headline: 'Highly professional execution & durable materials',
      reviewText:
        'We engaged Aquaseal for rooftop and parapet joint sealing at Greater Kailash. The team completed the surface preparation meticulously and applied high-grade waterproof coatings. Prompt timelines, clean job site, and zero seepage ever since. Highly recommended!',
      verificationBadge: 'Verified Customer',
    },
    {
      id: 'testimonial-3',
      name: 'Abraham Mathew',
      initials: 'AM',
      location: 'Dilshad Garden, Delhi',
      fullAddress: 'Dilshad Garden, Delhi',
      projectType: 'Wall Seepage Treatment',
      rating: 4,
      ratingScore: '4.0 / 5.0',
      headline: 'Resolved persistent wall dampness completely',
      reviewText:
        'We were troubled by severe moisture seepage and peeling paint on internal walls at our Dilshad Garden home. Aquaseal identified the exact water ingress source and applied effective deep-penetrating damp-proof treatment. The walls have stayed dry and fresh.',
      verificationBadge: 'Verified Customer',
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle Structural Texture Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#0A2540 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            CUSTOMER FEEDBACK
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Sub-heading / Kicker */}
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">
            Real experiences from our customers
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            What Our Customers Say
          </h2>

          {/* Contextual Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-4 max-w-2xl mx-auto">
            Read verified feedback from homeowners and commercial property managers across Delhi who trust Aquaseal for long-term waterproofing protection.
          </p>
        </div>

        {/* Testimonial Cards Grid (3 Real Customer Reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              id={review.id}
              className="bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-[#0A2540]/30 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Row: Quote Icon & Verification Badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0A2540] group-hover:scale-105 transition-transform">
                    <Quote className="w-5 h-5 fill-[#0A2540]/10" />
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-xs shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {review.verificationBadge}
                  </span>
                </div>

                {/* Rating Stars Bar */}
                <div className="mb-4 bg-slate-50 border border-slate-200/80 rounded-sm px-3.5 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starIndex) => {
                      const isFull = review.rating >= starIndex;
                      const isHalf = !isFull && review.rating >= starIndex - 0.5;
                      return (
                        <Star
                          key={starIndex}
                          className={`w-3.5 h-3.5 ${
                            isFull
                              ? 'text-[#FFD700] fill-[#FFD700]'
                              : isHalf
                              ? 'text-[#FFD700] fill-[#FFD700]/50'
                              : 'text-slate-300 fill-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-xs border border-slate-200">
                    {review.ratingScore}
                  </span>
                </div>

                {/* Review Headline & Body Quote */}
                <div className="mb-6">
                  <h4 className="text-sm font-black text-[#0A2540] mb-2 leading-snug">
                    "{review.headline}"
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              {/* Card Footer: Customer Details & Location */}
              <div className="pt-5 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A2540] text-[#FFD700] flex items-center justify-center font-black text-xs tracking-wider shadow-xs shrink-0 mt-0.5">
                    {review.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-[#0A2540] tracking-tight truncate">
                        {review.name}
                      </h4>
                      {review.organization && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold rounded-xs shrink-0">
                          <Building2 className="w-3 h-3 text-amber-700" />
                          {review.organization}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{review.fullAddress}</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-xs text-[10px] font-bold text-[#0A2540] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {review.projectType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Policy & Authenticity Guarantee Callout */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-2xs text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <div className="w-11 h-11 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0A2540] shrink-0">
            <ThumbsUp className="w-6 h-6 text-[#0A2540]" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs sm:text-sm font-black text-[#0A2540] uppercase tracking-wider">
              Verified Client Satisfaction Across Delhi NCR
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Every review reflects authentic residential and commercial waterproofing projects completed across Delhi NCR. We back our workmanship with rigorous diagnostic inspections and long-term warranties.
            </p>
          </div>
        </div>

        {/* Bottom Action Prompt: Book an Inspection */}
        <div className="mt-10 bg-[#0A2540] text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-wider text-[#FFD700]">
              <CheckCircle2 className="w-4 h-4" />
              Ready to Protect Your Property?
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an accurate, no-obligation evaluation of your terrace, roof, or wall seepage with a certified site inspection.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            iconLeft={<Calendar className="w-4 h-4 text-[#0A2540]" />}
            onClick={() => onOpenInspectionModal('General Inquiry')}
            id="testimonials-inspect-cta"
            className="shrink-0 w-full md:w-auto justify-center"
          >
            Book Free Inspection
          </Button>
        </div>

      </div>
    </section>
  );
};
