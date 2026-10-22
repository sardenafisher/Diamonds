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
  Zap
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
  const [replyText, setReplyText] = useState('');
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [editingDraftText, setEditingDraftText] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiModelNotice, setAiModelNotice] = useState<string | null>(null);

  const activeConv =
    conversations.find((c) => c.id === selectedConversationId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    return channelFilter === 'all' || c.channel === channelFilter;
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
          inquiryText: activeConv.lastMessage,
          channel: activeConv.channel,
          tier: 'VIP',
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

  return (
    <div className="space-y-4">
      {/* View Header with Inbound Simulation triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Multichannel Communications Inbox
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Unified messaging across WhatsApp Business, Instagram Direct, and Corporate Email.
          </p>
        </div>

        {/* Inbound Simulator Actions */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 hidden sm:inline">
            Simulate Inbound:
          </span>
          <button
            onClick={() => onSimulateInbound('whatsapp')}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium text-xs hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
          >
            <PlusCircle className="w-3 h-3" />
            <span>+ WhatsApp Lead</span>
          </button>
          <button
            onClick={() => onSimulateInbound('instagram')}
            className="px-2.5 py-1.5 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-300 font-medium text-xs hover:bg-pink-900/60 transition-colors flex items-center gap-1"
          >
            <PlusCircle className="w-3 h-3" />
            <span>+ Instagram DM</span>
          </button>
        </div>
      </div>

      {/* Split Interface Container */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] min-h-[580px] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
        {/* Left: Conversation List */}
        <div className="md:col-span-4 bg-[#090E18] flex flex-col justify-between">
          <div className="p-3 border-b border-white/10 space-y-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-semibold">
              {['all', 'whatsapp', 'email', 'instagram'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setChannelFilter(ch)}
                  className={`px-2.5 py-1 rounded capitalize whitespace-nowrap transition-colors ${
                    channelFilter === ch
                      ? 'bg-white text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ch === 'all' ? 'All Channels' : ch}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation rows */}
          <div className="divide-y divide-white/5 overflow-y-auto max-h-[500px]">
            {filteredConversations.map((conv) => {
              const isSelected = activeConv?.id === conv.id;
              const hasDraft = conv.messages.some((m) => m.isAiDraft && !m.isApproved);
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-white/[0.06] text-white' : 'hover:bg-white/[0.02] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white truncate max-w-[150px]">
                      {conv.customerName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-1.5 leading-snug">
                    {conv.lastMessage}
                  </p>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="uppercase tracking-wider font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300">
                      {conv.channel}
                    </span>
                    {hasDraft && (
                      <span className="text-[10px] text-[#38BDF8] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Draft Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Conversations ({filteredConversations.length})</span>
            <span className="text-emerald-400">Direct Ingestion Live</span>
          </div>
        </div>

        {/* Right: Active Conversation Thread */}
        <div className="md:col-span-8 flex flex-col justify-between bg-[#0B101B]">
          {activeConv ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#090E18]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-white">{activeConv.customerName}</h2>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/40">
                      {activeConv.channel}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {activeConv.customerEmail} · Customer ID: {activeConv.customerId}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTriggerAiDraft}
                    disabled={isGeneratingAi}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-semibold hover:bg-[#38BDF8]/25 transition-colors disabled:opacity-40"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingAi ? 'Reasoning with Gemini...' : 'Generate AI Grounded Draft'}</span>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[380px]">
                {aiModelNotice && (
                  <div className="p-2 rounded bg-sky-950/40 border border-sky-800/40 text-[11px] text-sky-300 flex items-center justify-between">
                    <span>{aiModelNotice}</span>
                    <button onClick={() => setAiModelNotice(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                )}

                {activeConv.messages.map((msg) => {
                  if (msg.isAiDraft) {
                    return (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 space-y-3 my-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#38BDF8] flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            Grounded Proposal Draft · Human Authorization Required
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Rate Card Match #44B
                          </span>
                        </div>

                        {isEditingDraft ? (
                          <textarea
                            rows={4}
                            value={editingDraftText}
                            onChange={(e) => setEditingDraftText(e.target.value)}
                            className="w-full p-2.5 text-xs rounded bg-black/50 border border-[#38BDF8] text-white focus:outline-none"
                          />
                        ) : (
                          <p className="text-xs text-slate-200 leading-relaxed italic whitespace-pre-line">
                            &ldquo;{msg.content}&rdquo;
                          </p>
                        )}

                        <div className="pt-2 border-t border-[#38BDF8]/20 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">
                            Strict Policy: Requires staff sign-off
                          </span>
                          <div className="flex items-center gap-2">
                            {isEditingDraft ? (
                              <button
                                onClick={handleSaveDraft}
                                className="px-3 py-1 rounded bg-white/10 text-white text-xs hover:bg-white/20"
                              >
                                Save Draft
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStartEditDraft(msg.content)}
                                className="px-3 py-1 rounded border border-white/15 text-slate-300 text-xs hover:text-white flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit Draft</span>
                              </button>
                            )}

                            <button
                              onClick={() => onApproveDraft(activeConv.id)}
                              className="px-4 py-1 rounded bg-[#38BDF8] text-slate-950 font-bold text-xs hover:bg-[#7dd3fc] flex items-center gap-1.5 transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Authorize & Send</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isCustomer = msg.senderType === 'customer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1 px-1">
                        {msg.senderName} · {msg.timestamp}
                      </div>
                      <div
                        className={`max-w-[85%] p-3.5 rounded-xl text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-white/[0.04] border border-white/10 text-white'
                            : 'bg-sky-950/80 border border-sky-800/40 text-slate-100'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#090E18] flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${activeConv.customerName} via ${activeConv.channel}...`}
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs hover:bg-[#7dd3fc] disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-slate-400">
              Select a conversation to view thread.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
