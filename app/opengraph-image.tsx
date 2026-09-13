import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'QR Suite — Professional QR Code & Barcode Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function QrMark() {
  const cells = [
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [0,0,0,1,0,0,0],
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {cells.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((c, j) => (
            <div key={j} style={{ width: 12, height: 12, background: c ? '#ffffff' : 'transparent' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1033 0%, #4c1d95 55%, #7c3aed 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <QrMark />
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            QR Suite
          </div>
        </div>
        <div style={{ fontSize: 30, color: '#ddd6fe', maxWidth: 940, textAlign: 'center' }}>
          Free QR Code &amp; Barcode Generator for Business
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Custom Logo', 'WiFi', 'vCard', 'Barcodes'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.10)',
                color: '#ede9fe',
                fontSize: 20,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
