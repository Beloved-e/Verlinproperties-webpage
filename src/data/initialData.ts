import { Property, Inquiry, VerlinCompanyInfo } from '../types';

export const COMPANY_INFO: VerlinCompanyInfo = {
  name: 'Verlin Properties Limited',
  tagline: 'Real Estate and Investment Company',
  phone: '0707 937 1358',
  tel: 'tel:07079371358',
  whatsapp: '2347079371358',
  email: 'verlinpropertiesltd@gmail.com',
  address: 'No. 10 Akwaka Road, Off SARS Road, Port Harcourt',
  facebook: 'https://www.facebook.com/share/1eAE89Tvjz/',
  instagram: 'https://instagram.com/verlinproperties',
  accountDetails: {
    bankName: 'Zenith Bank',
    accountNumber: '1229873410',
    accountName: 'Verlin Properties Limited'
  }
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'GrandVille Estate',
    location: 'Omagwa, Rivers State',
    price_per_plot: 3700000,
    plot_size_sqm: 465,
    description: 'GrandVille Estate is a master-planned, dry-table land development nestled in the rapidly booming Omagwa corridor, just 7 minutes from the Port Harcourt International Airport. Designed for high capital appreciation, residential tranquility, and commercial advantage with 100% dry soil and paved arterial roads.',
    features: [
      '100% Dry Table Land',
      'Instant Physical Allocation',
      'Perimeter Fencing & Gatehouse',
      'Electricity Substation in Vicinity',
      'Well-graded 30ft Access Roads',
      '7 Mins to Port Harcourt Int. Airport',
      'Registered Survey & Deed of Conveyance'
    ],
    logo_url: '',
    image_urls: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    latitude: 4.9785,
    longitude: 6.9247,
    total_plots: 40,
    plots_sold: 36,
    plots_remaining: 4, // 4 remaining -> Selling Fast!
    status: 'Selling Fast',
    landmark: 'Port Harcourt International Airport / Omagwa Roundabout',
    titleType: 'Registered Survey & Deed of Assignment'
  },
  {
    id: 'prop-2',
    name: 'Lucent City Estate',
    location: 'Directly behind Wigwe University, Isiokpo, Rivers State',
    price_per_plot: 3000000,
    plot_size_sqm: 465,
    description: 'Strategically located directly behind the prestigious Wigwe University campus in Isiokpo. An unprecedented real estate investment magnet with immense rental yield from faculty, student housing, and hospitality facilities. 100% dry ground with direct dual-carriage road connectivity.',
    features: [
      'Direct Proximity to Wigwe University',
      'High Rental Yield for Hostels & Staff Quarters',
      '100% Dry Table Topography',
      'Instant Beacon Allocation',
      'Electricity Infrastructure Plan',
      'Secured Boundary Demarcation',
      'Verified Family & Community Release'
    ],
    logo_url: '',
    image_urls: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    latitude: 5.0341,
    longitude: 6.8793,
    total_plots: 50,
    plots_sold: 38,
    plots_remaining: 12,
    status: 'Available',
    landmark: 'Wigwe University Isiokpo Campus',
    titleType: 'Registered Survey & Deed of Conveyance'
  },
  {
    id: 'prop-3',
    name: 'Crestville Layout',
    location: 'Isiokpo/Omagwa Express Road, Rivers State',
    price_per_plot: 2500000,
    plot_size_sqm: 465,
    description: 'Prime dry land situated right on the bustling Isiokpo-Omagwa Express corridor. Ideal for commercial warehouses, private estates, residential duplexes, or long-term land banking. High daily vehicular traffic and rapid urban spillover from Port Harcourt.',
    features: [
      'Direct Express Road Frontage',
      'Immediate Physical Allocation',
      'Zero Omo-Onile / Community Disturbances',
      'Solid Dry Topsoil (No Swamp or Raft Needed)',
      'Perimeter Concrete Corner Beacons',
      'Accelerated 40% Yearly Capital Gain',
      'Free Site Inspection Vehicles Available'
    ],
    logo_url: '',
    image_urls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    latitude: 5.0125,
    longitude: 6.9012,
    total_plots: 60,
    plots_sold: 58,
    plots_remaining: 2, // 2 remaining -> Selling Fast!
    status: 'Selling Fast',
    landmark: 'Omagwa Express Corridor / Isiokpo Junction',
    titleType: 'Registered Survey & Power of Attorney'
  },
  {
    id: 'prop-4',
    name: 'OMA Gardens',
    location: 'Etche, Rivers State',
    price_per_plot: 900000,
    plot_size_sqm: 465,
    description: 'An affordable, high-growth investment opportunity in Etche, Rivers State. Known for its rich, solid agricultural and residential dry land. At ₦900,000 per plot, OMA Gardens is the most accessible entry point into land ownership for salary earners, young professionals, and astute land-bankers.',
    features: [
      'Most Affordable Entry Price in Rivers State',
      '100% Dry Fertile Ground',
      'Smooth Motorized Access Road',
      'Instant Allocation upon Complete Payment',
      'Guaranteed Clean Documentation',
      'Flexible 3-Month Payment Plan Available',
      'Peaceful, Serene Growing Community'
    ],
    logo_url: '',
    image_urls: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    latitude: 4.9912,
    longitude: 7.0543,
    total_plots: 80,
    plots_sold: 45,
    plots_remaining: 35,
    status: 'Available',
    landmark: 'Etche Central Road / Igwuruta-Etche Road Link',
    titleType: 'Registered Survey & Irrevocable Power of Attorney'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    timestamp: '2026-10-04 14:22:10',
    name: 'Engr. Chukwudi Amadi',
    phone: '0803 456 7890',
    email: 'c.amadi@gmail.com',
    property: 'GrandVille Estate',
    message: 'I want to inspect 2 plots at GrandVille Estate this Saturday morning. Please confirm the inspection team meeting point.',
    preferredDate: '2026-10-10',
    plotsCount: 2,
    status: 'Inspection Scheduled'
  },
  {
    id: 'inq-102',
    timestamp: '2026-10-04 18:05:43',
    name: 'Dr. Blessing Nwachukwu',
    phone: '0703 112 3344',
    email: 'drblessing@yahoo.com',
    property: 'Lucent City Estate',
    message: 'Interested in buying 4 plots behind Wigwe University for student accommodation development. Please send me survey coordinates.',
    preferredDate: '2026-10-12',
    plotsCount: 4,
    status: 'New'
  },
  {
    id: 'inq-103',
    timestamp: '2026-10-03 11:30:19',
    name: 'Barrister Tonye Briggs',
    phone: '0812 998 4433',
    email: 'tonye.briggs@lawchamber.ng',
    property: 'Crestville Layout',
    message: 'Inquiring for a client in the diaspora who wants dry land along the express. What documents do you issue on payment?',
    preferredDate: '2026-10-08',
    plotsCount: 1,
    status: 'Contacted'
  }
];

export const FAQS = [
  {
    q: 'How verified is land from Verlin Properties Limited?',
    a: 'Every property marketed by Verlin Properties Limited undergoes rigorous due diligence, title search at the Rivers State Ministry of Lands, perimeter boundary survey, and direct legal acquisition from accredited families and communities. We guarantee 100% dispute-free land with registered survey and deed of conveyance.'
  },
  {
    q: 'What does "100% Dry Land" mean?',
    a: 'All our estates are situated on high-elevation, solid dry table soil. There is zero waterlogged terrain, no need for expensive sand-filling, piling, or raft foundations. You can commence construction immediately after allocation without delay.'
  },
  {
    q: 'How fast is physical land allocation after payment?',
    a: 'Allocation is instant! Once your payment is verified, you receive your corner beacons planted, physical plot demarcation on-site, along with your official receipt, allocation letter, deed of conveyance, and registered survey plan.'
  },
  {
    q: 'Are site inspections free, and when do they take place?',
    a: 'Yes, site inspections are 100% free of charge! We provide comfortable inspection vehicles departing from our head office at No. 10 Akwaka Road, Off SARS Road, Port Harcourt from Monday through Saturday (10:00 AM and 2:00 PM).'
  },
  {
    q: 'Can Nigerians in the diaspora purchase safely?',
    a: 'Absolutely. Over 40% of our investors reside in the UK, USA, Canada, and Europe. We provide live video inspections, drone footage of your demarcated plot, verifiable bank accounts in the name of Verlin Properties Limited, and courier delivery of your legal documents to any country.'
  },
  {
    q: 'Do you offer flexible installment payment plans?',
    a: 'Yes! We offer convenient payment arrangements up to 3 to 6 months with an initial deposit, allowing you to lock down the price per plot before rapid capital appreciation.'
  }
];
