# QR Suite

**Live site:** [qrsuite.toolbay.site](https://qrsuite.toolbay.site)

Free, private, client-side QR code and barcode generator for small businesses.

## Features

- High-resolution custom **QR code** generator (SVG & PNG) with custom colors and logo overlays
- **Barcode generator** — Code 128, EAN-13
- WiFi and vCard QR codes
- 100% client-side — nothing is uploaded to a server
- Blog for SEO and user education

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/qr-generator, tools/barcode-generator, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Blog data and generation logic
```

## License

All rights reserved.
