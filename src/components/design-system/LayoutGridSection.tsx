import React from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, LayoutGrid, Check } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

export const LayoutGridSection: React.FC = () => {
  const breakpoints = [
    {
      name: 'Mobile Phone',
      range: '< 640px (sm)',
      icon: <Smartphone className="w-5 h-5 text-[#0A2540]" />,
      columns: '1 Column Layout',
      padding: '16px outer gutter (px-4)',
      touchTarget: 'Min 44px touch targets on buttons & links',
      behavior: 'Full-width CTAs, stacked navigation, simplified linear flow.',
    },
    {
      name: 'Tablet Devices',
      range: '640px - 1023px (md)',
      icon: <Tablet className="w-5 h-5 text-[#0A2540]" />,
      columns: '2 Column Grid',
      padding: '24px outer gutter (px-6)',
      touchTarget: 'Hybrid touch/cursor responsive states',
      behavior: '2-card service rows, dual CTA pairings, balanced vertical rhythm.',
    },
    {
      name: 'Standard Desktop',
      range: '1024px - 1279px (lg)',
      icon: <Monitor className="w-5 h-5 text-[#0A2540]" />,
      columns: '3 Column Grid',
      padding: '32px outer gutter (px-8)',
      touchTarget: 'Cursor hover feedback & subtle lift interactions',
      behavior: 'Full horizontal header, 3-card service matrices, side-by-side specs.',
    },
    {
      name: 'Large Desktop',
      range: '1280px+ (xl / 2xl)',
      icon: <Maximize2 className="w-5 h-5 text-[#0A2540]" />,
      columns: 'Max 1280px Content Wrapper',
      padding: 'max-w-7xl mx-auto px-8',
      touchTarget: 'Fixed architectural proportions',
      behavior: 'Prevents text stretching beyond 75ch, balanced negative space.',
    },
  ];

  const spacingScale = [
    { token: 'space-1', value: '4px', usage: 'Micro badges, icon gaps' },
    { token: 'space-2', value: '8px', usage: 'Tight element groupings, small tag padding' },
    { token: 'space-3', value: '12px', usage: 'Button vertical padding, form input spacing' },
    { token: 'space-4', value: '16px', usage: 'Mobile card padding, base layout gap' },
    { token: 'space-6', value: '24px', usage: 'Desktop card padding, standard grid gap' },
    { token: 'space-8', value: '32px', usage: 'Section title spacing, major component gap' },
    { token: 'space-12', value: '48px', usage: 'Sub-section vertical breathing space' },
    { token: 'space-16', value: '64px', usage: 'Major section vertical spacing (py-16)' },
  ];

  return (
    <section id="spacing-grid-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Layout & Architecture"
        badgeVariant="primary"
        title="Spacing, Grid & Responsive Foundation"
        description="Strict mathematical spacing scales and viewport constraints guaranteeing seamless scaling from compact smartphones to 4K monitors."
      />

      {/* Breakpoint Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {breakpoints.map((bp, idx) => (
          <Card key={idx} variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                {bp.icon}
                <span className="font-bold text-sm text-[#0A2540]">{bp.name}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 font-semibold">{bp.range}</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{bp.columns}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{bp.padding}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{bp.touchTarget}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-100">
              {bp.behavior}
            </p>
          </Card>
        ))}
      </div>

      {/* Spacing System Table & Visual Ruler */}
      <div className="mt-8">
        <Card variant="subtle" padding="lg" className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A2540]">
              Spacing Cadence & Container Math
            </h4>
            <span className="text-xs font-mono text-slate-500">Base Unit: 4px / 8px</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {spacingScale.map((s, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-center space-y-1.5">
                <span className="text-xs font-mono font-bold text-[#0A2540] block">{s.value}</span>
                <div
                  className="bg-[#0A2540]/20 mx-auto rounded"
                  style={{ height: s.value, width: '100%', minHeight: '4px' }}
                />
                <span className="text-[10px] font-mono text-slate-400 block">{s.token}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-600 flex items-start gap-2">
            <span className="font-bold text-[#0A2540]">Nested Radius Rule:</span>
            <span>Inner Corner Radius = Outer Corner Radius - Distance Between The Two (Padding). E.g., for a 12px outer card with 4px inner padding, child elements use 8px radius.</span>
          </div>
        </Card>
      </div>
    </section>
  );
};
