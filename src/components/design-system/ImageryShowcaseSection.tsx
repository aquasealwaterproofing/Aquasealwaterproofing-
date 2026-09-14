import React from 'react';
import { Image as ImageIcon, CheckCircle, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { ImageTreatment } from '../ui/ImageTreatment';
import drFixitLogo from '../../assets/images/dr-fixit-logo-cropped.jpg';

export const ImageryShowcaseSection: React.FC = () => {
  return (
    <section id="imagery-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Visual Assets & Brand Guidelines"
        badgeVariant="primary"
        title="Official Brand Mark & Imagery Treatment Standards"
        description="Preserving authentic brand assets exactly as supplied, paired with realistic construction photography and strict aspect ratios."
      />

      {/* Brand Asset Mandate Card */}
      <div className="mt-8">
        <Card variant="default" padding="lg" className="border-2 border-slate-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A2540] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <CheckCircle className="w-3.5 h-3.5 text-[#0A2540]" />
                Official Provided Asset Verification
              </div>
              <h3 className="text-2xl font-extrabold text-[#0A2540] tracking-tight">
                Dr. Fixit Official Logo Asset
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                As mandated, the official Dr. Fixit graphic asset uploaded by the business is preserved in its authentic, unmodified resolution and ratio. No synthetic recreations, artificial 3D bevels, distortions, or generic substitutions are permitted.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono pt-1">
                <span className="bg-slate-100 px-2.5 py-1 rounded">Asset: dr-fixit-logo.jpg</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded">Display: No Distortion</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded">Ratio: Preserved Original</span>
              </div>
            </div>

            {/* Official Asset Presentation Box */}
            <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Supplied Official Asset
              </span>
              <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-center max-w-[280px]">
                <img
                  src={drFixitLogo}
                  alt="Official Dr. Fixit Waterproofing Expert Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain rounded shadow-2xs"
                />
              </div>
              <span className="text-[11px] text-slate-500 block mt-2 font-medium">
                Dr. Fixit Waterproofing Expert
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Rules Notice on Imagery Treatment */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            Approved Imagery Standards
          </div>
          <ul className="text-xs text-emerald-900/90 space-y-1.5 list-disc list-inside">
            <li>Authentic high-resolution civil construction and waterproofing photography</li>
            <li>Real concrete slabs, RCC curing, polyurethane coatings, and brick masonry</li>
            <li>Strict standard aspect ratios: 16:9 (Hero), 4:3 (Services), 1:1 (Technical Detail)</li>
            <li>Subtle 1px borders (#E2E8F0) and consistent 12px corner radii</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            Strictly Prohibited Imagery Patterns
          </div>
          <ul className="text-xs text-rose-900/90 space-y-1.5 list-disc list-inside">
            <li>No generic AI-slop illustrations or fantasy futuristic buildings</li>
            <li>No cartoon mascots or clip-art drops of water</li>
            <li>No glassmorphism, heavy blurry shadows, or glowing neon borders</li>
            <li>No arbitrary purple-to-blue or rainbow gradient filters</li>
          </ul>
        </div>
      </div>

      {/* Aspect Ratio Demonstrations */}
      <div className="mt-8 space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2540]">
          Standard Aspect Ratio Matrix
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 16:9 Aspect Ratio Example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Wide Structure (Hero & Banners)</span>
              <span className="font-mono text-slate-400">16:9</span>
            </div>
            <ImageTreatment
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80"
              alt="Concrete foundation civil engineering"
              aspectRatio="16:9"
              caption="Sub-structure & foundation waterproofing"
              tag="16:9 Standard"
            />
          </div>

          {/* 4:3 Aspect Ratio Example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Service Card Standard</span>
              <span className="font-mono text-slate-400">4:3</span>
            </div>
            <ImageTreatment
              src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
              alt="Terrace roof and concrete slab construction"
              aspectRatio="4:3"
              caption="Terrace elastomeric coating application"
              tag="4:3 Service"
            />
          </div>

          {/* 1:1 Aspect Ratio Example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Detail & Material Inspection</span>
              <span className="font-mono text-slate-400">1:1</span>
            </div>
            <ImageTreatment
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
              alt="Moisture diagnostic evaluation"
              aspectRatio="1:1"
              caption="Diagnostic core moisture evaluation"
              tag="1:1 Detail"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
