import React from 'react';
import { COMPANY_INFO } from '../data/initialData';
import { PageView } from '../types';
import { VerlinLogo } from './VerlinLogo';
import { Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, ShieldCheck, Code } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* TOP ROW: BRAND & COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col text-left">
              <VerlinLogo variant="light" size="lg" />
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed pr-4">
              {COMPANY_INFO.tagline}. Dedicated to restoring confidence and transparency to land acquisition across Rivers State with 100% dry table land and instant physical corner beacon allocation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-[#C8102E] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
                title="Follow Verlin Properties on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-[#C8102E] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Profile"
                title="Follow Verlin Properties on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Channel"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8102E]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties')} className="hover:text-white transition-colors">
                  Available Estates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Office
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gas-hub')} className="hover:text-white transition-colors flex items-center gap-1.5 text-neutral-400">
                  <Code className="w-3.5 h-3.5" />
                  <span>Google Apps Script Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ESTATES PORTFOLIO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8102E]">
              Rivers State Estates
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>GrandVille Estate · Omagwa</li>
              <li>Lucent City Estate · Wigwe University, Isiokpo</li>
              <li>Crestville Layout · Omagwa Express</li>
              <li>OMA Gardens · Etche Corridor</li>
              <li className="text-[11px] text-neutral-500 pt-1">
                All titled with Registered Survey & Deed
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#C8102E]">
              Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8102E] shrink-0" />
                <a href={COMPANY_INFO.tel} className="hover:text-white font-semibold">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8102E] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login & Sheet Database</span>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Verlin Properties Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RC Registered Real Estate Entity</span>
            <span>·</span>
            <span>Google Apps Script & Google Sheets Powered</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
