import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  Sparkles,
  QrCode,
  Barcode,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Guide Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | QR Suite`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.publishedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Card */}
        <div className="pt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {post.author.avatar}
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">{post.author.name}</div>
            <div className="text-xs text-slate-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Executive Summary / Key Takeaways Box */}
      <div className="p-6 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-3">
        <h3 className="font-bold text-sm text-indigo-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Key Strategy Takeaways</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
          {post.summaryPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Article Body Sections */}
      <div className="space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        {post.content.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {sec.heading}
            </h2>

            <div className="space-y-3.5">
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {sec.tips && sec.tips.length > 0 && (
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-indigo-500 text-xs sm:text-sm text-slate-700 space-y-2 mt-4">
                <span className="font-bold text-slate-900 block">Pro Tips & Direct Actions:</span>
                <ul className="space-y-1.5 list-disc list-inside">
                  {sec.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="leading-normal">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA Box linking back to tools */}
      <div className="mt-12 p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-md">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Ready to apply these practices?
          </span>
          <h3 className="text-xl font-bold">Generate Your Verified Codes</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Use QR Suite to generate SVG vector QR codes with automatic High Error Correction and quiet-zone protection.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <Link
            href="/tools/qr-generator"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition text-center flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Open QR Studio</span>
          </Link>
          <Link
            href="/tools/barcode-generator"
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition text-center flex items-center justify-center gap-1.5"
          >
            <Barcode className="w-4 h-4" />
            <span>Barcode Studio</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
