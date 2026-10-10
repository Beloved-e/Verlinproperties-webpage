export const GAS_CODE_GS = `/**
 * ============================================================================
 * VERLIN PROPERTIES LIMITED - WEB APP BACKEND & DATABASE ENGINE
 * Company: Verlin Properties Limited ("Real Estate and Investment Company")
 * Head Office: No. 10 Akwaka Road, Off SARS Road, Port Harcourt
 * Phone/WhatsApp: 0707 937 1358
 * Email: verlinpropertiesltd@gmail.com
 * ============================================================================
 * 
 * Google Apps Script (HTML Service) + Google Sheets Backend
 * Features:
 * - CacheService (5-minute TTL) for ultra-fast page loads
 * - google.script.run server endpoints for Properties and Inquiries
 * - Instant MailApp notifications on inspection booking
 * - Admin authentication and real-time Plots Remaining calculation
 * - Embeddable in Google Sites (ALLOWALL X-Frame-Options)
 */

// CONFIGURATION
const CONFIG = {
  COMPANY_NAME: 'Verlin Properties Limited',
  ADMIN_EMAIL: 'verlinpropertiesltd@gmail.com',
  ADMIN_PIN: 'verlin2026', // Change this to your preferred admin password
  CACHE_SECONDS: 300, // 5 minutes cache for blazing fast reads
  SHEET_PROPERTIES: 'Properties',
  SHEET_INQUIRIES: 'Inquiries'
};

/**
 * Serves the HTML frontend application.
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  template.initialData = JSON.stringify({
    timestamp: new Date().toISOString(),
    adminEmail: CONFIG.ADMIN_EMAIL
  });

  return template.evaluate()
    .setTitle('Verlin Properties Limited | Real Estate & Investment')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Allows embedding in Google Sites
}

/**
 * Helper to include modular HTML files if desired
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Retrieves the active spreadsheet or binds by ID
 */
function getDb() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * READ PROPERTIES (With CacheService for optimal speed)
 * Sheet Columns: id, name, location, price_per_plot, plot_size_sqm, description,
 * features, logo_url, image_urls, video_url, latitude, longitude, total_plots,
 * plots_sold, plots_remaining, status
 */
function getProperties() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('verlin_properties_v1');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch(err) {
      // Fallback to fresh read if parsing fails
    }
  }

  var sheet = getDb().getSheetByName(CONFIG.SHEET_PROPERTIES);
  if (!sheet) {
    initSpreadsheet();
    sheet = getDb().getSheetByName(CONFIG.SHEET_PROPERTIES);
  }

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var properties = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0] && !row[1]) continue; // Skip empty rows

    var totalPlots = Number(row[12]) || 0;
    var plotsSold = Number(row[13]) || 0;
    var plotsRemaining = Math.max(0, totalPlots - plotsSold);
    
    // Status resolution
    var status = row[15] ? String(row[15]).trim() : 'Available';
    if (plotsRemaining <= 0) {
      status = 'Sold Out';
    } else if (plotsRemaining <= 5) {
      status = 'Selling Fast';
    }

    var featuresArr = [];
    if (row[6]) {
      featuresArr = String(row[6]).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    }

    var imagesArr = [];
    if (row[8]) {
      imagesArr = String(row[8]).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    }

    properties.push({
      id: String(row[0] || 'prop-' + i),
      name: String(row[1] || ''),
      location: String(row[2] || ''),
      price_per_plot: Number(row[3]) || 0,
      plot_size_sqm: Number(row[4]) || 465,
      description: String(row[5] || ''),
      features: featuresArr,
      logo_url: String(row[7] || ''),
      image_urls: imagesArr,
      video_url: String(row[9] || ''),
      latitude: Number(row[10]) || 4.9785,
      longitude: Number(row[11]) || 6.9247,
      total_plots: totalPlots,
      plots_sold: plotsSold,
      plots_remaining: plotsRemaining,
      status: status
    });
  }

  // Cache for fast future reads
  try {
    cache.put('verlin_properties_v1', JSON.stringify(properties), CONFIG.CACHE_SECONDS);
  } catch(e) {
    Logger.log('Cache put notice: ' + e.message);
  }

  return properties;
}

/**
 * SAVE INQUIRY & SEND EMAIL NOTIFICATION
 * Inquiries Sheet: timestamp, name, phone, email, property, message
 */
function saveInquiry(inquiry) {
  var sheet = getDb().getSheetByName(CONFIG.SHEET_INQUIRIES);
  if (!sheet) {
    initSpreadsheet();
    sheet = getDb().getSheetByName(CONFIG.SHEET_INQUIRIES);
  }

  var timestamp = Utilities.formatDate(new Date(), 'Africa/Lagos', 'yyyy-MM-dd HH:mm:ss');
  var name = String(inquiry.name || 'Anonymous').trim();
  var phone = String(inquiry.phone || '').trim();
  var email = String(inquiry.email || '').trim();
  var property = String(inquiry.property || 'General Inquiry').trim();
  var message = String(inquiry.message || '').trim();
  var preferredDate = String(inquiry.preferredDate || 'Flexible').trim();
  var plotsCount = Number(inquiry.plotsCount) || 1;

  var formattedMsg = message + (preferredDate ? ' [Inspection Date: ' + preferredDate + ', Plots: ' + plotsCount + ']' : '');

  sheet.appendRow([
    timestamp,
    name,
    phone,
    email,
    property,
    formattedMsg,
    'New'
  ]);

  // Dispatch Email Notification to Verlin Admin
  try {
    var subject = '🚩 New Inspection Booking: ' + property + ' - ' + name;
    var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">' +
      '<div style="background-color: #C8102E; color: #ffffff; padding: 20px; text-align: center;">' +
        '<h2 style="margin: 0; font-size: 22px;">VERLIN PROPERTIES LIMITED</h2>' +
        '<p style="margin: 5px 0 0 0; font-size: 13px; letter-spacing: 1px;">INSPECTION BOOKING & INQUIRY</p>' +
      '</div>' +
      '<div style="padding: 24px; color: #111111; line-height: 1.6;">' +
        '<p>A prospective client has submitted an inquiry on the web app:</p>' +
        '<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 140px;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' + name + '</td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone / WhatsApp:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:' + phone.replace(/\\s+/g, '') + '" style="color: #C8102E; font-weight: bold;">' + phone + '</a></td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' + email + '</td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Property:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #C8102E; font-weight: bold;">' + property + '</td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Number of Plots:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' + plotsCount + '</td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Preferred Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">' + preferredDate + '</td></tr>' +
          '<tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Client Message:</td><td style="padding: 8px; background: #f9f9f9; border-radius: 4px;">' + message + '</td></tr>' +
        '</table>' +
        '<div style="text-align: center; margin: 25px 0;">' +
          '<a href="https://wa.me/' + phone.replace(/[^0-9]/g, '') + '?text=Hello%20' + encodeURIComponent(name) + ',%20this%20is%20Verlin%20Properties%20regarding%20your%20inspection%20request%20for%20' + encodeURIComponent(property) + '" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply on WhatsApp</a>' +
        '</div>' +
        '<p style="font-size: 12px; color: #777;">Recorded in Google Sheets tab: <strong>Inquiries</strong> at ' + timestamp + '</p>' +
      '</div>' +
    '</div>';

    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch(mailErr) {
    Logger.log('Mail error: ' + mailErr.message);
  }

  return { success: true, timestamp: timestamp };
}

/**
 * ADMIN: RETRIEVE ALL INQUIRIES
 */
function getInquiries(adminPin) {
  if (adminPin !== CONFIG.ADMIN_PIN && Session.getActiveUser().getEmail() !== CONFIG.ADMIN_EMAIL) {
    throw new Error('Unauthorized admin access.');
  }

  var sheet = getDb().getSheetByName(CONFIG.SHEET_INQUIRIES);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var inquiries = [];
  for (var i = 1; i < data.length; i++) {
    var r = data[i];
    if (!r[0]) continue;
    inquiries.push({
      rowIndex: i + 1,
      timestamp: String(r[0]),
      name: String(r[1] || ''),
      phone: String(r[2] || ''),
      email: String(r[3] || ''),
      property: String(r[4] || ''),
      message: String(r[5] || ''),
      status: String(r[6] || 'New')
    });
  }
  return inquiries.reverse(); // Most recent first
}

/**
 * ADMIN: UPDATE PLOTS SOLD
 * Instantly recalculates plots_remaining and busts cache
 */
function updatePlotsSold(id, soldCount, adminPin) {
  verifyAdmin(adminPin);
  var sheet = getDb().getSheetByName(CONFIG.SHEET_PROPERTIES);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id) || String(data[i][1]).toLowerCase() === String(id).toLowerCase()) {
      var rowNum = i + 1;
      var totalPlots = Number(data[i][12]) || 0;
      var newSold = Math.min(totalPlots, Math.max(0, Number(soldCount)));
      var remaining = Math.max(0, totalPlots - newSold);

      sheet.getRange(rowNum, 14).setValue(newSold); // Column N: plots_sold
      sheet.getRange(rowNum, 15).setFormula('=M' + rowNum + '-N' + rowNum); // Column O: plots_remaining formula

      var newStatus = remaining <= 0 ? 'Sold Out' : (remaining <= 5 ? 'Selling Fast' : 'Available');
      sheet.getRange(rowNum, 16).setValue(newStatus); // Column P: status

      bustCache();
      return { success: true, id: id, total_plots: totalPlots, plots_sold: newSold, plots_remaining: remaining, status: newStatus };
    }
  }
  throw new Error('Property not found: ' + id);
}

/**
 * ADMIN: ADD PROPERTY
 */
function addProperty(prop, adminPin) {
  verifyAdmin(adminPin);
  var sheet = getDb().getSheetByName(CONFIG.SHEET_PROPERTIES);
  var nextId = 'prop-' + (sheet.getLastRow());

  var total = Number(prop.total_plots) || 40;
  var sold = Number(prop.plots_sold) || 0;
  var remaining = total - sold;
  var status = remaining <= 0 ? 'Sold Out' : (remaining <= 5 ? 'Selling Fast' : 'Available');

  var row = [
    nextId,
    prop.name,
    prop.location,
    Number(prop.price_per_plot) || 0,
    Number(prop.plot_size_sqm) || 465,
    prop.description || '',
    Array.isArray(prop.features) ? prop.features.join(', ') : (prop.features || ''),
    prop.logo_url || '',
    Array.isArray(prop.image_urls) ? prop.image_urls.join(', ') : (prop.image_urls || ''),
    prop.video_url || '',
    Number(prop.latitude) || 4.9785,
    Number(prop.longitude) || 6.9247,
    total,
    sold,
    remaining,
    status
  ];

  sheet.appendRow(row);
  bustCache();
  return { success: true, id: nextId };
}

/**
 * ADMIN: DELETE PROPERTY
 */
function deleteProperty(id, adminPin) {
  verifyAdmin(adminPin);
  var sheet = getDb().getSheetByName(CONFIG.SHEET_PROPERTIES);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      bustCache();
      return { success: true };
    }
  }
  throw new Error('Property not found');
}

/**
 * CACHE INVALIDATION
 */
function bustCache() {
  var cache = CacheService.getScriptCache();
  cache.remove('verlin_properties_v1');
}

function verifyAdmin(pin) {
  var userEmail = Session.getActiveUser().getEmail();
  if (userEmail && userEmail.toLowerCase() === CONFIG.ADMIN_EMAIL.toLowerCase()) {
    return true;
  }
  if (pin === CONFIG.ADMIN_PIN) {
    return true;
  }
  throw new Error('Unauthorized: Invalid admin credentials');
}

/**
 * ONE-CLICK DATABASE INITIALIZER
 * Run this function once from the Apps Script editor to create both tabs
 * and populate with Verlin Properties initial data.
 */
function initSpreadsheet() {
  var ss = getDb();

  // 1. Tab: Properties
  var propSheet = ss.getSheetByName(CONFIG.SHEET_PROPERTIES);
  if (!propSheet) {
    propSheet = ss.insertSheet(CONFIG.SHEET_PROPERTIES);
  } else {
    propSheet.clear();
  }

  var propHeaders = [
    'id', 'name', 'location', 'price_per_plot', 'plot_size_sqm', 'description',
    'features', 'logo_url', 'image_urls', 'video_url', 'latitude', 'longitude',
    'total_plots', 'plots_sold', 'plots_remaining', 'status'
  ];
  propSheet.appendRow(propHeaders);

  // Style header row
  propSheet.getRange(1, 1, 1, propHeaders.length)
    .setBackground('#C8102E')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');

  // Pre-fill initial properties
  var sampleProps = [
    [
      'prop-1',
      'GrandVille Estate',
      'Omagwa, Rivers State',
      3700000,
      465,
      'GrandVille Estate is a master-planned, 100% dry table land development in the booming Omagwa corridor, just 7 minutes from Port Harcourt International Airport. Perimeter fencing, instant physical beacon allocation, and rapid appreciation.',
      '100% Dry Table Land, Instant Physical Allocation, Perimeter Fencing & Gatehouse, Electricity Substation in Vicinity, Well-graded 30ft Access Roads, 7 Mins to Port Harcourt Int. Airport, Registered Survey & Deed of Conveyance',
      '',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200,https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      4.9785,
      6.9247,
      40,
      36,
      '=M2-N2',
      'Selling Fast'
    ],
    [
      'prop-2',
      'Lucent City Estate',
      'Directly behind Wigwe University, Isiokpo, Rivers State',
      3000000,
      465,
      'Strategically located directly behind Wigwe University campus in Isiokpo. High rental yield for student hostels, faculty apartments, and hospitality ventures. 100% dry table land with direct expressway connectivity.',
      'Direct Proximity to Wigwe University, High Rental Yield for Hostels, 100% Dry Table Topography, Instant Beacon Allocation, Electricity Infrastructure Plan, Verified Family & Community Release',
      '',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      5.0341,
      6.8793,
      50,
      38,
      '=M3-N3',
      'Available'
    ],
    [
      'prop-3',
      'Crestville Layout',
      'Isiokpo/Omagwa Express Road, Rivers State',
      2500000,
      465,
      'Prime dry land situated right on the bustling Isiokpo-Omagwa Express corridor. Ideal for commercial warehouses, private duplexes, or high-yield land banking with zero omo-onile issues.',
      'Direct Express Road Frontage, Immediate Physical Allocation, Zero Community Disturbances, Solid Dry Topsoil, Perimeter Concrete Beacons, Accelerated 40% Yearly Capital Gain',
      '',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200,https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      5.0125,
      6.9012,
      60,
      58,
      '=M4-N4',
      'Selling Fast'
    ],
    [
      'prop-4',
      'OMA Gardens',
      'Etche, Rivers State',
      900000,
      465,
      'Affordable, high-growth investment in Etche, Rivers State. Known for solid agricultural and residential dry land. At ₦900,000 per plot, OMA Gardens is the most accessible entry point into land ownership in Rivers State.',
      'Most Affordable Entry Price in Rivers State, 100% Dry Fertile Ground, Smooth Motorized Access Road, Instant Allocation upon Complete Payment, Flexible 3-Month Payment Plan Available',
      '',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200,https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      4.9912,
      7.0543,
      80,
      45,
      '=M5-N5',
      'Available'
    ]
  ];

  for (var j = 0; j < sampleProps.length; j++) {
    propSheet.appendRow(sampleProps[j]);
  }

  // 2. Tab: Inquiries
  var inqSheet = ss.getSheetByName(CONFIG.SHEET_INQUIRIES);
  if (!inqSheet) {
    inqSheet = ss.insertSheet(CONFIG.SHEET_INQUIRIES);
  } else {
    inqSheet.clear();
  }

  var inqHeaders = ['timestamp', 'name', 'phone', 'email', 'property', 'message', 'status'];
  inqSheet.appendRow(inqHeaders);
  inqSheet.getRange(1, 1, 1, inqHeaders.length)
    .setBackground('#111111')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');

  // Pre-fill sample inquiry
  inqSheet.appendRow([
    Utilities.formatDate(new Date(), 'Africa/Lagos', 'yyyy-MM-dd HH:mm:ss'),
    'Engr. Chukwudi Amadi',
    '0803 456 7890',
    'c.amadi@gmail.com',
    'GrandVille Estate',
    'I want to inspect 2 plots at GrandVille Estate this Saturday morning. [Inspection Date: 2026-10-10, Plots: 2]',
    'Inspection Scheduled'
  ]);

  bustCache();
  Logger.log('Verlin Properties database initialized successfully!');
}
`;

export const GAS_HTML_INDEX = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verlin Properties Limited | Real Estate and Investment Company</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Poppins & Montserrat -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body { font-family: 'Poppins', sans-serif; color: #111111; background-color: #fafafa; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; letter-spacing: -0.02em; }
    .btn-glossy-red {
      background: linear-gradient(180deg, #E01333 0%, #C8102E 55%, #A50B22 100%);
      box-shadow: 0 4px 15px rgba(200, 16, 46, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      color: #ffffff;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-glossy-red:hover {
      background: linear-gradient(180deg, #EB1E3E 0%, #D41232 55%, #B30C25 100%);
      box-shadow: 0 6px 20px rgba(200, 16, 46, 0.45);
      transform: translateY(-1px);
    }
    .price-tag-glossy {
      background: linear-gradient(135deg, #DE1232 0%, #C8102E 60%, #9C091F 100%);
      box-shadow: 0 3px 10px rgba(200, 16, 46, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3);
      color: #ffffff;
    }
    .badge-gold {
      background: linear-gradient(135deg, #FEF08A 0%, #EAB308 50%, #B45309 100%);
      box-shadow: 0 4px 12px rgba(234, 179, 8, 0.35);
      color: #78350F;
    }
  </style>
</head>
<body class="bg-neutral-50 text-[#111111]">
  <!-- TOP BAR -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <!-- Brand Lockup with Official Dual-Tone V Vector Logo -->
      <a href="#home" class="flex items-center select-none group">
        <svg viewBox="0 0 350 90" class="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="v-mark">
            <path d="M 0 0 L 21 0 L 39 40 L 22 55 L 0 20 Z" fill="#9E0022" />
            <polygon points="18,55 37,55 64,0 44,0" fill="#E21237" />
          </g>
          <g id="erlin" fill="#111111">
            <path d="M 72 0 H 105 V 13 H 87 V 21 H 102 V 33 H 87 V 42 H 106 V 55 H 72 Z" />
            <path d="M 113 0 H 139 C 148 0 154 5 154 15 C 154 22 149 27 142 29 L 156 55 H 140 L 128 31 H 128 V 55 H 113 Z M 128 12 V 21 H 137 C 140 21 142 19 142 16.5 C 142 14 140 12 137 12 Z" />
            <path d="M 162 0 H 177 V 42 H 197 V 55 H 162 Z" />
            <path d="M 206 0 H 221 V 55 H 206 Z" />
            <path d="M 230 0 H 245 L 263 32 V 0 H 277 V 55 H 263 L 244 22 V 55 H 230 Z" />
          </g>
          <text x="3" y="83" font-family="'Montserrat', sans-serif" font-weight="700" font-size="17" letter-spacing="0.44em" fill="#111111">PROPERTIES</text>
        </svg>
      </a>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
        <a href="#properties" class="hover:text-[#C8102E] transition-colors">Properties</a>
        <a href="#how-it-works" class="hover:text-[#C8102E] transition-colors">How It Works</a>
        <a href="#about" class="hover:text-[#C8102E] transition-colors">About Us</a>
        <a href="#contact" class="hover:text-[#C8102E] transition-colors">Contact</a>
      </nav>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <a href="tel:07079371358" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-neutral-300 hover:border-neutral-900 transition-colors">
          <i data-lucide="phone" class="w-3.5 h-3.5 text-[#C8102E]"></i>
          <span>0707 937 1358</span>
        </a>
        <a href="https://wa.me/2347079371358?text=Hello%20Verlin%20Properties,%20I%20am%20interested%20in%20inspecting%20your%20estates" target="_blank" class="btn-glossy-red px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
          <i data-lucide="message-circle" class="w-4 h-4"></i>
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Public SPA container rendered dynamically via google.script.run -->
  <main id="app-root">
    <div class="py-24 text-center">
      <div class="inline-block w-8 h-8 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-sm font-medium text-neutral-600">Loading verified estates from Google Sheets database...</p>
    </div>
  </main>

  <script>
    // Frontend script that communicates with Google Apps Script
    window.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
      loadProperties();
    });

    function loadProperties() {
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(renderProperties)
          .withFailureHandler(function(err) {
            console.error('Failed to load properties:', err);
            renderFallback();
          })
          .getProperties();
      } else {
        // Fallback demo mode for browser inspection
        renderFallback();
      }
    }

    function renderFallback() {
      // Direct rendering with local fallbacks if loaded outside GAS runtime
      console.log('Running in local/preview mode with pre-filled estates.');
    }
  </script>
</body>
</html>
`;
