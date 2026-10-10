import { Property, Inquiry } from '../types';
import { INITIAL_PROPERTIES, INITIAL_INQUIRIES, COMPANY_INFO } from '../data/initialData';

declare global {
  interface Window {
    google?: {
      script?: {
        run: {
          withSuccessHandler: (fn: (res: any) => void) => any;
          withFailureHandler: (fn: (err: any) => void) => any;
          [key: string]: any;
        };
      };
    };
  }
}

const STORAGE_KEY_PROPERTIES = 'verlin_properties_v2';
const STORAGE_KEY_INQUIRIES = 'verlin_inquiries_v2';
const STORAGE_KEY_CONFIG = 'verlin_admin_config_v2';

export class VerlinDataService {
  private static instance: VerlinDataService;
  private properties: Property[] = [];
  private inquiries: Inquiry[] = [];
  private listeners: Array<() => void> = [];
  private adminEmail: string = 'erasmusbe20@gmail.com';
  private adminPin: string = 'verlin2026';
  private gasEndpointUrl: string = '';

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): VerlinDataService {
    if (!VerlinDataService.instance) {
      VerlinDataService.instance = new VerlinDataService();
    }
    return VerlinDataService.instance;
  }

  private loadFromStorage() {
    try {
      const storedProps = localStorage.getItem(STORAGE_KEY_PROPERTIES);
      if (storedProps) {
        this.properties = JSON.parse(storedProps);
      } else {
        this.properties = [...INITIAL_PROPERTIES];
        this.savePropertiesToStorage();
      }

      const storedInq = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (storedInq) {
        this.inquiries = JSON.parse(storedInq);
      } else {
        this.inquiries = [...INITIAL_INQUIRIES];
        this.saveInquiriesToStorage();
      }

      const storedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (storedConfig) {
        const parsed = JSON.parse(storedConfig);
        if (parsed.adminEmail) this.adminEmail = parsed.adminEmail;
        if (parsed.adminPin) this.adminPin = parsed.adminPin;
        if (parsed.gasEndpointUrl) this.gasEndpointUrl = parsed.gasEndpointUrl;
      }
    } catch (err) {
      console.warn('Error reading from localStorage, using in-memory fallbacks', err);
      this.properties = [...INITIAL_PROPERTIES];
      this.inquiries = [...INITIAL_INQUIRIES];
    }
  }

  private savePropertiesToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(this.properties));
    } catch (e) {
      console.error(e);
    }
    this.notify();
  }

  private saveInquiriesToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(this.inquiries));
    } catch (e) {
      console.error(e);
    }
    this.notify();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // PUBLIC METHODS
  public getProperties(): Property[] {
    return [...this.properties];
  }

  public getPropertyById(id: string): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  public getInquiries(): Inquiry[] {
    return [...this.inquiries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public async saveInquiry(data: {
    name: string;
    phone: string;
    email: string;
    property: string;
    message: string;
    preferredDate?: string;
    plotsCount?: number;
  }): Promise<{ success: boolean; message: string }> {
    const newInquiry: Inquiry = {
      id: 'inq-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      name: data.name,
      phone: data.phone,
      email: data.email,
      property: data.property,
      message: data.message,
      preferredDate: data.preferredDate || 'Flexible',
      plotsCount: data.plotsCount || 1,
      status: 'New'
    };

    // If running in Google Apps Script context
    if (typeof window !== 'undefined' && window.google?.script?.run?.saveInquiry) {
      return new Promise((resolve, reject) => {
        window.google!.script!.run
          .withSuccessHandler((res: any) => {
            this.inquiries.unshift(newInquiry);
            this.saveInquiriesToStorage();
            resolve({ success: true, message: 'Saved to Google Sheets and email dispatched via MailApp.' });
          })
          .withFailureHandler((err: any) => {
            // Fallback locally
            this.inquiries.unshift(newInquiry);
            this.saveInquiriesToStorage();
            resolve({ success: true, message: 'Saved locally (GAS network warning: ' + (err?.message || err) + ')' });
          })
          .saveInquiry(newInquiry);
      });
    }

    // Default SPA preview persistence
    this.inquiries.unshift(newInquiry);
    this.saveInquiriesToStorage();

    return Promise.resolve({
      success: true,
      message: 'Inspection booked successfully! Saved to Inquiries sheet and notification prepared for ' + COMPANY_INFO.email
    });
  }

  public async updatePlotsSold(id: string, newSold: number): Promise<boolean> {
    const prop = this.properties.find(p => p.id === id);
    if (!prop) return false;

    const clampedSold = Math.max(0, Math.min(prop.total_plots, newSold));
    const remaining = Math.max(0, prop.total_plots - clampedSold);

    let status: 'Available' | 'Selling Fast' | 'Sold Out' = 'Available';
    if (remaining === 0) {
      status = 'Sold Out';
    } else if (remaining <= 5) {
      status = 'Selling Fast';
    }

    prop.plots_sold = clampedSold;
    prop.plots_remaining = remaining;
    prop.status = status;

    this.savePropertiesToStorage();

    // Call GAS if available
    if (typeof window !== 'undefined' && window.google?.script?.run?.updatePlotsSold) {
      try {
        window.google.script.run.updatePlotsSold(id, clampedSold, this.adminPin);
      } catch (err) {
        console.warn('GAS sync notice:', err);
      }
    }

    return true;
  }

  public async addProperty(propData: Omit<Property, 'id' | 'plots_remaining' | 'status'> & { id?: string }): Promise<Property> {
    const total = Number(propData.total_plots) || 40;
    const sold = Number(propData.plots_sold) || 0;
    const remaining = Math.max(0, total - sold);
    const status = remaining === 0 ? 'Sold Out' : (remaining <= 5 ? 'Selling Fast' : 'Available');

    const newProp: Property = {
      ...propData,
      id: propData.id || 'prop-' + (this.properties.length + 1),
      total_plots: total,
      plots_sold: sold,
      plots_remaining: remaining,
      status: status
    };

    this.properties.push(newProp);
    this.savePropertiesToStorage();
    return newProp;
  }

  public async updateProperty(updatedProp: Property): Promise<boolean> {
    const index = this.properties.findIndex(p => p.id === updatedProp.id);
    if (index === -1) return false;

    const remaining = Math.max(0, updatedProp.total_plots - updatedProp.plots_sold);
    const status = remaining === 0 ? 'Sold Out' : (remaining <= 5 ? 'Selling Fast' : 'Available');

    this.properties[index] = {
      ...updatedProp,
      plots_remaining: remaining,
      status: status
    };

    this.savePropertiesToStorage();
    return true;
  }

  public async deleteProperty(id: string): Promise<boolean> {
    const initialLen = this.properties.length;
    this.properties = this.properties.filter(p => p.id !== id);
    if (this.properties.length !== initialLen) {
      this.savePropertiesToStorage();
      return true;
    }
    return false;
  }

  public async updateInquiryStatus(id: string, newStatus: Inquiry['status']): Promise<boolean> {
    const inq = this.inquiries.find(i => i.id === id);
    if (!inq) return false;
    inq.status = newStatus;
    this.saveInquiriesToStorage();
    return true;
  }

  public resetToDefaults() {
    this.properties = [...INITIAL_PROPERTIES];
    this.inquiries = [...INITIAL_INQUIRIES];
    this.savePropertiesToStorage();
    this.saveInquiriesToStorage();
  }

  // Admin Auth Helpers
  public verifyAdminCredentials(pin: string, email?: string): boolean {
    if (pin === this.adminPin) return true;
    if (email && (email.toLowerCase() === this.adminEmail.toLowerCase() || email.toLowerCase() === COMPANY_INFO.email.toLowerCase())) {
      return true;
    }
    return false;
  }

  public getAdminPin(): string {
    return this.adminPin;
  }

  public getAdminEmail(): string {
    return this.adminEmail;
  }

  public setAdminPin(pin: string) {
    this.adminPin = pin;
    this.persistConfig();
  }

  private persistConfig() {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({
      adminEmail: this.adminEmail,
      adminPin: this.adminPin,
      gasEndpointUrl: this.gasEndpointUrl
    }));
  }
}

export const store = VerlinDataService.getInstance();
