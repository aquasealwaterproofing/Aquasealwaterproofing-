import React from 'react';
import { ShieldCheck, Layers, Droplets, Check, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const CardShowcaseSection: React.FC = () => {
  return (
    <section id="card-system-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Card Architecture"
        badgeVariant="primary"
        title="Geometric Card Standards & Depth Hierarchy"
        description="Structured with balanced geometric shapes, crisp borders, deep ambient shadows (shadow-xl shadow-slate-200/50), and generous internal padding for architectural clarity."
      />

      {/* Grid of Standard Card Archetypes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Default Clean White Card (Service Format) */}
        <Card variant="elevated" padding="lg" className="flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-md bg-blue-50 text-[#0A2540] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <Badge variant="primary" size="sm">
                Exterior System
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0A2540] tracking-tight uppercase">
                Terrace & Roof Waterproofing
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Multi-layer elastomeric coating systems engineered to accommodate thermal expansion and monsoon ponding water on exposed RCC slabs.
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>UV-resistant flexible polyurethane membrane</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Seamless coving at parapet wall junctions</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Card: Elevated White</span>
            <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Specifications
            </Button>
          </div>
        </Card>

        {/* Card 2: Subtle Blue-Gray Card (Subtle Background #F8FAFC) */}
        <Card variant="subtle" padding="lg" className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-md bg-white text-[#0A2540] flex items-center justify-center border border-slate-200 shadow-2xs">
                <Droplets className="w-6 h-6" />
              </div>
              <Badge variant="accent" size="sm">
                Dr. Fixit System
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0A2540] tracking-tight uppercase">
                Basement & Retaining Wall Seepage
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Positive and negative side crystalline waterproofing providing deep capillary penetration into subterranean concrete foundations.
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-200/60 pt-4 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Withstands hydrostatic head pressure</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dr. Fixit crystalline slurry injection</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Card: Section Gray (#F8FAFC)</span>
            <Button variant="ghost" size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
              Specifications
            </Button>
          </div>
        </Card>

        {/* Card 3: Deep Navy Accent Card (Brand Anchor) */}
        <Card variant="navy" padding="lg" className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-md bg-[#0F2E4E] text-[#FFD700] flex items-center justify-center border border-white/15">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#FFD700] bg-[#061322] px-2.5 py-1 rounded-sm border border-white/10">
                Official Partner
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                Aquaseal Technical Standard
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Applied strictly according to Dr. Fixit manufacturer chemical specifications and curing durations, avoiding shortcut dilutions.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>Pre-treatment mechanical surface preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>Digital moisture meter moisture verification</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Card: Deep Navy Brand</span>
            <Button variant="outline" size="sm">
              View Standards
            </Button>
          </div>
        </Card>

      </div>
    </section>
  );
};
