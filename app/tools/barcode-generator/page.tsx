import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BarcodeStudio, { BarcodeFormat } from '@/components/barcode/BarcodeStudio';
import { Barcode, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barcode Generator (Code 128, EAN-13, UPC-A, Code 39)',
  description:
    'Free online barcode generator for retail packaging, warehouse inventory, and shipping labels. Download vector SVG and high-resolution PNG barcodes instantly.',
};

export default async function BarcodeGeneratorPage(props: {
  searchParams: Promise<{ format?: string }>;
}) {
  const searchParams = await props.searchParams;
  const rawFormat = searchParams.format?.toUpperCase();
  const initialFormat: BarcodeFormat =
    rawFormat === 'EAN13' ||
    rawFormat === 'UPC' ||
    rawFormat === 'CODE39' ||
    rawFormat === 'ITF14' ||
    rawFormat === 'PHARMACODE'
      ? (rawFormat === 'PHARMACODE' ? 'pharmacode' : (rawFormat as BarcodeFormat))
      : 'CODE128';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <Barcode className="w-3.5 h-3.5 text-indigo-600" />
          <span>Barcode Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Professional Barcode Generator
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Generate GS1-compliant retail barcodes (EAN-13 & UPC-A) and logistics labels (Code 128 & Code 39). Export high-res PNG or scalable vector SVG for commercial packaging and label printers.
        </p>
      </div>

      {/* Main Studio */}
      <div className="max-w-5xl">
        <BarcodeStudio initialFormat={initialFormat} />
      </div>

      {/* Barcode Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Choosing the Right Barcode Standard for Your Business
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-indigo-700 block text-base">Code 128</span>
            <p className="text-slate-600">
              <strong>Best for:</strong> Shipping labels, warehouse bin tags, internal inventory tracking, asset management.
            </p>
            <p className="text-slate-500">
              Encodes full alphanumeric ASCII. Highly compact, resilient, and supported by all standard laser and CCD barcode scanners.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-indigo-700 block text-base">EAN-13</span>
            <p className="text-slate-600">
              <strong>Best for:</strong> Consumer retail product packaging worldwide (Europe, Asia, Australia, Latin America).
            </p>
            <p className="text-slate-500">
              13-digit numeric code required by retail supermarket cash registers. Includes built-in modulo-10 checksum validation.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-indigo-700 block text-base">UPC-A</span>
            <p className="text-slate-600">
              <strong>Best for:</strong> Retail products sold in the United States and Canada.
            </p>
            <p className="text-slate-500">
              12-digit numeric standard administered by GS1 US. The foundational barcode found on nearly all US supermarket goods.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Dive Guide Link */}
      <div className="p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Need retail barcode compliance help?</h4>
            <p className="text-xs text-slate-600">Read our retail operations guide: &ldquo;Code 128 vs EAN-13 vs UPC-A: A Complete Guide to Retail Barcodes&rdquo;.</p>
          </div>
        </div>
        <Link
          href="/blog/retail-barcode-guide-code128-vs-ean"
          className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition flex items-center gap-1.5 shrink-0"
        >
          <span>Read Barcode Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
