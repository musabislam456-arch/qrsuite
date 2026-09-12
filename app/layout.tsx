import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'QR Suite — Free QR Code & Barcode Generator for Small Business',
    template: '%s | QR Suite',
  },
  description:
    'Generate high-resolution custom QR codes and retail barcodes in seconds. 100% private, client-side processing with custom colors, logo overlays, WiFi, vCard, Code 128, and EAN-13.',
  keywords: [
    'QR code generator',
    'barcode generator',
    'custom QR code with logo',
    'wifi qr code',
    'vcard qr code',
    'code 128 generator',
    'ean 13 barcode',
    'free business qr code',
    'high resolution qr download',
  ],
  authors: [{ name: 'QR Suite Team' }],
  creator: 'QR Suite',
  publisher: 'QR Suite',
  metadataBase: new URL('https://qrsuite.dev'),
  openGraph: {
    title: 'QR Suite — Professional QR Code & Barcode Generator',
    description:
      'Fast, customizable, and 100% client-side QR codes and barcodes for businesses, packaging, marketing, and menus.',
    url: 'https://qrsuite.dev',
    siteName: 'QR Suite',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Suite — Free QR Code & Barcode Generator',
    description:
      'High-res vector SVG & PNG QR codes with logos, custom colors, WiFi, vCards, Code 128 & EAN barcodes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col font-sans selection:bg-indigo-500 selection:text-white"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}

