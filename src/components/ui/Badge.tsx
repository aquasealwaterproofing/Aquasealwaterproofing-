import React from 'react';
import { BadgeProps } from '../../types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  icon,
  className = '',
  id,
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-1 min-h-[22px] gap-1.5 font-extrabold uppercase tracking-widest',
    md: 'text-[11px] px-3 py-1.5 min-h-[26px] gap-2 font-extrabold uppercase tracking-widest',
  }[size];

  const variantClasses = {
    // Subtle Navy Blue tag
    primary: 'bg-blue-50 text-[#0A2540] border border-blue-200/80',
    
    // Geometric Balance Yellow Accent tag (#FFD700)
    accent: 'bg-[#FFD700] text-[#0A2540] border border-[#ECC400] font-black',
    
    // Crisp Neutral tag (#F8FAFC)
    neutral: 'bg-[#F8FAFC] text-slate-700 border border-slate-200',
    
    // Success / Certified tag
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',

    // Clean outline tag
    outline: 'bg-transparent text-[#0A2540] border border-[#0A2540]/30',
  }[variant];

  return (
    <span
      id={id}
      className={`inline-flex items-center rounded-sm uppercase tracking-widest whitespace-nowrap select-none ${sizeClasses} ${variantClasses} ${className}`.trim()}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
