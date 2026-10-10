import React, { useState } from 'react';
import { Property, Inquiry } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import { store } from '../services/store';
import { EstateLogo } from './EstateLogos';
import {
  X,
  MapPin,
  Maximize2,
  Calendar,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Compass,
  CheckCircle,
  Video,
  Flame,
  ExternalLink,
  Layers,
  AlertCircle
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onInquirySubmitted?: (inquiry: Inquiry) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onInquirySubmitted
}) => {
  if (!property) return null;

  // Gallery state
  const images = property.image_urls.length > 0
    ? property.image_urls
    : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200'];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Plot Calculator state
  const [plotCount, setPlotCount] = useState<number>(1);

  // Inspection Booking Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculated values
  const isSoldOut = property.plots_remaining <= 0;
  const isSellingFast = !isSoldOut && property.plots_remaining <= 5;
  const totalCost = plotCount * property.price_per_plot;
  const totalAreaSqm = plotCount * property.plot_size_sqm;

  // WhatsApp Pre-filled link
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
    `Hello Verlin Properties, I would like to inquire about ${property.name} at ${property.location}. I am interested in ${plotCount} plot(s) (Total: ₦${totalCost.toLocaleString()}). When can I inspect?`
  )}`;

  // Google Maps Directions link
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${property.latitude},${property.longitude}&hl=es;z=14&output=embed`;

  // Submit inspection booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitting(true);
    try {
      const res = await store.saveInquiry({
        name: clientName,
        phone: clientPhone,
        email: clientEmail || 'N/A',
        property: property.name,
        message: customMessage || `Interested in inspecting ${plotCount} plot(s) at ${property.name}`,
        preferredDate: inspectionDate,
        plotsCount: plotCount
      });

      setBookingSuccess(true);
      if (onInquirySubmitted) {
        onInquirySubmitted({
          id: 'temp',
          timestamp: new Date().toISOString(),
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          property: property.name,
          message: customMessage,
          status: 'New'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* MODAL WRAPPER */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* MODAL HEADER */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3 pr-4 truncate">
            <EstateLogo estateName={property.name} size="md" showText={false} />
            <div className="truncate border-l border-neutral-200 pl-3">
              <span className="text-[10px] font-black tracking-widest text-[#C8102E] uppercase block">
                Verlin Verified Estate
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] truncate">
                {property.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-10 pb-28 md:pb-12">
          
          {/* SECTION 1: HERO GALLERY & QUICK SPECS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: IMAGE GALLERY WITH THUMBNAILS & LIGHTBOX TRIGGER */}
            <div className="lg:col-span-7 space-y-3">
              <div
                className="relative aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden group cursor-pointer border border-neutral-200"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={images[activeImageIndex]}
                  alt={`${property.name} view ${activeImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* LIGHTBOX HINT */}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>

                {/* PREV/NEXT BUTTONS */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS ROW */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#C8102E] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: PRICE, PLOTS TRACKER & QUICK ACTIONS */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* PRICE BANNER */}
              <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-2 border border-neutral-800 shadow-md">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                  Direct Verlin Allocation Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    ₦{property.price_per_plot.toLocaleString()}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-red-300 font-semibold">
                    per 465 SQM plot
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* PLOTS TRACKER WITH PROGRESS BAR */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-neutral-600">
                    Estate Plots Tracker
                  </h4>
                  {isSoldOut ? (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase bg-neutral-900 text-white">
                      Sold Out
                    </span>
                  ) : isSellingFast ? (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase bg-red-100 text-[#C8102E] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Selling Fast ({property.plots_remaining} left)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase bg-emerald-100 text-emerald-800">
                      {property.plots_remaining} Available
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-1 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Total Plots</span>
                    <span className="text-sm font-black text-neutral-900">{property.total_plots}</span>
                  </div>
                  <div className="border-x border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Sold Plots</span>
                    <span className="text-sm font-black text-neutral-900">{property.plots_sold}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Remaining</span>
                    <span className="text-sm font-black text-[#C8102E]">{property.plots_remaining}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                  <div
                    className={`h-full transition-all duration-700 ${
                      isSoldOut ? 'bg-neutral-500' : 'bg-[#C8102E]'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((property.plots_sold / property.total_plots) * 100))}%` }}
                  ></div>
                </div>

                {isSoldOut && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>This estate is currently fully subscribed. Inquiries are disabled. Check our other estates in Rivers State!</span>
                  </div>
                )}
              </div>

              {/* QUICK CALL / WHATSAPP ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={COMPANY_INFO.tel}
                  className="py-3 px-4 rounded-xl border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors text-xs font-bold text-neutral-900 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#C8102E]" />
                  <span>Call 0707 937 1358</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glossy-red py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>
          </div>

          {/* SECTION 2: DESCRIPTION & ESTATE FEATURES */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-xl font-black text-[#111111]">
              About {property.name}
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              {property.description}
            </p>

            {/* ESTATE FEATURES LIST */}
            <div className="pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3">
                Verified Infrastructure & Title Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <CheckCircle className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span className="text-xs font-semibold text-neutral-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: INTERACTIVE PLOT CALCULATOR */}
          <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C8102E]">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white">
                  Instant Plot Investment Calculator
                </h4>
                <p className="text-xs text-neutral-400">
                  Select the number of plots you wish to acquire to see total cost and area.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Slider / Number of Plots */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-neutral-300">Number of Plots</span>
                  <span className="text-lg font-black text-white px-3 py-1 bg-white/10 rounded-lg">
                    {plotCount} {plotCount === 1 ? 'Plot' : 'Plots'}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max={Math.max(1, isSoldOut ? 1 : property.plots_remaining)}
                  value={plotCount}
                  onChange={(e) => setPlotCount(Number(e.target.value))}
                  disabled={isSoldOut}
                  className="w-full h-2.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#C8102E]"
                />

                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>1 Plot</span>
                  <span>{Math.max(1, isSoldOut ? 1 : property.plots_remaining)} Plots Available</span>
                </div>
              </div>

              {/* Real-time Calculation Result Box */}
              <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Estimated Total Investment
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#C8102E]">
                  ₦{totalCost.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-300 flex items-center gap-2 pt-1 border-t border-white/10">
                  <Layers className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{totalAreaSqm.toLocaleString()} SQM total land size</span>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 4: LOCATION & EMBEDDED GOOGLE MAP */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-[#111111]">
                  Geographic Location & Coordinates
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600">
                  GPS: Lat {property.latitude}, Long {property.longitude} · {property.landmark || property.location}
                </p>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#C8102E]" />
                <span>Get Directions in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="w-full aspect-[16/8] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative bg-neutral-100">
              <iframe
                title={`Map of ${property.name}`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                src={googleMapsEmbedUrl}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* SECTION 5: EMBEDDED VIDEO TOUR */}
          {property.video_url && (
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#C8102E]" />
                <h3 className="text-xl font-black text-[#111111]">
                  Estate Video Overview & Drone Tour
                </h3>
              </div>
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-black">
                <iframe
                  src={property.video_url}
                  title={`${property.name} Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* SECTION 6: "BOOK INSPECTION" FORM */}
          <div className="space-y-4 pt-6 border-t border-neutral-200" id="book-inspection-form">
            <div className="max-w-xl">
              <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
                Schedule a Guided Site Visit
              </p>
              <h3 className="text-2xl font-black text-[#111111]">
                Book Site Inspection for {property.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Free transportation from our Port Harcourt office (No. 10 Akwaka Road). Instant notification sent to <strong>verlinpropertiesltd@gmail.com</strong>.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg">Inspection Request Confirmed!</h4>
                    <p className="text-xs text-emerald-800">
                      Our inspection team will contact you at <strong>{clientPhone}</strong> to confirm your inspection date.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glossy-red px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow Up on WhatsApp Now</span>
                  </a>

                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setClientName('');
                      setClientPhone('');
                      setClientEmail('');
                      setCustomMessage('');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-50"
                  >
                    Book Another Inspection
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Chukwudi Amadi"
                    disabled={isSoldOut}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    disabled={isSoldOut}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. name@example.com"
                    disabled={isSoldOut}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Preferred Inspection Date
                  </label>
                  <input
                    type="date"
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    disabled={isSoldOut}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Additional Notes / Preferred Time
                  </label>
                  <textarea
                    rows={2}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. I would like to bring my surveyor along on Saturday morning."
                    disabled={isSoldOut}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSoldOut}
                    className={`btn-glossy-red w-full py-3.5 px-6 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
                      isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isSubmitting ? 'Recording Inspection...' : isSoldOut ? 'Sold Out' : 'Confirm Inspection Booking'}</span>
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2">
                    Directly saves to Google Sheets tab <strong>Inquiries</strong> and sends email alert to <strong>verlinpropertiesltd@gmail.com</strong>.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* STICKY BOTTOM BAR ON MOBILE (Exceeds <= 15% mobile viewport height) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
          <div className="min-w-0 pr-1">
            <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Total Cost</span>
            <span className="text-sm font-black text-[#C8102E] truncate block">
              ₦{totalCost.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={COMPANY_INFO.tel}
              className="p-2.5 rounded-lg border border-neutral-300 text-neutral-900"
              aria-label="Call"
            >
              <Phone className="w-4 h-4 text-[#C8102E]" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glossy-red px-3.5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('book-inspection-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              disabled={isSoldOut}
              className={`px-3 py-2.5 rounded-lg border-2 border-neutral-900 bg-neutral-900 text-white text-xs font-bold whitespace-nowrap ${
                isSoldOut ? 'opacity-50' : ''
              }`}
            >
              Inspect
            </button>
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-3 border-b border-neutral-800">
            <span className="text-sm font-bold">
              {property.name} ({activeImageIndex + 1} of {images.length})
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-auto">
            <img
              src={images[activeImageIndex]}
              alt=""
              className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={() => setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-neutral-400 pt-2">
            Click anywhere or close button to exit lightbox
          </div>
        </div>
      )}

    </div>
  );
};
