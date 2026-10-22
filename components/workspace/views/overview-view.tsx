'use client';

import React from 'react';
import {
  TrendingUp,
  MessageSquare,
  Globe,
  CreditCard,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { Customer, Conversation, WebsiteAsset, TourBooking } from '@/lib/workspace-data';

interface OverviewViewProps {
  customers: Customer[];
  conversations: Conversation[];
  websites: WebsiteAsset[];
  bookings: TourBooking[];
  onNavigateTab: (tab: any) => void;
  onApproveDraft: (conversationId: string) => void;
}

export function OverviewView({
  customers,
  conversations,
  websites,
  bookings,
  onNavigateTab,
  onApproveDraft,
}: OverviewViewProps) {
  const totalPipeline = customers.reduce((sum, c) => sum + (c.dealValue || 0), 0);
  const totalBookingsValue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Find conversation with pending draft
  const pendingConversation = conversations.find((c) =>
    c.messages.some((m) => m.isAiDraft && !m.isApproved)
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Executive Operations Pulse
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time workspace telemetry across CRM, communications, websites, and reservations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('crm')}
            className="px-3 py-1.5 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
          >
            New Customer Record
          </button>
        </div>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>CRM Pipeline Value</span>
            <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            ${totalPipeline.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Across {customers.length} qualified opportunities
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Conversations</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {conversations.length} Threads
          </div>
          <div className="text-[11px] text-emerald-400">
            WhatsApp & Email channels active
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Infrastructure Health</span>
            <Globe className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            99.98%
          </div>
          <div className="text-[11px] text-slate-400">
            {websites.length} WordPress sites monitored
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Gross Bookings Intake</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            ${totalBookingsValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            Viator & Direct channels synced
          </div>
        </div>
      </div>

      {/* Governed AI Draft Pending Sign-off Banner */}
      {pendingConversation && (
        <div className="p-5 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Action Required: AI Proposal Draft Awaiting Human Authorization
                </span>
                <span className="text-xs text-slate-300">
                  Customer: <strong className="text-white">{pendingConversation.customerName}</strong> · WhatsApp Business Inbound
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateTab('inbox')}
                className="px-3 py-1.5 rounded-lg border border-white/15 text-xs text-slate-200 hover:bg-white/10 transition-colors"
              >
                Inspect in Inbox
              </button>
              <button
                onClick={() => onApproveDraft(pendingConversation.id)}
                className="px-4 py-1.5 rounded-lg bg-[#38BDF8] text-slate-950 text-xs font-bold hover:bg-[#7dd3fc] transition-colors flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Authorize & Send</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-300 italic pl-7 border-l-2 border-[#38BDF8]/40">
            &ldquo;{pendingConversation.messages.find((m) => m.isAiDraft)?.content}&rdquo;
          </p>
        </div>
      )}

      {/* Split Operations Grid: Pipeline & Website Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Sales Pipeline */}
        <div className="lg:col-span-7 rounded-xl bg-white/[0.02] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              High-Priority Pipeline Opportunities
            </h2>
            <button
              onClick={() => onNavigateTab('crm')}
              className="text-xs text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              <span>View All CRM</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {customers.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{c.fullName}</div>
                  <div className="text-[11px] text-slate-400">{c.company} · {c.source}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-white">${c.dealValue.toLocaleString()}</div>
                  <div className="text-[10px] text-[#38BDF8]">{c.dealStage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Digital Infrastructure & OTA Distribution */}
        <div className="lg:col-span-5 rounded-xl bg-white/[0.02] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Connected Channels & Sites
            </h2>
            <button
              onClick={() => onNavigateTab('websites')}
              className="text-xs text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {websites.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{w.domain}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {w.uptime}% Uptime
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{w.cms} · PHP {w.phpVersion}</span>
                  <span>SSL: {w.sslExpiryDays}d left</span>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-[11px] text-slate-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                OTA Distribution Sync
              </div>
              <div>Viator Marketplace: 12 tours synced & availability locked.</div>
              <div>GetYourGuide Partner: 8 active tours mapped to direct calendar.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
