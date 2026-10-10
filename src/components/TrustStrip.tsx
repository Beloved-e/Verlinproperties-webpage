import React from 'react';

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      title: '100% Dry Land',
      desc: 'Solid dry table soil. No sand-filling or raft required.',
      svg: (
        <svg viewBox="0 0 50 50" className="w-7 h-7 text-white" fill="currentColor">
          {/* Furrowed dry ridges icon from flyer */}
          <path d="M 2 40 L 48 40 L 40 18 L 10 18 Z" fill="none" />
          <path d="M 8 38 L 14 20 L 19 20 L 13 38 Z" />
          <path d="M 18 38 L 23 20 L 27 20 L 23 38 Z" />
          <path d="M 28 38 L 31 20 L 35 20 L 33 38 Z" />
          <path d="M 37 38 L 39 20 L 43 20 L 42 38 Z" />
          <line x1="4" y1="41" x2="46" y2="41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Access Road',
      desc: '30ft graded arterial roads connected to expressways.',
      svg: (
        <svg viewBox="0 0 50 50" className="w-7 h-7 text-white" fill="none" stroke="currentColor">
          {/* Winding road with dashed line from flyer */}
          <path
            d="M 10 44 C 18 30, 26 22, 38 8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 22 44 C 28 32, 34 26, 46 8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Dashed center lane */}
          <path
            d="M 16 44 C 23 31, 30 24, 42 8"
            strokeWidth="2"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      title: 'Instant Allocation',
      desc: 'Immediate physical beacon planting upon payment.',
      svg: (
        <svg viewBox="0 0 50 50" className="w-7 h-7 text-white" fill="currentColor">
          {/* 4 corner beacons / pillars with central allocation point */}
          <rect x="8" y="10" width="7" height="12" rx="1" />
          <rect x="35" y="10" width="7" height="12" rx="1" />
          <rect x="8" y="28" width="7" height="12" rx="1" />
          <rect x="35" y="28" width="7" height="12" rx="1" />
          {/* Central locator pin */}
          <circle cx="25" cy="22" r="5" />
          <polygon points="21,24 29,24 25,34" />
        </svg>
      )
    },
    {
      title: 'Adequate Security',
      desc: 'Perimeter fencing, planned gatehouse & calm pact.',
      svg: (
        <svg viewBox="0 0 50 50" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
          {/* Shield outline */}
          <path
            d="M 25 7 L 39 12 C 39 28, 25 41, 25 41 C 25 41, 11 28, 11 12 Z"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Padlock inside shield */}
          <rect x="20" y="22" width="10" height="9" rx="1.5" fill="currentColor" stroke="none" />
          <path d="M 22 22 V 18 C 22 16.3, 23.3 15, 25 15 C 26.7 15, 28 16.3, 28 18 V 22" stroke="currentColor" strokeWidth="2.5" fill="none" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#C8102E] text-white py-6 border-y border-[#A50B22] shadow-inner" aria-label="Verlin Trust Pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/25 transition-colors">
                {pillar.svg}
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">
                  {pillar.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-red-100 font-normal leading-tight hidden sm:block mt-0.5">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
