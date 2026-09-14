import React, { useState } from 'react';
import {
  Layers,
  Home,
  Droplets,
  Bath,
  Building2,
  Building,
  Maximize2,
  X,
  Calendar,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';

// High-resolution transformation assets
import terraceProjectImg from '../../assets/images/regenerated_image_1788870316880.png';
import roofProjectImg from '../../assets/images/regenerated_image_1788870323178.png';
import brickTerraceBeforeAfter from '../../assets/images/before-after/brick-terrace-before-after.jpg';
import wallSeepageBeforeAfter from '../../assets/images/before-after/wall-seepage-before-after.jpg';

export interface ProjectItem {
  id: string;
  category: 'Terrace' | 'Roof' | 'Wall' | 'Bathroom' | 'Commercial' | 'Residential';
  title: string;
  surface: string;
  treatment: string;
  scope: string;
  image: string;
  description: string;
}

interface ProjectsSectionProps {
  onOpenInspectionModal: (servicePrefill?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenInspectionModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const projects: ProjectItem[] = [
    {
      id: 'terrace-rcc-protection',
      category: 'Terrace',
      title: 'Terrace Waterproofing',
      surface: 'Reinforced Cement Concrete (RCC)',
      treatment: 'Elastomeric Waterproof Coating & Crack Infill',
      scope: 'Terrace Surface & Parapet Junctions',
      image: terraceProjectImg,
      description:
        'Application of a multi-coat elastomeric protective coating over an aged flat concrete terrace, sealing surface pores and improving rainwater runoff.',
    },
    {
      id: 'roof-tiled-terrace',
      category: 'Roof',
      title: 'Roof Waterproofing',
      surface: 'Exposed Tiled Rooftop',
      treatment: 'Continuous Liquid Membrane & Joint Sealing',
      scope: 'Tile Grout Joints & Parapet Coping',
      image: roofProjectImg,
      description:
        'Monolithic waterproofing membrane applied directly over weathered terrace tiles to protect vulnerable grout seams and ponding zones.',
    },
    {
      id: 'wall-seepage-remedy',
      category: 'Wall',
      title: 'Wall Seepage Treatment',
      surface: 'Internal & External Plastered Walls',
      treatment: 'Damp-Proof Barrier & Surface Neutralization',
      scope: 'Moisture Penetration & Paint Flaking Repair',
      image: wallSeepageBeforeAfter,
      description:
        'Treatment of interior plaster dampness and salt efflorescence using sub-surface moisture barrier products and protective finishing.',
    },
    {
      id: 'bathroom-wet-zone',
      category: 'Bathroom',
      title: 'Bathroom Wet Area Waterproofing',
      surface: 'Sunken Slab & Wall Plinth',
      treatment: 'Heavy-Duty Liquid Membrane & Mesh Reinforcement',
      scope: 'Plumbing Penetrations & Tile Bedding Substrate',
      image: '/projects/bathroom-waterproofing.jpg',
      description:
        'Concealed waterproofing barrier applied on the sunken slab floor and vertical splash zones prior to tiling and sanitary fitting installation.',
    },
    {
      id: 'commercial-large-roof',
      category: 'Commercial',
      title: 'Commercial Waterproofing',
      surface: 'Commercial Rooftop & Expansion Joints',
      treatment: 'Multi-Coat UV-Resistant Polyurethane Coating',
      scope: 'Large-Span Terrace & Equipment Plinths',
      image: '/projects/commercial-waterproofing.jpg',
      description:
        'Methodical waterproofing on an exposed commercial rooftop, addressing equipment mounting bases and perimeter coping details.',
    },
    {
      id: 'residential-facade-guard',
      category: 'Residential',
      title: 'Residential Waterproofing',
      surface: 'Multi-Unit Residential Facade & Parapet',
      treatment: 'Anti-Crack Exterior Rain-Barrier Shield',
      scope: 'Exterior Walls & Parapet Edges',
      image: '/projects/residential-waterproofing.jpg',
      description:
        'Weather-resistant exterior coating applied to outer residential walls to resist rainwater absorption and weathering during heavy monsoon cycles.',
    },
    {
      id: 'terrace-brick-restoration',
      category: 'Terrace',
      title: 'Terrace Surface Waterproofing',
      surface: 'Traditional Brick-Tile Terrace',
      treatment: 'Weatherproof Membrane & Joint Stabilization',
      scope: 'Efflorescence Treatment & Weather Resistance',
      image: brickTerraceBeforeAfter,
      description:
        'Comprehensive joint cleaning and protective coating application on weathered brick-tile surfaces to prevent water ingress into the slab.',
    },
  ];

  const categories: { label: string; icon: React.ReactNode }[] = [
    { label: 'All', icon: <Filter className="w-3.5 h-3.5" /> },
    { label: 'Terrace', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Roof', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Wall', icon: <Droplets className="w-3.5 h-3.5" /> },
    { label: 'Bathroom', icon: <Bath className="w-3.5 h-3.5" /> },
    { label: 'Commercial', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Residential', icon: <Building className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // If "showAll" is false and viewing "All", limit to 6 items to keep page balanced
  const displayedProjects =
    activeCategory === 'All' && !showAll
      ? filteredProjects.slice(0, 6)
      : filteredProjects;

  return (
    <section
      id="our-work"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0A2540] border border-blue-200/80 text-[11px] font-black uppercase tracking-widest rounded-sm shadow-2xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
            OUR WORK
          </div>

          {/* Geometric Balance Gold Accent Rule */}
          <div className="w-12 h-1 bg-[#FFD700] rounded-xs mx-auto mb-4" />

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] uppercase">
            Waterproofing Projects
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mt-4 max-w-2xl mx-auto">
            Explore examples of waterproofing work across different property surfaces and applications.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.label);
                  setShowAll(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  activeCategory === cat.label
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0A2540]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${idx + 1}`}
              className="group bg-[#F8FAFC] border border-slate-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0A2540]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#0A2540]/90 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-xs border border-white/10 shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Expand / Quick View Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#0A2540] rounded-sm shadow-sm transition-colors cursor-pointer border border-slate-200"
                  aria-label={`View ${project.title} details`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Scope Pill */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[11px] font-medium text-slate-200 truncate">
                    {project.scope}
                  </p>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0A2540] tracking-tight uppercase leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Surface & Treatment Specifications */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-200/80 text-xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Surface:
                      </span>
                      <span className="font-semibold text-slate-800 text-right truncate">
                        {project.surface}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Treatment:
                      </span>
                      <span className="font-semibold text-slate-800 text-right truncate">
                        {project.treatment}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#0A2540] hover:text-[#103254] transition-colors cursor-pointer group/link"
                  >
                    <span>Inspect Project</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenInspectionModal(project.title)}
                    className="text-[11px] font-bold text-slate-500 hover:text-[#0A2540] transition-colors uppercase tracking-wider underline underline-offset-4 decoration-slate-300 hover:decoration-[#0A2540]"
                  >
                    Schedule Check
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Toggle (when in 'All' category and more items exist) */}
        {activeCategory === 'All' && projects.length > 6 && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowAll(!showAll)}
              id="view-all-projects-btn"
            >
              {showAll ? 'Show Fewer Projects' : 'View All Projects'}
            </Button>
          </div>
        )}

      </div>

      {/* Project Lightbox & Specification Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="bg-[#0A2540] text-white p-5 flex items-start justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest block mb-1">
                  {selectedProject.category} Waterproofing
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight">
                  {selectedProject.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-300 hover:text-white p-1 rounded-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="relative rounded-md overflow-hidden border border-slate-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0A2540]/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-xs">
                  {selectedProject.category}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider">Surface Type:</span>
                    <span className="font-bold text-[#0A2540]">{selectedProject.surface}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider">System Applied:</span>
                    <span className="font-semibold text-slate-800">{selectedProject.treatment}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider">Application Scope:</span>
                    <span className="font-semibold text-slate-800">{selectedProject.scope}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconLeft={<Calendar className="w-4 h-4 text-white" />}
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenInspectionModal(title);
                }}
              >
                Request Inspection for Similar Surface
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
