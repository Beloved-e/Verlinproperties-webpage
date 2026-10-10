import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/initialData';
import { store } from '../services/store';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      await store.saveInquiry({
        name,
        phone,
        email: email || 'N/A',
        property: 'General Contact Form',
        message: message || 'Inquiry sent via Contact Page'
      });
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-neutral-50" aria-label="Contact Us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
            Get In Touch With Verlin Properties
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mt-1">
            Visit Our Port Harcourt Office or Schedule an Inspection
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Speak directly with our investment advisors. All inquiries are saved to our Google Sheets backend with direct email dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* CONTACT DETAILS & ADDRESS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* HEAD OFFICE CARD */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0 border border-red-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">Head Office Location</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 font-medium mt-1 leading-snug">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Free inspection buses depart Monday – Saturday (10:00 AM & 2:00 PM).
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0 border border-red-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">Phone & WhatsApp</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 font-bold mt-1">
                    <a href={COMPANY_INFO.tel} className="hover:text-[#C8102E] transition-colors">
                      {COMPANY_INFO.phone}
                    </a>
                  </p>
                  <p className="text-xs text-neutral-500">Available 8:00 AM – 7:00 PM West Africa Time</p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0 border border-red-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">Official Email</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 font-medium mt-1">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#C8102E] hover:underline font-bold">
                      {COMPANY_INFO.email}
                    </a>
                  </p>
                  <p className="text-xs text-neutral-500">Official inquiries, proof of payments & proposals</p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900">Working Hours</h3>
                  <p className="text-xs text-neutral-700 mt-0.5">Monday – Friday: 8:00 AM – 5:30 PM</p>
                  <p className="text-xs text-neutral-700">Saturday (Inspections): 9:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* QUICK WHATSAPP CALLOUT */}
            <div className="p-6 rounded-2xl bg-[#C8102E] text-white shadow-lg space-y-3">
              <h3 className="font-black text-lg">Need Immediate Assistance?</h3>
              <p className="text-xs text-red-100 leading-relaxed">
                Connect directly with a licensed Verlin property advisor on WhatsApp right now for estate layout plans, beacon coordinates, and video walk-throughs.
              </p>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hello Verlin Properties, I would like to speak with an advisor about your Rivers State estates.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#C8102E] hover:bg-neutral-100 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (0707 937 1358)</span>
              </a>
            </div>

          </div>

          {/* CONTACT INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-black text-[#111111] mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Fill in your details below and our client relations team will get back to you within 30 minutes.
            </p>

            {isSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message Dispatched Successfully!</span>
                </div>
                <p className="text-xs text-emerald-900">
                  Thank you for reaching out to Verlin Properties Limited. We have received your inquiry and sent an email alert to <strong>verlinpropertiesltd@gmail.com</strong>.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold text-[#C8102E] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Chief Anthony Peters"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 0803 123 4567"
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. apeters@yahoo.com"
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Question or Property of Interest
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for (e.g. 2 plots in GrandVille Estate or Lucent City)..."
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glossy-red w-full py-3.5 px-6 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>

                <p className="text-[11px] text-neutral-400 text-center">
                  Protected by Verlin Properties Privacy Policy. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
