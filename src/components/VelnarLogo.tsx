import React from 'react';
import { CONFIG } from '../config';

interface VelnarMonogramProps {
  className?: string;
  size?: number;
}

export const VelnarMonogram: React.FC<VelnarMonogramProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Precision Geometric Architectural V Monogram */}
      <path
        d="M4.5 6.5H11.2L16 17.2L20.8 6.5H27.5L17.6 26.5H14.4L4.5 6.5Z"
        fill="#F3F0E8"
      />
      {/* Restrained Champagne Accent Vertex */}
      <path
        d="M14.4 26.5H17.6L16 23.6L14.4 26.5Z"
        fill="#C6A76A"
      />
    </svg>
  );
};

interface VelnarLogoProps {
  className?: string;
  showDescriptor?: boolean;
  monogramSize?: number;
}

export const VelnarLogo: React.FC<VelnarLogoProps> = ({
  className = '',
  showDescriptor = true,
  monogramSize = 19
}) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Minimalist Architectural Monogram Frame */}
      <div className="w-8 h-8 rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.14] flex items-center justify-center transition-all duration-200 group-hover:border-[#C6A76A]/50 group-hover:bg-[#181918] shrink-0">
        <VelnarMonogram size={monogramSize} />
      </div>

      {/* Wordmark Lockup */}
      <div className="flex flex-col text-left justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-bold text-base sm:text-lg tracking-[0.035em] text-[#F3F0E8]">
            {CONFIG.BRAND_NAME}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] inline-block opacity-85" />
        </div>
        {showDescriptor && (
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#AAA69D] font-mono mt-1 leading-none font-medium">
            {CONFIG.BRAND_DESCRIPTOR}
          </span>
        )}
      </div>
    </div>
  );
};
