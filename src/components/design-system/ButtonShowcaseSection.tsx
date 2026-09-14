import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ButtonShowcaseSectionProps {
  onOpenInspectionModal: () => void;
  onCallNow: () => void;
}

export const ButtonShowcaseSection: React.FC<ButtonShowcaseSectionProps> = ({
  onOpenInspectionModal,
  onCallNow,
}) => {
  return (
    <section id="button-styles-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Interactive Components"
        badgeVariant="primary"
        title="Button Styles & Core Call-To-Actions"
        description="Engineered with tactile depth, strict 2:1 horizontal padding ratios, and high contrast for trust and actionability."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary CTA Spotlight: Get Free Inspection */}
        <Card variant="default" padding="lg" className="space-y-4 border-2 border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A2540]">
                Primary Core CTA
              </span>
              <h3 className="text-lg font-bold text-[#0A2540]">"Get Free Inspection"</h3>
            </div>
            <span className="text-xs font-mono bg-blue-50 text-blue-800 font-semibold px-2 py-1 rounded">
              variant="primary"
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            The fundamental conversion driver throughout the website. Uses the deep brand navy (#0A2540) with pure white text and a soft elevation shadow.
          </p>

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                iconLeft={<Calendar className="w-5 h-5 text-white" />}
                onClick={onOpenInspectionModal}
                id="btn-showcase-inspect-lg"
              >
                Get Free Inspection
              </Button>

              <Button
                variant="primary"
                size="md"
                iconLeft={<Calendar className="w-4 h-4 text-white" />}
                onClick={onOpenInspectionModal}
                id="btn-showcase-inspect-md"
              >
                Get Free Inspection
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={onOpenInspectionModal}
                id="btn-showcase-inspect-sm"
              >
                Get Free Inspection
              </Button>
            </div>
            <p className="text-xs text-slate-400">
              * Click any button to test the live inspection booking interface.
            </p>
          </div>
        </Card>

        {/* Secondary CTA Spotlight: Call Now */}
        <Card variant="default" padding="lg" className="space-y-4 border-2 border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Secondary Core CTA
              </span>
              <h3 className="text-lg font-bold text-[#1A2433]">"Call Now"</h3>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 font-semibold px-2 py-1 rounded">
              variant="secondary"
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Immediate hotline trigger for emergency leakage or direct technical inquiries. Uses a crisp border with clean charcoal text.
          </p>

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                iconLeft={<Phone className="w-5 h-5 text-[#0A2540]" />}
                onClick={onCallNow}
                id="btn-showcase-call-lg"
              >
                Call Now
              </Button>

              <Button
                variant="secondary"
                size="md"
                iconLeft={<Phone className="w-4 h-4 text-[#0A2540]" />}
                onClick={onCallNow}
                id="btn-showcase-call-md"
              >
                Call Now
              </Button>

              <Button
                variant="secondary"
                size="sm"
                iconLeft={<Phone className="w-3.5 h-3.5 text-[#0A2540]" />}
                onClick={onCallNow}
                id="btn-showcase-call-sm"
              >
                Call Now
              </Button>
            </div>
            <p className="text-xs text-slate-400">
              * Click to test the direct telephone helpline dialog.
            </p>
          </div>
        </Card>
      </div>

      {/* Additional Design System Button Variants */}
      <div className="mt-6">
        <Card variant="subtle" padding="lg" className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2540]">
              Complete Variant Matrix (Accent, Outline, Ghost, and Dark Navy)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Consistent hover, focus ring, and disabled behavior across all surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Geometric Yellow Accent */}
            <div className="p-4 bg-white rounded-sm border border-slate-200 space-y-2 text-center">
              <span className="text-xs font-mono text-slate-500 block">variant="accent"</span>
              <Button variant="accent" size="md" fullWidth>
                Dr. Fixit System
              </Button>
              <span className="text-[11px] text-slate-400 block">#FFD700 Geometric Accent</span>
            </div>

            {/* Navy Outline */}
            <div className="p-4 bg-white rounded-sm border border-slate-200 space-y-2 text-center">
              <span className="text-xs font-mono text-slate-500 block">variant="navy-outline"</span>
              <Button variant="navy-outline" size="md" fullWidth>
                Download Brochure
              </Button>
              <span className="text-[11px] text-slate-400 block">2px Solid Navy Border</span>
            </div>

            {/* Ghost */}
            <div className="p-4 bg-white rounded-sm border border-slate-200 space-y-2 text-center">
              <span className="text-xs font-mono text-slate-500 block">variant="ghost"</span>
              <Button variant="ghost" size="md" fullWidth iconRight={<ArrowRight className="w-4 h-4" />}>
                View Technical Specs
              </Button>
              <span className="text-[11px] text-slate-400 block">Subtle text action</span>
            </div>

            {/* Inverted White Outline (On Dark Navy) */}
            <div className="p-4 bg-[#0A2540] rounded-sm border border-white/15 space-y-2 text-center">
              <span className="text-xs font-mono text-slate-300 block">variant="outline"</span>
              <Button variant="outline" size="md" fullWidth>
                View Case Studies
              </Button>
              <span className="text-[11px] text-slate-300 block">Dark section inverted</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
