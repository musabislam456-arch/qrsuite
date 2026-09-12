import React from 'react';
import Link from 'next/link';
import { QrCode, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner: Privacy Assurance */}
      <div className="border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-200">
                100% Client-Side Private
              </span>
              <span className="hidden md:inline text-slate-500">—</span>
              <span className="hidden md:inline">
                Your Wi-Fi passwords, contact details, and URLs are encoded entirely in your browser. We never store or log your payload data.
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Unlimited Free Commercial Use</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white shadow-sm">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">QR Suite</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional, print-ready QR codes and retail barcode generation engineered for small businesses, restaurant owners, marketers, and product designers.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>📍 Operations: 548 Market St, Suite 392, San Francisco, CA 94104</p>
              <p>✉️ Support: support@qrsuite.dev</p>
            </div>
          </div>

          {/* Col 3: Core Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Core Generators
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/qr-generator" className="text-slate-400 hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-generator?type=wifi" className="text-slate-400 hover:text-white transition-colors">
                  Wi-Fi QR Code Maker
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-generator?type=vcard" className="text-slate-400 hover:text-white transition-colors">
                  vCard Contact Card QR
                </Link>
              </li>
              <li>
                <Link href="/tools/barcode-generator" className="text-slate-400 hover:text-white transition-colors">
                  Barcode Studio (Code 128)
                </Link>
              </li>
              <li>
                <Link href="/tools/barcode-generator?format=EAN13" className="text-slate-400 hover:text-white transition-colors">
                  Retail EAN-13 Barcode
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Browse All Tools</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guides & Articles */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Guides & Advice
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/blog/qr-codes-for-small-business-marketing"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Small Business Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/qr-code-best-practices-2026"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Best Practices 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/retail-barcode-guide-code128-vs-ean"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Code 128 vs EAN vs UPC
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                  All Articles & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QR Suite Inc. All rights reserved. Built for independent businesses.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for reliability & speed</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" />
            <span>Zero paywalls, zero scan limits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
