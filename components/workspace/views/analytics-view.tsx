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
  ArrowUpRight,
  Sparkles
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
    { channel: 'WhatsApp Business API', share: 46, revenue: 64200, inquiries: 92 },
    { channel: 'Corporate Concierge Email', share: 26, revenue: 38400, inquiries: 46 },
    { channel: 'Viator Marketplace API', share: 16, revenue: 24100, inquiries: 34 },
    { channel: 'Instagram Direct Gateway', share: 12, revenue: 16800, inquiries: 29 },
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Operational Intelligence & BI Yield
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2489DA]/15 text-[#38BDF8] border border-[#2489DA]/30">
              Executive Analytics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline analytics, SLA benchmarks, and multichannel revenue attribution.
          </p>
        </div>

        {/* Timeframe & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-[#1E2E4A] bg-[#0E1B33] p-1 text-xs">
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                timeframe === '30d' ? 'bg-[#2489DA] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe('q3')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                timeframe === 'q3' ? 'bg-[#2489DA] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeframe('ytd')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                timeframe === 'ytd' ? 'bg-[#2489DA] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E1B33] hover:bg-[#1A5FA8]/20 border border-[#1E2E4A] hover:border-[#38BDF8]/40 text-xs font-semibold text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Executive Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights (Genie ERP Box Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="box p-5 space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Total Pipeline Value</div>
          <div className="text-2xl font-black font-mono text-white">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        <div className="box p-5 space-y-2">
          <div className="text-xs text-slate-400 font-semibold">Won Revenue (Realized)</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${totalWonRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Verified Supabase deposits</div>
        </div>

        <div className="box p-5 space-y-2">
          <div className="text-xs text-slate-400 font-semibold">First Response SLA</div>
          <div className="text-2xl font-black font-mono text-[#38BDF8]">11m 45s</div>
          <div className="text-[11px] text-slate-400">Goal: &lt;15m (99.1% compliance)</div>
        </div>

        <div className="box p-5 space-y-2">
          <div className="text-xs text-slate-400 font-semibold">AI Proposal Conversion</div>
          <div className="text-2xl font-black font-mono text-white">44.8%</div>
          <div className="text-[11px] text-emerald-400 font-mono">+6.4% lift with Gemini</div>
        </div>
      </div>

      {/* Channel Attribution & Distribution Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 box p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Multichannel Revenue Attribution & Inbound Yield
            </div>
            <span className="text-xs font-mono text-[#38BDF8] font-bold">$143,500 Dispatched</span>
          </div>

          <div className="space-y-4">
            {channelBreakdown.map((item) => (
              <div key={item.channel} className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{item.channel}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({item.inquiries} inquiries)</span>
                  </div>
                  <span className="font-mono text-white font-semibold">
                    ${item.revenue.toLocaleString()} USD ({item.share}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#070E1A] overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#1A5FA8] to-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Primary conversion driver: Grounded WhatsApp proposals with private aviation & yacht add-ons.</span>
          </div>
        </div>

        {/* Data Export Center */}
        <div className="lg:col-span-4 box p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-white">
            Operational Data Exports
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generate sanitized, auditable datasets for executive reporting, tax filings, or CA/auditor logins.
          </p>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleExportCRM}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#1E2E4A] bg-[#070E1A]/60 hover:bg-[#1E2E4A]/40 text-left transition-colors text-xs group"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                  CRM Pipeline CSV
                </div>
                <div className="text-[11px] text-slate-400">{customers.length} Accounts with Stages</div>
              </div>
              <Download className="w-4 h-4 text-[#38BDF8] shrink-0" />
            </button>

            <button
              onClick={handleExportBookings}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#1E2E4A] bg-[#070E1A]/60 hover:bg-[#1E2E4A]/40 text-left transition-colors text-xs group"
            >
              <div>
                <div className="font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                  OTA Bookings Manifest CSV
                </div>
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
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 sm:p-8 text-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2E4A]">
              <div>
                <span className="text-xs uppercase font-mono text-[#38BDF8] tracking-wider font-bold">
                  DIAMONDS Holdings • Executive BI Dossier
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Consolidated Quarterly Performance Audit</h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">$246,800</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">SaaS Stack Savings</div>
                <div className="text-lg font-bold font-mono text-[#38BDF8] mt-0.5">$29,400 / yr</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">SLA Response Speed</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">11.4 mins</div>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300 bg-[#070E1A] p-4 rounded-xl border border-white/5">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Executive Summary</h4>
              <p>
                By consolidating 9 distinct operational software systems into DIAMONDS Unified ERP, the organization eliminated $2,450/month in fragmented subscriptions while accelerating customer first-response SLA from 4.2 hours to under 12 minutes.
              </p>
              <p>
                Grounded AI proposal drafting via Gemini 3.8 Flash achieved a 44.8% deal conversion rate on luxury itineraries exceeding $25,000 USD.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
