import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — Commercial & Personal Usage Rights',
  description:
    'QR Suite Terms of Service: Unlimited commercial usage rights, no royalties, no attribution requirements, and user responsibilities.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <FileText className="w-3.5 h-3.5" />
          <span>Usage Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Effective Date: January 1, 2026 • Last updated: September 2026
        </p>
      </div>

      {/* Commercial Usage Clearance Box */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 space-y-3">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Clearance for Commercial & Personal Use</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          All QR codes, barcode graphics, SVG vector files, and raster PNGs generated using QR Suite are 100% royalty-free and cleared for worldwide commercial distribution. You may print them onto physical merchandise, marketing campaigns, product packaging, book covers, restaurant menus, and billboards without restriction or mandatory attribution.
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the QR Suite website, web applications, and generation utilities, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">2. Permissible Use & Prohibited Activities</h2>
          <p>
            You agree to use QR Suite exclusively for lawful purposes. You are strictly prohibited from generating barcodes or QR codes that:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>Direct users to phishing websites, malware downloads, or counterfeit domains.</li>
            <li>Defraud or mislead consumers regarding product pricing or authenticity.</li>
            <li>Infringe upon any third party’s intellectual property or trademark rights.</li>
            <li>Promote illegal goods, unauthorized financial scams, or violence.</li>
          </ul>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">3. Verification Responsibility Before Commercial Printing</h2>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mandatory Print Test Disclaimer:</span>
            </span>
            <p>
              It is the sole responsibility of the user to test-scan all generated QR codes and barcodes with multiple camera devices and laser scanners under realistic lighting before commissioning thousands of printed packages, labels, or signage. QR Suite is not liable for costs incurred from printing unverified or mistyped codes.
            </p>
          </div>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">4. Disclaimer of Warranties</h2>
          <p>
            QR Suite is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall QR Suite or its creators be liable for any direct, indirect, punitive, incidental, special, or consequential damages resulting from the use of or inability to use our tools.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold text-slate-900">6. Modifications to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Changes become effective immediately upon posting to this URL.
          </p>
        </section>
      </div>
    </div>
  );
}
