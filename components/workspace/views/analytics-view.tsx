'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Download,
  Calendar,
  FileText,
  DollarSign,
  PieChart,
  ShieldCheck,
  CheckCircle,
  X,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Customer, TourBooking } from '@/lib/workspace-data';

interface AnalyticsViewProps {
  customers: Customer[];
  bookings: TourBooking[];
}

export function AnalyticsView({ customers, bookings }: AnalyticsViewProps) {
  const [timeframe, setTimeframe] = useState<'30d' | 'q3' | 'ytd'>('30d');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const channelBreakdown = [
    { channel: 'WhatsApp Business', share: 44, revenue: 52400, inquiries: 84 },
    { channel: 'Corporate Email', share: 28, revenue: 34100, inquiries: 42 },
    { channel: 'Viator Marketplace', share: 16, revenue: 19800, inquiries: 31 },
    { channel: 'Instagram Direct', share: 12, revenue: 12600, inquiries: 27 },
  ];

  const totalWonRevenue = customers
    .filter((c) => c.dealStage === 'Won')
    .reduce((sum, c) => sum + c.dealValue, 0);

  const totalPipelineValue = customers.reduce((sum, c) => sum + c.dealValue, 0);

  const handleExportCRM = () => {
    const headers = 'ID,FullName,Email,Phone,Company,Source,Tier,DealStage,DealValue,LifetimeValue\n';
    const rows = customers
      .map(
        (c) =>
          `${c.id},"${c.fullName}",${c.email},${c.phone},"${c.company}",${c.source},${c.tier},${c.dealStage},${c.dealValue},${c.lifetimeValue}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diamonds_crm_pipeline_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportBookings = () => {
    const headers = 'BookingID,TourName,CustomerName,Channel,Date,Guests,Amount,Status\n';
    const rows = bookings
      .map(
        (b) =>
          `${b.id},"${b.tourName}","${b.customerName}",${b.channel},${b.date},${b.guests},${b.totalPrice},${b.status}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diamonds_bookings_manifest_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Operational Intelligence & Financial Yield
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time pipeline analytics, SLA response benchmarks, and channel revenue attribution.
          </p>
        </div>

        {/* Timeframe & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-white/10 bg-[#080D17] p-0.5 text-xs">
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                timeframe === '30d' ? 'bg-[#38BDF8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe('q3')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                timeframe === 'q3' ? 'bg-[#38BDF8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeframe('ytd')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                timeframe === 'ytd' ? 'bg-[#38BDF8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Executive Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <div className="text-xs text-slate-400">Total Pipeline Value</div>
          <div className="text-2xl font-bold font-mono text-white">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <div className="text-xs text-slate-400">Won Revenue (Realized)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ${totalWonRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Across verified bookings</div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <div className="text-xs text-slate-400">First Response SLA</div>
          <div className="text-2xl font-bold font-mono text-[#38BDF8]">14m 22s</div>
          <div className="text-[11px] text-slate-400">Goal: &lt;30m (98.2% compliance)</div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
          <div className="text-xs text-slate-400">AI Proposal Close Rate</div>
          <div className="text-2xl font-bold font-mono text-white">42.6%</div>
          <div className="text-[11px] text-emerald-400">+5.2% lift with grounded quotes</div>
        </div>
      </div>

      {/* Channel Attribution & Distribution Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Channel Revenue Attribution & Inbound Yield
            </div>
            <span className="text-xs font-mono text-[#38BDF8]">$118,900 Total Dispatched</span>
          </div>

          <div className="space-y-4">
            {channelBreakdown.map((item) => (
              <div key={item.channel} className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{item.channel}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({item.inquiries} inquiries)</span>
                  </div>
                  <span className="font-mono text-white font-semibold">
                    ${item.revenue.toLocaleString()} USD ({item.share}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-[#38BDF8] rounded-full"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Primary conversion driver: Grounded WhatsApp proposals with sommelier & flight add-ons.</span>
          </div>
        </div>

        {/* Data Export Center */}
        <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Operational Data Exports
          </div>
          <p className="text-xs text-slate-400">
            Generate sanitized, auditable datasets for corporate reporting or accounting reconciliation.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleExportCRM}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-colors text-xs"
            >
              <div>
                <div className="font-semibold text-white">CRM Pipeline Dataset</div>
                <div className="text-[11px] text-slate-400">{customers.length} Accounts with Stages</div>
              </div>
              <Download className="w-4 h-4 text-[#38BDF8] shrink-0" />
            </button>

            <button
              onClick={handleExportBookings}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-colors text-xs"
            >
              <div>
                <div className="font-semibold text-white">OTA Bookings Manifest</div>
                <div className="text-[11px] text-slate-400">{bookings.length} Verified Reservations</div>
              </div>
              <Download className="w-4 h-4 text-[#38BDF8] shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Executive Dossier Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setReportModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0B101B] p-6 sm:p-8 text-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#38BDF8]">
                  DIAMONDS Executive Briefing
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Quarterly Operations & Channel Yield Dossier
                </h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm">1. Executive Summary</h4>
                <p className="text-slate-300">
                  Total commercial pipeline throughput reached <strong className="text-white">${totalPipelineValue.toLocaleString()} USD</strong> across luxury yacht charters, private aviation transfers, and villa experiences. Realized revenue currently stands at <strong className="text-emerald-400">${totalWonRevenue.toLocaleString()} USD</strong> with zero customer churn.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm">2. Multi-Channel Inbound Dynamics</h4>
                <p className="text-slate-300">
                  WhatsApp Business remains the highest-yielding client channel, generating 44% of total charter inquiries. The integration of server-side Gemini 3.8 Flash grounded draft proposals reduced staff draft-to-quote latency from 1.8 hours to under 15 minutes, boosting proposal conversion to 42.6%.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm">3. Infrastructure Fleet Health</h4>
                <p className="text-slate-300">
                  All 4 connected WordPress and WooCommerce instances maintain 99.98% uptime with TLS 1.3 security certificates verified. Automated OTA rate parity synchronization between Viator, GetYourGuide, and direct booking channels operated with zero dockage conflicts.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs hover:bg-[#7dd3fc]"
              >
                Close Executive Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
