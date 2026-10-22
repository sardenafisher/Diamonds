'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  CheckCircle,
  Clock,
  User,
  ShieldCheck,
  Edit3,
  Search,
  Filter,
  RefreshCw,
  PlusCircle,
  Zap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  Bot,
  AlertCircle,
  ArrowRight,
  Sliders,
  Check,
  Paperclip
} from 'lucide-react';
import { Conversation, ConversationMessage } from '@/lib/workspace-data';

interface InboxViewProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onApproveDraft: (conversationId: string) => void;
  onEditDraft: (conversationId: string, newText: string) => void;
  onAddAiDraft: (conversationId: string, draftText: string) => void;
  onSimulateInbound: (channel: 'whatsapp' | 'instagram' | 'email') => void;
}

export function InboxView({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onSendMessage,
  onApproveDraft,
  onEditDraft,
  onAddAiDraft,
  onSimulateInbound,
}: InboxViewProps) {
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [editingDraftText, setEditingDraftText] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiModelNotice, setAiModelNotice] = useState<string | null>(null);
  const [aiProposalPrompt, setAiProposalPrompt] = useState('Luxury Itinerary Quote & Villa Amalfi Inclusions');

  const activeConv =
    conversations.find((c) => c.id === selectedConversationId) || conversations[0];

  const channelCounts = {
    all: conversations.length,
    whatsapp: conversations.filter((c) => c.channel === 'whatsapp').length,
    instagram: conversations.filter((c) => c.channel === 'instagram').length,
    email: conversations.filter((c) => c.channel === 'email').length,
  };

  const filteredConversations = conversations.filter((c) => {
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, replyText);
    setReplyText('');
  };

  const handleStartEditDraft = (draftContent: string) => {
    setEditingDraftText(draftContent);
    setIsEditingDraft(true);
  };

  const handleSaveDraft = () => {
    if (!activeConv) return;
    onEditDraft(activeConv.id, editingDraftText);
    setIsEditingDraft(false);
  };

  const handleTriggerAiDraft = async () => {
    if (!activeConv) return;
    setIsGeneratingAi(true);
    setAiModelNotice(null);

    try {
      const res = await fetch('/api/ai/draft-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: activeConv.customerName,
          inquiryText: `${activeConv.lastMessage} (Focus: ${aiProposalPrompt})`,
          channel: activeConv.channel,
          tier: 'VIP Luxury Concierge',
        }),
      });

      const data = await res.json();
      if (data.draftResponse) {
        onAddAiDraft(activeConv.id, data.draftResponse);
        setAiModelNotice(`Grounded via ${data.generatedBy || 'Gemini 3.8 Flash'}`);
      }
    } catch (e) {
      console.error('Failed to trigger AI draft:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const quickReplies = [
    'Confirm availability for requested luxury dates',
    'Send custom Amalfi Yacht charter brochure',
    'Schedule 15-min VIP consultation with Director',
    'Offer private helicopter transfer addon',
  ];

  return (
    <div className="space-y-4">
      {/* View Header with Genie ERP Inbound Simulator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Omnichannel Unified Inbox
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Gateway Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time customer communications across WhatsApp Business API, Instagram Direct, and Corporate Email.
          </p>
        </div>

        {/* Omnichannel Inbound Simulator Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 hidden sm:inline">
            Inbound Simulator:
          </span>
          <button
            onClick={() => onSimulateInbound('whatsapp')}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-semibold text-xs hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Inbound WhatsApp</span>
          </button>
          <button
            onClick={() => onSimulateInbound('instagram')}
            className="px-2.5 py-1.5 rounded-lg bg-pink-950/70 border border-pink-500/30 text-pink-300 font-semibold text-xs hover:bg-pink-900/60 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Inbound Instagram</span>
          </button>
        </div>
      </div>

      {/* 3-Column Split Interface (Genie ERP Pattern) */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0A1324] min-h-[640px] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1E2E4A] overflow-hidden shadow-2xl">
        {/* Left Column: Channels & Threads List (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col bg-[#070E1A]/80">
          {/* Channel Filter Tabs */}
          <div className="p-3 border-b border-[#1E2E4A] space-y-2.5">
            <div className="flex items-center gap-1 bg-[#0A1324] p-1 rounded-lg border border-[#1E2E4A]">
              <button
                onClick={() => setChannelFilter('all')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded transition-colors ${
                  channelFilter === 'all'
                    ? 'bg-[#2489DA] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({channelCounts.all})
              </button>
              <button
                onClick={() => setChannelFilter('whatsapp')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded transition-colors ${
                  channelFilter === 'whatsapp'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                WA ({channelCounts.whatsapp})
              </button>
              <button
                onClick={() => setChannelFilter('instagram')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded transition-colors ${
                  channelFilter === 'instagram'
                    ? 'bg-pink-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                IG ({channelCounts.instagram})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter messages..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1E2E4A]/60 max-h-[560px]">
            {filteredConversations.map((c) => {
              const isSelected = activeConv && activeConv.id === c.id;
              const hasDraft = c.messages.some((m) => m.isAiDraft && !m.isApproved);
              return (
                <div
                  key={c.id}
                  onClick={() => onSelectConversation(c.id)}
                  className={`p-3 cursor-pointer transition-colors text-left group ${
                    isSelected
                      ? 'bg-[#1A5FA8]/20 border-l-4 border-l-[#38BDF8]'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
                      {c.customerName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {c.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {c.lastMessage}
                  </p>

                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className={`font-mono uppercase px-1.5 py-0.2 rounded text-[9px] border ${
                        c.channel === 'whatsapp'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                          : c.channel === 'instagram'
                          ? 'bg-pink-950/60 text-pink-400 border-pink-800/40'
                          : 'bg-sky-950/60 text-sky-400 border-sky-800/40'
                      }`}
                    >
                      {c.channel}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {hasDraft && (
                        <span className="text-[9px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/40 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5" /> AI Draft
                        </span>
                      )}
                      {c.unreadCount ? (
                        <span className="w-4 h-4 rounded-full bg-[#2489DA] text-white font-mono text-[9px] font-bold flex items-center justify-center">
                          {c.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Conversation Thread (col-span-5 or col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#0A1324]">
          {/* Thread Header */}
          {activeConv ? (
            <>
              <div className="p-3.5 border-b border-[#1E2E4A] bg-[#0E1B33]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A5FA8] border border-[#38BDF8]/40 flex items-center justify-center font-bold text-xs text-white">
                    {activeConv.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{activeConv.customerName}</span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active Lead
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="capitalize">{activeConv.channel} Direct</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">SLA: Under 5m</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">Assigned: Concierge Team</span>
                </div>
              </div>

              {/* Messages Dialogue Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[440px]">
                {activeConv.messages.map((m) => {
                  const isAgent = m.senderType === 'agent';
                  const isAiDraft = m.isAiDraft;

                  if (isAiDraft && !m.isApproved) {
                    return (
                      <div
                        key={m.id}
                        className="box-highlight p-3.5 rounded-xl border border-amber-500/40 space-y-2.5 my-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AI Grounded Draft (Gemini 3.8 Flash)</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-300/80 uppercase">
                            Sign-Off Required
                          </span>
                        </div>

                        {isEditingDraft ? (
                          <div className="space-y-2">
                            <textarea
                              rows={4}
                              value={editingDraftText}
                              onChange={(e) => setEditingDraftText(e.target.value)}
                              className="w-full p-2.5 text-xs rounded-lg bg-[#070E1A] border border-amber-500/30 text-white focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setIsEditingDraft(false)}
                                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleSaveDraft}
                                className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-[#070E1A]/60 p-3 rounded-lg border border-white/5">
                            {m.content}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => handleStartEditDraft(m.content)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Proposal</span>
                          </button>

                          <button
                            onClick={() => onApproveDraft(activeConv.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Send to Customer</span>
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-[#1A5FA8] text-white rounded-br-none shadow-[0_2px_10px_rgba(26,95,168,0.3)]'
                            : 'bg-[#0E1B33] text-slate-200 border border-[#1E2E4A] rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 px-1 font-mono">
                        <span>{m.senderName}</span>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                        {isAgent && <CheckCircle className="w-3 h-3 text-[#38BDF8]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Canned Replies Bar */}
              <div className="p-2 border-t border-[#1E2E4A] bg-[#070E1A]/60 overflow-x-auto flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0 px-1">
                  Quick Reply:
                </span>
                {quickReplies.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReplyText(qr)}
                    className="px-2 py-1 rounded bg-[#0E1B33] border border-[#1E2E4A] text-[10px] text-slate-300 hover:text-white hover:border-[#38BDF8]/40 whitespace-nowrap transition-colors shrink-0"
                  >
                    {qr}
                  </button>
                ))}
              </div>

              {/* Message Composer Input Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-[#1E2E4A] bg-[#0E1B33]/40">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeConv.customerName} via ${activeConv.channel}...`}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-[#070E1A] border border-[#1E2E4A] text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-[0_0_12px_rgba(36,137,218,0.3)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-10 text-center text-slate-500 text-xs">
              Select a conversation to inspect thread.
            </div>
          )}
        </div>

        {/* Right Column: Customer CRM Context Dossier & Gemini AI Studio Co-Pilot (col-span-3) */}
        <div className="lg:col-span-3 bg-[#070E1A]/90 p-4 space-y-5 overflow-y-auto max-h-[640px]">
          {activeConv ? (
            <>
              {/* Customer Profile Box */}
              <div className="space-y-3 pb-4 border-b border-[#1E2E4A]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1A5FA8]/20 border border-[#38BDF8]/30 flex items-center justify-center font-bold text-sm text-[#38BDF8]">
                    {activeConv.customerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">{activeConv.customerName}</h3>
                    <span className="text-[10px] text-slate-400">{activeConv.customerEmail}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A]">
                    <span className="text-[9px] uppercase font-semibold text-slate-400">Loyalty Tier</span>
                    <div className="font-bold text-[#38BDF8] mt-0.5">Diamond VIP</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A]">
                    <span className="text-[9px] uppercase font-semibold text-slate-400">Est. Pipeline</span>
                    <div className="font-bold text-emerald-400 mt-0.5 font-mono">$140,000</div>
                  </div>
                </div>
              </div>

              {/* Gemini 3.8 Flash AI Studio Co-pilot */}
              <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#2489DA]/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Bot className="w-4 h-4 text-[#38BDF8]" />
                    <span>AI Concierge Studio</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#38BDF8] bg-[#2489DA]/15 px-1.5 py-0.5 rounded border border-[#2489DA]/30">
                    Gemini 3.8 Flash
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-normal">
                  Draft a personalized, high-ticket itinerary and proposal tailored to customer requirements.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-semibold text-slate-400">
                    Proposal Target Focus:
                  </label>
                  <select
                    value={aiProposalPrompt}
                    onChange={(e) => setAiProposalPrompt(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg bg-[#070E1A] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="Luxury Itinerary Quote & Villa Amalfi Inclusions">
                      Amalfi Villa & Yacht Charter
                    </option>
                    <option value="Swiss Alps Heli-Ski & Chalet Package">
                      Swiss Alps Heli-Ski & Chalet
                    </option>
                    <option value="Monaco Grand Prix VIP Yacht Berth Proposal">
                      Monaco GP VIP Yacht Hospitality
                    </option>
                    <option value="VIP Supercar Alpine Tour & 5-Star Hospitality">
                      Supercar Alpine Tour & 5-Star Hotel
                    </option>
                  </select>
                </div>

                <button
                  onClick={handleTriggerAiDraft}
                  disabled={isGeneratingAi}
                  className="w-full py-2 px-3 rounded-lg bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(36,137,218,0.25)]"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAi ? 'Generating via Gemini...' : 'Draft Grounded Proposal'}</span>
                </button>

                {aiModelNotice && (
                  <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                    {aiModelNotice}
                  </div>
                )}
              </div>

              {/* CRM Activity Timeline */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lead Journey Milestones
                </span>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[#0E1B33]/50 border border-[#1E2E4A] text-[11px] space-y-0.5">
                    <div className="font-semibold text-white">Inbound Lead Received</div>
                    <div className="text-[10px] text-slate-400">Via WhatsApp Business Gateway</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0E1B33]/50 border border-[#1E2E4A] text-[11px] space-y-0.5">
                    <div className="font-semibold text-white">SLA Acknowledged</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Within 2m 14s</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              No customer selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
