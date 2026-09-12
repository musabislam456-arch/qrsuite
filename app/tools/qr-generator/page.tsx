import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import QRCodeStudio, { QRType } from '@/components/qr/QRCodeStudio';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Download,
  Palette,
  Sparkles,
  BookOpen,
  ArrowRight,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'QR Code Generator & Customizer with Logo',
  description:
    'Generate custom QR codes with brand colors, logo overlays, quiet zone adjustment, and error correction. 100% free vector SVG and PNG downloads.',
};

export default async function QRGeneratorPage(props: {
  searchParams: Promise<{ type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const initialType: QRType =
    searchParams.type === 'wifi' ||
    searchParams.type === 'vcard' ||
    searchParams.type === 'text' ||
    searchParams.type === 'email' ||
    searchParams.type === 'phone'
      ? searchParams.type
      : 'url';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <QrCode className="w-3.5 h-3.5 text-indigo-600" />
          <span>QR Code Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Custom QR Code Generator & Designer
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Create high-resolution, branded QR codes for websites, Wi-Fi networks, digital vCard business cards, and marketing campaigns. Fully customizable with logo overlays and vector SVG output.
        </p>
      </div>

      {/* Main Studio Component */}
      <div className="max-w-5xl">
        <QRCodeStudio initialType={initialType} />
      </div>

      {/* Best Practice Tips Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">1</span>
            <span>The 10:1 Sizing Formula</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            For posters or flyers, measure expected viewing distance and divide by 10. A poster scanned from 5 feet requires a minimum 6-inch QR code.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">2</span>
            <span>Protect the Quiet Zone</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never crop the white border surrounding the QR code. Cameras require a 2 to 4 module buffer to distinguish the code from background artwork.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-bold">3</span>
            <span>Use Vector SVG for Print</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Send your print shop or signmaker our downloadable SVG file. Vectors stay razor-sharp at any physical dimension without pixel blur.
          </p>
        </div>
      </div>

      {/* Educational Guide Link */}
      <div className="p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Want deeper design & marketing tactics?</h4>
            <p className="text-xs text-slate-600">Read our complete 2026 engineering guide on contrast ratios, Reed-Solomon math, and print proofing.</p>
          </div>
        </div>
        <Link
          href="/blog/qr-code-best-practices-2026"
          className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition flex items-center gap-1.5 shrink-0"
        >
          <span>Read Best Practices</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
