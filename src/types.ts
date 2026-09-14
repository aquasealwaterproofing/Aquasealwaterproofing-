import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'navy-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export type BadgeVariant = 'primary' | 'accent' | 'neutral' | 'success' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
  id?: string;
}

export type CardVariant = 'default' | 'subtle' | 'elevated' | 'navy';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: BadgeVariant;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
  dark?: boolean;
}

export type ImageAspectRatio = '16:9' | '4:3' | '1:1' | '3:2';

export interface ImageTreatmentProps {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  caption?: string;
  tag?: string;
  className?: string;
  id?: string;
}

