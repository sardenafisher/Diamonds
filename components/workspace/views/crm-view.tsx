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
  Sparkles,
  Kanban,
  List,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Customer } from '@/lib/workspace-data';

interface CrmViewProps {
  customers: Customer[];
  onAddCustomer: (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => void;
  onOpenInboxForCustomer: (customerId: string) => void;
}

export function CrmView({ customers, onAddCustomer, onOpenInboxForCustomer }: CrmViewProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
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
  const [dealValue, setDealValue] = useState('25000');
  const [dealStage, setDealStage] = useState<Customer['dealStage']>('Proposal');
  const [notes, setNotes] = useState('');

  const stages: Customer['dealStage'][] = ['New Lead', 'Discovery', 'Proposal', 'Negotiation', 'Won'];

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

  const totalValue = customers.reduce((sum, c) => sum + (c.dealValue || 0), 0);

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
      assignedAgent: 'Executive Concierge',
      notes: notes || 'Lead captured via DIAMONDS CRM interface.',
    });

    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setDealValue('25000');
    setNotes('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Customer Relationships & Sales Pipeline
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2489DA]/15 text-[#38BDF8] border border-[#2489DA]/30">
              ${totalValue.toLocaleString()} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Genie-powered lead pipeline, luxury deal stages, and real-time client lifetime value attribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-[#0E1B33] border border-[#1E2E4A] rounded-xl text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-[#2489DA] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#2489DA] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-[0_0_15px_rgba(36,137,218,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Customer Deal</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl bg-[#0A1324] border border-[#1E2E4A] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
          {['all', 'New Lead', 'Discovery', 'Proposal', 'Negotiation', 'Won'].map((stage) => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                stageFilter === stage
                  ? 'bg-[#1A5FA8] text-white font-bold shadow-sm'
                  : 'bg-[#0E1B33] text-slate-400 hover:text-white border border-[#1E2E4A]'
              }`}
            >
              {stage === 'all' ? `All Opportunities (${customers.length})` : stage}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals, clients, or company..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#070E1A] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
          />
        </div>
      </div>

      {/* KANBAN VIEW (Genie ERP Pipeline Flow) */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageCustomers = filtered.filter((c) => c.dealStage === stage);
            const stageSum = stageCustomers.reduce((acc, c) => acc + (c.dealValue || 0), 0);

            return (
              <div
                key={stage}
                className="rounded-xl border border-[#1E2E4A] bg-[#0A1324]/80 p-3 flex flex-col min-h-[460px]"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A] mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-white">{stage}</h3>
                    <div className="text-[10px] font-mono text-[#38BDF8] mt-0.5">
                      ${stageSum.toLocaleString()}
                    </div>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-[#0E1B33] border border-[#1E2E4A] text-[10px] font-mono text-slate-300 flex items-center justify-center font-bold">
                    {stageCustomers.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageCustomers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className="p-3.5 rounded-xl bg-[#0E1B33]/80 border border-[#1E2E4A] hover:border-[#38BDF8]/50 transition-all cursor-pointer shadow-md group relative"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
                          {c.fullName}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                            c.tier === 'VIP'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                              : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                          }`}
                        >
                          {c.tier}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 truncate mb-2">
                        {c.company}
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5">
                        <div className="font-mono font-bold text-white text-xs">
                          ${c.dealValue.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase bg-white/5 px-1.5 py-0.2 rounded border border-white/5">
                          {c.source}
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageCustomers.length === 0 && (
                    <div className="h-32 border border-dashed border-[#1E2E4A]/60 rounded-xl flex items-center justify-center text-[11px] text-slate-500">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW (High-Density Datatable) */
        <div className="rounded-xl border border-[#1E2E4A] bg-[#0A1324] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E1B33] border-b border-[#1E2E4A] text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Client & Entity</th>
                  <th className="py-3 px-4">Channel Gateway</th>
                  <th className="py-3 px-4">Tier Badge</th>
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4">Deal Valuation</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E4A]/60">
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
                      <span className="text-slate-300 font-mono text-[11px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {c.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          c.tier === 'VIP'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2489DA]/15 hover:bg-[#2489DA]/30 text-[#38BDF8] border border-[#2489DA]/30 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer 360 Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#0A1324] border-l border-[#1E2E4A] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2E4A]">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#38BDF8] font-bold">
                  Customer 360 Dossier
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{selectedCustomer.fullName}</h2>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{selectedCustomer.company}</span>
                <span>•</span>
                <span className="text-amber-300 font-semibold">{selectedCustomer.tier} Client</span>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="p-4 rounded-xl bg-[#0E1B33] border border-[#1E2E4A] space-y-2.5 text-xs">
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
              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Deal Value</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">
                  ${selectedCustomer.dealValue.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#38BDF8]">{selectedCustomer.dealStage}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Lifetime Receipts</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                  ${selectedCustomer.lifetimeValue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">PostgreSQL Verified</div>
              </div>
            </div>

            {/* AI Executive Intelligence Dossier (Gemini 3.8 Flash) */}
            <div className="p-4 rounded-xl bg-[#0E1B33] border border-[#2489DA]/30 space-y-2.5">
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
                  className="text-[11px] text-[#38BDF8] hover:underline disabled:opacity-40 font-semibold"
                >
                  {aiBriefLoading ? 'Analyzing...' : aiDossier ? 'Refresh Brief' : 'Generate Brief'}
                </button>
              </div>

              {aiDossier ? (
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-[#070E1A] p-3 rounded-xl border border-white/5">
                  {aiDossier}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">
                  Generate an autonomous executive client intelligence summary and high-conversion follow-up tactics.
                </p>
              )}
            </div>

            {/* Account Notes */}
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-slate-300 uppercase text-[10px] tracking-wider">
                Operational Notes
              </div>
              <div className="p-3 rounded-xl bg-[#0E1B33] border border-[#1E2E4A] text-slate-300 leading-relaxed">
                {selectedCustomer.notes}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E2E4A] flex items-center gap-2">
            <button
              onClick={() => {
                const id = selectedCustomer.id;
                setSelectedCustomer(null);
                setAiDossier(null);
                onOpenInboxForCustomer(id);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2489DA] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#38BDF8] hover:text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(36,137,218,0.3)]"
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
          <div className="relative w-full max-w-lg rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A] mb-4">
              <h3 className="text-base font-bold text-white">Create New Customer Opportunity</h3>
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
                    placeholder="e.g. Lord Sterling"
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sterling@private.com"
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0991"
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Entity</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Sterling Family Office"
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inbound Channel</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as Customer['source'])}
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Client Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Customer['tier'])}
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  >
                    <option value="VIP">Diamond VIP</option>
                    <option value="Preferred">Preferred</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Initial Brief / Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Client seeks private helicopter transfer and yacht charter..."
                  className="w-full p-2.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
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
                  className="px-5 py-2 rounded-xl bg-[#2489DA] text-white font-bold hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-lg"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
