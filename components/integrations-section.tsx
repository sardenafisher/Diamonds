'use client';

import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Filter, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface IntegrationItem {
  name: string;
  category: 'social' | 'web' | 'hosting' | 'travel' | 'productivity' | 'payments';
  categoryLabel: string;
  description: string;
  status: 'Core Protocol' | 'Roadmap Priority' | 'Architecture Study';
}

const INTEGRATIONS_LIST: IntegrationItem[] = [
    // Social & Messaging
    {
      name: 'WhatsApp Business API',
      category: 'social',
      categoryLabel: 'Messaging',
      description: 'Inbound message routing, customer profile association, and template dispatch.',
      status: 'Core Protocol',
    },
    {
      name: 'Instagram Direct Messaging',
      category: 'social',
      categoryLabel: 'Social Media',
      description: 'Consolidated DM sync and automated lead triage from story replies and inquiries.',
      status: 'Roadmap Priority',
    },
    {
      name: 'Facebook Messenger',
      category: 'social',
      categoryLabel: 'Social Media',
      description: 'Business page message intake linked into the unified communication inbox.',
      status: 'Roadmap Priority',
    },
    {
      name: 'TikTok Business Messaging',
      category: 'social',
      categoryLabel: 'Social Media',
      description: 'Lead generation form sync and direct marketing message monitoring.',
      status: 'Architecture Study',
    },
    {
      name: 'Snapchat for Business',
      category: 'social',
      categoryLabel: 'Social Media',
      description: 'Commercial campaign response ingestion and lead tracking integration.',
      status: 'Architecture Study',
    },

    // Websites & CMS
    {
      name: 'WordPress & WooCommerce',
      category: 'web',
      categoryLabel: 'CMS & Store',
      description: 'Two-way sync for inquiries, booking forms, WooCommerce orders, and plugin health.',
      status: 'Core Protocol',
    },
    {
      name: 'Webflow',
      category: 'web',
      categoryLabel: 'Websites',
      description: 'Form submission capture and dynamic customer collection updates via webhooks.',
      status: 'Roadmap Priority',
    },
    {
      name: 'Shopify Storefronts',
      category: 'web',
      categoryLabel: 'E-commerce',
      description: 'Customer order history, transaction attribution, and unified contact records.',
      status: 'Roadmap Priority',
    },

    // Hosting & Domains
    {
      name: 'Cloudflare DNS & Edge',
      category: 'hosting',
      categoryLabel: 'Infrastructure',
      description: 'Automated domain routing, SSL certificate tracking, and edge DDoS protection.',
      status: 'Core Protocol',
    },
    {
      name: 'Amazon Web Services (AWS)',
      category: 'hosting',
      categoryLabel: 'Cloud Infrastructure',
      description: 'Isolated customer container hosting and secure S3 asset management.',
      status: 'Roadmap Priority',
    },
    {
      name: 'Google Cloud Platform',
      category: 'hosting',
      categoryLabel: 'Cloud Infrastructure',
      description: 'Scalable backend services, BigQuery telemetry pipelines, and tenant security.',
      status: 'Roadmap Priority',
    },

    // Travel & Bookings
    {
      name: 'Viator (Tripadvisor Group)',
      category: 'travel',
      categoryLabel: 'Travel Distribution',
      description: 'OTA tour inventory mapping, availability synchronization, and voucher logging.',
      status: 'Core Protocol',
    },
    {
      name: 'GetYourGuide Partner API',
      category: 'travel',
      categoryLabel: 'Travel Distribution',
      description: 'Direct calendar integration to prevent double-booking across activity slots.',
      status: 'Core Protocol',
    },
    {
      name: 'FareHarbor & Rezdy',
      category: 'travel',
      categoryLabel: 'Booking Engines',
      description: 'Reservation import and operational manifest consolidation for tour operators.',
      status: 'Architecture Study',
    },

    // Productivity & Payments
    {
      name: 'Google Workspace',
      category: 'productivity',
      categoryLabel: 'Email & Calendar',
      description: 'Bidirectional calendar scheduling, Gmail message sync, and contact federation.',
      status: 'Core Protocol',
    },
    {
      name: 'Microsoft 365 & Outlook',
      category: 'productivity',
      categoryLabel: 'Productivity',
      description: 'Exchange mailbox integration, appointment booking, and enterprise single sign-on.',
      status: 'Roadmap Priority',
    },
    {
      name: 'Stripe Payments',
      category: 'payments',
      categoryLabel: 'Billing & Invoicing',
      description: 'Payment link dispatch, invoice settlement, and recurring subscription logs.',
      status: 'Core Protocol',
    },
    {
      name: 'Slack & Webhooks',
      category: 'productivity',
      categoryLabel: 'Team Collaboration',
      description: 'High-priority VIP lead notifications and escalation alerts in team channels.',
      status: 'Core Protocol',
    },
];

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'social', label: 'Social & Messaging' },
  { id: 'web', label: 'Web & CMS' },
  { id: 'hosting', label: 'Hosting & Domains' },
  { id: 'travel', label: 'Travel & Bookings' },
  { id: 'productivity', label: 'Productivity & Email' },
  { id: 'payments', label: 'Billing & Invoicing' },
];

export function IntegrationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return INTEGRATIONS_LIST.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="integrations" className="py-24 sm:py-32 bg-[#070A10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            Open Ecosystem Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Connect the software and channels your business already relies upon.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            DIAMONDS is designed to be the central operational nucleus, interfacing with messaging networks, content management systems, marketplaces, and productivity suites.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools or protocols..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>
        </div>

        {/* Status Legend Strip */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-xs text-slate-400 pt-2 pb-4 border-b border-white/5">
          <span className="font-semibold text-white">Roadmap Status Protocol:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Core Protocol</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-slate-300">Roadmap Priority</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="text-slate-300">Architecture Study</span>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {item.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                      item.status === 'Core Protocol'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'Roadmap Priority'
                        ? 'bg-sky-950/60 text-sky-300 border border-sky-800/40'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[11px] uppercase tracking-wider text-[#38BDF8] font-medium">
                  {item.categoryLabel}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Secure API Protocol</span>
                <span className="text-slate-400">Scoped RBAC</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-400">
            No integration matching &ldquo;{searchQuery}&rdquo; in this category.
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed max-w-3xl">
          <span className="font-semibold text-white">Transparency Notice:</span> Third-party service names, trademarks, and logos are property of their respective owners. Integration availability depends on the third-party providers public API terms, rate limits, and authentication protocols.
        </div>
      </div>
    </section>
  );
}
