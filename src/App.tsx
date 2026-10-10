import React, { useState, useEffect } from 'react';
import { Property, Inquiry, PageView } from './types';
import { store } from './services/store';
import { COMPANY_INFO } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { PropertiesGrid } from './components/PropertiesGrid';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { GasSetupHub } from './components/GasSetupHub';
import { MessageSquare, Phone, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [properties, setProperties] = useState<Property[]>(store.getProperties());
  const [inquiries, setInquiries] = useState<Inquiry[]>(store.getInquiries());
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setProperties(store.getProperties());
      setInquiries(store.getInquiries());

      // If selected property was updated (e.g. plots sold changed in admin), refresh it
      if (selectedProperty) {
        const refreshed = store.getPropertyById(selectedProperty.id);
        if (refreshed) setSelectedProperty(refreshed);
      }
    });
    return unsubscribe;
  }, [selectedProperty]);

  const handleNavigate = (page: PageView, propertyId?: string) => {
    setCurrentPage(page);
    if (propertyId) {
      const prop = properties.find(p => p.id === propertyId);
      if (prop) setSelectedProperty(prop);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-[#111111]">
      
      {/* NAVBAR */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1">
        
        {currentPage === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <TrustStrip />
            <PropertiesGrid
              properties={properties}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              title="Featured Estates & Land Parcels"
              subtitle="Browse our verified dry table properties in Omagwa, Isiokpo, and Etche. Instant physical corner beacon allocation guaranteed."
            />
            <HowItWorksSection onNavigate={handleNavigate} />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentPage === 'properties' && (
          <>
            <div className="bg-neutral-900 text-white py-12 px-4 sm:px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <span className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
                  Verlin Properties Portfolio
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1">
                  100% Dry Land & Estates in Rivers State
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-2">
                  All properties registered, beacon-demarcated, and free from disputes or community interference.
                </p>
              </div>
            </div>
            <TrustStrip />
            <PropertiesGrid
              properties={properties}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />
            <FAQSection />
          </>
        )}

        {currentPage === 'about' && (
          <>
            <AboutSection onNavigate={handleNavigate} />
            <TrustStrip />
            <TestimonialsSection />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <ContactSection />
            <TrustStrip />
          </>
        )}

        {currentPage === 'gas-hub' && (
          <GasSetupHub />
        )}

      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* PROPERTY DETAILS MODAL */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onInquirySubmitted={() => {
            setInquiries(store.getInquiries());
          }}
        />
      )}

      {/* ADMIN PORTAL MODAL */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        onLogout={() => setIsAdminLoggedIn(false)}
        properties={properties}
        inquiries={inquiries}
      />

      {/* FLOATING ACTION BUTTON FOR WHATSAPP (Desktop / Tablet) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col gap-3">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hello Verlin Properties, I would like to make an inquiry about your verified estates.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white"
          title="Chat with Verlin Properties on WhatsApp (0707 937 1358)"
          aria-label="WhatsApp Us"
        >
          <MessageSquare className="w-7 h-7" />
        </a>
      </div>

    </div>
  );
}
export default App;
