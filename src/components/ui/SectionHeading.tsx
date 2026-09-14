import React from 'react';
import { SectionHeadingProps } from '../../types';
import { Badge } from './Badge';

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'primary',
  title,
  description,
  align = 'left',
  className = '',
  id,
  dark = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      id={id}
      className={`space-y-3 ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`.trim()}
    >
      {badge && (
        <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] ${
          dark ? 'text-white' : 'text-[#0A2540]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed max-w-3xl ${
            isCenter ? 'mx-auto' : ''
          } ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
