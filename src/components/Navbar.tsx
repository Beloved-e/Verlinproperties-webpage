import React, { useState } from 'react';
import { PageView } from '../types';
import { COMPANY_INFO } from '../data/initialData';
import { VerlinLogo } from './VerlinLogo';
import { Phone, MessageSquare, ShieldCheck, Code, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, propertyId?: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isAdminLoggedIn,
  onOpenAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* ZONE 1: BRAND LOGO */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-md transition-transform hover:scale-[1.02]"
          aria-label="Verlin Properties Home"
        >
          <VerlinLogo variant="dark" size="md" />
        </button>

        {/* ZONE 2: NAVIGATION LINKS (4-6 Clean Text Links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-[#C8102E] ${currentPage === 'home' ? 'text-[#C8102E]' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className={`transition-colors hover:text-[#C8102E] ${currentPage === 'properties' ? 'text-[#C8102E]' : ''}`}
          >
            Estates & Land
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors hover:text-[#C8102E] ${currentPage === 'about' ? 'text-[#C8102E]' : ''}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-[#C8102E] ${currentPage === 'contact' ? 'text-[#C8102E]' : ''}`}
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('gas-hub')}
            className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#C8102E] ${currentPage === 'gas-hub' ? 'text-[#C8102E]' : 'text-neutral-500'}`}
            title="Google Apps Script Source Code & Deployment Guide"
          >
            <Code className="w-3.5 h-3.5" />
            <span>GAS Code & Setup</span>
          </button>
        </nav>

        {/* ZONE 3: PRIMARY ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={COMPANY_INFO.tel}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border border-neutral-300 hover:border-[#111111] text-neutral-800 transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>0707 937 1358</span>
          </a>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hello Verlin Properties, I would like to make an inquiry about your verified estates in Rivers State.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-red px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenAdminModal}
            className={`p-2 rounded-lg border transition-colors ${
              isAdminLoggedIn
                ? 'bg-neutral-900 border-neutral-900 text-white'
                : 'border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
            }`}
            title={isAdminLoggedIn ? 'Admin Panel Active' : 'Admin Login (Manage Sheets & Plots)'}
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdminModal}
            className={`p-2 rounded-lg border text-xs ${
              isAdminLoggedIn ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 text-neutral-700'
            }`}
            aria-label="Admin"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-neutral-300 text-neutral-800 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-semibold ${currentPage === 'home' ? 'bg-neutral-100 text-[#C8102E]' : 'text-neutral-800'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-semibold ${currentPage === 'properties' ? 'bg-neutral-100 text-[#C8102E]' : 'text-neutral-800'}`}
          >
            Estates & Land
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-semibold ${currentPage === 'about' ? 'bg-neutral-100 text-[#C8102E]' : 'text-neutral-800'}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-semibold ${currentPage === 'contact' ? 'bg-neutral-100 text-[#C8102E]' : 'text-neutral-800'}`}
          >
            Contact & Office
          </button>
          <button
            onClick={() => handleNavClick('gas-hub')}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-semibold ${currentPage === 'gas-hub' ? 'bg-neutral-100 text-[#C8102E]' : 'text-neutral-800'}`}
          >
            Google Apps Script & Setup Hub
          </button>

          <div className="pt-2 border-t border-neutral-200 flex flex-col gap-2">
            <a
              href={COMPANY_INFO.tel}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-300 font-semibold text-xs text-neutral-800"
            >
              <Phone className="w-4 h-4 text-[#C8102E]" />
              <span>Call 0707 937 1358</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hello Verlin Properties, I would like to make an inquiry about your verified estates.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glossy-red w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
