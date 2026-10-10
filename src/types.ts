export interface Property {
  id: string;
  name: string;
  location: string;
  price_per_plot: number;
  plot_size_sqm: number;
  description: string;
  features: string[];
  logo_url: string;
  image_urls: string[];
  video_url: string;
  latitude: number;
  longitude: number;
  total_plots: number;
  plots_sold: number;
  plots_remaining: number; // formula: total_plots - plots_sold
  status: 'Available' | 'Selling Fast' | 'Sold Out';
  landmark?: string;
  titleType?: string; // e.g. "Deed of Conveyance & Registered Survey", "C of O in view"
}

export interface Inquiry {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  message: string;
  preferredDate?: string;
  plotsCount?: number;
  status: 'New' | 'Contacted' | 'Inspection Scheduled' | 'Closed';
}

export interface VerlinCompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  tel: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  accountDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export type PageView = 'home' | 'properties' | 'property-details' | 'about' | 'contact' | 'admin' | 'gas-hub';
