import React from 'react';

interface VerlinLogoProps {
  variant?: 'dark' | 'light' | 'icon-only';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const VerlinLogo: React.FC<VerlinLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md'
}) => {
  const isLight = variant === 'light'; // Light text for dark backgrounds (like the footer)
  const textColor = isLight ? '#FFFFFF' : '#111111';
  const subtitleColor = isLight ? '#E5E5E5' : '#111111';

  // Sizing presets
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  };

  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="0 0 70 60"
        className={`${sizeClasses[size]} w-auto ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verlin Icon"
      >
        {/* Left Dark Crimson Ribbon Facet */}
        <path
          d="M 0 0 L 21 0 L 39 40 L 22 55 L 0 20 Z"
          fill="#9E0022"
        />
        {/* Right Vivid Red Slanted Facet */}
        <polygon
          points="18,55 37,55 64,0 44,0"
          fill="#E21237"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 350 90"
        className={`${sizeClasses[size]} w-auto max-w-full`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verlin Properties Logo"
      >
        {/* ================= V MARK ================= */}
        <g id="verlin-v-mark">
          {/* Left Dark Crimson Facet */}
          <path
            d="M 0 0 L 21 0 L 39 40 L 22 55 L 0 20 Z"
            fill="#9E0022"
          />
          {/* Right Vivid Red Slanted Wing */}
          <polygon
            points="18,55 37,55 64,0 44,0"
            fill="#E21237"
          />
        </g>

        {/* ================= E R L I N ================= */}
        <g id="verlin-text" fill={textColor}>
          {/* E */}
          <path d="M 72 0 H 105 V 13 H 87 V 21 H 102 V 33 H 87 V 42 H 106 V 55 H 72 Z" />

          {/* R */}
          <path d="M 113 0 H 139 C 148 0 154 5 154 15 C 154 22 149 27 142 29 L 156 55 H 140 L 128 31 H 128 V 55 H 113 Z M 128 12 V 21 H 137 C 140 21 142 19 142 16.5 C 142 14 140 12 137 12 Z" />

          {/* L */}
          <path d="M 162 0 H 177 V 42 H 197 V 55 H 162 Z" />

          {/* I */}
          <path d="M 206 0 H 221 V 55 H 206 Z" />

          {/* N */}
          <path d="M 230 0 H 245 L 263 32 V 0 H 277 V 55 H 263 L 244 22 V 55 H 230 Z" />
        </g>

        {/* ================= P R O P E R T I E S ================= */}
        {/* Tracked across the full width matching the company identity */}
        <text
          x="3"
          y="83"
          fontFamily="'Montserrat', 'Poppins', -apple-system, sans-serif"
          fontWeight="700"
          fontSize="17"
          letterSpacing="0.44em"
          fill={subtitleColor}
        >
          PROPERTIES
        </text>
      </svg>
    </div>
  );
};
