'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Calendar,
  AlertCircle,
  X,
  Check,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SoftwareSubscription } from '@/lib/workspace-data';

interface SubscriptionsViewProps {
  subscriptions: SoftwareSubscription[];
  onAddSubscription: (sub: SoftwareSubscription) => void;
}

export function SubscriptionsView({ subscriptions, onAddSubscription }: SubscriptionsViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cloud Infrastructure');
  const [cost, setCost] = useState('80');
  const [renewalDate, setRenewalDate] = useState('2026-11-20');

  const totalMonthlyBurn = subscriptions.reduce((sum, s) => sum + s.costMonthly, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAddSubscription({
      id: `sub-${Date.now()}`,
      name,
      category,
      costMonthly: Number(cost) || 0,
      renewalDate,
      billingCycle: 'Monthly',
      status: 'Active',
    });

    setName('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Subscriptions & Operational Cost Consolidation
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              $2,450/mo Saved
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audit recurring SaaS tools, hosting infrastructure, and consolidate fragmented vendor sprawl into DIAMONDS.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-[0_0_15px_rgba(36,137,218,0.3)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Track New Expense</span>
        </button>
      </div>

      {/* Burn Rate & Consolidation Highlight (Genie ERP Box Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="box p-5 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Total Operational Software Overhead
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">
              ${totalMonthlyBurn.toLocaleString()}{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">/ month</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-white/5">
            <span>Audited across {subscriptions.length} active technology vendors</span>
            <span className="text-[#38BDF8] font-mono font-semibold">100% Reconciled</span>
          </div>
        </div>

        <div className="box-highlight p-5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>DIAMONDS ERP Consolidation Savings</span>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
              $2,450 <span className="text-xs font-normal text-slate-300 font-sans">/ month net reduction</span>
            </div>
          </div>
          <div className="text-xs text-slate-300 leading-normal">
            Replaced HubSpot, Zendesk, WP Engine, Zapier, and Bokun with one unified multi-tenant engine.
          </div>
        </div>
      </div>

      {/* Subscriptions Table (Genie ERP High-Density Datatable) */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0A1324] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E1B33] border-b border-[#1E2E4A] text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Service & Provider</th>
                <th className="py-3 px-4">Operational Category</th>
                <th className="py-3 px-4">Monthly Cost</th>
                <th className="py-3 px-4">Next Renewal</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {subscriptions.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{s.name}</td>
                  <td className="py-3 px-4 text-slate-400">{s.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${s.costMonthly} / mo
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{s.renewalDate}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subscription Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A] mb-4">
              <h3 className="text-base font-bold text-white">Track Technology Expense</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Supabase Pro Enterprise"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                >
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Customer Messaging">Customer Messaging / WhatsApp API</option>
                  <option value="AI Intelligence">AI & LLM Services</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Monthly Cost ($)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Renewal Date</label>
                  <input
                    type="date"
                    value={renewalDate}
                    onChange={(e) => setRenewalDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
