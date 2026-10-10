import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. (Mrs.) Ibiere Jumbo',
      role: 'Consultant Obstetrician',
      location: 'Port Harcourt, Rivers State',
      property: 'GrandVille Estate, Omagwa',
      outcome: 'Allocated 2 Plots within 24 Hours',
      quote: 'I had been skeptical about buying land in the Omagwa corridor after a colleague was defrauded by an unverified agent. Verlin Properties completely restored my confidence. We went on inspection on Saturday, payment cleared on Monday, and by Tuesday afternoon my survey beacons were planted with my deed signed.'
    },
    {
      name: 'Capt. Emmanuel Dan-Jumbo',
      role: 'Offshore Marine Pilot',
      location: 'Aberdeen, UK / Rivers State Diaspora',
      property: 'Lucent City Estate, Isiokpo',
      outcome: 'Purchased 4 Plots from the UK',
      quote: 'Investing from abroad is always risky unless you deal with real professionals. Verlin Properties gave me a live video inspection of the land behind Wigwe University, sent perimeter coordinates to my independent surveyor in PH, and couriered my original title deeds to my UK address. Outstanding transparency.'
    },
    {
      name: 'Pastor Michael Eke',
      role: 'General Overseer & Real Estate Investor',
      location: 'Etche, Rivers State',
      property: 'OMA Gardens, Etche',
      outcome: 'Acquired 10 Plots for Future Project',
      quote: 'At ₦900,000 per plot, OMA Gardens was a golden opportunity I could not pass on. The land is 100% solid dry soil—not a drop of waterlogged clay. Verlin Properties gave us instant physical allocation with zero community disturbance.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-50 border-b border-neutral-200" aria-label="Client Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
            Real Investors · Genuine Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
            Trusted by Landlords in Nigeria and the Diaspora
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Read firsthand accounts from families, professionals, and institutional investors who secured verified land through Verlin Properties Limited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* STARS & QUOTE ICON */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-neutral-200" />
                </div>

                {/* OUTCOME TAG */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.outcome}</span>
                </div>

                {/* QUOTE TEXT */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* CLIENT DETAILS */}
              <div className="pt-5 mt-4 border-t border-neutral-100">
                <h4 className="font-extrabold text-sm text-neutral-900 leading-tight">
                  {t.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {t.role} · {t.location}
                </p>
                <p className="text-[11px] font-semibold text-[#C8102E] mt-1">
                  Invested in: {t.property}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
