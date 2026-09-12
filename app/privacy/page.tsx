import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zero-Knowledge Architecture',
  description:
    'QR Suite Privacy Policy: Learn how our 100% client-side QR code generator protects your Wi-Fi credentials, business cards, and URLs by processing all data in your local browser.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Client-Side Privacy Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: January 1, 2026 • Last updated: September 2026
        </p>
      </div>

      {/* Highlights Box */}
      <div className="p-6 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
        <h2 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>The QR Suite Privacy Pledge</span>
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Zero Payload Logging:</strong> Your URLs, Wi-Fi network keys, and contact records are processed exclusively inside your local browser.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>No Sneaky Redirects:</strong> We generate static QR codes directly containing your raw data. Scanners connect directly to your link.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>No Ad Tracking:</strong> We do not deploy cross-site advertising trackers or sell browsing data to data brokers.</span>
          </li>
        </ul>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Do NOT Collect</h2>
          <p>
            Unlike conventional online QR generation tools, QR Suite operates using a decentralized client-side architecture. When you input text, URLs, phone numbers, email addresses, or Wi-Fi security keys into our generators:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>We do NOT transmit your input data to any server.</li>
            <li>We do NOT store your input data in any database.</li>
            <li>We do NOT associate your IP address with any QR code payload.</li>
            <li>We do NOT log or track the number of times your printed QR codes are scanned.</li>
          </ul>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">2. Local Browser Operations</h2>
          <p>
            All barcode syntheses (JsBarcode) and QR matrix generation (qrcode) occur inside your device’s JavaScript engine utilizing standard HTML5 Canvas and SVG Web APIs. Any logo images you upload remain strictly in temporary browser memory as Data URLs and are discarded when you close or refresh the tab.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">3. Contact Form Submissions</h2>
          <p>
            If you voluntarily submit an inquiry through our Contact page, we collect your name, email address, and message content solely to respond to your support request. We retain customer service correspondence for 90 days for quality assurance, after which it is permanently purged.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Integrations & Scripts</h2>
          <p>
            If our site is configured with an embedded customer service chatbot (such as Tidio, Crisp, or Tawk.to), that provider may place functional session cookies to facilitate real-time chat interactions. Please refer to the specific chatbot provider’s privacy policy regarding their data handling standards.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">5. GDPR and CCPA / CPRA Compliance</h2>
          <p>
            Because we do not collect, process, or sell personal identifiers or generated QR payloads, our core services operate in total compliance with the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">6. Questions Regarding Privacy</h2>
          <p>
            If you have questions about our privacy practices, please contact our Data Protection team at{' '}
            <a href="mailto:privacy@qrsuite.dev" className="text-indigo-600 hover:underline">
              privacy@qrsuite.dev
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
