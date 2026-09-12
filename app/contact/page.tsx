'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift client-side submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Customer & Business Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with the QR Suite Team
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have questions regarding high-volume barcode generation, print vendor file specs, or a feature request? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <strong>{name || 'friend'}</strong>. Our support team typically replies within 12 to 24 business hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Smith"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work or Personal Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@mybusiness.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic / Category
                </label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                >
                  <option value="Inquiry">General Business Inquiry</option>
                  <option value="Feature">Feature / Format Request</option>
                  <option value="Bug">Reporting a Rendering or Scan Issue</option>
                  <option value="Commercial">Commercial Printing Specifications</option>
                  <option value="Feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your printing run, label format questions, or feedback..."
                  className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-contact"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Company Info & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-100/80 rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Direct Contact Channels</h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">General Support</span>
                  <a href="mailto:support@qrsuite.dev" className="text-indigo-600 hover:underline">
                    support@qrsuite.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Response Time</span>
                  <span>Monday – Friday, 9am – 6pm PST (under 24 hours)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Headquarters</span>
                  <span>548 Market St, Suite 392, San Francisco, CA 94104</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">Privacy Guarantee</span>
              <span>We never sell or share contact form inquiries with third-party marketers or data aggregators.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
