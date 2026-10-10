import React from 'react';
import { Search, Compass, CreditCard, Award, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface HowItWorksSectionProps {
  onNavigate: (page: PageView) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Browse Verified Estates',
      desc: 'Explore our catalog of 100% dry table land across Omagwa, Isiokpo, Etche, and greater Port Harcourt. Check plot prices, coordinates, and remaining plots in real time.',
      icon: Search
    },
    {
      step: '02',
      title: 'Inspect Free of Charge',
      desc: 'Join our free executive site inspection vehicles from our office at No. 10 Akwaka Road, Off SARS Road, Port Harcourt. Walk the dry ground, verify boundaries, and inspect with your own surveyor.',
      icon: Compass
    },
    {
      step: '03',
      title: 'Pay Seamlessly',
      desc: 'Make outright or flexible installment payments directly into Verlin Properties Limited corporate bank accounts. Receive instant stamped receipts and contract documentation.',
      icon: CreditCard
    },
    {
      step: '04',
      title: 'Own & Build Immediately',
      desc: 'Get immediate physical beacon allocation planted on your land, alongside your registered survey plan, deed of conveyance, and allocation certificate. Zero community encumbrance.',
      icon: Award
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-neutral-200" aria-label="How It Works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
            Simple 4-Step Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
            Browse → Inspect → Pay → Own
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            We eliminated land disputes, middleman fraud, and hidden fees. Land ownership with Verlin Properties Limited is transparent and lightning-fast.
          </p>
        </div>

        {/* 4 STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative bg-neutral-50 rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#C8102E]/20">
                      {st.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#C8102E] shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-[#111111] mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 flex items-center text-xs font-bold text-[#C8102E]">
                  <span>Step {st.step} of 04</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA STRIP */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('properties')}
            className="btn-glossy-red px-7 py-3.5 text-xs sm:text-sm font-extrabold rounded-xl uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>Start Step 01: Browse Estates Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
