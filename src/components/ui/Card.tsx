import React from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  id,
}) => {
  // Consistent geometric border radius: rounded-lg with crisp borders and structural shadows
  const baseClasses = 'rounded-lg transition-all duration-200';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-8',
  }[padding];

  const variantClasses = {
    // Default Clean White Card
    default: 'bg-white border border-slate-100 shadow-sm',

    // Subtle Section/Container Card (Geometric slate tone #F8FAFC)
    subtle: 'bg-[#F8FAFC] border border-slate-200 shadow-2xs',

    // Elevated Interactive Card (Geometric Balance deep soft shadow)
    elevated: 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-slate-200',

    // Deep Navy Brand Card (for key brand statements)
    navy: 'bg-[#0A2540] text-white border border-white/10 shadow-xl shadow-blue-950/20',
  }[variant];

  return (
    <div
      id={id}
      className={`${baseClasses} ${paddingClasses} ${variantClasses} ${className}`.trim()}
    >
      {children}
    </div>
  );
};
