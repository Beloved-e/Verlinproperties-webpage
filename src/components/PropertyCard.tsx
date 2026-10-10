import React from 'react';
import { Property } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import { EstateLogo } from './EstateLogos';
import { MapPin, Maximize2, MessageSquare, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  // Format price in Millions or full Naira
  const formatPriceShort = (price: number) => {
    if (price >= 1000000) {
      const millions = price / 1000000;
      return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `${Math.round(price / 1000)}K`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const isSoldOut = property.plots_remaining <= 0;
  const isSellingFast = !isSoldOut && property.plots_remaining <= 5;
  const coverImage = property.image_urls[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200';

  const whatsappMessage = encodeURIComponent(
    `Hello Verlin Properties, I would like to inquire about ${property.name} located at ${property.location} (₦${property.price_per_plot.toLocaleString()} per plot). Is inspection available this week?`
  );

  return (
    <div className="group rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* CARD IMAGE & OVERLAY BADGES */}
      <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={coverImage}
          alt={property.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* GLOSSY RED PRICE TAG WITH RIVETS EFFECT AS SHOWN IN IMAGE 2 */}
        <div className="absolute top-3 right-3">
          <div className="price-tag-glossy px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-tight flex items-baseline gap-1 shadow-lg border border-red-400/40">
            <span>{formatPriceShort(property.price_per_plot)}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-100">/ plot</span>
          </div>
        </div>

        {/* REMAINING PLOTS / SELLING FAST BADGE */}
        <div className="absolute top-3 left-3">
          {isSoldOut ? (
            <span className="bg-neutral-900/90 text-neutral-300 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-neutral-700">
              Sold Out
            </span>
          ) : isSellingFast ? (
            <span className="bg-[#C8102E] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>Only {property.plots_remaining} Plots Left!</span>
            </span>
          ) : (
            <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/20">
              {property.plots_remaining} plots remaining
            </span>
          )}
        </div>

        {/* BOTTOM METADATA ON IMAGE */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-red-200 font-semibold mb-0.5 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C8102E]" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
      </div>

      {/* CARD BODY WITH OFFICIAL ESTATE LOGO (From Image 2 Flyer) */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* OFFICIAL ESTATE LOGO FROM FLYER */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <EstateLogo estateName={property.name} size="md" showText={true} />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Verified Title
          </span>
        </div>

        {/* DESCRIPTION KICKER */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        {/* KEY SPECS ROW */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-700">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold">{property.plot_size_sqm} SQM / Plot</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-700 justify-end">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="font-semibold truncate">100% Dry Land</span>
          </div>
        </div>

        {/* PROGRESS TRACKER BAR */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500">
            <span>Progress: {property.plots_sold} of {property.total_plots} sold</span>
            <span className="font-bold text-neutral-900">
              {Math.round((property.plots_sold / property.total_plots) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
            <div
              className={`h-full transition-all duration-500 ${
                isSoldOut ? 'bg-neutral-400' : 'bg-[#C8102E]'
              }`}
              style={{ width: `${Math.min(100, Math.round((property.plots_sold / property.total_plots) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(property)}
            className="w-full py-2.5 px-3 rounded-lg border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-red w-full py-2.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 whitespace-nowrap"
            title="Chat directly on WhatsApp with prefilled property details"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </a>
        </div>

      </div>

    </div>
  );
};
