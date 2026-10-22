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
  AlertTriangle,
  Activity,
  Zap,
  Bot,
  Layers,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Customer, Conversation, WebsiteAsset, TourBooking } from '@/lib/workspace-data';

interface OverviewViewProps {
  customers: Customer[];
  conversations: Conversation[];
  websites: WebsiteAsset[];
  bookings: TourBooking[];
  onNavigateTab: (tab: any) => void;
  onApproveDraft: (conversationId: string) => void;
  onSimulateInbound?: (channel: 'whatsapp' | 'instagram' | 'email') => void;
}

export function OverviewView({
  customers,
  conversations,
  websites,
  bookings,
  onNavigateTab,
  onApproveDraft,
  onSimulateInbound,
}: OverviewViewProps) {
  const totalPipeline = customers.reduce((sum, c) => sum + (c.dealValue || 0), 0);
  const totalBookingsValue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Find conversation with pending draft
  const pendingConversation = conversations.find((c) =>
    c.messages.some((m) => m.isAiDraft && !m.isApproved)
  );

  return (
    <div className="space-y-6">
      {/* Genie ERP Top Operational Status Strip */}
      <div className="p-3 rounded-xl bg-[#0A1324] border border-[#1E2E4A] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Genie System Pulse:</span>
            <span className="text-emerald-400 font-mono">100% Operational</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>WhatsApp / IG Gateway:</span>
            <span className="text-white font-medium">Connected</span>
          </div>
          <span className="text-slate-600 hidden md:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Viator OTA Sync:</span>
            <span className="text-white font-medium">Real-time</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Studio Engine:</span>
            <span className="text-[#38BDF8] font-mono">Gemini 3.8 Flash</span>
          </div>
        </div>

        {onSimulateInbound && (
          <button
            onClick={() => onSimulateInbound('whatsapp')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>Trigger Inbound Lead</span>
          </button>
        )}
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Executive Operations Cockpit
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2489DA]/15 text-[#38BDF8] border border-[#2489DA]/30">
              Genie ERP v4.5
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Unified telemetry across CRM pipelines, omnichannel communications, website fleet, and luxury OTA reservations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('crm')}
            className="px-3.5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-[0_0_15px_rgba(36,137,218,0.3)] flex items-center gap-1.5"
          >
            <span>+ New CRM Lead</span>
          </button>
          <button
            onClick={() => onNavigateTab('inbox')}
            className="px-3.5 py-2 rounded-xl bg-[#0E1B33] border border-[#1E2E4A] text-slate-200 font-semibold text-xs hover:border-[#38BDF8]/40 hover:text-white transition-colors"
          >
            Open Inbox ({conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0)})
          </button>
        </div>
      </div>

      {/* 4 Core KPI Metric Cards (Genie ERP Box Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="box p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">CRM Pipeline Value</span>
            <div className="w-8 h-8 rounded-lg bg-[#2489DA]/15 border border-[#2489DA]/30 flex items-center justify-center text-[#38BDF8]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white tracking-tight">
            ${totalPipeline.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
            <span className="text-slate-400">{customers.length} Qualified accounts</span>
            <span className="text-emerald-400 font-mono font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
        </div>

        <div className="box p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Omnichannel Active Threads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white tracking-tight">
            {conversations.length} Active
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
            <span className="text-slate-400">WhatsApp & Instagram</span>
            <span className="text-[#38BDF8] font-mono font-medium">98.2% SLA</span>
          </div>
        </div>

        <div className="box p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Fleet Health & Uptime</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white tracking-tight">
            99.98%
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
            <span className="text-slate-400">{websites.length} Monitored domains</span>
            <span className="text-emerald-400 font-mono font-medium">All SSL OK</span>
          </div>
        </div>

        <div className="box p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Gross Reservations Intake</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono text-white tracking-tight">
            ${totalBookingsValue.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
            <span className="text-slate-400">Viator & Direct luxury</span>
            <span className="text-emerald-400 font-mono font-medium flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +24.1%
            </span>
          </div>
        </div>
      </div>

      {/* Governed AI Proposal Pending Sign-off Banner */}
      {pendingConversation && (
        <div className="box-highlight p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#2489DA]/20 border border-[#2489DA]/40 flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  Governed AI Proposal Awaiting Concierge Sign-Off
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  Human-in-the-Loop
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Gemini 3.8 Flash autonomously prepared an itinerary quote for{' '}
                <strong className="text-white">{pendingConversation.customerName}</strong> via{' '}
                <span className="text-[#38BDF8] uppercase font-mono">{pendingConversation.channel}</span>.
                Review before dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateTab('inbox')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Review in Inbox
            </button>
            <button
              onClick={() => onApproveDraft(pendingConversation.id)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approve & Dispatch</span>
            </button>
          </div>
        </div>
      )}

      {/* Split Bento Grid (Genie ERP Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Omnichannel Live Stream & Revenue Velocity */}
        <div className="lg:col-span-7 space-y-6">
          {/* Omnichannel Live Stream */}
          <div className="box p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                  <span>Real-Time Omnichannel Communications Feed</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Live messaging threads funneled across WhatsApp, Instagram DM, and Direct Web.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('inbox')}
                className="text-xs text-[#38BDF8] hover:text-[#7dd3fc] font-semibold flex items-center gap-1"
              >
                <span>Full Inbox</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {conversations.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigateTab('inbox')}
                  className="p-3 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] hover:border-[#38BDF8]/40 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {c.customerName.charAt(0)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white group-hover:text-[#38BDF8] transition-colors truncate">
                          {c.customerName}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                          {c.channel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {c.lastMessage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">{c.lastMessageTime}</span>
                    {c.unreadCount ? (
                      <span className="w-5 h-5 rounded-full bg-[#2489DA] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        {c.unreadCount}
                      </span>
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Velocity Breakdown */}
          <div className="box p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Channel Intake & Velocity Breakdown</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Consolidated revenue stream across luxury private charters, villa concierge, and OTA distribution.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">+$124.8k this quarter</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Direct VIP</div>
                <div className="text-base font-black font-mono text-white mt-1">$142,500</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">62% share</div>
              </div>
              <div className="p-3 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Viator OTA</div>
                <div className="text-base font-black font-mono text-white mt-1">$58,200</div>
                <div className="text-[10px] text-[#38BDF8] font-mono mt-0.5">26% share</div>
              </div>
              <div className="p-3 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Partner OTA</div>
                <div className="text-base font-black font-mono text-white mt-1">$27,300</div>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5">12% share</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fleet Console & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Digital Assets Fleet Console */}
          <div className="box p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>WordPress & Digital Assets Fleet</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Multi-brand web presence under centralized management.
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('websites')}
                className="text-xs text-[#38BDF8] hover:text-[#7dd3fc] font-semibold flex items-center gap-1"
              >
                <span>Console</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {websites.map((w) => (
                <div
                  key={w.id}
                  className="p-2.5 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] flex items-center justify-between text-xs"
                >
                  <div className="truncate">
                    <div className="font-semibold text-white truncate">{w.domain}</div>
                    <div className="text-[10px] text-slate-400">{w.cms} • PHP {w.phpVersion} • SSL Valid</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                      {w.uptime}%
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Workflows Activity Ledger */}
          <div className="box p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Autonomous AI Agent Runs</span>
              </h2>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/40 px-1.5 py-0.5 rounded">
                Autonomous
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-white">VIP Inbound Sentiment Router</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Success</span>
                </div>
                <p className="text-[10px] text-slate-400">Classified inquiry from Elena Rostova as High-Ticket Yacht Charter.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-white">OTA Dual-Calendar Real-Time Sync</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Success</span>
                </div>
                <p className="text-[10px] text-slate-400">Synced 2 booking slots across Viator and Direct Portal with 0 conflicts.</p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('workflows')}
              className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors text-center border border-white/5"
            >
              Open AI Studio Automations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
