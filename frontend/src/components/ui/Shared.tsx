import React from 'react';
import { cn } from '@/src/lib/utils';

export interface GlassContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'solid';
}

export const GlassContainer = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: GlassContainerProps) => {
  return (
    <div 
      className={cn(
        "rounded-2xl transition-all duration-300",
        variant === 'default' ? "glass-card" : "bg-white border border-salon-ivory/30 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface StylizedButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const StylizedButton = ({ 
  className, 
  variant = 'primary', 
  size = 'md',
  children,
  ...props 
}: StylizedButtonProps) => {
  const variants = {
    primary: "bg-salon-espresso text-salon-bg hover:bg-salon-bronze shadow-md",
    secondary: "bg-salon-gold text-white hover:bg-salon-bronze",
    outline: "border border-salon-bronze text-salon-bronze hover:bg-salon-cream",
    ghost: "text-salon-bronze hover:bg-salon-cream",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, value, trend, icon, className }: StatCardProps) => {
  return (
    <GlassContainer className={cn("p-6 flex flex-col gap-4", className)}>
      <div className="flex justify-between items-start">
        <div className="p-2 bg-salon-cream rounded-xl text-salon-bronze">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-salon-gold font-semibold mb-1">{title}</p>
        <h3 className="text-2xl font-semibold text-salon-espresso">{value}</h3>
      </div>
    </GlassContainer>
  );
};
