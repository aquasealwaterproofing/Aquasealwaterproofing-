import React from 'react';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  id,
  disabled,
  ...props
}) => {
  // Base styling: Geometric crispness (rounded-sm), uppercase tracking-wider, architectural balance, whitespace-nowrap
  const baseClasses = 'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-150 rounded-sm select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0';

  // Size styling: adhering to geometric proportions and 44px+ touch targets without vertical clipping
  const sizeClasses = {
    sm: 'text-[10px] sm:text-xs px-3 sm:px-3.5 py-1.5 sm:py-2 min-h-[36px] gap-1.5',
    md: 'text-xs px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] gap-2',
    lg: 'text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 min-h-[46px] sm:min-h-[50px] gap-2 sm:gap-2.5',
  }[size];

  // Variant styling: Geometric Balance palette with Deep Navy & Crisp Gold Yellow (#FFD700)
  const variantClasses = {
    // Primary CTA: "Get Free Inspection" - Bold Deep Navy with crisp structural shadow
    primary: 'bg-[#0A2540] text-white hover:bg-[#07192C] active:bg-[#051220] focus:ring-[#0A2540] shadow-md shadow-blue-900/20',
    
    // Secondary CTA: "Call Now" - Geometric 2px Solid Navy Border
    secondary: 'bg-white text-[#0A2540] border-2 border-[#0A2540] hover:bg-slate-50 active:bg-slate-100 focus:ring-[#0A2540] shadow-xs',
    
    // Restrained Dr. Fixit & Geometric Yellow Accent (#FFD700)
    accent: 'bg-[#FFD700] text-[#0A2540] font-black hover:bg-[#ECC400] active:bg-[#D9B400] focus:ring-[#FFD700] shadow-sm',
    
    // Transparent / Ghost
    ghost: 'bg-transparent text-[#0A2540] hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-400',
    
    // Outline: crisp navy border for light background sections
    outline: 'bg-transparent text-[#0A2540] border-2 border-[#0A2540] hover:bg-[#0A2540] hover:text-white active:bg-[#07192C] focus:ring-[#0A2540]',

    // Navy Outline
    'navy-outline': 'bg-transparent text-[#0A2540] border-2 border-[#0A2540] hover:bg-[#0A2540] hover:text-white active:bg-[#07192C] focus:ring-[#0A2540]',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      id={id}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <span className="shrink-0 flex items-center">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
    </button>
  );
};
