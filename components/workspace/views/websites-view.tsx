'use client';

import React, { useState } from 'react';
import { Globe, Plus, CheckCircle, AlertTriangle, ShieldCheck, ExternalLink, X, RefreshCw } from 'lucide-react';
import { WebsiteAsset } from '@/lib/workspace-data';

interface WebsitesViewProps {
  websites: WebsiteAsset[];
  onAddWebsite: (site: WebsiteAsset) => void;
}

export function WebsitesView({ websites, onAddWebsite }: WebsitesViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [domain, setDomain] = useState('');
  const [cms, setCms] = useState<WebsiteAsset['cms']>('WordPress');
  const [hosting, setHosting] = useState('Dedicated Cloud Edge');

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
      setDiagnosticResult('Probed 3 domains across EU/US edges: All SSL certificates valid, 0 DNS propagation delays, average TTFB 142ms.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Websites & Digital Infrastructure
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your WordPress instances, domains, SSL certificates, and hosting health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunDiagnostics}
            disabled={isRunningDiagnostics}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-200 text-xs font-semibold hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningDiagnostics ? 'animate-spin text-[#38BDF8]' : ''}`} />
            <span>{isRunningDiagnostics ? 'Testing Edge Latency...' : 'Run Diagnostics'}</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Website</span>
          </button>
        </div>
      </div>

      {diagnosticResult && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{diagnosticResult}</span>
          </div>
          <button onClick={() => setDiagnosticResult(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Website Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {websites.map((w) => (
          <div
            key={w.id}
            className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#38BDF8]" />
                  {w.domain}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    w.status === 'Healthy'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}
                >
                  {w.status}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>CMS Platform</span>
                  <span className="font-semibold text-white">{w.cms}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Runtime Environment</span>
                  <span className="font-mono text-slate-200">PHP {w.phpVersion}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>SSL Certificate</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Valid ({w.sslExpiryDays}d)
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Monthly Uptime</span>
                  <span className="font-mono text-white">{w.uptime}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate max-w-[180px]">{w.hosting}</span>
              <a
                href={`https://${w.domain}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1"
              >
                <span>Visit</span>
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
          <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Connect Website Asset</h3>
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
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">CMS Type</label>
                <select
                  value={cms}
                  onChange={(e) => setCms(e.target.value as any)}
                  className="w-full px-3 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                >
                  <option value="WordPress">WordPress</option>
                  <option value="WooCommerce">WooCommerce Storefront</option>
                  <option value="Custom">Custom Next.js / Static Site</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Hosting Environment</label>
                <input
                  type="text"
                  value={hosting}
                  onChange={(e) => setHosting(e.target.value)}
                  placeholder="e.g. AWS Cloud Container"
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#38BDF8] text-slate-950 font-bold hover:bg-[#7dd3fc]"
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
