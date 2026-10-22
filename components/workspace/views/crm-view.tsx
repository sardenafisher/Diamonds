'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  DollarSign,
  Tag,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Customer } from '@/lib/workspace-data';

interface CrmViewProps {
  customers: Customer[];
  onAddCustomer: (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => void;
  onOpenInboxForCustomer: (customerId: string) => void;
}

export function CrmView({ customers, onAddCustomer, onOpenInboxForCustomer }: CrmViewProps) {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [aiDossier, setAiDossier] = useState<string | null>(null);
  const [aiBriefLoading, setAiBriefLoading] = useState(false);

  // Form states for Add Customer
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [source, setSource] = useState<Customer['source']>('WhatsApp');
  const [tier, setTier] = useState<Customer['tier']>('VIP');
  const [dealValue, setDealValue] = useState('15000');
  const [dealStage, setDealStage] = useState<Customer['dealStage']>('Proposal');
  const [notes, setNotes] = useState('');

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchStage = stageFilter === 'all' || c.dealStage === stageFilter;
      const matchSearch =
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());
      return matchStage && matchSearch;
    });
  }, [customers, search, stageFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    onAddCustomer({
      fullName,
      email,
      phone: phone || '+1 (555) 000-0000',
      company: company || 'Private Client',
      source,
      tier,
      lifetimeValue: Number(dealValue) || 0,
      dealStage,
      dealValue: Number(dealValue) || 0,
      assignedAgent: 'Marcus Vance',
      notes: notes || 'Lead captured via DIAMONDS CRM interface.',
    });

    // Reset and close
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setDealValue('15000');
    setNotes('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Customer Relationships & Sales Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage customer records, lifetime value attribution, and active sales deals.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer Record</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
          {['all', 'New Lead', 'Discovery', 'Proposal', 'Negotiation', 'Won'].map((stage) => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                stageFilter === stage
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {stage === 'all' ? 'All Stages' : stage}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or company..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101B] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Customer & Company</th>
                <th className="py-3 px-4">Channel Source</th>
                <th className="py-3 px-4">Client Tier</th>
                <th className="py-3 px-4">Deal Stage</th>
                <th className="py-3 px-4">Opportunity Value</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{c.fullName}</div>
                    <div className="text-[11px] text-slate-400">{c.company}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-300 font-mono text-[11px]">{c.source}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        c.tier === 'VIP'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          : c.tier === 'Preferred'
                          ? 'bg-sky-950/60 text-sky-300 border border-sky-800/40'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-200 font-medium">{c.dealStage}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${c.dealValue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenInboxForCustomer(c.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Chat</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-400">
            No customers match the current filter or search criteria.
          </div>
        )}
      </div>

      {/* Customer 360 Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-[#0B101B] border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#38BDF8]">
                  Customer 360 Profile
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCustomer.fullName}</h2>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Building className="w-3.5 h-3.5" />
                <span>{selectedCustomer.company}</span>
                <span>·</span>
                <span>{selectedCustomer.tier} Client</span>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{selectedCustomer.phone}</span>
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Opportunity</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">
                  ${selectedCustomer.dealValue.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#38BDF8]">{selectedCustomer.dealStage}</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Historical Lifetime Value</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                  ${selectedCustomer.lifetimeValue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Verified receipts</div>
              </div>
            </div>

            {/* AI Executive Intelligence Dossier */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#38BDF8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gemini Customer Intelligence
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    if (!selectedCustomer) return;
                    setAiBriefLoading(true);
                    try {
                      const res = await fetch('/api/ai/summarize-customer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ customer: selectedCustomer }),
                      });
                      const data = await res.json();
                      if (data.summary) setAiDossier(data.summary);
                    } catch (e) {
                      console.error('Failed to summarize:', e);
                    } finally {
                      setAiBriefLoading(false);
                    }
                  }}
                  disabled={aiBriefLoading}
                  className="text-[11px] text-[#38BDF8] hover:underline disabled:opacity-40"
                >
                  {aiBriefLoading ? 'Analyzing...' : aiDossier ? 'Refresh Brief' : 'Generate Brief'}
                </button>
              </div>

              {aiDossier ? (
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-black/40 p-2.5 rounded-lg border border-white/5">
                  {aiDossier}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Generate an AI client relationship summary and tactical follow-up recommendation.
                </p>
              )}
            </div>

            {/* Account Notes */}
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-slate-300 uppercase text-[10px] tracking-wider">
                Operational Notes
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300 leading-relaxed">
                {selectedCustomer.notes}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => {
                const id = selectedCustomer.id;
                setSelectedCustomer(null);
                setAiDossier(null);
                onOpenInboxForCustomer(id);
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open Customer Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Add New Customer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Create New Customer Record</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Matteo Bellini"
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Bellini Capital"
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="matteo@bellini.it"
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 340 1234567"
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Channel</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Web Form">Web Form</option>
                    <option value="Email">Email</option>
                    <option value="Viator">Viator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Client Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Preferred">Preferred</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stage</label>
                  <select
                    value={dealStage}
                    onChange={(e) => setDealStage(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Discovery">Discovery</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Estimated Deal Value ($ USD)</label>
                <input
                  type="number"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Operational Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Itinerary requirements, party size, custom preferences..."
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
