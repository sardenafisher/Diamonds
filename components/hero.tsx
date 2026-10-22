'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Globe,
  Share2,
  Workflow,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Sliders,
  Compass,
  Building,
  UserCheck
} from 'lucide-react';

interface HeroProps {
  onOpenEarlyAccess: () => void;
}

export function Hero({ onOpenEarlyAccess }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'crm' | 'infrastructure' | 'automation'>('crm');
  const [demoApproved, setDemoApproved] = useState(false);

  const scrollToExplore = () => {
    const el = document.querySelector('#platform');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background radial ambient lights - subtle, restrained, no harsh neon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-sky-950/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-slate-800/25 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy */}
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="tracking-wide">Business Management Platform · Architecture Preview</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
            One connected workspace for your entire business.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Unify customer relationships, multichannel communications, websites, bookings, automated workflows, and operational intelligence into a single coherent system.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEarlyAccess}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-sm tracking-wide uppercase hover:bg-[#7dd3fc] transition-all shadow-lg shadow-sky-500/10"
            >
              <span>Request Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-white/15 text-slate-200 font-semibold text-sm hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              <span>Explore Platform</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Minimalist operational metrics strip */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Architecture</div>
              <div className="text-sm font-semibold text-white mt-1">Multi-Tenant CRM</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Channels</div>
              <div className="text-sm font-semibold text-white mt-1">Social, Web & Email</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Infrastructure</div>
              <div className="text-sm font-semibold text-white mt-1">WordPress & Hosting</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Governance</div>
              <div className="text-sm font-semibold text-white mt-1">Human-in-the-Loop</div>
            </div>
          </div>
        </div>

        {/* Product Demonstration Viewport */}
        <div id="platform" className="relative mx-auto max-w-6xl">
          {/* Outer Chrome Frame */}
          <div className="rounded-xl border border-white/15 bg-[#0B101B] shadow-2xl overflow-hidden">
            {/* Top Window Bar */}
            <div className="px-4 py-3 bg-[#080D17] border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/60 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/60 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]/60 inline-block" />
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                  diamonds.app/workspace/apex-operations
                </span>
              </div>

              {/* View switcher tabs */}
              <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    activeTab === 'crm'
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Omnichannel CRM
                </button>
                <button
                  onClick={() => setActiveTab('infrastructure')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    activeTab === 'infrastructure'
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Web & Infrastructure
                </button>
                <button
                  onClick={() => setActiveTab('automation')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    activeTab === 'automation'
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Governed Workflows
                </button>
              </div>

              <div className="text-[11px] text-slate-400 hidden md:block">
                Demonstration Simulation
              </div>
            </div>

            {/* Main Application Mockup Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left Nav Bar Simulation */}
              <div className="lg:col-span-3 p-4 bg-[#090E18] flex flex-col justify-between">
                <div>
                  {/* Workspace switcher */}
                  <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] font-bold text-xs">
                        A
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-white leading-tight">Apex Operations</div>
                        <div className="text-[10px] text-slate-400">Enterprise Workspace</div>
                      </div>
                    </div>
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* Nav items */}
                  <div className="space-y-1 text-xs">
                    <div
                      onClick={() => setActiveTab('crm')}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        activeTab === 'crm'
                          ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>CRM & Inbox</span>
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-mono">
                        3
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('infrastructure')}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        activeTab === 'infrastructure'
                          ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>Websites & Hosting</span>
                    </div>

                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer">
                      <Compass className="w-4 h-4" />
                      <span>Bookings & Tours</span>
                    </div>

                    <div
                      onClick={() => setActiveTab('automation')}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                        activeTab === 'automation'
                          ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Workflow className="w-4 h-4" />
                      <span>Workflows & AI</span>
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer">
                      <TrendingUp className="w-4 h-4" />
                      <span>Analytics & BI</span>
                    </div>

                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer">
                      <Layers className="w-4 h-4" />
                      <span>Subscriptions & Costs</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Marcus Vance
                  </span>
                  <span className="text-[10px] text-slate-500">Administrator</span>
                </div>
              </div>

              {/* Central Dynamic Content Area */}
              <div className="lg:col-span-9 p-5 sm:p-6 bg-[#0B101B]">
                {/* 1. Omnichannel CRM View */}
                {activeTab === 'crm' && (
                  <div className="space-y-6">
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                          Unified Communication Feed
                        </div>
                        <h2 className="text-lg font-bold text-white mt-0.5">
                          Inbound Customer Conversations
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Channel Filter:</span>
                        <span className="px-2 py-1 rounded bg-white/5 text-slate-200 border border-white/10 font-medium">
                          WhatsApp Business
                        </span>
                      </div>
                    </div>

                    {/* Active Thread Detail & Customer 360 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      {/* Left: Chat history */}
                      <div className="md:col-span-7 rounded-lg bg-white/[0.02] border border-white/10 p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                          <span className="font-semibold text-white">Elena Vance</span>
                          <span className="text-slate-400 text-[11px]">Today at 14:18 · WhatsApp</span>
                        </div>

                        {/* Customer incoming message */}
                        <div className="p-3 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-slate-200 leading-relaxed">
                          <p className="font-medium text-slate-300 mb-1 text-[11px]">Elena Vance</p>
                          &ldquo;Hello Marcus, our executive board needs a 3-day private yacht retreat in the Amalfi Coast next month for 12 guests. Can you confirm captain availability, catering packages, and reserve the slot?&rdquo;
                        </div>

                        {/* AI drafted assistant proposal */}
                        <div className="p-3.5 rounded-lg bg-[#38BDF8]/5 border border-[#38BDF8]/20 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#38BDF8] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              AI Draft Prepared · Awaiting Authorization
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">Matched Rate Card #44B</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            &ldquo;Hello Elena, absolutely. We have the 68ft Riva Dolceriva flagged with Captain Matteo for October 14–17. The private chef package and harbor permits are quoted at $18,400. Shall I lock the itinerary?&rdquo;
                          </p>
                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">Requires staff sign-off</span>
                            <button
                              onClick={() => setDemoApproved(!demoApproved)}
                              className={`px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                                demoApproved
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-[#38BDF8] text-slate-950 hover:bg-[#7dd3fc]'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{demoApproved ? 'Authorized & Sent' : 'Approve & Dispatch'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Customer 360 & Deal Record */}
                      <div className="md:col-span-5 space-y-3">
                        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 space-y-3">
                          <div className="text-xs font-semibold text-white uppercase tracking-wider">
                            CRM Opportunity Record
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">Deal Value</div>
                            <div className="text-xl font-bold text-white font-mono">$18,400 USD</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Pipeline Stage</span>
                              <span className="text-slate-200 font-medium">Negotiation</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Assigned Agent</span>
                              <span className="text-slate-200 font-medium">Marcus Vance</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-white/5 text-xs">
                            <span className="text-slate-400 block text-[10px] mb-1">Connected Channels</span>
                            <div className="flex gap-2 text-[11px] text-slate-300">
                              <span>WhatsApp</span>
                              <span>·</span>
                              <span>Direct Mail</span>
                              <span>·</span>
                              <span>Web Form</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                          <span>Customer history verified. Prior bookings: 2 completed itineraries.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Web & Infrastructure View */}
                {activeTab === 'infrastructure' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                          Digital Assets & Environments
                        </div>
                        <h2 className="text-lg font-bold text-white mt-0.5">
                          Websites, Domains & Distribution Channels
                        </h2>
                      </div>
                      <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>All Systems Operational</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* WordPress Management Card */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#38BDF8]" />
                            WordPress Production Site
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-mono">
                            PHP 8.3 · SSL Active
                          </span>
                        </div>
                        <div className="text-xs text-slate-300">
                          <div className="font-mono text-slate-200">https://horizon-retreats.com</div>
                          <div className="text-slate-400 text-[11px] mt-1">Core updates, plugin staging, and automated backups managed via DIAMONDS connector.</div>
                        </div>
                        <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] text-slate-400">
                          <span>Uptime (30d): 99.98%</span>
                          <span className="text-slate-300">FastCGI Edge Active</span>
                        </div>
                      </div>

                      {/* Distribution Channels Card */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-[#38BDF8]" />
                            Travel Marketplace Channels
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 font-mono">
                            OTA Sync Live
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center text-slate-300">
                            <span>Viator Marketplace API</span>
                            <span className="text-emerald-400 text-[11px]">Connected · 14 Tours</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300">
                            <span>GetYourGuide Connectivity</span>
                            <span className="text-emerald-400 text-[11px]">Connected · 9 Tours</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300">
                            <span>Direct Web Booking Engine</span>
                            <span className="text-emerald-400 text-[11px]">Connected · Real-time</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                          Unified inventory prevents double-booking across all platforms.
                        </div>
                      </div>
                    </div>

                    {/* Operational Overview Bar */}
                    <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Domain Registration</span>
                        <span className="text-white font-medium">horizon-retreats.com (Renews in 240d)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">DNS Security</span>
                        <span className="text-white font-medium">Cloudflare Anycast Proxy</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Hosting Footprint</span>
                        <span className="text-white font-medium">Dedicated Cloud Container</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Governed Workflows View */}
                {activeTab === 'automation' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                          Visual Business Logic Engine
                        </div>
                        <h2 className="text-lg font-bold text-white mt-0.5">
                          High-Intent Lead & Booking Pipeline
                        </h2>
                      </div>
                      <div className="text-xs text-slate-400">
                        Workflow #WF-884 · Status: Active
                      </div>
                    </div>

                    {/* Visual workflow step diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10 space-y-1.5">
                        <div className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Step 1 · Trigger</div>
                        <div className="font-bold text-white">Inbound Message</div>
                        <p className="text-slate-400 text-[11px]">WhatsApp inquiry arrives from customer.</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10 space-y-1.5">
                        <div className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Step 2 · Condition</div>
                        <div className="font-bold text-white">CRM Match & Resolve</div>
                        <p className="text-slate-400 text-[11px]">Match phone number against customer CRM record.</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 space-y-1.5">
                        <div className="text-[10px] text-[#38BDF8] font-semibold uppercase tracking-wider">Step 3 · AI Draft</div>
                        <div className="font-bold text-white">Grounded Proposal</div>
                        <p className="text-slate-300 text-[11px]">Context assistant reads pricing schedule and creates draft.</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                        <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Step 4 · Governance</div>
                        <div className="font-bold text-white">Human Approval</div>
                        <p className="text-slate-300 text-[11px]">Marcus Vance reviews and authorizes transmission.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="font-semibold text-white">Strict Guardrail Protocol</span>
                          <p className="text-slate-400 text-[11px]">Zero unapproved autonomous dispatches. Business critical correspondence always preserves human oversight.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom status strip */}
            <div className="px-5 py-2.5 bg-[#070A10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-slate-300 font-medium">DIAMONDS Unified Engine</span>
                <span>·</span>
                <span>Workspace Isolation Active</span>
                <span>·</span>
                <span>Encrypted In-Transit & At Rest</span>
              </div>
              <div className="text-slate-400">
                Interactive demonstration · Visual mockup for landing page
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
