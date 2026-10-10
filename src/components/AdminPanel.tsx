import React, { useState } from 'react';
import { Property, Inquiry } from '../types';
import { store } from '../services/store';
import { VerlinLogo } from './VerlinLogo';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Phone,
  MessageSquare,
  Download,
  AlertTriangle,
  X,
  CheckCircle,
  Save,
  RotateCcw,
  Layers,
  Search,
  Lock
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  properties: Property[];
  inquiries: Inquiry[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  properties,
  inquiries
}) => {
  if (!isOpen) return null;

  // Login form state
  const [pinInput, setPinInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin tabs
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'settings'>('properties');

  // Quick edit plots sold state
  const [editingSoldId, setEditingSoldId] = useState<string | null>(null);
  const [tempSoldVal, setTempSoldVal] = useState<number>(0);

  // Property modal state (Add / Edit)
  const [isPropModalOpen, setIsPropModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [propFormName, setPropFormName] = useState('');
  const [propFormLocation, setPropFormLocation] = useState('');
  const [propFormPrice, setPropFormPrice] = useState(2500000);
  const [propFormSize, setPropFormSize] = useState(465);
  const [propFormTotalPlots, setPropFormTotalPlots] = useState(50);
  const [propFormPlotsSold, setPropFormPlotsSold] = useState(10);
  const [propFormDesc, setPropFormDesc] = useState('');
  const [propFormFeatures, setPropFormFeatures] = useState('');
  const [propFormImages, setPropFormImages] = useState('');
  const [propFormVideo, setPropFormVideo] = useState('');
  const [propFormLat, setPropFormLat] = useState(4.9785);
  const [propFormLng, setPropFormLng] = useState(6.9247);

  // Delete confirmation modal state
  const [deleteCandidate, setDeleteCandidate] = useState<Property | null>(null);

  // Inquiries filter & search
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (store.verifyAdminCredentials(pinInput, emailInput)) {
      setLoginError('');
      onLoginSuccess();
    } else {
      setLoginError('Invalid Passcode or Authorized Email. (Default PIN: verlin2026)');
    }
  };

  // Handle Quick Plots Sold update
  const handleSavePlotsSold = async (prop: Property) => {
    await store.updatePlotsSold(prop.id, tempSoldVal);
    setEditingSoldId(null);
    showToast(`Updated sold plots for ${prop.name}. Remaining plots recomputed.`);
  };

  // Open Property Modal for Creating
  const handleOpenAddProp = () => {
    setEditingProp(null);
    setPropFormName('');
    setPropFormLocation('');
    setPropFormPrice(2500000);
    setPropFormSize(465);
    setPropFormTotalPlots(50);
    setPropFormPlotsSold(0);
    setPropFormDesc('');
    setPropFormFeatures('100% Dry Table Land, Instant Physical Allocation, Access Road, Perimeter Fencing');
    setPropFormImages('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200');
    setPropFormVideo('');
    setPropFormLat(4.9785);
    setPropFormLng(6.9247);
    setIsPropModalOpen(true);
  };

  // Open Property Modal for Editing
  const handleOpenEditProp = (prop: Property) => {
    setEditingProp(prop);
    setPropFormName(prop.name);
    setPropFormLocation(prop.location);
    setPropFormPrice(prop.price_per_plot);
    setPropFormSize(prop.plot_size_sqm);
    setPropFormTotalPlots(prop.total_plots);
    setPropFormPlotsSold(prop.plots_sold);
    setPropFormDesc(prop.description);
    setPropFormFeatures(prop.features.join(', '));
    setPropFormImages(prop.image_urls.join(', '));
    setPropFormVideo(prop.video_url || '');
    setPropFormLat(prop.latitude);
    setPropFormLng(prop.longitude);
    setIsPropModalOpen(true);
  };

  // Save Property Form (Add or Edit)
  const handleSavePropForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = propFormFeatures.split(',').map(s => s.trim()).filter(Boolean);
    const imgArray = propFormImages.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProp) {
      await store.updateProperty({
        ...editingProp,
        name: propFormName,
        location: propFormLocation,
        price_per_plot: Number(propFormPrice),
        plot_size_sqm: Number(propFormSize),
        total_plots: Number(propFormTotalPlots),
        plots_sold: Number(propFormPlotsSold),
        description: propFormDesc,
        features: featArray,
        image_urls: imgArray,
        video_url: propFormVideo,
        latitude: Number(propFormLat),
        longitude: Number(propFormLng)
      });
      showToast(`Property "${propFormName}" updated successfully.`);
    } else {
      await store.addProperty({
        name: propFormName,
        location: propFormLocation,
        price_per_plot: Number(propFormPrice),
        plot_size_sqm: Number(propFormSize),
        total_plots: Number(propFormTotalPlots),
        plots_sold: Number(propFormPlotsSold),
        description: propFormDesc,
        features: featArray,
        logo_url: '',
        image_urls: imgArray,
        video_url: propFormVideo,
        latitude: Number(propFormLat),
        longitude: Number(propFormLng)
      });
      showToast(`New estate "${propFormName}" created in database.`);
    }

    setIsPropModalOpen(false);
  };

  // Confirm and Execute Delete
  const handleExecuteDelete = async () => {
    if (!deleteCandidate) return;
    await store.deleteProperty(deleteCandidate.id);
    showToast(`Estate "${deleteCandidate.name}" removed from database.`);
    setDeleteCandidate(null);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.property.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message.toLowerCase().includes(inquirySearch.toLowerCase());

    const matchStatus =
      inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;

    return matchSearch && matchStatus;
  });

  // Export Inquiries to CSV
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Name', 'Phone', 'Email', 'Property', 'Message', 'Status'];
    const rows = inquiries.map(i => [
      `"${i.timestamp}"`,
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.property}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${i.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `verlin_inquiries_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* WRAPPER */}
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col my-auto max-h-[94vh] overflow-hidden border border-neutral-200">
        
        {/* HEADER */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <VerlinLogo variant="light" size="sm" />
            <div className="border-l border-neutral-700 pl-4 hidden sm:block">
              <h2 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                <span>Admin Operations Center</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                  Google Sheet Connected
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                Manage live estates, real-time plots sold/remaining, and client inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-neutral-500 transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOAST FEEDBACK */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* MAIN BODY: LOGIN GATE OR ADMIN DASHBOARD */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center space-y-6">
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <VerlinLogo variant="dark" size="md" />
            </div>

            <div>
              <h3 className="text-xl font-black text-neutral-900">
                Authorized Admin Portal
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5">
                Sign in with your configured Admin Passcode or authorized Google account email (<strong>erasmusbe20@gmail.com</strong> or <strong>verlinpropertiesltd@gmail.com</strong>).
              </p>
            </div>

            {loginError && (
              <div className="w-full p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2 text-left">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Admin Passcode (Default: <code>verlin2026</code>)
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Or Google Account Email
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="e.g. erasmusbe20@gmail.com"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-glossy-red w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider"
              >
                Access Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* TABS NAVIGATION */}
            <div className="bg-neutral-100 px-6 pt-3 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-t border-x ${
                    activeTab === 'properties'
                      ? 'bg-white border-neutral-200 text-[#C8102E]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Estates & Land Inventory ({properties.length})
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-t border-x flex items-center gap-2 ${
                    activeTab === 'inquiries'
                      ? 'bg-white border-neutral-200 text-[#C8102E]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <span>Inspection Inquiries</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-100 text-[#C8102E]">
                    {inquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors border-t border-x ${
                    activeTab === 'settings'
                      ? 'bg-white border-neutral-200 text-[#C8102E]'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Database Settings
                </button>
              </div>

              {activeTab === 'properties' && (
                <button
                  onClick={handleOpenAddProp}
                  className="btn-glossy-red px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 uppercase tracking-wider mb-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Estate</span>
                </button>
              )}

              {activeTab === 'inquiries' && (
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center gap-1.5 mb-2 hover:bg-neutral-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>
              )}
            </div>

            {/* TAB 1: PROPERTIES MANAGEMENT */}
            {activeTab === 'properties' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-4">Estate Name</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Price / Plot</th>
                        <th className="py-3 px-4">Total Plots</th>
                        <th className="py-3 px-4">Plots Sold</th>
                        <th className="py-3 px-4">Plots Left</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {properties.map(p => (
                        <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                            {p.name}
                          </td>
                          <td className="py-3.5 px-4 text-neutral-600 max-w-xs truncate">
                            {p.location}
                          </td>
                          <td className="py-3.5 px-4 font-black text-[#C8102E] whitespace-nowrap">
                            ₦{p.price_per_plot.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-neutral-800">
                            {p.total_plots}
                          </td>

                          {/* Quick Sold Editor */}
                          <td className="py-3.5 px-4">
                            {editingSoldId === p.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  min={0}
                                  max={p.total_plots}
                                  value={tempSoldVal}
                                  onChange={e => setTempSoldVal(Number(e.target.value))}
                                  className="w-16 px-2 py-1 border border-[#C8102E] rounded text-xs font-bold"
                                />
                                <button
                                  onClick={() => handleSavePlotsSold(p)}
                                  className="p-1 rounded bg-[#C8102E] text-white hover:bg-red-700"
                                  title="Save sold plots"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingSoldId(null)}
                                  className="p-1 rounded bg-neutral-200 text-neutral-700"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingSoldId(p.id);
                                  setTempSoldVal(p.plots_sold);
                                }}
                                className="font-bold text-neutral-900 underline hover:text-[#C8102E]"
                                title="Click to quick-update sold plots"
                              >
                                {p.plots_sold} plots (edit)
                              </button>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-black">
                            <span className={p.plots_remaining <= 5 ? 'text-[#C8102E]' : 'text-neutral-800'}>
                              {p.plots_remaining}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              p.status === 'Sold Out'
                                ? 'bg-neutral-900 text-white'
                                : p.status === 'Selling Fast'
                                ? 'bg-red-100 text-[#C8102E]'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditProp(p)}
                                className="p-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                                title="Edit Estate Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteCandidate(p)}
                                className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                title="Delete Estate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-500">
                  💡 <strong>Tip for Google Sheets Sync:</strong> Updating plots sold recalculates remaining plots instantly via the formula <code>=total_plots - plots_sold</code>. When 5 or fewer plots remain, the website flags "Selling Fast!".
                </div>
              </div>
            )}

            {/* TAB 2: INQUIRIES MANAGEMENT */}
            {activeTab === 'inquiries' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {/* Search & Status Filter */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inquirySearch}
                      onChange={e => setInquirySearch(e.target.value)}
                      placeholder="Search inquiries by name, phone, or estate..."
                      className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-500 font-semibold">Filter:</span>
                    {['All', 'New', 'Contacted', 'Inspection Scheduled', 'Closed'].map(st => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                          inquiryStatusFilter === st
                            ? 'bg-[#C8102E] text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiries Table */}
                <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-4">Date / Time</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Estate</th>
                        <th className="py-3 px-4">Notes / Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {filteredInquiries.map(inq => (
                        <tr key={inq.id} className="hover:bg-neutral-50">
                          <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                            {inq.timestamp}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                            {inq.name}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-neutral-800">{inq.phone}</div>
                            <div className="text-[11px] text-neutral-500">{inq.email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#C8102E] whitespace-nowrap">
                            {inq.property}
                          </td>
                          <td className="py-3.5 px-4 text-neutral-700 max-w-xs">
                            <p className="line-clamp-2">{inq.message}</p>
                            {inq.preferredDate && (
                              <span className="text-[10px] text-neutral-500 font-semibold block mt-0.5">
                                Preferred Date: {inq.preferredDate}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={e => {
                                store.updateInquiryStatus(inq.id, e.target.value as any);
                                showToast(`Inquiry status updated to ${e.target.value}`);
                              }}
                              className="px-2 py-1 rounded bg-neutral-100 border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Inspection Scheduled">Inspection Scheduled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${inq.phone.replace(/[^0-9]/g, '')}`}
                                className="p-1.5 rounded-lg border border-neutral-300 text-neutral-800 hover:bg-neutral-100"
                                title="Call Client"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
                              </a>
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello ${inq.name}, this is Verlin Properties regarding your inquiry for ${inq.property}. When would you like to schedule your site inspection?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                                title="Reply on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: SETTINGS & DATABASE RESET */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
                
                {/* ADMIN PIN UPDATE */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <h4 className="font-extrabold text-sm text-neutral-900">Admin Passcode</h4>
                  <p className="text-xs text-neutral-500">
                    Change your local admin portal password.
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      defaultValue={store.getAdminPin()}
                      id="newPinInput"
                      className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                    />
                    <button
                      onClick={() => {
                        const el = document.getElementById('newPinInput') as HTMLInputElement;
                        if (el && el.value) {
                          store.setAdminPin(el.value);
                          showToast('Admin passcode updated!');
                        }
                      }}
                      className="btn-glossy-red px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider"
                    >
                      Update Passcode
                    </button>
                  </div>
                </div>

                {/* RESTORE DEFAULT DATA */}
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <h4 className="font-extrabold text-sm text-neutral-900">Restore Pre-Filled Database</h4>
                  <p className="text-xs text-neutral-500">
                    Reset properties and inquiries to the initial 4 Rivers State estates (GrandVille, Lucent City, Crestville, and OMA Gardens).
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to restore the default sample properties and inquiries?')) {
                        store.resetToDefaults();
                        showToast('Database reset to prefilled sample values.');
                      }
                    }}
                    className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    <span>Restore Default Properties</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* PROPERTY ADD / EDIT MODAL */}
      {isPropModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 flex justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-auto shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-black text-lg text-neutral-900">
                {editingProp ? `Edit Estate: ${editingProp.name}` : 'Add New Estate to Database'}
              </h3>
              <button onClick={() => setIsPropModalOpen(false)}>
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSavePropForm} className="space-y-4 text-xs font-semibold text-neutral-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Estate Name *</label>
                  <input
                    type="text"
                    required
                    value={propFormName}
                    onChange={e => setPropFormName(e.target.value)}
                    placeholder="e.g. GrandVille Estate"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Location *</label>
                  <input
                    type="text"
                    required
                    value={propFormLocation}
                    onChange={e => setPropFormLocation(e.target.value)}
                    placeholder="e.g. Omagwa, Rivers State"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Price / Plot (₦) *</label>
                  <input
                    type="number"
                    required
                    value={propFormPrice}
                    onChange={e => setPropFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Total Plots *</label>
                  <input
                    type="number"
                    required
                    value={propFormTotalPlots}
                    onChange={e => setPropFormTotalPlots(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Plots Sold *</label>
                  <input
                    type="number"
                    required
                    value={propFormPlotsSold}
                    onChange={e => setPropFormPlotsSold(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold">Description</label>
                <textarea
                  rows={2}
                  value={propFormDesc}
                  onChange={e => setPropFormDesc(e.target.value)}
                  placeholder="Estate overview, accessibility, and landmarks..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 font-bold">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={propFormFeatures}
                  onChange={e => setPropFormFeatures(e.target.value)}
                  placeholder="100% Dry Land, Access Road, Perimeter Fencing"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Image URLs (Comma-separated or Google Drive links)</label>
                <input
                  type="text"
                  value={propFormImages}
                  onChange={e => setPropFormImages(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Latitude (GPS)</label>
                  <input
                    type="number"
                    step="any"
                    value={propFormLat}
                    onChange={e => setPropFormLat(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold">Longitude (GPS)</label>
                  <input
                    type="number"
                    step="any"
                    value={propFormLng}
                    onChange={e => setPropFormLng(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPropModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glossy-red px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider"
                >
                  Save Estate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL ("Confirm before deleting") */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-70 bg-black/80 flex justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 my-auto shadow-2xl space-y-4 border border-red-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-black text-lg text-neutral-900">
                Confirm Deletion
              </h3>
              <p className="text-xs text-neutral-600">
                Are you sure you want to permanently delete <strong>{deleteCandidate.name}</strong> from the database? This action will remove it from the public website and Google Sheets.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-100"
              >
                No, Keep Estate
              </button>

              <button
                onClick={handleExecuteDelete}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Yes, Delete Estate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
