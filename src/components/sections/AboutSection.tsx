import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Calendar,
  Layers,
  Building2,
  Sparkles,
  ArrowRight,
  Hammer
} from 'lucide-react';
import { Button } from '../ui/Button';

interface AboutSectionProps {
  onCallNow: () => void;
  onOpenInspectionModal: (servicePrefill?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onCallNow,
  onOpenInspectionModal,
}) => {
  const highlights = [
    {
      id: 'highlight-professional-service',
      title: 'Professional Service',
      description:
        'Clear communication, punctual on-site evaluations, and organized project execution from preliminary inspection to surface completion.',
      icon: <ShieldCheck className="w-5 h-5 text-[#0A2540]" />,
    },
    {
      id: 'highlight-quality-application',
      title: 'Quality-Focused Application',
      description:
        'Disciplined substrate cleaning, crack sealing, reinforced corner coving, and multi-coat chemical application tailored to each surface.',
      icon: <Hammer className="w-5 h-5 text-[#0A2540]" />,
    },
    {
      id: 'highlight-res-comm-solutions',
      title: 'Residential & Commercial Solutions',
      description:
        'Practical, specialized waterproofing systems suited to private residential homes, apartment terraces, and commercial property spans.',
      icon: <Building2 className="w-5 h-5 text-[#0A2540]" />,
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Information & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
              ABOUT AQUASEAL
            </div>

            {/* Geometric Balance Gold Accent Rule */}
            <div className="w-12 h-1 bg-[#FFD700] rounded-xs mb-4" />

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.14] uppercase mb-6">
              Waterproofing Focused on Long-Term Property Protection
            </h2>

            {/* Professional Company Introduction */}
            <div className="bg-[#F8FAFC] border-l-4 border-[#0A2540] p-5 sm:p-6 rounded-r-md mb-8">
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                Aquaseal Waterproofing provides professional waterproofing and surface protection solutions for residential and commercial properties. Our focus is on identifying moisture-related problems, preparing surfaces correctly and delivering practical waterproofing solutions suited to the project.
              </p>
            </div>

            {/* Three Highlights */}
            <div className="space-y-4 sm:space-y-5 mb-8">
              {highlights.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200/80 hover:border-[#0A2540]/40 transition-colors shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#0A2540] uppercase tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={onCallNow}
                iconLeft={<Phone className="w-4 h-4 text-[#FFD700]" />}
                id="about-talk-to-aquaseal-btn"
                className="justify-center"
              >
                Call: 97114 94386
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => onOpenInspectionModal('General Consultation')}
                iconLeft={<Calendar className="w-4 h-4 text-slate-700" />}
                id="about-schedule-inspection-btn"
                className="justify-center"
              >
                Request Inspection
              </Button>
            </div>

          </div>

          {/* Right Column: Realistic Photographic Asset */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
              <img
                src="/about/about-waterproofing-work.jpg"
                alt="Aquaseal professional waterproofing surface preparation and membrane application"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/20 to-transparent pointer-events-none" />

              {/* Top Status Tag */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A2540]/90 text-[#FFD700] text-[10px] font-black uppercase tracking-widest rounded-xs border border-white/20 shadow-md backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Site Execution
                </span>
              </div>

              {/* Bottom Information Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-md border border-slate-200/90 shadow-lg text-slate-800">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0A2540]">
                    Substrate Preparation & Application
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    System Grade
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-snug">
                  Every waterproofing project begins with detailed surface cleaning, repairing structural defects, and applying chemically compatible liquid membrane layers.
                </p>
              </div>
            </div>

            {/* Subtle Footnote */}
            <p className="text-[11px] text-slate-500 text-center mt-3 font-medium">
              Authentic civil waterproofing execution on residential & commercial structures.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
