import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  QrCode,
  Barcode,
  Wifi,
  Contact,
  Link2,
  FileText,
  Mail,
  Phone,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Generator Tools',
  description:
    'Explore the complete suite of free client-side QR code and barcode generator tools: URLs, Wi-Fi networks, vCards, Code 128, and retail EAN-13 barcodes.',
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: 'QR Code Generator & Customizer',
      desc: 'All-in-one QR studio supporting custom brand colors, logo overlays, quiet zone padding, and error correction levels up to 30%.',
      href: '/tools/qr-generator',
      icon: QrCode,
      badge: 'Most Popular',
      accent: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      features: ['Vector SVG & 2400px PNG', 'Custom logo uploads', 'Level H Error Correction'],
    },
    {
      title: 'Wi-Fi QR Code Maker',
      desc: 'Allow restaurant guests, office visitors, and hotel clients to connect to your WPA/WPA2/WPA3 network in a single tap without asking for passwords.',
      href: '/tools/qr-generator?type=wifi',
      icon: Wifi,
      badge: 'Hospitality Favorite',
      accent: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      features: ['Supports WPA2, WPA3 & WEP', 'Hidden SSID support', 'Zero server storage of passwords'],
    },
    {
      title: 'vCard Digital Business Card QR',
      desc: 'Encode full contact details (name, phone, company, email, address) into an ISO standard vCard 3.0 file that saves straight to smartphone contacts.',
      href: '/tools/qr-generator?type=vcard',
      icon: Contact,
      badge: 'Networking',
      accent: 'bg-violet-50 text-violet-600 border-violet-200',
      features: ['Native iOS & Android address book sync', 'Compact payload optimization', 'Print-ready for business cards'],
    },
    {
      title: 'Barcode Studio (Code 128 / EAN-13 / UPC)',
      desc: 'Generate retail-compliant product barcodes, shipping labels, and internal asset tags. Real-time checksum calculations and vector downloads.',
      href: '/tools/barcode-generator',
      icon: Barcode,
      badge: 'Retail & Warehouse',
      accent: 'bg-blue-50 text-blue-600 border-blue-200',
      features: ['Code 128 for inventory & parcels', 'EAN-13 & UPC-A for store POS', 'Thermal label printer compatible'],
    },
    {
      title: 'URL & Marketing Campaign QR',
      desc: 'Direct physical shoppers to product landing pages, menu links, or review funnels with built-in UTM campaign tagging parameters.',
      href: '/tools/qr-generator?type=url',
      icon: Link2,
      badge: 'Marketing',
      accent: 'bg-amber-50 text-amber-600 border-amber-200',
      features: ['UTM campaign builder', 'Fast camera app preview', 'Direct print standee mode'],
    },
    {
      title: 'Direct Call & Email QR Codes',
      desc: 'Trigger instantaneous customer support phone dialing or open pre-drafted email inquiries for customer service and appointment bookings.',
      href: '/tools/qr-generator?type=email',
      icon: Mail,
      badge: 'Customer Service',
      accent: 'bg-rose-50 text-rose-600 border-rose-200',
      features: ['Pre-populated subject & body lines', 'International dialer prefixes', 'Single-tap customer action'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full Tool Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Client-Side Barcode & QR Code Tools
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Every tool is completely free, runs 100% locally in your browser, requires no login or credit card, and exports vector SVGs for commercial print production.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${tool.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  {tool.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tool.href}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-xs group-hover:shadow-sm"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Safety & Compliance Card */}
      <div className="p-8 bg-indigo-950 text-indigo-100 rounded-3xl border border-indigo-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Zero-Knowledge Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white">Commercial Rights & Confidentiality Guaranteed</h2>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            All code payloads stay inside your browser memory. We never transmit, cache, or log your client Wi-Fi credentials or customer database links.
          </p>
        </div>
        <Link
          href="/privacy"
          className="px-5 py-3 bg-white text-indigo-950 hover:bg-indigo-50 rounded-xl text-xs sm:text-sm font-bold transition shrink-0"
        >
          Read Security Pledge
        </Link>
      </div>
    </div>
  );
}
