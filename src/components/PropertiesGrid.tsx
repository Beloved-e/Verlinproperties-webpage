import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Search, SlidersHorizontal, MapPin, X } from 'lucide-react';

interface PropertiesGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  title?: string;
  subtitle?: string;
}

export const PropertiesGrid: React.FC<PropertiesGridProps> = ({
  properties,
  onSelectProperty,
  title = "Verified Estates in Rivers State",
  subtitle = "Directly acquired, dispute-free dry table land with instantaneous physical corner beacon allocation."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'plots-remaining'>('featured');

  // Extract unique locations
  const locations = useMemo(() => {
    const locs = new Set<string>();
    properties.forEach(p => {
      if (p.location.includes('Omagwa')) locs.add('Omagwa');
      if (p.location.includes('Isiokpo')) locs.add('Isiokpo');
      if (p.location.includes('Etche')) locs.add('Etche');
      if (p.location.includes('Port Harcourt')) locs.add('Port Harcourt');
    });
    return ['All', ...Array.from(locs)];
  }, [properties]);

  // Filter & Sort properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        // Search filter
        const matchSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Location filter
        const matchLocation =
          selectedLocation === 'All' ||
          p.location.toLowerCase().includes(selectedLocation.toLowerCase());

        // Price filter
        let matchPrice = true;
        if (selectedPriceRange === 'under-1m') {
          matchPrice = p.price_per_plot < 1000000;
        } else if (selectedPriceRange === '1m-3m') {
          matchPrice = p.price_per_plot >= 1000000 && p.price_per_plot <= 3000000;
        } else if (selectedPriceRange === 'above-3m') {
          matchPrice = p.price_per_plot > 3000000;
        }

        return matchSearch && matchLocation && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_per_plot - b.price_per_plot;
        if (sortBy === 'price-desc') return b.price_per_plot - a.price_per_plot;
        if (sortBy === 'plots-remaining') return a.plots_remaining - b.plots_remaining;
        return 0; // default order
      });
  }, [properties, searchTerm, selectedLocation, selectedPriceRange, sortBy]);

  const hasActiveFilters = searchTerm !== '' || selectedLocation !== 'All' || selectedPriceRange !== 'All';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedPriceRange('All');
    setSortBy('featured');
  };

  return (
    <section id="properties" className="py-12 sm:py-16 bg-neutral-50" aria-label="Properties Catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
            Available Land & Estates
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            {subtitle}
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by estate name, road, or landmark..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#C8102E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] appearance-none cursor-pointer"
                >
                  <option value="All">All Locations (Rivers State)</option>
                  <option value="Omagwa">Omagwa (Airport Corridor)</option>
                  <option value="Isiokpo">Isiokpo (Wigwe University)</option>
                  <option value="Etche">Etche Corridor</option>
                  <option value="Port Harcourt">Port Harcourt Outskirts</option>
                </select>
              </div>
            </div>

            {/* Price Filter Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedPriceRange}
                onChange={e => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] appearance-none cursor-pointer"
              >
                <option value="All">Any Price</option>
                <option value="under-1m">Under ₦1,000,000</option>
                <option value="1m-3m">₦1,000,000 – ₦3,000,000</option>
                <option value="above-3m">Above ₦3,000,000</option>
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E] appearance-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="plots-remaining">Fewest Plots Left</option>
              </select>
            </div>

          </div>

          {/* ACTIVE FILTER PILLS / RESET BUTTON */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span>Showing <strong>{filteredProperties.length}</strong> of {properties.length} estates</span>
                {selectedLocation !== 'All' && <span>· Location: <strong>{selectedLocation}</strong></span>}
                {selectedPriceRange !== 'All' && <span>· Price: <strong>{selectedPriceRange}</strong></span>}
              </div>
              <button
                onClick={resetFilters}
                className="text-[#C8102E] font-bold hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* PROPERTIES GRID */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
            <SlidersHorizontal className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-800">No properties matched your criteria</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-4">
              Try adjusting your price range or location filter, or contact our sales desk for upcoming estate releases.
            </p>
            <button
              onClick={resetFilters}
              className="btn-glossy-red px-5 py-2 text-xs font-bold rounded-lg uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
