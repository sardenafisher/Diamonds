'use client';

import React from 'react';
import { Layers, MessageSquareDashed, ArrowRightLeft, AlertCircle, Clock, Link2Off, Receipt } from 'lucide-react';

export function ProblemSection() {
  const painPoints = [
    {
      title: 'Conversations Scattered Across Islands',
      description:
        'Leads arrive through WhatsApp, direct emails, Instagram DMs, web chat, and phone calls. Crucial context is lost between separate inboxes, forcing teams to piece together customer history from memory.',
      icon: MessageSquareDashed,
      cost: 'Lost context & slow customer response time',
    },
    {
      title: 'The Manual Re-Entry Penalty',
      description:
        'When a customer commits, staff re-type the exact same names, dates, addresses, and transaction amounts across reservation sheets, accounting tools, and project management boards.',
      icon: ArrowRightLeft,
      cost: 'Typographical errors & hours wasted weekly',
    },
    {
      title: 'Missed Follow-ups & Slipped Pipeline Deals',
      description:
        'High-intent inquiries sit without systematic task queues. Because customer interest is not anchored to a living CRM record with reminders, lucrative opportunities go cold.',
      icon: Clock,
      cost: 'Silent revenue leakage on warm inbound leads',
    },
    {
      title: 'Websites & Digital Infrastructure in Silos',
      description:
        'Company websites, WordPress plugins, domains, and hosting environments exist in separate accounts. Simple updates or uptime issues require juggling passwords and multiple vendor panels.',
      icon: Link2Off,
      cost: 'Fragmented credentials & technical vulnerability',
    },
    {
      title: 'Blind Spots in Recurring Overhead',
      description:
        'Dozens of standalone SaaS tools, plugin licenses, hosting tiers, and marketing subscriptions renew automatically across different credit cards without consolidated visibility into real operating expenses.',
      icon: Receipt,
      cost: 'Unchecked subscription sprawl & hidden costs',
    },
    {
      title: 'Disconnected Marketplace Distribution',
      description:
        'For travel and activity operators, managing availability manually across Viator, GetYourGuide, and direct bookings invites double-booking risks and constant administrative friction.',
      icon: Layers,
      cost: 'Risk of double-bookings & inventory desynchronization',
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            The Fragmentation Tax
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Managing a modern business across ten disconnected tools is quietly draining your team.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            When customer conversations, websites, sales pipelines, reservations, and billing exist in separate silos, your team becomes the glue—spending hours moving data by hand instead of growing the business.
          </p>
        </div>

        {/* Editorial Layout: Asymmetric Two-Column Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/30 transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-slate-400 shrink-0">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-rose-400/90 uppercase tracking-wider text-[10px]">
                        Business Consequence
                      </span>
                      <span>·</span>
                      <span className="text-slate-300">{item.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Thesis Statement */}
        <div className="mt-16 p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
              The DIAMONDS Proposition
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instead of forcing you to build custom integrations or switch tabs all day, DIAMONDS provides a single unified foundation where customer communication, web operations, bookings, and governed workflows converge.
            </p>
          </div>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38BDF8] hover:text-[#7dd3fc] whitespace-nowrap transition-colors"
          >
            <span>See how it connects</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
