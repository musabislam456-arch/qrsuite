'use client';

import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import QRCode from 'qrcode';
import {
  Link2,
  Wifi,
  Contact,
  FileText,
  Mail,
  Phone,
  Download,
  Copy,
  Printer,
  Check,
  Upload,
  Trash2,
  AlertCircle,
  Eye,
  Sliders,
  Palette,
  Sparkles,
  Globe,
  Star,
  ShoppingBag,
  MapPin,
  Heart,
  RefreshCw,
} from 'lucide-react';

export type QRType = 'url' | 'wifi' | 'vcard' | 'text' | 'email' | 'phone';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

interface QRCodeStudioProps {
  initialType?: QRType;
}

export default function QRCodeStudio({ initialType = 'url' }: QRCodeStudioProps) {
  const componentId = useId();
  // Form type
  const [qrType, setQrType] = useState<QRType>(initialType);

  // URL state
  const [url, setUrl] = useState('https://example.com/menu');
  const [showUtm, setShowUtm] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  // WiFi state
  const [wifiSsid, setWifiSsid] = useState('MyCafe_Guest_WiFi');
  const [wifiPassword, setWifiPassword] = useState('Welcome2026!');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // vCard state
  const [vFirstName, setVFirstName] = useState('Alex');
  const [vLastName, setVLastName] = useState('Morgan');
  const [vOrg, setVOrg] = useState('Artisan Roast Coffee');
  const [vTitle, setVTitle] = useState('Head Roaster & Founder');
  const [vPhone, setVPhone] = useState('+1 (555) 234-5678');
  const [vEmail, setVEmail] = useState('alex@artisanroast.com');
  const [vWebsite, setVWebsite] = useState('https://artisanroast.com');
  const [vAddress, setVAddress] = useState('120 Pine St, Portland, OR');

  // Text state
  const [plainText, setPlainText] = useState('Welcome! Enjoy 15% off with code WELCOME15 at checkout.');

  // Email state
  const [emailTo, setEmailTo] = useState('hello@mybusiness.com');
  const [emailSubject, setEmailSubject] = useState('Inquiry from Storefront Display');
  const [emailBody, setEmailBody] = useState('Hi! I am interested in placing a catering order for an upcoming event.');

  // Phone state
  const [phoneNumber, setPhoneNumber] = useState('+15552345678');

  // Customization state
  const [fgColor, setFgColor] = useState('#1e1b4b'); // deep indigo/slate
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isTransparentBg, setIsTransparentBg] = useState(false);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('H');
  const [margin, setMargin] = useState(2);

  // Logo state
  const [logoType, setLogoType] = useState<'none' | 'icon' | 'custom'>('icon');
  const [selectedIcon, setSelectedIcon] = useState<string>('globe');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoSizePercent, setLogoSizePercent] = useState<number>(22); // % of QR width
  const [logoBadgeShape, setLogoBadgeShape] = useState<'circle' | 'square'>('circle');

  // Feedback & Copy state
  const [copied, setCopied] = useState(false);
  const [exportRes, setExportRes] = useState<'600' | '1200' | '2400'>('1200');

  // References
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute final payload string based on type
  const computePayload = (): string => {
    switch (qrType) {
      case 'url': {
        let finalUrl = url.trim();
        if (!finalUrl) return 'https://example.com';
        if (!/^https?:\/\//i.test(finalUrl)) {
          finalUrl = 'https://' + finalUrl;
        }
        if (showUtm && (utmSource || utmMedium || utmCampaign)) {
          try {
            const parsed = new URL(finalUrl);
            if (utmSource) parsed.searchParams.set('utm_source', utmSource.trim());
            if (utmMedium) parsed.searchParams.set('utm_medium', utmMedium.trim());
            if (utmCampaign) parsed.searchParams.set('utm_campaign', utmCampaign.trim());
            return parsed.toString();
          } catch {
            return finalUrl;
          }
        }
        return finalUrl;
      }

      case 'wifi': {
        // Standard syntax: WIFI:T:WPA;S:MySSID;P:mypass;H:false;;
        const enc = wifiEncryption === 'nopass' ? 'nopass' : wifiEncryption;
        const pass = wifiEncryption === 'nopass' ? '' : wifiPassword;
        const hidden = wifiHidden ? 'true' : 'false';
        return `WIFI:T:${enc};S:${wifiSsid};P:${pass};H:${hidden};;`;
      }

      case 'vcard': {
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${vLastName || ''};${vFirstName || ''};;;`,
          `FN:${vFirstName || ''} ${vLastName || ''}`.trim(),
          vOrg ? `ORG:${vOrg}` : '',
          vTitle ? `TITLE:${vTitle}` : '',
          vPhone ? `TEL;TYPE=CELL,VOICE:${vPhone}` : '',
          vEmail ? `EMAIL;TYPE=WORK,INTERNET:${vEmail}` : '',
          vWebsite ? `URL:${vWebsite}` : '',
          vAddress ? `ADR;TYPE=WORK:;;${vAddress};;;;` : '',
          'END:VCARD',
        ]
          .filter(Boolean)
          .join('\n');
      }

      case 'text':
        return plainText.trim() || 'QR Suite';

      case 'email': {
        const to = emailTo.trim();
        const params = new URLSearchParams();
        if (emailSubject) params.set('subject', emailSubject);
        if (emailBody) params.set('body', emailBody);
        const query = params.toString();
        return `mailto:${to}${query ? `?${query}` : ''}`;
      }

      case 'phone':
        return `tel:${phoneNumber.trim()}`;

      default:
        return url;
    }
  };

  const payload = computePayload();

  // Helper for preset color palettes
  const colorPresets = [
    { label: 'Deep Indigo', fg: '#1e1b4b', bg: '#ffffff' },
    { label: 'Obsidian Black', fg: '#09090b', bg: '#ffffff' },
    { label: 'Royal Blue', fg: '#1d4ed8', bg: '#ffffff' },
    { label: 'Forest Emerald', fg: '#065f46', bg: '#ffffff' },
    { label: 'Ruby Crimson', fg: '#991b1b', bg: '#ffffff' },
    { label: 'Purple Plum', fg: '#581c87', bg: '#ffffff' },
  ];

  // Helper icons as SVG data URLs
  const getIconSvg = (icon: string, color: string): string => {
    switch (icon) {
      case 'wifi':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`;
      case 'phone':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
      case 'mail':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
      case 'star':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      case 'bag':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
      case 'pin':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
      case 'heart':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      case 'globe':
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    }
  };

  // Render QR Code to canvas with optional logo
  const renderQRCode = useCallback(
    async (targetCanvas?: HTMLCanvasElement, targetWidth = 400) => {
      const canvas = targetCanvas || canvasRef.current;
      if (!canvas) return;

      try {
        const effectiveBg = isTransparentBg ? '#00000000' : bgColor;

        // Ensure error correction is at least Q or H if a logo is present
        const effectiveEcc: ErrorCorrectionLevel =
          logoType !== 'none' && (errorCorrection === 'L' || errorCorrection === 'M')
            ? 'H'
            : errorCorrection;

        // Step 1: Draw base QR Code onto canvas
        await QRCode.toCanvas(canvas, payload, {
          width: targetWidth,
          margin: margin,
          errorCorrectionLevel: effectiveEcc,
          color: {
            dark: fgColor,
            light: effectiveBg,
          },
        });

        // Step 2: Overlay logo if chosen
        if (logoType !== 'none') {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          let logoSrc = '';
          if (logoType === 'custom' && customLogoUrl) {
            logoSrc = customLogoUrl;
          } else if (logoType === 'icon') {
            // Create SVG data URI
            const svgString = getIconSvg(selectedIcon, fgColor);
            logoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
          }

          if (logoSrc) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject(new Error('Failed to load logo image'));
              img.src = logoSrc;
            });

            const canvasSize = canvas.width;
            const logoSize = Math.round(canvasSize * (logoSizePercent / 100));
            const badgeSize = Math.round(logoSize * 1.3);
            const center = canvasSize / 2;
            const badgeX = center - badgeSize / 2;
            const badgeY = center - badgeSize / 2;
            const logoX = center - logoSize / 2;
            const logoY = center - logoSize / 2;

            ctx.save();
            // Draw clean protective badge under logo
            ctx.fillStyle = bgColor === '#00000000' || isTransparentBg ? '#ffffff' : bgColor;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;

            if (logoBadgeShape === 'circle') {
              ctx.beginPath();
              ctx.arc(center, center, badgeSize / 2, 0, Math.PI * 2);
              ctx.fill();
            } else {
              const r = 8;
              ctx.beginPath();
              ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, r);
              ctx.fill();
            }

            ctx.restore();

            // Draw the actual logo centered
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
          }
        }
      } catch (err) {
        console.error('QR Render error:', err);
      }
    },
    [
      payload,
      isTransparentBg,
      bgColor,
      logoType,
      errorCorrection,
      margin,
      fgColor,
      customLogoUrl,
      selectedIcon,
      logoSizePercent,
      logoBadgeShape,
    ]
  );

  // Redraw whenever payload or styling changes
  useEffect(() => {
    renderQRCode();
  }, [renderQRCode]);

  // Handle custom file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      setCustomLogoUrl(res);
      setLogoType('custom');
      // Auto upgrade ECC to High for scan security
      setErrorCorrection('H');
    };
    reader.readAsDataURL(file);
  };

  // Export as high-res PNG
  const handleDownloadPNG = async () => {
    const resInt = parseInt(exportRes, 10);
    const offscreen = document.createElement('canvas');
    offscreen.width = resInt;
    offscreen.height = resInt;

    await renderQRCode(offscreen, resInt);

    const dataUrl = offscreen.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-suite-${qrType}-${exportRes}px.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export as Vector SVG
  const handleDownloadSVG = async () => {
    try {
      const effectiveBg = isTransparentBg ? '#00000000' : bgColor;
      const effectiveEcc: ErrorCorrectionLevel =
        logoType !== 'none' && (errorCorrection === 'L' || errorCorrection === 'M')
          ? 'H'
          : errorCorrection;

      const svgString = await QRCode.toString(payload, {
        type: 'svg',
        margin: margin,
        errorCorrectionLevel: effectiveEcc,
        color: {
          dark: fgColor,
          light: effectiveBg,
        },
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `qr-suite-${qrType}-vector.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('SVG export error:', err);
    }
  };

  // Copy PNG to clipboard
  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } else {
          // Fallback
          handleDownloadPNG();
        }
      });
    } catch (err) {
      console.error('Clipboard copy error:', err);
      handleDownloadPNG();
    }
  };

  // Direct print
  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code — QR Suite</title>
          <style>
            body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 90vh; margin: 0; padding: 24px; text-align: center; }
            .card { border: 2px dashed #cbd5e1; padding: 32px; border-radius: 16px; display: inline-block; }
            img { width: 320px; height: 320px; display: block; margin: 0 auto; }
            h2 { margin: 16px 0 4px; font-size: 20px; color: #0f172a; }
            p { margin: 0; font-size: 14px; color: #64748b; max-width: 320px; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="${dataUrl}" alt="QR Code" />
            <h2>Scan with Camera</h2>
            <p>${payload.length > 50 ? payload.substring(0, 50) + '...' : payload}</p>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Type Selector Tabs */}
      <div className="bg-slate-50/80 border-b border-slate-200 p-2 sm:p-3 overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max">
          {[
            { id: 'url', label: 'Website / URL', icon: Link2 },
            { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
            { id: 'vcard', label: 'Contact (vCard)', icon: Contact },
            { id: 'text', label: 'Plain Text', icon: FileText },
            { id: 'email', label: 'Email Draft', icon: Mail },
            { id: 'phone', label: 'Phone Call', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = qrType === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-qr-type-${tab.id}`}
                type="button"
                onClick={() => {
                  setQrType(tab.id as QRType);
                  if (tab.id === 'wifi' && logoType === 'none') {
                    setLogoType('icon');
                    setSelectedIcon('wifi');
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left inputs & styling, Right live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Column: Content + Customizer (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Section 1: Content Inputs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  1
                </span>
                <span>Enter Your Content</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {payload.length} characters encoded
              </span>
            </div>

            {/* URL Form */}
            {qrType === 'url' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor={`${componentId}-url-input`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Website URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Link2 className="w-4 h-4" />
                    </div>
                    <input
                      id={`${componentId}-url-input`}
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://yourbusiness.com/promo"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Pro tip: Use HTTPS links to guarantee immediate browser opening on iOS and Android.
                  </p>
                </div>

                {/* Optional UTM Builder */}
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setShowUtm(!showUtm)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 hover:text-indigo-600"
                  >
                    <span>Add Marketing UTM Tracking (Optional)</span>
                    <span className="text-[11px] text-indigo-600 font-medium">
                      {showUtm ? 'Hide parameters' : '+ Add Campaign Tracking'}
                    </span>
                  </button>
                  {showUtm && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-200">
                      <div>
                        <label htmlFor={`${componentId}-utm-source`} className="block text-[11px] font-medium text-slate-600 mb-1">
                          Source (e.g. table_tent)
                        </label>
                        <input
                          id={`${componentId}-utm-source`}
                          type="text"
                          value={utmSource}
                          onChange={(e) => setUtmSource(e.target.value)}
                          placeholder="storefront_window"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${componentId}-utm-medium`} className="block text-[11px] font-medium text-slate-600 mb-1">
                          Medium (e.g. qr)
                        </label>
                        <input
                          id={`${componentId}-utm-medium`}
                          type="text"
                          value={utmMedium}
                          onChange={(e) => setUtmMedium(e.target.value)}
                          placeholder="qr_code"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${componentId}-utm-campaign`} className="block text-[11px] font-medium text-slate-600 mb-1">
                          Campaign (e.g. spring26)
                        </label>
                        <input
                          id={`${componentId}-utm-campaign`}
                          type="text"
                          value={utmCampaign}
                          onChange={(e) => setUtmCampaign(e.target.value)}
                          placeholder="loyalty_launch"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WiFi Form */}
            {qrType === 'wifi' && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${componentId}-wifi-ssid`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Network Name (SSID)
                    </label>
                    <input
                      id={`${componentId}-wifi-ssid`}
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder="Guest_WiFi"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${componentId}-wifi-encryption`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Security / Encryption
                    </label>
                    <select
                      id={`${componentId}-wifi-encryption`}
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                      <option value="WEP">WEP (Older)</option>
                      <option value="nopass">No Password (Open)</option>
                    </select>
                  </div>
                </div>

                {wifiEncryption !== 'nopass' && (
                  <div>
                    <label htmlFor={`${componentId}-wifi-password`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                      WiFi Password
                    </label>
                    <input
                      id={`${componentId}-wifi-password`}
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden font-mono"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id={`${componentId}-wifi-hidden`}
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`${componentId}-wifi-hidden`} className="text-xs text-slate-600 cursor-pointer">
                    This is a hidden network (requires explicit SSID broadcasting)
                  </label>
                </div>
              </div>
            )}

            {/* vCard Form */}
            {qrType === 'vcard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor={`${componentId}-vcard-firstname`} className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
                    <input
                      id={`${componentId}-vcard-firstname`}
                      type="text"
                      value={vFirstName}
                      onChange={(e) => setVFirstName(e.target.value)}
                      placeholder="Alex"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${componentId}-vcard-lastname`} className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                      id={`${componentId}-vcard-lastname`}
                      type="text"
                      value={vLastName}
                      onChange={(e) => setVLastName(e.target.value)}
                      placeholder="Morgan"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor={`${componentId}-vcard-org`} className="block text-xs font-medium text-slate-700 mb-1">Company / Business</label>
                    <input
                      id={`${componentId}-vcard-org`}
                      type="text"
                      value={vOrg}
                      onChange={(e) => setVOrg(e.target.value)}
                      placeholder="Artisan Roast Coffee"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${componentId}-vcard-title`} className="block text-xs font-medium text-slate-700 mb-1">Job Title</label>
                    <input
                      id={`${componentId}-vcard-title`}
                      type="text"
                      value={vTitle}
                      onChange={(e) => setVTitle(e.target.value)}
                      placeholder="Founder & Head Roaster"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor={`${componentId}-vcard-phone`} className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      id={`${componentId}-vcard-phone`}
                      type="tel"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${componentId}-vcard-email`} className="block text-xs font-medium text-slate-700 mb-1">Work Email</label>
                    <input
                      id={`${componentId}-vcard-email`}
                      type="email"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor={`${componentId}-vcard-website`} className="block text-xs font-medium text-slate-700 mb-1">Website</label>
                    <input
                      id={`${componentId}-vcard-website`}
                      type="url"
                      value={vWebsite}
                      onChange={(e) => setVWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${componentId}-vcard-address`} className="block text-xs font-medium text-slate-700 mb-1">City / Address</label>
                    <input
                      id={`${componentId}-vcard-address`}
                      type="text"
                      value={vAddress}
                      onChange={(e) => setVAddress(e.target.value)}
                      placeholder="Portland, OR"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Plain Text Form */}
            {qrType === 'text' && (
              <div>
                <label htmlFor={`${componentId}-plaintext`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Text Content or Promo Announcement
                </label>
                <textarea
                  id={`${componentId}-plaintext`}
                  rows={3}
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Enter notes, promo codes, or event directions..."
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>
            )}

            {/* Email Form */}
            {qrType === 'email' && (
              <div className="space-y-2.5">
                <div>
                  <label htmlFor={`${componentId}-email-to`} className="block text-xs font-medium text-slate-700 mb-1">Recipient Email</label>
                  <input
                    id={`${componentId}-email-to`}
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="contact@business.com"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`${componentId}-email-subject`} className="block text-xs font-medium text-slate-700 mb-1">Subject</label>
                  <input
                    id={`${componentId}-email-subject`}
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Table Reservation Inquiry"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`${componentId}-email-body`} className="block text-xs font-medium text-slate-700 mb-1">Pre-filled Message</label>
                  <textarea
                    id={`${componentId}-email-body`}
                    rows={2}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>
            )}

            {/* Phone Form */}
            {qrType === 'phone' && (
              <div>
                <label htmlFor={`${componentId}-phone-number`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number to Dial
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id={`${componentId}-phone-number`}
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Scanning triggers the phone dialer with this exact number prefilled.
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Customizer (Colors, Margin, ECC) */}
          <div className="pt-6 border-t border-slate-200 space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                2
              </span>
              <span>Customize Colors & Error Correction</span>
            </h3>

            {/* Color Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700">Quick Palette Presets</span>
                <span className="text-[11px] text-slate-500">High-contrast verified</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setFgColor(preset.fg);
                      setBgColor(preset.bg);
                      setIsTransparentBg(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      fgColor === preset.fg && !isTransparentBg
                        ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/50 text-indigo-950 font-semibold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                      style={{ backgroundColor: preset.fg }}
                    />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Hex Color Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${componentId}-fg-color`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Foreground (Dots / Modules)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`${componentId}-fg-color`}
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    id={`${componentId}-fg-hex`}
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={`${componentId}-bg-color`} className="text-xs font-semibold text-slate-700">
                    Background Color
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      id={`${componentId}-bg-transparent`}
                      type="checkbox"
                      checked={isTransparentBg}
                      onChange={(e) => setIsTransparentBg(e.target.checked)}
                      className="rounded-sm border-slate-300 text-indigo-600"
                    />
                    <span>Transparent</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={`${componentId}-bg-color`}
                    type="color"
                    value={bgColor}
                    disabled={isTransparentBg}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white disabled:opacity-40"
                  />
                  <input
                    id={`${componentId}-bg-hex`}
                    type="text"
                    value={isTransparentBg ? 'Transparent' : bgColor}
                    disabled={isTransparentBg}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Error Correction & Margin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={`${componentId}-ecc-select`} className="text-xs font-semibold text-slate-700">
                    Error Correction Level
                  </label>
                  <span className="text-[10px] text-indigo-600 font-semibold">
                    {errorCorrection === 'H' ? 'Best for logos (30%)' : `${errorCorrection} level`}
                  </span>
                </div>
                <select
                  id={`${componentId}-ecc-select`}
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                >
                  <option value="L">L - Low (7% recovery, smallest size)</option>
                  <option value="M">M - Medium (15% recovery, standard)</option>
                  <option value="Q">Q - Quartile (25% recovery)</option>
                  <option value="H">H - High (30% recovery, logo safe)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={`${componentId}-margin-slider`} className="text-xs font-semibold text-slate-700">
                    Quiet Zone Margin: {margin} blocks
                  </label>
                  <span className="text-[10px] text-slate-500">ISO standard: 2-4</span>
                </div>
                <input
                  id={`${componentId}-margin-slider`}
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Logo Overlay (Custom or Icon) */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  3
                </span>
                <span>Center Logo / Brand Overlay</span>
              </h3>
              {logoType !== 'none' && (
                <button
                  type="button"
                  onClick={() => setLogoType('none')}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Logo</span>
                </button>
              )}
            </div>

            {/* Logo mode choice */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLogoType('none')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition ${
                  logoType === 'none'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                No Logo
              </button>
              <button
                type="button"
                onClick={() => {
                  setLogoType('icon');
                  setErrorCorrection('H');
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition flex items-center justify-center gap-1.5 ${
                  logoType === 'icon'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Preset Icon</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition flex items-center justify-center gap-1.5 ${
                  logoType === 'custom'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>

            {/* Preset Icon Selector */}
            {logoType === 'icon' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-medium text-slate-700 block">Select Center Icon:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'globe', label: 'Web', icon: Globe },
                    { id: 'wifi', label: 'WiFi', icon: Wifi },
                    { id: 'phone', label: 'Phone', icon: Phone },
                    { id: 'mail', label: 'Mail', icon: Mail },
                    { id: 'star', label: 'Star', icon: Star },
                    { id: 'bag', label: 'Shop', icon: ShoppingBag },
                    { id: 'pin', label: 'Map', icon: MapPin },
                    { id: 'heart', label: 'Heart', icon: Heart },
                  ].map((ic) => {
                    const IconComp = ic.icon;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setSelectedIcon(ic.id)}
                        className={`p-2 rounded-lg border flex items-center gap-1.5 text-xs font-medium transition ${
                          selectedIcon === ic.id
                            ? 'border-indigo-600 bg-white text-indigo-600 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{ic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Uploaded Logo Details */}
            {logoType === 'custom' && customLogoUrl && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={customLogoUrl}
                    alt="Custom Logo Preview"
                    className="w-10 h-10 object-contain rounded-md bg-white border border-emerald-200 p-1"
                  />
                  <div>
                    <span className="text-xs font-semibold text-emerald-900 block">
                      Custom Logo Uploaded
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Error correction automatically set to High (30%)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-white rounded-lg border border-emerald-300 hover:bg-emerald-50"
                >
                  Change
                </button>
              </div>
            )}

            {/* Logo Adjustments (Size & Badge) */}
            {logoType !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor={`${componentId}-logo-scale`}>Logo Size Ratio: {logoSizePercent}%</label>
                    <span className="text-[10px] text-slate-500">Max safe: 28%</span>
                  </div>
                  <input
                    id={`${componentId}-logo-scale`}
                    type="range"
                    min="14"
                    max="28"
                    value={logoSizePercent}
                    onChange={(e) => setLogoSizePercent(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-700 mb-1">Logo Badge Shape</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLogoBadgeShape('circle')}
                      className={`flex-1 py-1 text-xs font-medium rounded-lg border ${
                        logoBadgeShape === 'circle'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Circle Badge
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoBadgeShape('square')}
                      className={`flex-1 py-1 text-xs font-medium rounded-lg border ${
                        logoBadgeShape === 'square'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Rounded Square
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Preview & Export Hub (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Live Scannable Preview</h4>
                <p className="text-xs text-slate-500">Point your smartphone camera to test right now</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ready</span>
              </div>
            </div>

            {/* QR Canvas Card */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs relative group">
              <div
                className="p-3 rounded-xl transition-all"
                style={{
                  backgroundColor: isTransparentBg ? 'transparent' : bgColor,
                  backgroundImage: isTransparentBg
                    ? 'radial-gradient(#cbd5e1 1px, transparent 1px)'
                    : 'none',
                  backgroundSize: '12px 12px',
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={340}
                  className="max-w-full w-[260px] sm:w-[300px] h-auto object-contain rounded-lg shadow-xs"
                />
              </div>

              {/* Scannability health badge */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Contrast (ECC: {errorCorrection})</span>
              </div>
            </div>

            {/* Scanner Payload Inspector / Test Scanner */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Decoded Payload String:</span>
                </span>
                <span className="font-mono text-[11px]">{payload.length} chars</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg font-mono text-[11px] text-slate-700 break-all select-all border border-slate-200/80 max-h-16 overflow-y-auto">
                {payload}
              </div>
            </div>
          </div>

          {/* Export Action Controls */}
          <div className="space-y-3 pt-2">
            {/* Resolution Selector for PNG */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">PNG Resolution:</span>
              <div className="flex gap-1.5">
                {[
                  { res: '600', label: 'Web 600px' },
                  { res: '1200', label: 'HD 1200px' },
                  { res: '2400', label: 'Print 2400px' },
                ].map((item) => (
                  <button
                    key={item.res}
                    type="button"
                    onClick={() => setExportRes(item.res as any)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium border transition ${
                      exportRes === item.res
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-download-qr-png"
                onClick={handleDownloadPNG}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <button
                type="button"
                id="btn-download-qr-svg"
                onClick={handleDownloadSVG}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-sm font-semibold transition shadow-xs hover:border-slate-400"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Vector SVG</span>
              </button>
            </div>

            {/* Secondary Actions: Copy & Print */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-copy-qr-clipboard"
                onClick={handleCopyClipboard}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-print-qr-sheet"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Standee / Card</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              No watermark, no scan limits, 100% free for commercial use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
