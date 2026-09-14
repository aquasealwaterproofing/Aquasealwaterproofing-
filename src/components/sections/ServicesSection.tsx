import React, { useState } from 'react';
import {
  Layers,
  Home,
  Droplets,
  Bath,
  Hammer,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Phone
} from 'lucide-react';
import { ServiceDetail, ServiceDetailModal } from '../modals/ServiceDetailModal';
import { Button } from '../ui/Button';

interface ServicesSectionProps {
  onOpenInspectionModal: (servicePrefill?: string) => void;
  onCallNow: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenInspectionModal,
  onCallNow,
}) => {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  const servicesData: ServiceDetail[] = [
    {
      id: 'terrace-waterproofing',
      title: 'TERRACE WATERPROOFING',
      description:
        'Protect terraces and rooftops from rainwater penetration, cracks and surface deterioration.',
      icon: <Layers className="w-6 h-6" />,
      typicalApplications: [
        'Exposed RCC Roof Slabs',
        'Terrace Surface Screed & Tiles',
        'Parapet Wall Junctions',
        'Rainwater Drainage Outlets',
      ],
      assessmentFocus:
        'On-site slope evaluation, ponding water assessment, and structural movement crack examination.',
      recommendedNextStep: 'Schedule a moisture level scan before coating selection.',
    },
    {
      id: 'roof-waterproofing',
      title: 'ROOF WATERPROOFING',
      description:
        'Durable waterproofing solutions for exposed roofs and weather-affected surfaces.',
      icon: <Home className="w-6 h-6" />,
      typicalApplications: [
        'Sloped Concrete Roofs',
        'Weather-Exposed Slabs',
        'Pre-Monsoon Protective Sealing',
        'Expansion Joints & Borders',
      ],
      assessmentFocus:
        'Inspection of thermal expansion joints, surface weathering, and exterior drainage points.',
      recommendedNextStep: 'Technical inspection to determine primer and membrane compatibility.',
    },
    {
      id: 'wall-seepage-treatment',
      title: 'WALL SEEPAGE TREATMENT',
      description:
        'Address damp patches, seepage and moisture penetration affecting interior and exterior walls.',
      icon: <Droplets className="w-6 h-6" />,
      typicalApplications: [
        'Interior Efflorescence & Peeling',
        'Exterior Plaster Seepage',
        'Window Frame Perimeter Gaps',
        'Common Wall Damp Patches',
      ],
      assessmentFocus:
        'Internal vs. external ingress tracing, moisture meter calibration, and salt deposit analysis.',
      recommendedNextStep: 'Source tracing inspection to prevent repeated paint and plaster damage.',
    },
    {
      id: 'bathroom-waterproofing',
      title: 'BATHROOM WATERPROOFING',
      description:
        'Waterproofing solutions for bathrooms and wet areas to help prevent hidden moisture damage.',
      icon: <Bath className="w-6 h-6" />,
      typicalApplications: [
        'Sunken Floor Slabs',
        'Shower Area Wall Perimeters',
        'Plumbing Pipe Penetrations',
        'Floor Tile Joints & Traps',
      ],
      assessmentFocus:
        'Evaluation of sanitary pipe collars, sunken slab membrane integrity, and tile grouting status.',
      recommendedNextStep: 'Non-invasive pipe and slab inspection to locate hidden water migration.',
    },
    {
      id: 'crack-repair-waterproofing',
      title: 'CRACK REPAIR & WATERPROOFING',
      description:
        'Repair suitable surface cracks and protect vulnerable areas from water penetration.',
      icon: <Hammer className="w-6 h-6" />,
      typicalApplications: [
        'Structural Plaster Cracks',
        'Shrinkage & Temperature Cracks',
        'Wall-to-Slab Junction Grooves',
        'Masonry Joint Reinforcement',
      ],
      assessmentFocus:
        'Categorization of active moving cracks vs. dormant settlement cracks for suitable chemical elastomeric sealant.',
      recommendedNextStep: 'On-site depth measuring to ensure proper V-groove preparation.',
    },
    {
      id: 'basement-waterproofing',
      title: 'BASEMENT WATERPROOFING',
      description:
        'Waterproofing solutions designed for moisture-prone basement and below-ground areas.',
      icon: <ShieldAlert className="w-6 h-6" />,
      typicalApplications: [
        'Below-Grade Retaining Walls',
        'Basement Raft Foundations',
        'Construction Cold Joints',
        'Lift Pit & Sump Sub-Structures',
      ],
      assessmentFocus:
        'Hydrostatic ground pressure evaluation, water table dampness, and negative-side crystalline/injection assessment.',
      recommendedNextStep: 'Detailed subterranean inspection before selecting barrier systems.',
    },
  ];

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            OUR SERVICES
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            Waterproofing Solutions for Every Need
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-4 max-w-2xl mx-auto">
            Practical waterproofing solutions designed to protect your property from seepage, dampness and water-related damage.
          </p>
        </div>

        {/* 6 Professional Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${index + 1}`}
              className="group bg-white border border-slate-200/90 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#0A2540]/50 relative overflow-hidden"
            >
              {/* Subtle top indicator line on hover */}
              <div className="h-1 w-0 group-hover:w-full bg-[#FFD700] absolute top-0 left-0 transition-all duration-300" />

              <div>
                {/* Header with Icon and Category Marker */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-100/80 text-[#0A2540] flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-[#FFD700] transition-colors duration-200 shadow-2xs">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-slate-400 group-hover:text-slate-600 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-black text-[#0A2540] tracking-tight uppercase leading-snug mb-3">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: "Learn More" Link / Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0A2540] hover:text-[#103254] transition-colors cursor-pointer group/link py-1"
                  aria-label={`Learn more about ${service.title}`}
                  id={`learn-more-${service.id}`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0A2540] transition-transform duration-200 group-hover/link:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenInspectionModal(service.title)}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#0A2540] transition-colors uppercase tracking-wider underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A2540]"
                >
                  Inspect Area
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Conversion Prompt */}
        <div className="mt-12 sm:mt-16 bg-[#F8FAFC] border border-slate-200/90 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-wider text-[#0A2540]">
              <ShieldCheck className="w-4 h-4 text-[#0A2540]" />
              Need an On-Site Inspection for Your Property?
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Our waterproofing specialists evaluate moisture migration and prescribe suitable Dr. Fixit chemical applications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Button
              variant="primary"
              size="md"
              iconLeft={<Calendar className="w-4 h-4 text-white" />}
              onClick={() => onOpenInspectionModal()}
              id="services-book-inspection-cta"
              className="w-full sm:w-auto justify-center"
            >
              Get Free Inspection
            </Button>
            <Button
              variant="secondary"
              size="md"
              iconLeft={<Phone className="w-4 h-4 text-[#0A2540]" />}
              onClick={onCallNow}
              id="services-call-cta"
              className="w-full sm:w-auto justify-center"
            >
              Call: 97114 94386
            </Button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal for "Learn More" */}
      <ServiceDetailModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onRequestInspection={(title) => {
          onOpenInspectionModal(title);
        }}
        onCallNow={onCallNow}
      />
    </section>
  );
};
