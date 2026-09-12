import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guides & Marketing Blog for Small Business',
  description:
    'Expert guides on QR code marketing strategies, scannability best practices, print sizing math, and retail barcode standards.',
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
          <span>Knowledge Base & Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          QR Code & Barcode Guides for Growing Businesses
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Practical strategies and engineering guidelines to help you design, test, and deploy codes that convert physical foot traffic into loyal customers.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Key Takeaways snippet */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Key Topics Covered:
                </span>
                <ul className="space-y-1 text-xs text-slate-500">
                  {post.summaryPoints.slice(0, 2).map((point, i) => (
                    <li key={i} className="line-clamp-1">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center">
                  {post.author.avatar}
                </div>
                <span className="text-slate-600 font-medium">{post.author.name}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Generator Callout */}
      <div className="bg-indigo-50/60 rounded-3xl p-8 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Ready to put these strategies into practice?</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Generate custom QR codes with logo overlays and test them live before printing.
          </p>
        </div>
        <Link
          href="/tools/qr-generator"
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 shadow-xs"
        >
          Create Free QR Code
        </Link>
      </div>
    </div>
  );
}
