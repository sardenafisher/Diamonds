'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  UserCheck,
  TrendingUp,
  CalendarCheck,
  Sparkles,
  LayoutDashboard,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export function ConnectedExperience() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Customer Sends an Inquiry',
      shortTitle: '1. Inbound Inquiry',
      channel: 'WhatsApp / Web / Social',
      icon: MessageSquare,
      summary:
        'A prospective client reaches out through their preferred channel—be it WhatsApp, Instagram Direct, or your website contact flow.',
      actionDetail:
        'Inbound message arrives: "Hi, our executive retreat needs a private 3-day catamaran tour in the Amalfi Coast next month for 12 guests. Can you send rates and availability?"',
      stateOutput: {
        channel: 'WhatsApp Business API',
        payload: 'Inquiry Text + Client Phone Number (+1 415-890-2100)',
        systemAction: 'Triggering CRM Ingestion Pipeline',
      },
    },
    {
      number: '02',
      title: 'Inquiry Connects to Customer Record',
      shortTitle: '2. CRM Record Resolution',
      channel: 'Unified Customer Database',
      icon: UserCheck,
      summary:
        'Instead of living in an isolated messaging app, the inquiry matches an existing contact or instantly generates a verified customer record in DIAMONDS CRM.',
      actionDetail:
        'System matches phone number with Elena Vance (VP Operations, Horizon Escapes). Retrieves historical booking context (2 completed trips, VIP tier).',
      stateOutput: {
        resolvedContact: 'Elena Vance · Horizon Escapes',
        lifetimeValue: '$34,600 historical spend',
        relationshipTier: 'VIP Preferred Client',
      },
    },
    {
      number: '03',
      title: 'Business Tracks Deal in CRM Pipeline',
      shortTitle: '3. Pipeline Deal Logged',
      channel: 'Sales & Deal Management',
      icon: TrendingUp,
      summary:
        'The opportunity is automatically logged into the sales pipeline with estimated value, deal stage, and target fulfillment dates.',
      actionDetail:
        'Opportunity created: "Elena Vance — Oct 14–17 Amalfi Executive Charter". Stage: In Review. Estimated deal value: $18,400 USD.',
      stateOutput: {
        dealStage: 'Proposal Preparation',
        opportunityValue: '$18,400.00 USD',
        probabilityScore: 'High Intent (Prior VIP)',
      },
    },
    {
      number: '04',
      title: 'Employee Receives a Follow-Up Task',
      shortTitle: '4. Task Queued to Team',
      channel: 'Team Workspaces & Roles',
      icon: CalendarCheck,
      summary:
        'A dedicated team member is assigned an actionable task with an SLA timer, ensuring no customer inquiry ever sits unanswered.',
      actionDetail:
        'Task assigned to Marcus Vance: "Review catamaran availability and authorize drafted proposal for Elena Vance within 30 minutes."',
      stateOutput: {
        assignee: 'Marcus Vance (Charter Operations Lead)',
        slaTimer: '24m remaining',
        priority: 'High Priority (VIP Inquiry)',
      },
    },
    {
      number: '05',
      title: 'Authorized Automation Prepares Next Action',
      shortTitle: '5. AI Proposal Drafted',
      channel: 'Context AI Assistant',
      icon: Sparkles,
      summary:
        'The context-aware assistant reads the verified rate card, checks boat schedule availability, and prepares a polished response draft for employee sign-off.',
      actionDetail:
        'Assistant generates draft using approved corporate templates: "Hi Elena, we have Captain Matteo and the 68ft Riva available Oct 14–17. Quote: $18,400 inclusive of harbor permits."',
      stateOutput: {
        draftStatus: 'Prepared · Pending Human Authorization',
        groundingSources: 'Charter Fleet Schedule + Rate Schedule 2026',
        guardrail: 'No autonomous send without staff approval',
      },
    },
    {
      number: '06',
      title: 'Activity Becomes Visible in One Workspace',
      shortTitle: '6. Unified Operational Clarity',
      channel: 'Single Pane of Glass',
      icon: LayoutDashboard,
      summary:
        'The entire business lifecycle—message, customer record, deal stage, assigned task, and future booking status—is visible to authorized team members in real time.',
      actionDetail:
        'Executive dashboard updates revenue pipeline, team workload balances, and calendar blocks. Zero manual cross-posting required.',
      stateOutput: {
        workspaceSync: 'Complete · 1 Source of Truth',
        crossPlatformIntegrity: 'No duplicate entry required',
        auditLog: 'Logged by DIAMONDS Governance Engine',
      },
    },
  ];

  return (
    <section id="workflows" className="py-24 sm:py-32 bg-[#0B101B] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            The Connected Business Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            See how customer activity flows through a unified operating system.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            From the moment a customer message arrives to team assignment, proposal drafting, and final fulfillment, DIAMONDS connects each phase into an unbroken chain of business operations.
          </p>
        </div>

        {/* Step Scrubber Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-3 sm:p-4 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#38BDF8] text-white shadow-lg'
                    : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  {step.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Viewer */}
        <div className="rounded-xl border border-white/10 bg-[#080D17] p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Stage Explanation */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                <span>Stage {steps[activeStep].number} of 06</span>
                <span>·</span>
                <span className="text-slate-400">{steps[activeStep].channel}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {steps[activeStep].summary}
              </p>

              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-1.5">
                <span className="font-semibold text-white block text-[11px] uppercase tracking-wider">
                  Live Event Simulation
                </span>
                <p className="italic text-slate-300 leading-relaxed">
                  &ldquo;{steps[activeStep].actionDetail}&rdquo;
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous Step
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-lg bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Simulated Workspace State Ledger */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-white/10 bg-[#0B101B] p-5 sm:p-6 shadow-inner space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      DIAMONDS Unified State Ledger
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    EVENT_ID: DM-2026-X8
                  </span>
                </div>

                {/* State Attributes */}
                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(steps[activeStep].stateOutput).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                    >
                      <span className="text-slate-400 font-sans uppercase text-[10px] tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-white font-medium text-right sm:max-w-[70%] break-words">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Synchronized across CRM, Messaging & Governance
                  </span>
                  <span className="text-slate-400 hidden sm:inline">Concept preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note of clarity */}
        <p className="mt-4 text-[11px] text-slate-400 text-center">
          Demonstration representation of the DIAMONDS architectural concept. Specific external integrations reflect scheduled platform capabilities.
        </p>
      </div>
    </section>
  );
}
