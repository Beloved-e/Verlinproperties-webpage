import React from 'react';
import { COMPANY_INFO } from '../data/initialData';
import { ShieldCheck, MapPin, Award, CheckCircle, Users, Building, Phone } from 'lucide-react';
import { PageView } from '../types';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* HERO / INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
              About Verlin Properties Limited
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
              Pioneering Transparent, Dispute-Free Real Estate in Rivers State.
            </h1>
            <p className="text-base text-neutral-700 leading-relaxed">
              <strong>Verlin Properties Limited</strong> is an indigenous, progressive real estate and investment powerhouse headquartered in Port Harcourt, Rivers State. 
              We were founded to restore trust, security, and peace of mind to private land ownership and institutional property investing in the Niger Delta region.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every parcel in our portfolio—from <strong>GrandVille Estate</strong> in Omagwa, to <strong>Lucent City Estate</strong> behind Wigwe University in Isiokpo, to <strong>Crestville Layout</strong> along the express corridor, and <strong>OMA Gardens</strong> in Etche—is thoroughly vetted, legally cleared, and 100% dry table land.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('properties')}
                className="btn-glossy-red px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                View Available Estates
              </button>
              <a
                href={COMPANY_INFO.tel}
                className="px-6 py-3 rounded-xl border-2 border-neutral-900 text-neutral-900 font-bold text-xs flex items-center gap-2 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C8102E]" />
                <span>Call Our Sales Desk</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE STATS / TRUST CARD */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-lg space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-neutral-900 leading-tight">The Verlin Standard</h3>
                  <p className="text-xs text-neutral-500">Integrity · Security · Speed</p>
                </div>
              </div>

              <div className="space-y-3 divide-y divide-neutral-200 text-sm">
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-neutral-600 font-medium">Land Topography</span>
                  <span className="font-black text-[#C8102E]">100% Dry Table Ground</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-neutral-600 font-medium">Allocation Speed</span>
                  <span className="font-black text-neutral-900">Instant Physical Beacons</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-neutral-600 font-medium">Title Documentation</span>
                  <span className="font-black text-neutral-900">Deed & Reg. Survey</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-neutral-600 font-medium">Headquarters</span>
                  <span className="font-semibold text-neutral-900 text-right text-xs max-w-[180px]">
                    No. 10 Akwaka Road, Off SARS Road, Port Harcourt
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 space-y-1">
                <p className="font-bold text-neutral-900">Corporate Account Verification:</p>
                <p>Zenith Bank: <strong>1229873410</strong></p>
                <p>Account Name: <strong>Verlin Properties Limited</strong></p>
                <p className="text-[11px] text-red-600 italic">Always verify account name before transferring funds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center">
            Our Four Guiding Commitments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <CheckCircle className="w-6 h-6 text-[#C8102E] mb-3" />
              <h4 className="font-bold text-base text-neutral-900 mb-1">Zero Dispute Guarantee</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct acquisition through authentic community and title authorities. No omo-onile issues or double allocations.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <Award className="w-6 h-6 text-[#C8102E] mb-3" />
              <h4 className="font-bold text-base text-neutral-900 mb-1">Instant Physical Allocation</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                You do not wait for months. We plant your corner beacons on your allocated plot on the day your payment is cleared.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <Building className="w-6 h-6 text-[#C8102E] mb-3" />
              <h4 className="font-bold text-base text-neutral-900 mb-1">Strategic Corridors</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We select emerging high-yield zones near international airports, universities, and express highways for 30–50% yearly growth.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <Users className="w-6 h-6 text-[#C8102E] mb-3" />
              <h4 className="font-bold text-base text-neutral-900 mb-1">Diaspora-Friendly Service</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Transparent remote purchasing with live video tours, legal courier, and milestone video reports for Nigerians abroad.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
