import React from 'react';
import { PageView } from '../types';
import { ArrowRight, ArrowDown, ShieldCheck } from 'lucide-react';
import { GoldSealBadge, GrandVilleLogo, LucentCityLogo, CrestvilleLogo, OmaGardensLogo } from './EstateLogos';

interface HeroSectionProps {
  onNavigate: (page: PageView) => void;
  onSelectProperty?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home');
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-neutral-200">
      {/* Subtle clean background dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: MINIMAL HERO CONTENT (Exact wording from Image 1) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* KICKER: Red bar + VERLIN PROPERTIES LTD. */}
            <div className="flex items-center gap-3">
              <span className="w-9 h-[3px] bg-[#C8102E] rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#C8102E] uppercase">
                VERLIN PROPERTIES LTD.
              </span>
            </div>

            {/* MAIN HEADLINE: Exact wording from Image 1 */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111111] leading-[1.02]">
                Find Your Land.
              </h1>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#C8102E] leading-[1.02] pt-1">
                <span>Own Your</span>
                <span className="block">Future.</span>
                
                {/* Decorative hand-drawn organic red wavy underline */}
                <svg
                  className="w-44 sm:w-56 h-4 text-[#C8102E] mt-1 -ml-1"
                  viewBox="0 0 220 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 3 8 C 30 2, 50 12, 80 7 C 110 2, 130 12, 160 7 C 185 3, 205 10, 217 8"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* MINIMAL BODY PARAGRAPH (Exact wording from Image 1) */}
            <p className="text-base sm:text-lg text-neutral-700 max-w-xl leading-relaxed pt-1">
              Find a home for your plans in Rivers State. Explore estate locations, compare prices and talk with our team before you decide.
            </p>

            {/* CTAs: "Explore properties →" and "How it works ↓" */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('properties')}
                className="btn-glossy-red px-7 py-3.5 text-sm sm:text-base font-extrabold rounded-2xl flex items-center gap-2.5 shadow-xl transition-transform hover:scale-[1.02]"
              >
                <span>Explore properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="px-5 py-3.5 text-sm sm:text-base font-extrabold text-neutral-800 hover:text-[#C8102E] flex items-center gap-2 transition-colors"
              >
                <span>How it works</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* TRUST REASSURANCE ROW (Exact wording & icon from Image 1) */}
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0 border border-red-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-extrabold text-neutral-900 block leading-tight">
                  100% Verified &amp; Secure
                </span>
                <span className="text-neutral-500 font-normal text-xs">
                  Ask our team about inspections and allocation.
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HERO ARCHITECTURAL VISUAL WITH GOLD SEAL */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Backing Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C8102E]/15 to-amber-500/20 rounded-3xl blur-2xl opacity-70"></div>

              {/* CARD CONTAINER */}
              <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-2xl overflow-hidden">
                
                {/* MODERN ARCHITECTURAL HOUSE PHOTOGRAPHY (White & Slate Duplex like Image 1 & 2) */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
                    alt="Verlin Properties Luxury Duplex Development"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* FLOATING 100% VERIFIED GOLD SEAL (From Image 1 & Image 2) */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
                    <GoldSealBadge size="md" className="animate-in zoom-in duration-300" />
                  </div>

                  {/* BOTTOM OVERLAY INFO */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[11px] font-black uppercase tracking-wider text-red-200 block">
                      Rivers State Estate Corridors
                    </span>
                    <h3 className="text-lg font-black text-white">
                      Omagwa · Isiokpo (Wigwe Univ.) · Etche
                    </h3>
                  </div>
                </div>

                {/* MINI PREVIEWS OF 4 ESTATES (From Image 2 Flyer) */}
                <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                      Featured Estate Listings
                    </span>
                    <button
                      onClick={() => onNavigate('properties')}
                      className="text-xs font-black text-[#C8102E] hover:underline flex items-center gap-1"
                    >
                      <span>View All 4</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* GrandVille Estate */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-between">
                      <GrandVilleLogo size="sm" showText={true} />
                      <span className="price-tag-glossy px-2 py-0.5 rounded text-[11px] font-black text-white">
                        3.7M
                      </span>
                    </div>

                    {/* Lucent City Estate */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-between">
                      <LucentCityLogo size="sm" showText={true} />
                      <span className="price-tag-glossy px-2 py-0.5 rounded text-[11px] font-black text-white">
                        3M
                      </span>
                    </div>

                    {/* Crestville Layout */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-between">
                      <CrestvilleLogo size="sm" showText={true} />
                      <span className="price-tag-glossy px-2 py-0.5 rounded text-[11px] font-black text-white">
                        2.5M
                      </span>
                    </div>

                    {/* OMA Gardens */}
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-between">
                      <OmaGardensLogo size="sm" showText={true} />
                      <span className="price-tag-glossy px-2 py-0.5 rounded text-[11px] font-black text-white">
                        900K
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
