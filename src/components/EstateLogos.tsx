import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

// 1. GRANDVILLE ESTATE LOGO (Gold & Navy Geometric Chevron Monogram)
export const GrandVilleLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-sm' },
    lg: { icon: 'w-14 h-14', text: 'text-base' }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 100 85"
        className={`${sizeMap[size].icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="GrandVille Estate Logo"
      >
        {/* Top & Right Navy Frame */}
        <path
          d="M 12 10 L 88 10 L 76 26 L 30 26 L 50 56 L 68 26 L 82 26 L 50 78 Z"
          fill="#1C2834"
        />
        {/* Inner Gold Triangle / Chevron */}
        <path
          d="M 22 26 L 78 26 L 50 68 Z"
          fill="#E5A93C"
        />
        <path
          d="M 32 32 L 68 32 L 50 58 Z"
          fill="#F5BE4E"
        />
      </svg>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-black text-[#111111] tracking-tight ${sizeMap[size].text}`}>
            GrandVille
          </span>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest -mt-0.5">
            Estate
          </span>
        </div>
      )}
    </div>
  );
};

// 2. LUCENT CITY ESTATE LOGO (Angular Red "L" with City Skyline Silhouette)
export const LucentCityLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-sm' },
    lg: { icon: 'w-14 h-14', text: 'text-base' }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 90 90"
        className={`${sizeMap[size].icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lucent City Estate Logo"
      >
        {/* City Buildings Silhouette (Dark Charcoal) */}
        <g fill="#1F2937">
          {/* Left tall tower */}
          <rect x="18" y="28" width="8" height="42" rx="1" />
          {/* Windows on tall tower */}
          <rect x="20" y="32" width="4" height="3" fill="#ffffff" />
          <rect x="20" y="38" width="4" height="3" fill="#ffffff" />
          <rect x="20" y="44" width="4" height="3" fill="#ffffff" />
          {/* Mid tower */}
          <rect x="28" y="38" width="7" height="32" rx="1" />
          <rect x="30" y="42" width="3" height="3" fill="#ffffff" />
          <rect x="30" y="48" width="3" height="3" fill="#ffffff" />
          {/* Small tower */}
          <rect x="37" y="48" width="7" height="22" rx="1" />
        </g>
        {/* Dynamic Red Angular 'L' Ribbon */}
        <path
          d="M 28 8 L 48 8 L 18 68 L 74 68 L 74 82 L 4 82 Z"
          fill="#C8102E"
        />
        {/* Highlight facet */}
        <polygon
          points="28,8 40,8 14,70 4,82"
          fill="#E51837"
        />
      </svg>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-black text-[#111111] tracking-tight ${sizeMap[size].text}`}>
            Lucent
          </span>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest -mt-0.5">
            City Estate
          </span>
        </div>
      )}
    </div>
  );
};

// 3. CRESTVILLE LAYOUT LOGO (Red Crest Petals with Skyline Silhouette)
export const CrestvilleLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-sm' },
    lg: { icon: 'w-14 h-14', text: 'text-base' }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 90 90"
        className={`${sizeMap[size].icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Crestville Layout Logo"
      >
        {/* Circular crescent red feathers / petals */}
        <g fill="#C8102E">
          {/* Petal 1 top */}
          <path d="M 44 8 C 30 8 18 18 14 30 C 18 24 28 20 40 20 Z" />
          {/* Petal 2 */}
          <path d="M 26 14 C 14 20 8 32 8 46 C 12 36 20 30 32 26 Z" />
          {/* Petal 3 */}
          <path d="M 12 28 C 6 38 4 52 8 64 C 10 52 18 44 28 38 Z" />
          {/* Petal 4 bottom curve */}
          <path d="M 8 50 C 8 64 16 76 28 82 C 22 72 20 62 24 52 Z" />
          {/* Petal 5 */}
          <path d="M 20 70 C 28 80 40 86 52 86 C 42 80 34 72 32 62 Z" />
        </g>
        {/* Central buildings silhouette */}
        <g fill="#111827">
          <rect x="42" y="32" width="9" height="38" rx="1" />
          <rect x="53" y="42" width="8" height="28" rx="1" />
          <rect x="63" y="50" width="7" height="20" rx="1" />
          <rect x="34" y="48" width="6" height="22" rx="1" />
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-black text-[#111111] tracking-tight ${sizeMap[size].text}`}>
            Crestville
          </span>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest -mt-0.5">
            Layout
          </span>
        </div>
      )}
    </div>
  );
};

// 4. OMA GARDENS LOGO (Ornate Serif "OMA" with Green Circular Garden Crest)
export const OmaGardensLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 'w-10 h-7', text: 'text-xs' },
    md: { icon: 'w-14 h-9', text: 'text-sm' },
    lg: { icon: 'w-20 h-12', text: 'text-base' }
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox="0 0 160 85"
        className={`${sizeMap[size].icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OMA Gardens Logo"
      >
        {/* The "O" with green botanical medallion */}
        <g>
          {/* Outer circle with dashed/beaded botanical motif */}
          <circle cx="34" cy="40" r="28" stroke="#15803D" strokeWidth="3" />
          <circle cx="34" cy="40" r="23" stroke="#15803D" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Top leaf finial */}
          <circle cx="34" cy="10" r="3.5" fill="#15803D" />
          {/* Tree / garden foliage motif inside the O */}
          <path
            d="M 34 26 C 26 26 24 34 24 40 C 24 46 28 50 34 50 C 40 50 44 46 44 40 C 44 34 42 26 34 26 Z"
            fill="#15803D"
          />
          <rect x="32" y="46" width="4" height="10" fill="#15803D" />
        </g>

        {/* Letters "M A" in bold, elegant classical serif font */}
        <g fill="#111827">
          {/* M */}
          <path d="M 68 20 H 76 L 90 48 L 104 20 H 112 V 60 H 104 V 34 L 92 58 H 88 L 76 34 V 60 H 68 Z" />
          {/* A */}
          <path d="M 126 20 H 136 L 152 60 H 143 L 139 50 H 123 L 119 60 H 110 Z M 131 30 L 125 44 H 137 Z" />
        </g>

        {/* Bottom "• GARDENS •" in tracked serif uppercase */}
        <circle cx="28" cy="74" r="2.5" fill="#15803D" />
        <text
          x="40"
          y="78"
          fontFamily="'Montserrat', serif"
          fontWeight="700"
          fontSize="13"
          letterSpacing="0.32em"
          fill="#111827"
        >
          GARDENS
        </text>
        <circle cx="140" cy="74" r="2.5" fill="#15803D" />
      </svg>
    </div>
  );
};

// Dispatcher for any estate
export const EstateLogo: React.FC<{
  estateName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}> = ({ estateName, className = '', size = 'md', showText = true }) => {
  const normalized = estateName.toLowerCase();

  if (normalized.includes('grandville')) {
    return <GrandVilleLogo className={className} size={size} showText={showText} />;
  }
  if (normalized.includes('lucent')) {
    return <LucentCityLogo className={className} size={size} showText={showText} />;
  }
  if (normalized.includes('crestville')) {
    return <CrestvilleLogo className={className} size={size} showText={showText} />;
  }
  if (normalized.includes('oma')) {
    return <OmaGardensLogo className={className} size={size} showText={showText} />;
  }

  // Fallback generic badge
  return (
    <div className={`font-black text-xs uppercase tracking-wider text-neutral-800 ${className}`}>
      {estateName}
    </div>
  );
};

// 5. GOLD SEAL BADGE (As seen in both user images: "100% ✓ VERIFIED & SECURE")
export const GoldSealBadge: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Outer Ruffled Gold Medal Edge */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="45%" stopColor="#E5B238" />
            <stop offset="70%" stopColor="#D49A24" />
            <stop offset="100%" stopColor="#96620C" />
          </radialGradient>
          <linearGradient id="goldSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7C2" />
            <stop offset="50%" stopColor="#E2AC32" />
            <stop offset="100%" stopColor="#8A5A0A" />
          </linearGradient>
        </defs>

        {/* 24-point ruffled star/seal rim */}
        <path
          d="M 60 2 L 67 11 L 78 7 L 82 18 L 94 18 L 94 30 L 105 34 L 101 45 L 110 52 L 103 62 L 110 72 L 100 79 L 103 90 L 92 94 L 91 105 L 79 105 L 75 115 L 64 111 L 57 119 L 49 112 L 39 116 L 36 106 L 25 106 L 25 94 L 14 91 L 17 80 L 8 73 L 15 63 L 8 53 L 18 46 L 15 35 L 26 31 L 27 20 L 38 20 L 42 10 L 53 14 Z"
          fill="url(#goldSheen)"
          stroke="#7A4D07"
          strokeWidth="1.5"
        />

        {/* Inner concentric gold discs */}
        <circle cx="60" cy="60" r="47" fill="url(#goldGradient)" stroke="#8C5C0C" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="#FFF5B8" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="#7A4D07" strokeWidth="0.8" />

        {/* Text Content matching Image 1 & 2 */}
        <text
          x="60"
          y="48"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="18"
          fill="#1C180E"
          letterSpacing="-0.02em"
        >
          100%
        </text>

        {/* Checkmark */}
        <path
          d="M 52 56 L 58 62 L 69 52"
          fill="none"
          stroke="#1C180E"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* VERIFIED & SECURE */}
        <text
          x="60"
          y="73"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="7.5"
          letterSpacing="0.08em"
          fill="#1C180E"
        >
          VERIFIED
        </text>
        <text
          x="60"
          y="82"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900"
          fontSize="7.5"
          letterSpacing="0.08em"
          fill="#1C180E"
        >
          &amp; SECURE
        </text>
      </svg>
    </div>
  );
};
