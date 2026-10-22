'use client';

import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  Globe,
  Compass,
  Workflow,
  Sparkles,
  BarChart3,
  CreditCard,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Layers,
  Clock
} from 'lucide-react';

export function EcosystemSection() {
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  return (
    <section id="ecosystem" className="py-24 sm:py-32 bg-[#070A10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            The Product Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Eight operational pillars. One coherent digital infrastructure.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            DIAMONDS brings your essential business capabilities under one architectural roof, ending the friction of disconnected tools while preserving dedicated depth in every operational domain.
          </p>
        </div>

        {/* Asymmetric Bento Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. Customer Relationships & Sales Pipelines (Large Bento 8-col) */}
          <div className="md:col-span-8 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 01</span>
                    <h3 className="text-xl font-bold text-white">Customer Relationships & Sales</h3>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Lead to Close</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Comprehensive customer profiles, lead attribution, deal pipelines, interaction timelines, and automated follow-up cadences. Every prospective buyer has a unified history regardless of where the conversation originated.
              </p>

              {/* Visual simulated pipeline deal strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Lead Inbound</div>
                  <div className="text-sm font-bold text-white">18 Inquiries</div>
                  <div className="text-[11px] text-slate-400">$84,500 pipeline</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#38BDF8]/5 border border-[#38BDF8]/20 space-y-1">
                  <div className="text-[10px] text-[#38BDF8] uppercase tracking-wider font-semibold">Proposal Sent</div>
                  <div className="text-sm font-bold text-white">7 Active Deals</div>
                  <div className="text-[11px] text-slate-400">$42,300 pending</div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">Confirmed / Won</div>
                  <div className="text-sm font-bold text-white">24 Bookings</div>
                  <div className="text-[11px] text-slate-400">$118,900 closed</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Contact 360</span>
              <span>·</span>
              <span>Custom Deal Stages</span>
              <span>·</span>
              <span>Revenue Attribution</span>
              <span>·</span>
              <span>Follow-up Reminders</span>
            </div>
          </div>

          {/* 2. Unified Communications (Bento 4-col) */}
          <div className="md:col-span-4 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 02</span>
                  <h3 className="text-lg font-bold text-white">Multichannel Communications</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                One consolidated inbox uniting WhatsApp Business, Instagram Direct, Facebook Messenger, SMS, and email. Staff reply from a single dashboard.
              </p>

              {/* Channels list */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-medium text-white">WhatsApp Business</span>
                  <span className="text-emerald-400 text-[11px]">Direct API</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-medium text-white">Instagram & Messenger</span>
                  <span className="text-emerald-400 text-[11px]">Meta Sync</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-medium text-white">Corporate Email & Web</span>
                  <span className="text-emerald-400 text-[11px]">IMAP / Webhook</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Zero tab switching between customer social channels.
            </div>
          </div>

          {/* 3. Websites & Digital Infrastructure (Bento 4-col) */}
          <div className="md:col-span-4 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 03</span>
                  <h3 className="text-lg font-bold text-white">Websites & Infrastructure</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Connect your WordPress websites, monitor domains and DNS records, oversee hosting environments, and track health vitals in one screen.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>WordPress Fleet Health</span>
                  <span className="text-white font-medium">Auto-monitoring</span>
                </div>
                <div className="flex justify-between">
                  <span>Domain SSL & Expirations</span>
                  <span className="text-white font-medium">Unified Expiry Alerts</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime & Response Latency</span>
                  <span className="text-emerald-400 font-mono">99.98% avg</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Consolidated digital asset ownership.
            </div>
          </div>

          {/* 4. Bookings & Distribution (Bento 8-col) */}
          <div className="md:col-span-8 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 04</span>
                    <h3 className="text-xl font-bold text-white">Bookings, Reservations & OTA Distribution</h3>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Viator & GYG Ready</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Built to manage tours, activities, executive services, and custom reservations. Designed to synchronize availability with major travel distribution platforms like Viator and GetYourGuide while preserving direct booking capture.
              </p>

              {/* Visual distribution sync map */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white">Direct Booking Engine</div>
                  <div className="text-[11px] text-slate-400">Embed on your WordPress or custom site. Zero OTA commission.</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white">Viator Marketplace</div>
                  <div className="text-[11px] text-slate-400">Synchronized seat quotas & automated booking voucher logging.</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white">GetYourGuide Connectivity</div>
                  <div className="text-[11px] text-slate-400">Live calendar sync to prevent over-allocation during peak season.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Live Capacity Calendars</span>
              <span>·</span>
              <span>Staff & Guide Scheduling</span>
              <span>·</span>
              <span>Automated Confirmation Notices</span>
            </div>
          </div>

          {/* 5. Visual Workflow Automation (Bento 6-col) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 05</span>
                  <h3 className="text-lg font-bold text-white">Workflow Automation Engine</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Connect triggers, conditional business rules, and multi-step actions without code. Automatically dispatch tasks, update deal stages, and trigger notifications when criteria are met.
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono">
                <div className="text-[#38BDF8]">ON event.inbound_lead</div>
                <div className="text-slate-400 pl-3">↳ IF lead.value &gt; $10,000</div>
                <div className="text-emerald-400 pl-6">↳ THEN assign_agent(Marcus) + alert_slack</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Eliminate repetitive coordination across your team.
            </div>
          </div>

          {/* 6. Context-Aware AI Assistants (Bento 6-col) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 06</span>
                  <h3 className="text-lg font-bold text-white">Context-Aware AI Assistants</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                AI agents grounded in your actual business knowledge, rate cards, and previous correspondence. Summarize client threads, find records, and draft accurate customer proposals.
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mandatory Human-in-the-Loop Safeguards</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  No runaway autonomous actions. Sensitive communications require authorized team sign-off before leaving the workspace.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Grounded intelligence with strict organizational oversight.
            </div>
          </div>

          {/* 7. Business Intelligence & Reports (Bento 6-col) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 07</span>
                  <h3 className="text-lg font-bold text-white">Operational & Revenue Intelligence</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Clear reports on response SLAs, channel conversion, team capacity, gross booking volume, and client lifetime retention. Data you can act on without building SQL queries.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] uppercase text-slate-400">Lead Conversion</div>
                  <div className="text-base font-bold text-white mt-0.5">38.4%</div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] uppercase text-slate-400">Avg First Response</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">14 Minutes</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Executive visibility across every active branch.
            </div>
          </div>

          {/* 8. Subscriptions & Expenses Management (Bento 6-col) */}
          <div className="md:col-span-6 rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Pillar 08</span>
                  <h3 className="text-lg font-bold text-white">Subscriptions & Operational Expenses</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Track your software stack expenses, hosting bills, third-party plugin renewals, and recurring subscriptions in one ledger. Audit software spend before auto-renewals trigger.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">SaaS Renewal Calendar</div>
                  <div className="text-[11px] text-slate-400">Alerts prior to unneeded renewals</div>
                </div>
                <span className="text-emerald-400 font-mono text-xs">Active Audit</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              Complete transparency over your digital cost footprint.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
