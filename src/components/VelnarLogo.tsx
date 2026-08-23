import React from 'react';
import { CONFIG } from '../config';

interface VelnarMonogramProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
  accentColor?: string;
}

/**
 * Bespoke Geometric VELNAR Monogram Mark.
 * Built with two precision architectural strokes with a central negative-space portal aperture.
 * Highly scalable from 16px favicon to large avatar and display sizes.
 */
export const VelnarMonogram: React.FC<VelnarMonogramProps> = ({
  className = '',
  size = 20,
  monochrome = false,
  accentColor = '#C6A76A',
}) => {
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
      {/* Left Architectural Stroke - Ivory Form */}
      <path
        d="M4.5 5.5H11.5L15 18.5V26.5H12L4.5 5.5Z"
        fill="#F3F0E8"
      />

      {/* Right Architectural Stroke - Ivory Form with Precision Central Portal Aperture */}
      <path
        d="M27.5 5.5H20.5L17 18.5V26.5H20L27.5 5.5Z"
        fill="#F3F0E8"
      />

      {/* Restrained Champagne Accent Vertex Highlight (Monochrome-safe) */}
      {!monochrome && (
        <path
          d="M17 23.5H20L19.2 26.5H17V23.5Z"
          fill={accentColor}
          opacity="0.9"
        />
      )}
    </svg>
  );
};

interface VelnarBrandMarkProps {
  size?: number;
  className?: string;
  monochrome?: boolean;
}

/**
 * Reusable Framed Monogram Brand Mark for Avatars, Social Media, and Badges.
 */
export const VelnarBrandMark: React.FC<VelnarBrandMarkProps> = ({
  size = 36,
  className = '',
  monochrome = false,
}) => {
  return (
    <div
      className={`rounded-xl bg-[#141514] border border-[#F3F0E8]/[0.14] flex items-center justify-center shrink-0 transition-all ${className}`}
      style={{ width: size, height: size }}
    >
      <VelnarMonogram size={Math.round(size * 0.56)} monochrome={monochrome} />
    </div>
  );
};

interface VelnarLogoProps {
  className?: string;
  showDescriptor?: boolean;
  monogramSize?: number;
  frameSize?: number;
}

/**
 * Full VELNAR STUDIO Brand Header & Footer Logo Lockup.
 * Visual hierarchy:
 *   VELNAR ·
 *   S T U D I O
 */
export const VelnarLogo: React.FC<VelnarLogoProps> = ({
  className = '',
  showDescriptor = true,
  monogramSize = 18,
  frameSize = 34,
}) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Precision Monogram Frame */}
      <div
        className="rounded-lg bg-[#141514] border border-[#F3F0E8]/[0.14] flex items-center justify-center transition-all duration-200 group-hover:border-[#C6A76A]/45 group-hover:bg-[#181918] shrink-0"
        style={{ width: frameSize, height: frameSize }}
      >
        <VelnarMonogram size={monogramSize} />
      </div>

      {/* Wordmark Lockup */}
      <div className="flex flex-col text-left justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-bold text-[15px] sm:text-[17px] tracking-[0.04em] text-[#F3F0E8]">
            {CONFIG.BRAND_NAME}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] inline-block opacity-85 shrink-0" />
        </div>
        {showDescriptor && (
          <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.28em] text-[#AAA69D] font-mono mt-1 leading-none font-medium select-none">
            {CONFIG.BRAND_DESCRIPTOR}
          </span>
        )}
      </div>
    </div>
  );
};

