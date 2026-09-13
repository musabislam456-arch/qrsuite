import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QR Suite',
    short_name: 'QR Suite',
    description:
      'Free QR Code & Barcode Generator for Small Business - custom colors, logos, WiFi, vCard and barcodes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e1033',
    theme_color: '#7c3aed',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
