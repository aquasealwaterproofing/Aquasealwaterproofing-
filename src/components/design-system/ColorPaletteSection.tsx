import React from 'react';
import { Palette, Check, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

export const ColorPaletteSection: React.FC = () => {
  const brandColors = [
    {
      name: 'Primary Navy Blue',
      hex: '#0A2540',
      token: 'bg-[#0A2540]',
      textColor: 'text-white',
      usage: 'Primary brand identity, main headings, primary CTA buttons, and header top bar.',
      contrast: '15.4:1 on white (AAA)',
    },
    {
      name: 'Deep Navy (Dark)',
      hex: '#061322',
      token: 'bg-[#061322]',
      textColor: 'text-white',
      usage: 'Footer background, high-contrast structural accents, button active states.',
      contrast: '18.2:1 on white (AAA)',
    },
    {
      name: 'Navy Interactive',
      hex: '#103254',
      token: 'bg-[#103254]',
      textColor: 'text-white',
      usage: 'Hover states for navy buttons and interactive links.',
      contrast: '12.8:1 on white (AAA)',
    },
    {
      name: 'Pure White (Main Background)',
      hex: '#FFFFFF',
      token: 'bg-white border border-slate-200',
      textColor: 'text-slate-900',
      usage: 'Main canvas background, clean card backgrounds, standard layout base.',
      contrast: 'Base Canvas',
    },
    {
      name: 'Geometric Section Gray',
      hex: '#F8FAFC',
      token: 'bg-[#F8FAFC] border border-slate-200',
      textColor: 'text-slate-900',
      usage: 'Subtle section backgrounds, secondary cards, alternating content bands.',
      contrast: 'Soft Contrast',
    },
    {
      name: 'Dark Charcoal Text',
      hex: '#1A2433',
      token: 'bg-[#1A2433]',
      textColor: 'text-white',
      usage: 'Primary body typography, secondary headings, and high-readability text.',
      contrast: '13.9:1 on white (AAA)',
    },
    {
      name: 'Muted Slate Text',
      hex: '#64748B',
      token: 'bg-[#64748B]',
      textColor: 'text-white',
      usage: 'Supporting descriptions, captions, metadata, and technical specifications.',
      contrast: '5.2:1 on white (AA)',
    },
    {
      name: 'Geometric Balance Yellow Accent',
      hex: '#FFD700',
      token: 'bg-[#FFD700]',
      textColor: 'text-[#0A2540]',
      usage: 'Accent badges, icons, phone numbers, and geometric highlight tags. NOT for full page background.',
      contrast: 'Complements brand mark',
    },
  ];

  return (
    <section id="color-system-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Color Architecture"
        badgeVariant="primary"
        title="Geometric Balance Waterproofing Color System"
        description="A restrained, authoritative palette designed for maximum legibility, trust, and alignment with the official Dr. Fixit branding and Geometric Balance aesthetic."
      />

      {/* Rules Notice */}
      <div className="mt-6 p-4 rounded-sm bg-amber-50/80 border border-amber-200/90 text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#ECC400] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="font-bold">Palette Constraint Rule:</strong> Deep navy blue (#0A2540) is the primary brand anchor; pure white (#FFFFFF) and geometric section gray (#F8FAFC) form the structural backgrounds. Gold yellow (#FFD700) is strictly a restrained accent (aligned with Dr. Fixit) and must <em>never</em> dominate full website backgrounds.
        </div>
      </div>

      {/* Palette Swatches */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brandColors.map((color) => (
          <Card key={color.hex} variant="default" padding="sm" className="space-y-3">
            <div
              className={`h-24 rounded-lg flex items-end p-3 ${color.token} ${color.textColor} shadow-inner transition-transform`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-mono text-xs font-bold tracking-wide">{color.hex}</span>
                <span className="text-[10px] uppercase font-bold opacity-80">{color.contrast}</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0A2540]">{color.name}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">{color.usage}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
