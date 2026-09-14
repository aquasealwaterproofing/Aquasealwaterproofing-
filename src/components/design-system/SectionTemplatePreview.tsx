import React from 'react';
import { ShieldCheck, Phone, Calendar, ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ImageTreatment } from '../ui/ImageTreatment';

interface SectionTemplatePreviewProps {
  onOpenInspectionModal: () => void;
  onCallNow: () => void;
}

export const SectionTemplatePreview: React.FC<SectionTemplatePreviewProps> = ({
  onOpenInspectionModal,
  onCallNow,
}) => {
  return (
    <section id="future-section-preview" className="py-14 sm:py-20 bg-[#F8FAFC] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading Blueprint */}
        <SectionHeading
          badge="Future Section Prototype"
          badgeVariant="accent"
          title="Engineered Structural Protection Services"
          description="Demonstrating how every future section of the Aquaseal Waterproofing website will automatically adhere to the established visual foundation, typography, cards, and button styles."
          align="center"
        />

        {/* 3-Column Responsive Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Service Card 1 */}
          <Card variant="elevated" padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div>
              <ImageTreatment
                src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
                alt="Terrace waterproofing elastomeric membrane"
                aspectRatio="4:3"
                tag="Exterior Slab"
                className="rounded-t-lg rounded-b-none border-0 border-b border-slate-100"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    RCC Exposed Roof
                  </Badge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Dr. Fixit System</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] uppercase">Terrace & Roof Waterproofing</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Seamless elastomeric waterproof barrier designed to withstand high sun exposure, thermal structural expansion, and persistent rain ponding.
                </p>

                <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Fiber-reinforced flexible coating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Seals hairline cracks up to 2mm</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={onOpenInspectionModal}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Get Free Inspection
              </Button>
            </div>
          </Card>

          {/* Service Card 2 */}
          <Card variant="elevated" padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div>
              <ImageTreatment
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80"
                alt="Basement and foundation crystalline waterproofing"
                aspectRatio="4:3"
                tag="Sub-Grade Concrete"
                className="rounded-t-lg rounded-b-none border-0 border-b border-slate-100"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="accent" size="sm">
                    Subterranean
                  </Badge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A2540]">Hydrostatic Barrier</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] uppercase">Basement & Foundation Sealing</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deep penetrating crystalline moisture barrier that blocks subterranean ground water from permeating concrete foundations and retaining walls.
                </p>

                <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Deep crystal capillary penetration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Active positive & negative side protection</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={onOpenInspectionModal}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Get Free Inspection
              </Button>
            </div>
          </Card>

          {/* Service Card 3 */}
          <Card variant="elevated" padding="none" className="overflow-hidden flex flex-col justify-between group">
            <div>
              <ImageTreatment
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="External wall masonry damp proofing"
                aspectRatio="4:3"
                tag="Vertical Facade"
                className="rounded-t-lg rounded-b-none border-0 border-b border-slate-100"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    External Facade
                  </Badge>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Breathable Barrier</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] uppercase">External Wall Damp Proofing</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Rain-shedding acrylic waterproof coating for exterior plastered walls, preventing damp patches, efflorescence, and interior paint peeling.
                </p>

                <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Anti-fungal and anti-algal formulation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Monsoon wind-driven rain resistance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={onOpenInspectionModal}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Get Free Inspection
              </Button>
            </div>
          </Card>

        </div>

        {/* Section Bottom Conversion Band */}
        <div className="mt-12 p-6 sm:p-8 bg-[#0A2540] rounded-sm text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-950/20 border border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-black tracking-tight uppercase">
              Have ongoing water leakage in your structure?
            </h4>
            <p className="text-sm text-slate-300">
              Schedule a technician visit to carry out digital moisture diagnostics and identify root-cause entry points.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              iconLeft={<Phone className="w-4 h-4" />}
              onClick={onCallNow}
            >
              Call Now
            </Button>
            <Button
              variant="accent"
              size="md"
              iconLeft={<Calendar className="w-4 h-4 text-[#0A2540]" />}
              onClick={onOpenInspectionModal}
            >
              Get Free Inspection
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
