'use client';

import React, { useState } from 'react';
import {
  Globe,
  Plus,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  X,
  RefreshCw,
  Activity,
  Server,
  Cpu,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { WebsiteAsset } from '@/lib/workspace-data';

interface WebsitesViewProps {
  websites: WebsiteAsset[];
  onAddWebsite: (site: WebsiteAsset) => void;
}

export function WebsitesView({ websites, onAddWebsite }: WebsitesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [cms, setCms] = useState<WebsiteAsset['cms']>('WordPress');
  const [hosting, setHosting] = useState('AWS Cloud Enterprise');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    onAddWebsite({
      id: `web-${Date.now()}`,
      domain,
      cms,
      phpVersion: '8.3',
      sslValid: true,
      sslExpiryDays: 365,
      uptime: 100.0,
      hosting,
      status: 'Healthy',
    });
    setDomain('');
    setModalOpen(false);
  };

  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);
    setDiagnosticResult(null);
    setTimeout(() => {
      setIsRunningDiagnostics(false);
      setDiagnosticResult(
        `Genie Prober checked ${websites.length} production domains across EU/US edges: All SSL certificates valid, 0 DNS propagation delays, average TTFB 142ms.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Fleet Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Websites & Digital Infrastructure Fleet
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              100% Uptime
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise fleet monitoring for WordPress, Headless Next.js, SSL certificates, and Cloud Edge CDNs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunDiagnostics}
            disabled={isRunningDiagnostics}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] text-slate-200 text-xs font-semibold hover:border-[#38BDF8]/40 hover:text-white transition-colors disabled:opacity-40"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRunningDiagnostics ? 'animate-spin text-[#38BDF8]' : 'text-slate-400'}`}
            />
            <span>{isRunningDiagnostics ? 'Probing Edges...' : 'Run Diagnostics'}</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-[0_0_15px_rgba(36,137,218,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Website</span>
          </button>
        </div>
      </div>

      {diagnosticResult && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{diagnosticResult}</span>
          </div>
          <button onClick={() => setDiagnosticResult(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* 3 Fleet Telemetry Cards (Genie ERP Box Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="box p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Monitored Domains</span>
            <Globe className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{websites.length} Active</div>
          <div className="text-[11px] text-slate-400">WordPress & Next.js Headless</div>
        </div>

        <div className="box p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">SSL Security Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">100% Valid</div>
          <div className="text-[11px] text-slate-400">Auto-renewing TLS 1.3 certs</div>
        </div>

        <div className="box p-4 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-slate-300">Global Edge Latency</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">142 ms</div>
          <div className="text-[11px] text-emerald-400 font-mono">0ms downtime in last 30d</div>
        </div>
      </div>

      {/* Website Asset Cards (Genie ERP Box Grids) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {websites.map((w) => (
          <div
            key={w.id}
            className="box p-5 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white flex items-center gap-2 group-hover:text-[#38BDF8] transition-colors">
                  <Globe className="w-4 h-4 text-[#38BDF8]" />
                  {w.domain}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    w.status === 'Healthy'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {w.status}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#070E1A]/60 border border-[#1E2E4A] space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">CMS Framework</span>
                  <span className="font-semibold text-white">{w.cms}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">PHP Core Runtime</span>
                  <span className="font-mono text-slate-200">PHP {w.phpVersion}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">SSL Certificate</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Valid ({w.sslExpiryDays}d)
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Monthly Uptime</span>
                  <span className="font-mono text-white font-bold">{w.uptime}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate max-w-[180px] text-slate-400 font-mono text-[10px]">
                {w.hosting}
              </span>
              <a
                href={`https://${w.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#38BDF8] hover:text-[#7dd3fc] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Visit Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Website Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A] mb-4">
              <h3 className="text-base font-bold text-white">Connect Website Asset</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Domain Name</label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. amalfi-retreats.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">CMS Platform</label>
                <select
                  value={cms}
                  onChange={(e) => setCms(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                >
                  <option value="WordPress">WordPress Enterprise</option>
                  <option value="WooCommerce">WooCommerce Luxury Store</option>
                  <option value="Custom">Headless Next.js / Static Site</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Hosting Environment</label>
                <input
                  type="text"
                  value={hosting}
                  onChange={(e) => setHosting(e.target.value)}
                  placeholder="e.g. AWS Cloud Container"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="pt-3 border-t border-[#1E2E4A] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2489DA] text-white font-bold hover:bg-[#38BDF8] hover:text-slate-950 transition-colors"
                >
                  Connect Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
