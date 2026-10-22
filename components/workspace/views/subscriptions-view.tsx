'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Calendar, AlertCircle, X, Check } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Subscriptions & Operational Expenses
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit recurring SaaS tools, hosting containers, and software licenses in one ledger.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Expense</span>
        </button>
      </div>

      {/* Burn Rate Highlight */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Total Operational Software Overhead
          </span>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">
            ${totalMonthlyBurn.toLocaleString()} <span className="text-xs font-normal text-slate-400 font-sans">/ month</span>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          Audited across {subscriptions.length} active technology vendors
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101B] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Service & Provider</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Monthly Cost</th>
                <th className="py-3 px-4">Next Renewal</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subscriptions.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">{s.name}</td>
                  <td className="py-3 px-4 text-slate-400">{s.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${s.costMonthly} / mo
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{s.renewalDate}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-medium">{s.status}</span>
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
          <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Track Recurring Subscription</h3>
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
                  placeholder="e.g. Stripe Radar / SendGrid"
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Monthly Cost ($ USD)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Renewal Date</label>
                  <input
                    type="date"
                    value={renewalDate}
                    onChange={(e) => setRenewalDate(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  />
                </div>
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
