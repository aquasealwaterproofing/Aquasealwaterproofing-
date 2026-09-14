import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

export const TypographySection: React.FC = () => {
  const typeScale = [
    {
      level: 'Display Hero',
      element: 'H1 / Display',
      size: '40px - 54px',
      weight: 'Black (900)',
      lineHeight: '1.1',
      sample: 'End-to-End Structural Protection & Permanent Sealing',
      usage: 'Hero title, primary visual hook, major impact headlines',
    },
    {
      level: 'Section Header',
      element: 'H2',
      size: '28px - 36px',
      weight: 'Black (900)',
      lineHeight: '1.15',
      sample: 'Diagnostic Moisture Mapping & Chemical Membrane Barrier',
      usage: 'Primary section titles, major service categories',
    },
    {
      level: 'Card & Sub-Section',
      element: 'H3',
      size: '20px - 24px',
      weight: 'Bold (700)',
      lineHeight: '1.35',
      sample: 'Terrace & Flat Roof Polyurethane Coating',
      usage: 'Service cards, feature titles, inspection steps',
    },
    {
      level: 'Component Subheading',
      element: 'H4',
      size: '17px - 19px',
      weight: 'Bold (700)',
      lineHeight: '1.4',
      sample: 'Sub-grade crystal penetration with warranty coverage',
      usage: 'Sub-headers, list group titles, specification labels',
    },
    {
      level: 'Lead Paragraph',
      element: 'p.lead',
      size: '17px - 18px',
      weight: 'Regular (400) / Medium (500)',
      lineHeight: '1.65',
      sample: 'Aquaseal combines diagnostic acoustic leak detection with verified Dr. Fixit chemical sealing systems to protect your concrete slabs from monsoon moisture ingress.',
      usage: 'Introductory paragraphs under H2 headings, hero supporting text',
    },
    {
      level: 'Standard Body',
      element: 'p.body',
      size: '16px (1rem)',
      weight: 'Regular (400)',
      lineHeight: '1.6',
      sample: 'Our technicians carry digital damp meters to test relative humidity inside plaster and brickwork before suggesting any elastomeric or cementitious coating.',
      usage: 'Default body text across all cards, articles, and service descriptions',
    },
    {
      level: 'Geometric Eyebrow',
      element: 'span.eyebrow',
      size: '10px - 11px',
      weight: 'ExtraBold (800)',
      lineHeight: '1.4',
      sample: 'OFFICIAL DR. FIXIT APPLICATION METHODOLOGY',
      usage: 'Tags, pill badges, metadata, captions, card categories',
    },
  ];

  return (
    <section id="typography-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Typographic System"
        badgeVariant="primary"
        title="Geometric Balance Sans-Serif Hierarchy"
        description="Engineered with bold structural display weight, geometric letter-spacing, and high-contrast legibility across Indian residential & commercial clients."
      />

      <div className="mt-8 space-y-5">
        {typeScale.map((item, idx) => (
          <Card key={idx} variant="default" padding="md" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#0A2540] bg-slate-100 px-2 py-0.5 rounded-sm">
                  {item.element}
                </span>
                <span className="text-xs font-medium text-slate-500">{item.level}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span>Size: <strong className="text-slate-700">{item.size}</strong></span>
                <span>Weight: <strong className="text-slate-700">{item.weight}</strong></span>
                <span className="hidden sm:inline">Leading: <strong className="text-slate-700">{item.lineHeight}</strong></span>
              </div>
            </div>

            <div className="pt-1">
              {idx === 0 && (
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.1]">
                  {item.sample}
                </p>
              )}
              {idx === 1 && (
                <p className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight leading-[1.15]">
                  {item.sample}
                </p>
              )}
              {idx === 2 && (
                <p className="text-xl sm:text-2xl font-bold text-[#0A2540] leading-snug">
                  {item.sample}
                </p>
              )}
              {idx === 3 && (
                <p className="text-base sm:text-lg font-bold text-[#1A2433]">
                  {item.sample}
                </p>
              )}
              {idx === 4 && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[70ch]">
                  {item.sample}
                </p>
              )}
              {idx === 5 && (
                <p className="text-base text-[#1A2433] leading-relaxed max-w-[70ch]">
                  {item.sample}
                </p>
              )}
              {idx === 6 && (
                <p className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-[#0A2540] uppercase">
                  {item.sample}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-400 italic pt-1">
              Applied for: {item.usage}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
