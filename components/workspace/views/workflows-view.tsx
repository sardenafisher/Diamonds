'use client';

import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  ShieldCheck,
  Check,
  Sparkles,
  X,
  ToggleLeft,
  ToggleRight,
  Play,
  RotateCcw,
  Clock,
  Terminal,
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { WorkflowRule } from '@/lib/workspace-data';

interface WorkflowsViewProps {
  workflows: WorkflowRule[];
  onToggleWorkflow: (id: string) => void;
  onAddWorkflow: (rule: WorkflowRule) => void;
}

interface ExecutionLog {
  id: string;
  workflowName: string;
  trigger: string;
  status: 'Completed' | 'Staged for Approval' | 'Filtered';
  latencyMs: number;
  timestamp: string;
  summary: string;
}

const INITIAL_LOGS: ExecutionLog[] = [
  {
    id: 'log-101',
    workflowName: 'VIP WhatsApp Inbound Grounded Draft',
    trigger: 'WhatsApp: Eleonora Grimaldi ($18,500)',
    status: 'Staged for Approval',
    latencyMs: 312,
    timestamp: '2 mins ago',
    summary: 'Matched Riva charter rates. AI draft staged in Inbox. Required operator signature.',
  },
  {
    id: 'log-102',
    workflowName: 'OTA Instant Inventory Reservation Lock',
    trigger: 'Viator: Booking VIA-8891 ($3,400)',
    status: 'Completed',
    latencyMs: 148,
    timestamp: '14 mins ago',
    summary: 'Calendar dockage slot locked across WordPress fleet. Manifest created.',
  },
  {
    id: 'log-103',
    workflowName: 'Fleet TLS & Latency Health Prober',
    trigger: 'DNS Health Probe: 4 Web Domains',
    status: 'Completed',
    latencyMs: 82,
    timestamp: '1 hour ago',
    summary: 'All domains 100% reachable. TLS certificates valid (>42 days).',
  },
];

const PRESET_TRIGGERS = [
  'Inbound Message on WhatsApp Business',
  'Direct Message on Instagram',
  'New Booking Received from Viator / GetYourGuide',
  'Lead Form Submitted on Luxury Charter Website',
  'Deal Value Updated > $10,000 USD',
  'Website Latency TTFB Exceeds 800ms',
  'Software Subscription Renewal in 7 Days',
];

const PRESET_CONDITIONS = [
  'Estimated Deal Value > $5,000 USD',
  'Client Tier equals VIP or Preferred',
  'Selected Charter Date is within 14 Days',
  'Website SSL Expiry is under 30 Days',
  'Unassigned Lead in Queue > 15 Minutes',
];

const PRESET_ACTIONS = [
  'Generate Grounded AI Proposal & Stage in Inbox for Review',
  'Send Push Notification to Operations Lead & Assign Senior Concierge',
  'Lock Dockage Slot & Synchronize OTA Availability Calendar',
  'Dispatch Urgent SMS Alert to Infrastructure On-Call Engineer',
  'Create High-Priority Follow-Up Task in CRM Pipeline',
];

export function WorkflowsView({ workflows, onToggleWorkflow, onAddWorkflow }: WorkflowsViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState(PRESET_TRIGGERS[0]);
  const [condition, setCondition] = useState(PRESET_CONDITIONS[0]);
  const [action, setAction] = useState(PRESET_ACTIONS[0]);

  // Execution Simulator State
  const [simulatingWf, setSimulatingWf] = useState<WorkflowRule | null>(null);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>(INITIAL_LOGS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAddWorkflow({
      id: `wf-${Date.now()}`,
      name,
      trigger,
      condition,
      action,
      isActive: true,
      executionsCount: 0,
    });

    setName('');
    setModalOpen(false);
  };

  const handleRunSimulation = (wf: WorkflowRule) => {
    setSimulatingWf(wf);
    setSimulationStep(1);
    setSimulationLogs([`[0ms] INGEST_EVENT: Trigger received "${wf.trigger}"`]);

    setTimeout(() => {
      setSimulationStep(2);
      setSimulationLogs((prev) => [
        ...prev,
        `[120ms] EVALUATE_RULE: Evaluating predicate "${wf.condition}"... RESULT: TRUE`,
      ]);
    }, 600);

    setTimeout(() => {
      setSimulationStep(3);
      setSimulationLogs((prev) => [
        ...prev,
        `[240ms] DISPATCH_AGENT: Executing governed action "${wf.action}"`,
        `[310ms] AI_GROUNDING: Verified tariff schedule from DIAMONDS catalog`,
      ]);
    }, 1200);

    setTimeout(() => {
      setSimulationStep(4);
      setSimulationLogs((prev) => [
        ...prev,
        `[380ms] GOVERNANCE_GATE: Staged in human review queue. Zero unsupervised external dispatch.`,
        `[400ms] STATUS_SUCCESS: Workflow run finalized in 400ms.`,
      ]);

      // Add to audit logs
      const newLog: ExecutionLog = {
        id: `log-${Date.now()}`,
        workflowName: wf.name,
        trigger: wf.trigger,
        status: 'Staged for Approval',
        latencyMs: 400,
        timestamp: 'Just now',
        summary: `Simulated run of "${wf.name}" completed successfully.`,
      };
      setExecutionLogs((prev) => [newLog, ...prev]);
    }, 1800);
  };

  const closeSimulation = () => {
    setSimulatingWf(null);
    setSimulationStep(0);
    setSimulationLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Workflow Automation & Governed AI Engine
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Orchestrate business triggers, conditional logic, and AI actions with strict human authorization.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow Rule</span>
        </button>
      </div>

      {/* Governance Banner */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-white">Governed Execution Protocol Active</div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            All customer-facing messages, quotations, and operational commitments generated by DIAMONDS workflows require explicit operator authorization before transmission.
          </p>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="p-5 rounded-xl bg-[#080D17] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Workflow className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="text-sm font-bold text-white">{wf.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                  {wf.executionsCount} executions
                </span>
                {wf.isActive ? (
                  <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-white/5">
                    Paused
                  </span>
                )}
              </div>

              {/* Step Flow Visualization */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-white/[0.04] text-sky-300">
                  ON: {wf.trigger}
                </span>
                <span className="text-slate-500">→</span>
                <span className="px-2 py-1 rounded bg-white/[0.04] text-slate-300">
                  IF: {wf.condition}
                </span>
                <span className="text-slate-500">→</span>
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  THEN: {wf.action}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <button
                onClick={() => handleRunSimulation(wf)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Simulate Run</span>
              </button>

              <button
                onClick={() => onToggleWorkflow(wf.id)}
                className="text-slate-300 hover:text-white transition-colors"
                title={wf.isActive ? 'Pause Workflow' : 'Activate Workflow'}
              >
                {wf.isActive ? (
                  <ToggleRight className="w-7 h-7 text-[#38BDF8]" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Execution Audit Log Ledger */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="text-sm font-bold text-white">Live Workflow Audit & Telemetry Ledger</h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Real-time traces</span>
        </div>

        <div className="divide-y divide-white/5 text-xs">
          {executionLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{log.workflowName}</span>
                  <span className="text-slate-500">·</span>
                  <span className="font-mono text-[11px] text-slate-400">{log.trigger}</span>
                </div>
                <div className="text-[11px] text-slate-400">{log.summary}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <span className="text-[10px] font-mono text-slate-500">{log.latencyMs}ms</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    log.status === 'Completed'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                      : log.status === 'Staged for Approval'
                      ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                      : 'bg-white/5 text-slate-400 border-white/10'
                  }`}
                >
                  {log.status}
                </span>
                <span className="text-[10px] text-slate-500">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Runner Modal */}
      {simulatingWf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={closeSimulation} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-xl border border-white/15 bg-[#0B101B] p-6 text-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="text-sm font-bold text-white">
                  Workflow Execution Simulator
                </h3>
              </div>
              <button onClick={closeSimulation} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepped Progress Bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded border ${simulationStep >= 1 ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white font-bold' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}>
                1. Ingest Event
              </div>
              <div className={`p-2 rounded border ${simulationStep >= 2 ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white font-bold' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}>
                2. Check Rule
              </div>
              <div className={`p-2 rounded border ${simulationStep >= 3 ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white font-bold' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}>
                3. Dispatch Action
              </div>
              <div className={`p-2 rounded border ${simulationStep >= 4 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold' : 'border-white/5 bg-white/[0.02] text-slate-500'}`}>
                4. Gate & Ledger
              </div>
            </div>

            {/* Simulated Terminal Output */}
            <div className="rounded-lg bg-[#070A10] border border-white/10 p-3.5 font-mono text-xs space-y-1.5 h-44 overflow-y-auto">
              <div className="text-[10px] text-slate-500 pb-1 border-b border-white/5 flex items-center justify-between">
                <span>DIAMONDS WORKFLOW KERNEL v4.2</span>
                <span>TARGET: {simulatingWf.name}</span>
              </div>
              {simulationLogs.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.includes('STATUS_SUCCESS')
                      ? 'text-emerald-400 font-bold'
                      : line.includes('GOVERNANCE_GATE')
                      ? 'text-amber-300'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))}
              {simulationStep < 4 && (
                <div className="flex items-center gap-2 text-sky-400 animate-pulse pt-1">
                  <span>Executing next pipeline stage...</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={closeSimulation}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
              >
                Close Runner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Workflow Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white">Create Governed Workflow Rule</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Workflow Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. VIP WhatsApp Fast-Track"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Trigger Event</label>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070A10] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {PRESET_TRIGGERS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Condition Predicate</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070A10] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {PRESET_CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Governed Automated Action</label>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#070A10] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  {PRESET_ACTIONS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold hover:bg-[#7dd3fc]"
                >
                  Save & Deploy Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
