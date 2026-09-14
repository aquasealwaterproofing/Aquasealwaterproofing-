import React from 'react';
import { Shield, Sparkles, AlertCircle, Wrench, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const BadgeShowcaseSection: React.FC = () => {
  const badgeExamples = [
    {
      variant: 'primary' as const,
      label: 'Residential Waterproofing',
      icon: <Shield className="w-3 h-3" />,
      usage: 'Standard service category labels, system types',
      token: 'Navy tint: blue-50 background, #0A2540 text, rounded-sm',
    },
    {
      variant: 'accent' as const,
      label: 'Dr. Fixit Certified System',
      icon: <Sparkles className="w-3 h-3" />,
      usage: 'Official partner highlights, special formulations',
      token: 'Geometric yellow: #FFD700 background, #0A2540 text, rounded-sm',
    },
    {
      variant: 'neutral' as const,
      label: 'Commercial & Industrial',
      icon: <Wrench className="w-3 h-3" />,
      usage: 'Metadata tags, building taxonomy, surface materials',
      token: 'Neutral slate: #F8FAFC background, #334155 text',
    },
    {
      variant: 'success' as const,
      label: 'Moisture Tested & Sealed',
      icon: <CheckCircle2 className="w-3 h-3" />,
      usage: 'Status tags, inspection verification, warranty labels',
      token: 'Muted emerald: #ECFDF5 background, #065F46 text',
    },
    {
      variant: 'outline' as const,
      label: 'RCC Slab Application',
      icon: null,
      usage: 'Secondary technical tags, specification chips',
      token: 'Transparent background, #CBD5E1 subtle border',
    },
  ];

  return (
    <section id="label-tags-spec" className="py-12 sm:py-16 border-b border-slate-200">
      <SectionHeading
        badge="Tags & Labels"
        badgeVariant="primary"
        title="Small Label & Tag Style System"
        description="Designed to sit strictly on a single line with tight letter-spacing, uppercase tracking, and balanced contrast."
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badgeExamples.map((item, idx) => (
          <Card key={idx} variant="default" padding="sm" className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono text-slate-500 font-semibold">
                variant="{item.variant}"
              </span>
              <span className="text-[11px] text-slate-400">Single Line Pill</span>
            </div>

            <div className="py-2">
              <Badge variant={item.variant} size="md" icon={item.icon}>
                {item.label}
              </Badge>
            </div>

            <div className="space-y-1 text-xs text-slate-500">
              <p><strong>Usage:</strong> {item.usage}</p>
              <p className="font-mono text-[11px] text-slate-400">{item.token}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
