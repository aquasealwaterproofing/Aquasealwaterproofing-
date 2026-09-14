import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Sliders,
  Maximize2,
  X,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  Home,
  Droplets,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Button } from '../ui/Button';

// High-resolution transformation assets
import sliderComparisonImg from '../../assets/images/regenerated_image_1788870311194.png';
import card1Img from '../../assets/images/regenerated_image_1788870316880.png';
import card2Img from '../../assets/images/regenerated_image_1788870323178.png';
import brickTerraceBeforeAfter from '../../assets/images/before-after/brick-terrace-before-after.jpg';
import wallSeepageBeforeAfter from '../../assets/images/before-after/wall-seepage-before-after.jpg';

interface ProjectComparison {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  beforeDetails: string;
  afterDetails: string;
  substrate: string;
}

interface BeforeAfterSectionProps {
  onOpenInspectionModal: (servicePrefill?: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onOpenInspectionModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectComparison | null>(null);

  // Interactive slider position state for featured comparison (percentage 0 - 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const featuredContainerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectComparison[] = [
    {
      id: 'terrace-slab-restoration',
      category: 'Terrace Waterproofing',
      title: 'RCC Flat Terrace Slab Protection',
      description:
        'Aged concrete terrace exhibiting peeling patches, hairline cracks, and moisture absorption sealed with a monolithic elastomeric waterproofing membrane.',
      image: card1Img,
      beforeDetails: 'Severe concrete weathering, peeling & dark damp patches',
      afterDetails: 'Monolithic elastomeric membrane with clean parapet coving',
      substrate: 'Reinforced Cement Concrete (RCC)',
    },
    {
      id: 'tiled-roof-waterproofing',
      category: 'Roof Waterproofing',
      title: 'Tiled Rooftop Joint & Parapet Sealing',
      description:
        'Weather-affected tiled terrace with worn grout lines and ponding water tendencies treated with a seamless, water-shedding protective barrier.',
      image: card2Img,
      beforeDetails: 'Open tile seams, debris accumulation & seepage risks',
      afterDetails: 'Uniform seamless grey protective liquid membrane',
      substrate: 'Ceramic Terrace Tiles & Parapet Screed',
    },
    {
      id: 'brick-terrace-restoration',
      category: 'Surface Waterproofing',
      title: 'Brick-Tile Surface & Efflorescence Treatment',
      description:
        'Traditional brick-tiled roof showing salt crystallization, crumbling mortar joints, and rainwater seepage renewed with heavy-duty weather barrier coating.',
      image: brickTerraceBeforeAfter,
      beforeDetails: 'Salt efflorescence, mortar deterioration & damp ingress',
      afterDetails: 'Durable, chemical-resistant protective continuous film',
      substrate: 'Traditional Brick Bat / Clay Tiles',
    },
    {
      id: 'wall-seepage-barrier',
      category: 'Wall Seepage Treatment',
      title: 'Interior Wall Dampness & Moisture Control',
      description:
        'Severe rising damp and wall seepage resulting in flaking paint and salt deposits resolved using sub-surface moisture barrier chemistry.',
      image: wallSeepageBeforeAfter,
      beforeDetails: 'Peeling paint, bubbling plaster & visible moisture lines',
      afterDetails: 'Dry, stabilized substrate refinished with moisture-barrier primer',
      substrate: 'Brick Masonry & Internal Cement Plaster',
    },
  ];

  const categories = ['All', 'Terrace Waterproofing', 'Roof Waterproofing', 'Surface Waterproofing', 'Wall Seepage Treatment'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Handle slider interaction (mouse & touch)
  const handleMove = (clientX: number) => {
    if (!featuredContainerRef.current) return;
    const rect = featuredContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section
      id="before-after"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            BEFORE & AFTER
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            See the Difference Proper Waterproofing Can Make
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-4 max-w-2xl mx-auto">
            Explore representative surface transformations from weathered and damaged conditions to cleaner, protected finishes.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0A2540]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Interactive Comparison Slider (Desktop & Tablet Spotlight) */}
        {selectedCategory === 'All' && (
          <div className="mb-14 bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#0A2540] bg-blue-50 px-2.5 py-1 rounded-xs mb-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#0A2540]" />
                  Interactive Inspection Viewer
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight uppercase">
                  Terrace Substrate Transformation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Drag the center divider or click anywhere to compare the weathered substrate with the finished protective coating.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1.5 rounded-sm">
                  Divider: {Math.round(sliderPosition)}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenInspectionModal('Terrace Waterproofing')}
                  iconLeft={<Calendar className="w-3.5 h-3.5" />}
                >
                  Inspect My Terrace
                </Button>
              </div>
            </div>

            {/* Draggable Slider Container */}
            <div
              ref={featuredContainerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] max-h-[520px] rounded-md overflow-hidden select-none cursor-ew-resize border border-slate-200 bg-slate-900 group shadow-inner touch-pan-y"
              id="interactive-comparison-slider"
            >
              {/* Underlying Image */}
              <img
                src={sliderComparisonImg}
                alt="Before and after comparison of terrace waterproofing"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Dynamic Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.8)] pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Drag Handle Badge */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0A2540] border-2 border-[#FFD700] text-[#FFD700] flex items-center justify-center shadow-xl">
                  <div className="flex items-center gap-0.5 text-[10px] font-black">
                    <span>◀</span>
                    <span>▶</span>
                  </div>
                </div>
              </div>

              {/* BEFORE Label Badge (Left Top) */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#0A2540]/90 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest rounded-sm shadow-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>BEFORE</span>
                  <span className="hidden sm:inline">: Weathered Concrete</span>
                </span>
              </div>

              {/* AFTER Label Badge (Right Top) */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#0A2540]/90 backdrop-blur-xs text-[#FFD700] text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest rounded-sm shadow-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>AFTER</span>
                  <span className="hidden sm:inline">: Protective Membrane</span>
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none hidden sm:flex items-center justify-between gap-4">
                <div className="bg-[#0A2540]/85 backdrop-blur-xs px-3.5 py-2 rounded-sm border border-white/10 text-white max-w-sm">
                  <span className="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">
                    Surface Condition
                  </span>
                  <p className="text-xs text-slate-100 font-medium leading-tight">
                    Pre-existing cracks & porous cement slab
                  </p>
                </div>

                <div className="bg-[#0A2540]/85 backdrop-blur-xs px-3.5 py-2 rounded-sm border border-white/10 text-white text-right max-w-sm">
                  <span className="text-[10px] text-[#FFD700] font-bold block uppercase tracking-wider">
                    Completed Treatment
                  </span>
                  <p className="text-xs text-slate-100 font-medium leading-tight">
                    Continuous elastomeric water-shedding coat
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Cards Grid (Stacked on mobile, 2-column on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              id={`before-after-card-${index + 1}`}
              className="group bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0A2540]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Split Labels */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={`${project.title} transformation`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle Center Divider Visual Guide */}
                <div
                  className="absolute inset-y-0 left-1/2 w-[2px] bg-white/40 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Left: BEFORE Badge */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/75 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-widest rounded-sm border border-white/20 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    BEFORE
                  </span>
                </div>

                {/* Right: AFTER Badge */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A2540]/90 backdrop-blur-xs text-[#FFD700] text-[11px] font-black uppercase tracking-widest rounded-sm border border-white/20 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    AFTER
                  </span>
                </div>

                {/* Expand / View Details Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="absolute bottom-4 right-4 p-2 bg-white/90 hover:bg-white text-[#0A2540] rounded-sm shadow-md transition-colors cursor-pointer border border-slate-200"
                  aria-label={`Inspect ${project.title} transformation details`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Project Category Tag */}
                <div className="absolute bottom-4 left-4 pointer-events-none">
                  <span className="px-2.5 py-1 bg-[#0A2540]/90 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-xs border border-white/10 shadow-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Information Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0A2540] tracking-tight uppercase leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-5">
                    {project.description}
                  </p>

                  {/* Surface Diagnosis & Protective Outcome Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-sm border border-slate-200/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block mb-1">
                        Pre-Existing Condition
                      </span>
                      <p className="text-xs text-slate-700 font-semibold leading-snug">
                        {project.beforeDetails}
                      </p>
                    </div>

                    <div className="bg-blue-50/70 p-3 rounded-sm border border-blue-100">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#0A2540] block mb-1">
                        Protection Delivered
                      </span>
                      <p className="text-xs text-slate-800 font-semibold leading-snug">
                        {project.afterDetails}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0A2540] hover:text-[#103254] transition-colors cursor-pointer group/link"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenInspectionModal(project.category)}
                    className="text-[11px] font-bold text-slate-500 hover:text-[#0A2540] transition-colors uppercase tracking-wider underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A2540]"
                  >
                    Inspect Similar Area
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Disclosure Note */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/90 border border-slate-200 text-slate-600 rounded-sm text-xs font-medium">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Representative visuals shown for illustration. Actual project photographs may vary.</span>
          </div>
        </div>

        {/* Section Bottom Conversion Prompt */}
        <div className="mt-10 bg-[#0A2540] text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase tracking-wider text-[#FFD700]">
              <ShieldCheck className="w-4 h-4" />
              Not Sure What System Your Surface Needs?
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Waterproofing systems vary according to substrate type, traffic exposure, and prior damage. Schedule an on-site moisture evaluation.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            iconLeft={<Calendar className="w-4 h-4 text-[#0A2540]" />}
            onClick={() => onOpenInspectionModal('Terrace / Roof Inspection')}
            id="before-after-inspect-cta"
            className="shrink-0 w-full md:w-auto justify-center"
          >
            Get Free Inspection
          </Button>
        </div>

      </div>

      {/* Detail Inspection Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="bg-[#0A2540] text-white p-5 flex items-start justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest block mb-1">
                  {activeModalProject.category}
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight">
                  {activeModalProject.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="text-slate-300 hover:text-white p-1 rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="relative rounded-md overflow-hidden border border-slate-200">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-black uppercase px-2 py-1 rounded-xs">
                  BEFORE
                </div>
                <div className="absolute top-3 right-3 bg-[#0A2540] text-[#FFD700] text-[10px] font-black uppercase px-2 py-1 rounded-xs">
                  AFTER
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Substrate:</span>
                    <span className="font-bold text-[#0A2540]">{activeModalProject.substrate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Pre-Treatment Issue:</span>
                    <span className="font-semibold text-rose-700">{activeModalProject.beforeDetails}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Applied Protection:</span>
                    <span className="font-semibold text-emerald-700">{activeModalProject.afterDetails}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModalProject(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconLeft={<Calendar className="w-4 h-4 text-white" />}
                onClick={() => {
                  const cat = activeModalProject.category;
                  setActiveModalProject(null);
                  onOpenInspectionModal(cat);
                }}
              >
                Request Free Inspection
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
