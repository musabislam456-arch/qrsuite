import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Heart,
  Store,
  CheckCircle2,
  Lock,
  EyeOff,
  Code,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About QR Suite — Our Mission & Privacy Promise',
  description:
    'Learn why we built QR Suite: to provide small business owners and creators with free, high-resolution, 100% private QR code and barcode generation tools.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Built to End Sneaky Subscriptions and Broken QR Codes
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          QR Suite was founded by software engineers and small business advocates who grew exhausted watching local cafes, boutique shops, and freelance designers fall victim to predatory QR code services.
        </p>
      </div>

      {/* The Problem We Solved */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          The Problem with Most &ldquo;Free&rdquo; QR Code Websites
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          If you have ever printed a QR code onto hundreds of physical menus, flyers, or trade-show signs, only to discover two weeks later that the link stopped working because a &ldquo;14-day free trial&rdquo; expired and demanded $40/month to unlock, you understand the problem.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Those predatory sites secretly route your traffic through their own redirect servers, holding your printed investment hostage. Even worse, they harvest analytics and track your customers without consent.
        </p>
      </div>

      {/* Our 4 Core Commitments */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Our Core Commitments to You</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Client-Side Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every single QR code and barcode is generated right on your computer or phone using native Web APIs. Your Wi-Fi network passwords, contact details, and client URLs never hit our servers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Static Codes That Never Expire</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              QR Suite creates pure static QR codes. The destination data is hard-encoded into the optical matrix. As long as your website exists, your printed code will scan forever without any recurring fee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Print-Grade Vector Exports</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most online tools give you blurry 150px JPEGs. We provide mathematical SVG vectors and ultra-high-resolution 2400px PNGs that stay razor-sharp on 20-foot outdoor billboards and packaging cartons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Commercial Freedom</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use QR Suite outputs anywhere: retail shelf packaging, business signage, digital ads, restaurant tables, and apparel. No royalties, no attribution required.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Transparency */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Code className="w-4 h-4 text-indigo-600" />
          <span>Technical Transparency</span>
        </h3>
        <p className="leading-relaxed">
          QR Suite is built with modern Next.js, TypeScript, Tailwind CSS, and battle-tested open-source libraries (`qrcode` and `JsBarcode`). By eliminating server-side rendering of image binaries, we keep our operating overhead minimal, enabling us to offer this utility completely free of charge to small businesses around the world.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/tools/qr-generator"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-sm transition"
        >
          <span>Start Creating with QR Suite</span>
        </Link>
      </div>
    </div>
  );
}
