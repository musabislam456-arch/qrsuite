'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import JsBarcode from 'jsbarcode';
import {
  Barcode,
  Download,
  Copy,
  Printer,
  Check,
  AlertTriangle,
  Sparkles,
  Sliders,
  Palette,
  Layers,
  HelpCircle,
} from 'lucide-react';

export type BarcodeFormat =
  | 'CODE128'
  | 'EAN13'
  | 'UPC'
  | 'CODE39'
  | 'ITF14'
  | 'pharmacode';

interface BarcodeStudioProps {
  initialFormat?: BarcodeFormat;
}

const FORMAT_GUIDES: Record<BarcodeFormat, { name: string; desc: string; sample: string; validation: (v: string) => string | null }> = {
  CODE128: {
    name: 'Code 128 (Universal)',
    desc: 'High-density alphanumeric barcode standard for inventory, logistics, asset tracking, and shipping labels.',
    sample: 'SKU-2026-PRO-XL',
    validation: (v) => {
      if (!v) return 'Value cannot be empty.';
      if (!/^[\x00-\x7F]+$/.test(v)) return 'Code 128 only supports standard ASCII characters.';
      return null;
    },
  },
  EAN13: {
    name: 'EAN-13 (International Retail)',
    desc: '13-digit retail product standard used across Europe, Asia, Latin America, and globally at checkout counters.',
    sample: '4006381333931',
    validation: (v) => {
      const clean = v.replace(/\s+/g, '');
      if (!/^\d{12,13}$/.test(clean)) return 'EAN-13 requires exactly 12 or 13 digits (0-9).';
      return null;
    },
  },
  UPC: {
    name: 'UPC-A (North American Retail)',
    desc: '12-digit standard primarily used across US and Canadian retail products and supermarkets.',
    sample: '012345678905',
    validation: (v) => {
      const clean = v.replace(/\s+/g, '');
      if (!/^\d{11,12}$/.test(clean)) return 'UPC requires exactly 11 or 12 digits (0-9).';
      return null;
    },
  },
  CODE39: {
    name: 'Code 39 (Industrial & Defense)',
    desc: 'Widely used in automotive, government, and healthcare inventory. Supports uppercase letters, numbers, and limited symbols.',
    sample: 'ASSET-9842',
    validation: (v) => {
      if (!v) return 'Value cannot be empty.';
      if (!/^[0-9A-Z\-\.\ \$\/\+\%]+$/i.test(v)) {
        return 'Code 39 supports only numbers, uppercase letters, and - . $ / + %';
      }
      return null;
    },
  },
  ITF14: {
    name: 'ITF-14 (Outer Carton Packaging)',
    desc: '14-digit standard used for master cases and wholesale shipping cartons containing multiple retail units.',
    sample: '10012345678902',
    validation: (v) => {
      const clean = v.replace(/\s+/g, '');
      if (!/^\d{13,14}$/.test(clean)) return 'ITF-14 requires exactly 14 digits (or 13 to compute checksum).';
      return null;
    },
  },
  pharmacode: {
    name: 'Pharmacode',
    desc: 'Pharmaceutical packaging binary code used as control marks on drug cartons.',
    sample: '12345',
    validation: (v) => {
      const n = parseInt(v, 10);
      if (isNaN(n) || n < 3 || n > 131070) {
        return 'Pharmacode requires an integer between 3 and 131070.';
      }
      return null;
    },
  },
};

export default function BarcodeStudio({ initialFormat = 'CODE128' }: BarcodeStudioProps) {
  const componentId = useId();
  const [format, setFormat] = useState<BarcodeFormat>(initialFormat);
  const [value, setValue] = useState<string>('SKU-2026-PRO-XL');
  const [lineColor, setLineColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [barWidth, setBarWidth] = useState<number>(2);
  const [barHeight, setBarHeight] = useState<number>(85);
  const [displayValue, setDisplayValue] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(16);
  const [margin, setMargin] = useState<number>(10);

  const [copied, setCopied] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const guide = FORMAT_GUIDES[format];
  const errorMsg = guide.validation(value);

  // Render barcode whenever parameters change
  useEffect(() => {
    if (errorMsg) {
      return;
    }

    try {
      if (svgRef.current) {
        JsBarcode(svgRef.current, value.trim(), {
          format: format,
          lineColor: lineColor,
          background: bgColor,
          width: barWidth,
          height: barHeight,
          displayValue: displayValue,
          fontSize: fontSize,
          margin: margin,
          textMargin: 6,
          font: 'monospace',
        });
      }
    } catch (err: unknown) {
      console.error('Barcode render exception:', err);
    }
  }, [format, value, lineColor, bgColor, barWidth, barHeight, displayValue, fontSize, margin, errorMsg]);

  // Handle format switch
  const handleFormatChange = (newFormat: BarcodeFormat) => {
    setFormat(newFormat);
    setValue(FORMAT_GUIDES[newFormat].sample);
  };

  // Export SVG
  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `barcode-${format.toLowerCase()}-${value.replace(/[^a-zA-Z0-9]/g, '_')}.svg`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export PNG via offscreen canvas
  const handleDownloadPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2; // 2x for sharp print resolution
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `barcode-${format.toLowerCase()}-${value.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      link.href = pngUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }
        } catch {
          handleDownloadPNG();
        }
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  // Print Label Dialog
  const handlePrint = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Barcode Label — QR Suite</title>
          <style>
            body { font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 90vh; margin: 0; padding: 24px; text-align: center; }
            .label-sheet { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
            .label { border: 1px dashed #94a3b8; padding: 16px; border-radius: 8px; width: 280px; }
            svg { width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <div class="label-sheet">
            <div class="label">${svgData}</div>
            <div class="label">${svgData}</div>
            <div class="label">${svgData}</div>
            <div class="label">${svgData}</div>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Format Selectors */}
      <div className="bg-slate-50/80 border-b border-slate-200 p-2 sm:p-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {(
            [
              { id: 'CODE128', label: 'Code 128 (Universal)' },
              { id: 'EAN13', label: 'EAN-13 (Retail)' },
              { id: 'UPC', label: 'UPC-A (US Retail)' },
              { id: 'CODE39', label: 'Code 39 (Alphanumeric)' },
              { id: 'ITF14', label: 'ITF-14 (Cartons)' },
              { id: 'pharmacode', label: 'Pharmacode' },
            ] as const
          ).map((item) => {
            const active = format === item.id;
            return (
              <button
                key={item.id}
                id={`tab-barcode-${item.id.toLowerCase()}`}
                type="button"
                onClick={() => handleFormatChange(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  active
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Format info */}
          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-950">
            <span className="font-bold block mb-0.5">{FORMAT_GUIDES[format].name}</span>
            <p className="text-slate-600">{FORMAT_GUIDES[format].desc}</p>
          </div>

          {/* Barcode Value Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor={`${componentId}-barcode-val`} className="text-xs font-semibold text-slate-700">
                Barcode Data / Number
              </label>
              <button
                type="button"
                onClick={() => setValue(FORMAT_GUIDES[format].sample)}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Insert Sample Value
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Barcode className="w-4 h-4" />
              </div>
              <input
                id={`${componentId}-barcode-val`}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={FORMAT_GUIDES[format].sample}
                className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-hidden transition ${
                  errorMsg ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300'
                }`}
              />
            </div>
            {errorMsg ? (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">
                Standard compliant for POS scanners, inventory laser readers, and camera apps.
              </p>
            )}
          </div>

          {/* Style Controls */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Barcode Geometry & Color Settings
            </h4>

            {/* Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${componentId}-bar-color`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Line Bar Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`${componentId}-bar-color`}
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    id={`${componentId}-bar-hex`}
                    type="text"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    className="w-24 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${componentId}-bg-color`} className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`${componentId}-bg-color`}
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    id={`${componentId}-bg-hex`}
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-24 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Geometry Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <label htmlFor={`${componentId}-bar-width`}>Bar Line Width: {barWidth}px</label>
                </div>
                <input
                  id={`${componentId}-bar-width`}
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={barWidth}
                  onChange={(e) => setBarWidth(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <label htmlFor={`${componentId}-bar-height`}>Bar Height: {barHeight}px</label>
                </div>
                <input
                  id={`${componentId}-bar-height`}
                  type="range"
                  min="40"
                  max="140"
                  step="5"
                  value={barHeight}
                  onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>

            {/* Text options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <input
                  id={`${componentId}-display-value`}
                  type="checkbox"
                  checked={displayValue}
                  onChange={(e) => setDisplayValue(e.target.checked)}
                  className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`${componentId}-display-value`} className="text-xs font-medium text-slate-700 cursor-pointer">
                  Show human-readable text below
                </label>
              </div>

              {displayValue && (
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor={`${componentId}-font-size`}>Font Size: {fontSize}px</label>
                  </div>
                  <input
                    id={`${componentId}-font-size`}
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Preview (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Live Render</h4>
                <p className="text-xs text-slate-500">Vector SVG preview</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-800">
                {format}
              </span>
            </div>

            {/* Barcode SVG Container */}
            <div className="flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs min-h-[180px] overflow-hidden">
              {errorMsg ? (
                <div className="text-center p-4 text-rose-600 text-xs">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <p className="font-semibold">Unable to draw barcode</p>
                  <p className="text-slate-500 mt-1">{errorMsg}</p>
                </div>
              ) : (
                <svg ref={svgRef} className="max-w-full h-auto" />
              )}
            </div>

            <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Encoded Value:</span>
                <span className="font-mono font-medium text-slate-900">{value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Standard:</span>
                <span className="text-slate-900 font-medium">{FORMAT_GUIDES[format].name}</span>
              </div>
            </div>
          </div>

          {/* Export Controls */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-download-barcode-svg"
                onClick={handleDownloadSVG}
                disabled={!!errorMsg}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>Vector SVG</span>
              </button>

              <button
                type="button"
                id="btn-download-barcode-png"
                onClick={handleDownloadPNG}
                disabled={!!errorMsg}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 disabled:opacity-50 rounded-xl text-sm font-semibold transition shadow-xs"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>High-Res PNG</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="btn-copy-barcode"
                onClick={handleCopy}
                disabled={!!errorMsg}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 disabled:opacity-50 rounded-xl text-xs font-semibold transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-print-barcode"
                onClick={handlePrint}
                disabled={!!errorMsg}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 disabled:opacity-50 rounded-xl text-xs font-semibold transition"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Labels</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              Compatible with Zebra, Dymo, Brother, Avery, and standard thermal label printers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
