import React, { useState } from 'react';
import { GAS_CODE_GS, GAS_HTML_INDEX } from '../gas/codeTemplates';
import {
  Code,
  Copy,
  Check,
  Download,
  ExternalLink,
  FolderOpen,
  Image as ImageIcon,
  Globe,
  Database,
  Zap,
  HelpCircle,
  Link,
  ChevronRight
} from 'lucide-react';

export const GasSetupHub: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'codegs' | 'indexhtml'>('codegs');
  const [copiedCodeGs, setCopiedCodeGs] = useState(false);
  const [copiedIndexHtml, setCopiedIndexHtml] = useState(false);
  const [copiedEmbedSnippet, setCopiedEmbedSnippet] = useState(false);

  // Google Drive link converter tool
  const [driveInputUrl, setDriveInputUrl] = useState('');
  const [convertedDirectUrl, setConvertedDirectUrl] = useState('');
  const [copiedConvertedUrl, setCopiedConvertedUrl] = useState(false);

  // Copy helpers
  const handleCopyCodeGs = () => {
    navigator.clipboard.writeText(GAS_CODE_GS);
    setCopiedCodeGs(true);
    setTimeout(() => setCopiedCodeGs(false), 2500);
  };

  const handleCopyIndexHtml = () => {
    navigator.clipboard.writeText(GAS_HTML_INDEX);
    setCopiedIndexHtml(true);
    setTimeout(() => setCopiedIndexHtml(false), 2500);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Convert Google Drive share link to direct display image URL
  const convertDriveLink = (input: string) => {
    setDriveInputUrl(input);
    if (!input.trim()) {
      setConvertedDirectUrl('');
      return;
    }

    // Match file ID from formats like:
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // https://drive.google.com/open?id=FILE_ID
    // or plain ID
    const match1 = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const match2 = input.match(/id=([a-zA-Z0-9_-]+)/);
    const id = match1 ? match1[1] : match2 ? match2[1] : input.trim();

    if (id && id.length > 15) {
      // Direct high-resolution Google CDN link (bypasses cookie check and works everywhere)
      const direct = `https://lh3.googleusercontent.com/d/${id}`;
      setConvertedDirectUrl(direct);
    } else {
      setConvertedDirectUrl('');
    }
  };

  const googleSitesEmbedCode = `<iframe 
  src="PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE" 
  width="100%" 
  height="900" 
  frameborder="0" 
  style="border:0; width:100%; height:100vh; min-height:800px;" 
  allowfullscreen>
</iframe>`;

  return (
    <div className="py-12 sm:py-20 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* HUB HEADER */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C8102E] text-xs font-black uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Production Deployment Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
            Google Apps Script & Google Sheets Architecture
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Complete, pristine source code for <strong>Code.gs</strong> and <strong>Index.html</strong>. 
            Includes step-by-step instructions to create your Google Sheet database, deploy the web app, host photos on Google Drive, and link a custom domain.
          </p>
        </div>

        {/* CODE VIEWER BOX WITH TABS AND COPY BUTTONS */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden">
          
          {/* TOP BAR */}
          <div className="bg-neutral-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCodeTab('codegs')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeCodeTab === 'codegs'
                    ? 'bg-[#C8102E] text-white shadow-md'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Code.gs (Backend & Sheets API)</span>
              </button>

              <button
                onClick={() => setActiveCodeTab('indexhtml')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  activeCodeTab === 'indexhtml'
                    ? 'bg-[#C8102E] text-white shadow-md'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Index.html (Frontend HTML Service)</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {activeCodeTab === 'codegs' ? (
                <>
                  <button
                    onClick={handleCopyCodeGs}
                    className="btn-glossy-red px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    {copiedCodeGs ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeGs ? 'Copied Code.gs!' : 'Copy Code.gs'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile('Code.gs', GAS_CODE_GS)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Download Code.gs"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCopyIndexHtml}
                    className="btn-glossy-red px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    {copiedIndexHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndexHtml ? 'Copied Index.html!' : 'Copy Index.html'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile('Index.html', GAS_HTML_INDEX)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Download Index.html"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* CODE EDITOR WINDOW */}
          <div className="relative bg-[#0F172A] text-slate-100 p-5 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
            <pre className="whitespace-pre">
              {activeCodeTab === 'codegs' ? GAS_CODE_GS : GAS_HTML_INDEX}
            </pre>
          </div>

          <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
            <span>
              {activeCodeTab === 'codegs'
                ? 'Includes CacheService (5-min TTL), mail dispatch to verlinpropertiesltd@gmail.com, and initSpreadsheet() one-click setup.'
                : 'Standalone HTML Service frontend with Tailwind CSS, Montserrat/Poppins typography, and google.script.run bridge.'}
            </span>
            <span className="font-bold text-neutral-800">Ready to Paste into Apps Script</span>
          </div>

        </div>

        {/* STEP-BY-STEP SETUP GUIDE */}
        <div className="space-y-8 pt-4">
          <div>
            <p className="text-xs font-black tracking-widest text-[#C8102E] uppercase">
              Step-by-Step Implementation Manual
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
              How to Deploy Verlin Properties on Google Apps Script
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* STEP 1: CREATE SPREADSHEET */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  01
                </span>
                <h3 className="font-bold text-base text-neutral-900">Create Google Sheet</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Go to <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#C8102E] underline font-bold">sheets.new</a> and name it <strong>"Verlin Properties Database"</strong>.
              </p>
              <div className="text-[11px] bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 font-mono text-neutral-700 space-y-1">
                <p><strong>Tab 1:</strong> <code>Properties</code></p>
                <p><strong>Tab 2:</strong> <code>Inquiries</code></p>
              </div>
              <p className="text-[11px] text-neutral-500">
                You do NOT need to type columns manually! The <code>initSpreadsheet()</code> function in <code>Code.gs</code> builds both tabs and colors them automatically.
              </p>
            </div>

            {/* STEP 2: OPEN APPS SCRIPT */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  02
                </span>
                <h3 className="font-bold text-base text-neutral-900">Open Apps Script Editor</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Inside your Google Sheet, click <strong>Extensions</strong> → <strong>Apps Script</strong> from the top menu bar.
              </p>
              <div className="text-[11px] bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-neutral-700 space-y-1">
                <p>1. Delete existing code in <code>Code.gs</code> and paste our <code>Code.gs</code>.</p>
                <p>2. Click <strong>+</strong> next to Files → choose <strong>HTML</strong> → name it <code>Index</code>.</p>
                <p>3. Paste our <code>Index.html</code> code.</p>
              </div>
            </div>

            {/* STEP 3: RUN INITIALIZER */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  03
                </span>
                <h3 className="font-bold text-base text-neutral-900">Run Database Seed</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                In the Apps Script toolbar, select the function <code>initSpreadsheet</code> from the dropdown, then click <strong>Run</strong>.
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Accept Google permissions (click <em>Advanced</em> → <em>Go to Verlin (unsafe)</em>). This seeds GrandVille, Lucent City, Crestville, and OMA Gardens.
              </p>
            </div>

            {/* STEP 4: DEPLOY WEB APP */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  04
                </span>
                <h3 className="font-bold text-base text-neutral-900">Deploy as Web App</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Click <strong>Deploy</strong> (top right) → <strong>New deployment</strong>.
              </p>
              <div className="text-[11px] bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-neutral-700 space-y-1">
                <p><strong>Select type:</strong> Web app</p>
                <p><strong>Execute as:</strong> <code>Me (your Google email)</code></p>
                <p><strong>Who has access:</strong> <code>Anyone</code></p>
              </div>
              <p className="text-[11px] text-neutral-500">
                Copy your Web App URL (ends with <code>/exec</code>).
              </p>
            </div>

            {/* STEP 5: GOOGLE DRIVE IMAGES */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  05
                </span>
                <h3 className="font-bold text-base text-neutral-900">Google Drive Photos</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Upload your land photos to a Google Drive folder. Right-click the folder or image → <strong>Share</strong> → set access to <strong>"Anyone with the link can view"</strong>.
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Use our built-in <strong>Drive Link Converter</strong> below to convert share links into permanent image URLs!
              </p>
            </div>

            {/* STEP 6: CUSTOM DOMAIN & SITES */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-black text-xs">
                  06
                </span>
                <h3 className="font-bold text-base text-neutral-900">Custom Domain / Sites</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                To replace the long <code>script.google.com</code> URL with a clean link or custom domain:
              </p>
              <ul className="text-[11px] text-neutral-700 list-disc list-inside space-y-1">
                <li>Create a free Google Site at <strong>sites.google.com</strong></li>
                <li>Insert an <strong>Embed</strong> element with your Web App URL</li>
                <li>Map your custom domain (e.g. <code>verlinproperties.com</code>) in Site Settings!</li>
              </ul>
            </div>

          </div>
        </div>

        {/* INTERACTIVE GOOGLE DRIVE IMAGE LINK CONVERTER TOOL */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C8102E] flex items-center justify-center shrink-0 text-white">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Google Drive Image Link Converter Tool
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Standard Google Drive share URLs like <code>drive.google.com/file/d/XYZ/view</code> fail to render in <code>&lt;img&gt;</code> tags. Paste your link here to generate the universal direct embed link.
              </p>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="relative">
              <Link className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={driveInputUrl}
                onChange={e => convertDriveLink(e.target.value)}
                placeholder="Paste Google Drive share link (e.g. https://drive.google.com/file/d/1a2B3c.../view?usp=sharing)..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>

            {convertedDirectUrl && (
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-2 animate-in fade-in">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Direct Embed Image URL (Ready for Google Sheets image_urls column):
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={convertedDirectUrl}
                    className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-mono text-emerald-400 select-all"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(convertedDirectUrl);
                      setCopiedConvertedUrl(true);
                      setTimeout(() => setCopiedConvertedUrl(false), 2000);
                    }}
                    className="btn-glossy-red px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                  >
                    {copiedConvertedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedConvertedUrl ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GOOGLE SITES EMBED & CUSTOM DOMAIN SNIPPET */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 space-y-5">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#C8102E]" />
            <h3 className="text-xl font-black text-neutral-900">
              Clean Custom Domain via Google Sites Embedding
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
            Google Apps Script web app URLs can look complex (<code>https://script.google.com/macros/s/.../exec</code>). 
            Our <code>Code.gs</code> specifies <code>setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)</code>, allowing you to embed it cleanly on your custom domain via Google Sites:
          </p>

          <div className="relative bg-neutral-900 rounded-2xl p-4 text-xs font-mono text-neutral-300">
            <pre className="whitespace-pre overflow-x-auto">{googleSitesEmbedCode}</pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(googleSitesEmbedCode);
                setCopiedEmbedSnippet(true);
                setTimeout(() => setCopiedEmbedSnippet(false), 2000);
              }}
              className="absolute top-3 right-3 btn-glossy-red px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              {copiedEmbedSnippet ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedEmbedSnippet ? 'Copied' : 'Copy HTML'}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 space-y-1">
            <p><strong>Step 1:</strong> Go to <a href="https://sites.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C8102E] underline">sites.google.com</a> and start a blank site.</p>
            <p><strong>Step 2:</strong> Click <strong>Embed</strong> → <strong>Embed code</strong> → paste the snippet above replacing with your Apps Script URL.</p>
            <p><strong>Step 3:</strong> In Site Settings → <strong>Custom domains</strong> → Connect <code>verlinproperties.com</code>.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
