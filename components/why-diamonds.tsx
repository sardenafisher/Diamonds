'use client';

import React from 'react';
import { Layout, SlidersHorizontal, Eye, GitMerge, Puzzle, TrendingUp } from 'lucide-react';

export function WhyDiamonds() {
  const pillars = [
    {
      title: 'One Organized Workspace',
      description:
        'Instead of maintaining multiple browser tabs, disconnected logins, and disjointed team communication channels, your staff operates within a single coordinated surface.',
      icon: Layout,
    },
    {
      title: 'Reduced Manual Repetition',
      description:
        'Information captured from an initial inquiry flows directly into CRM opportunities, team assignments, and fulfillment workflows without repeated copy-pasting.',
      icon: SlidersHorizontal,
    },
    {
      title: 'End-to-End Operational Visibility',
      description:
        'Business owners and department managers can review active inquiries, deal progress, website uptime, and team response times without asking for manual status reports.',
      icon: Eye,
    },
    {
      title: 'Connected Business Lifecycles',
      description:
        'Sales opportunities, customer messaging histories, booking dates, and website assets remain linked to the same customer record throughout their lifecycle.',
      icon: GitMerge,
    },
    {
      title: 'Flexible, Pragmatic Connectivity',
      description:
        'Built to work alongside the industry tools your team already relies on—from WhatsApp and WordPress to Viator and Google Workspace—rather than forcing a painful rip-and-replace.',
      icon: Puzzle,
    },
    {
      title: 'Architected to Expand With Your Team',
      description:
        'Designed from the ground up with modular architecture, role-based permissions, and multi-tenant isolation, allowing your platform to scale as your operations expand.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="why-diamonds" className="py-24 sm:py-32 bg-[#070A10] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            Core Architectural Principles
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Designed for businesses that demand cohesion, not another disconnected tool.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every feature in DIAMONDS is engineered around operational clarity and practical execution. Here is why businesses choose a unified system.
          </p>
        </div>

        {/* 6-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-[#38BDF8]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span>Platform Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
