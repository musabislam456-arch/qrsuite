import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
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
            <div key={j} style={{ width: 14, height: 14, background: c ? '#ffffff' : 'transparent' }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#7c3aed',
          borderRadius: 40,
        }}
      >
        <QrMark />
      </div>
    ),
    { ...size }
  );
}
