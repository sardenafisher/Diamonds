'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Check,
  Edit3,
  RefreshCw,
  Send,
  Lock,
  Eye,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export function AutomationAiSection() {
  const [responseStatus, setResponseStatus] = useState<'pending' | 'approved' | 'edited'>('pending');
  const [draftText, setDraftText] = useState(
    "Hello Elena,\n\nThank you for reaching out to Horizon. We have availability for the 68ft Riva Dolceriva with Captain Matteo for October 14–17. The private chef package, fuel provisioning, and Capri harbor permits are quoted at $18,400 USD.\n\nWould you like me to reserve these dates and send the formal authorization agreement for your board?"
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleApprove = () => {
    setResponseStatus('approved');
    setIsEditing(false);
  };

  const handleReset = () => {
    setResponseStatus('pending');
    setIsEditing(false);
    setDraftText(
      "Hello Elena,\n\nThank you for reaching out to Horizon. We have availability for the 68ft Riva Dolceriva with Captain Matteo for October 14–17. The private chef package, fuel provisioning, and Capri harbor permits are quoted at $18,400 USD.\n\nWould you like me to reserve these dates and send the formal authorization agreement for your board?"
    );
  };

  return (
    <section id="automation" className="py-24 sm:py-32 bg-[#0B101B] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            Automation & AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Speed where you need it. Human control where it matters.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Uncontrolled autonomous agents can misquote prices or commit to impossible commitments. DIAMONDS combines intelligent drafting grounded in your business rules with strict human verification.
          </p>
        </div>

        {/* Two-Column Interactive Inspection Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Grounded Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                How Governed AI Operates in DIAMONDS
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than treating AI as a free-roaming chatbot, DIAMONDS treats it as a precision co-worker operating within verified parameters.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#38BDF8]" />
                  <span>1. Grounded in Your Rate Cards & Policies</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Drafts are generated strictly using approved pricing models, inventory calendars, and cancellation guidelines—preventing hallucinations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2. Mandatory Human Authorization</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Every proposal, quote, or external email must be explicitly authorized by an assigned team member before it can be dispatched.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>3. Immutable Audit Trails</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Every draft, modification, and final authorization is stamped with the responsible employee ID and timestamp for total accountability.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Draft & Authorization Simulator */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/15 bg-[#080D17] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 bg-[#070A10] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Interactive Authorization Sandbox
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Try Approving or Editing Below
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* 1. Customer Context Card */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-semibold text-slate-200">Customer Inquiry Context</span>
                    <span className="font-mono text-[11px]">WhatsApp · Elena Vance</span>
                  </div>
                  <p className="italic text-slate-300">
                    &ldquo;Hi Marcus, can you verify availability and quote for 12 guests aboard the Riva for Oct 14–17 with private catering?&rdquo;
                  </p>
                </div>

                {/* 2. AI Assistant Output Card */}
                <div className="p-4 rounded-lg bg-[#0B101B] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">AI Assistant Proposal Draft</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono">
                        Rule: Rate Card 2026-Q4
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isEditing && responseStatus !== 'approved' && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Draft</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      rows={5}
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      className="w-full p-3 text-xs rounded bg-black/40 border border-[#38BDF8] text-white focus:outline-none"
                    />
                  ) : (
                    <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                      {draftText}
                    </div>
                  )}

                  {/* Operational status feedback */}
                  {responseStatus === 'approved' ? (
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold">Authorized & Dispatched by Staff Member</span>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-[11px] text-slate-400 hover:text-white underline"
                      >
                        Reset Demo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        Staff sign-off required prior to client transmission
                      </span>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {isEditing && (
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setResponseStatus('edited');
                            }}
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300 hover:bg-white/5"
                          >
                            Save Changes
                          </button>
                        )}
                        <button
                          onClick={handleApprove}
                          className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg bg-[#38BDF8] text-slate-950 text-xs font-bold hover:bg-[#7dd3fc] flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Authorize & Send</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Audit verification tag */}
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Guardrail Mode: Strict Human Authorization</span>
                  <span>Model: Grounded Domain Reasoning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
