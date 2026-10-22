'use client';

import React, { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Plus,
  Database,
  Code,
  CheckCircle,
  Copy,
  ExternalLink,
  X,
  UserCheck,
  Lock,
  Key,
  ShieldAlert,
  Sliders,
  Check,
  Activity
} from 'lucide-react';
import { TeamMember } from '@/lib/workspace-data';
import { useAuth } from '@/lib/auth-context';

interface SettingsViewProps {
  team: TeamMember[];
  onInviteMember: (member: TeamMember) => void;
}

type SimulatedRole = 'Owner' | 'Operations Director' | 'Concierge Agent' | 'Compliance Auditor';

interface SecurityAuditEvent {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  verified: boolean;
}

const INITIAL_AUDIT_LOGS: SecurityAuditEvent[] = [
  {
    id: 'sec-801',
    actor: 'Marcus Vance (Owner)',
    action: 'Authorized AI Charter Proposal (Gemini 3.8 Flash)',
    resource: 'Conversation: Eleonora Grimaldi',
    ipAddress: '185.122.90.41 (Monaco)',
    timestamp: '8 mins ago',
    verified: true,
  },
  {
    id: 'sec-802',
    actor: 'Elena Rostova (Operations)',
    action: 'Synchronized OTA Inventory & Tariff Rates',
    resource: 'Viator / GetYourGuide Marketplace',
    ipAddress: '84.17.44.12 (Zurich)',
    timestamp: '42 mins ago',
    verified: true,
  },
  {
    id: 'sec-803',
    actor: 'Marcus Vance (Owner)',
    action: 'Supabase PostgreSQL RLS Policy Validation',
    resource: 'Schema: public.workspaces',
    ipAddress: '185.122.90.41 (Monaco)',
    timestamp: '2 hours ago',
    verified: true,
  },
  {
    id: 'sec-804',
    actor: 'Julian Croft (Tech Lead)',
    action: 'Executed WordPress Fleet TLS Diagnostic Probe',
    resource: 'Domain: luxurycharters-med.com',
    ipAddress: '194.230.144.5 (Geneva)',
    timestamp: '4 hours ago',
    verified: true,
  },
];

export function SettingsView({ team, onInviteMember }: SettingsViewProps) {
  const { user, currentWorkspace } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('Manager');
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  // Active Simulated Perspective
  const [activeRolePerspective, setActiveRolePerspective] = useState<SimulatedRole>('Owner');
  const [auditLogs, setAuditLogs] = useState<SecurityAuditEvent[]>(INITIAL_AUDIT_LOGS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    onInviteMember({
      id: `tm-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      avatarInitials: inviteName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      status: 'Active',
    });

    setInviteName('');
    setInviteEmail('');
    setModalOpen(false);
  };

  const sampleSqlSnippet = `-- DIAMONDS Multi-Tenant Row Level Security Policy
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their workspaces"
ON public.workspaces FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.workspace_members
  WHERE workspace_id = public.workspaces.id AND user_id = auth.uid()
));

CREATE POLICY "Workspace members can access customers"
ON public.customers FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.workspace_members
  WHERE workspace_id = public.customers.workspace_id AND user_id = auth.uid()
));`;

  const copySql = () => {
    navigator.clipboard.writeText(sampleSqlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rolePermissions: Record<SimulatedRole, { crm: string; inbox: string; fleet: string; billing: string; aiGovernance: string }> = {
    Owner: {
      crm: 'Full Access (Read / Write / Delete / Export)',
      inbox: 'Full Access & Signature Authority',
      fleet: 'Full Admin & DNS Configuration',
      billing: 'Full Invoicing & Subscription Management',
      aiGovernance: 'Unrestricted Authorization Authority',
    },
    'Operations Director': {
      crm: 'Full Access (Read / Write / Export)',
      inbox: 'Full Access & Proposal Approval',
      fleet: 'Operational Probing & WordPress Updates',
      billing: 'View Invoices Only',
      aiGovernance: 'Authorized to Sign Proposals & Triggers',
    },
    'Concierge Agent': {
      crm: 'Assigned Leads Only (Read / Update)',
      inbox: 'Assigned Conversations & AI Draft Staging',
      fleet: 'No Access (Hidden)',
      billing: 'No Access (Hidden)',
      aiGovernance: 'Can Generate Drafts; Requires Manager Sign-Off',
    },
    'Compliance Auditor': {
      crm: 'Read-Only Anonymized Data',
      inbox: 'Audit Log Tracing Only',
      fleet: 'Read-Only SSL & Security Reports',
      billing: 'Read-Only Financial Statements',
      aiGovernance: 'Audit Log & Timestamp Verification',
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Workspace Governance & Multi-Tenant Control
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure enterprise role-based access control, PostgreSQL data isolation, and verified security audit trails.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* Role-Based Access Control (RBAC) Simulator */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#38BDF8]" />
            <div>
              <h2 className="text-sm font-bold text-white">Role-Based Access Control (RBAC) Matrix</h2>
              <p className="text-xs text-slate-400">
                Simulate how DIAMONDS enforces permission boundaries across distinct corporate roles.
              </p>
            </div>
          </div>

          {/* Role Perspective Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10 text-xs">
            {(['Owner', 'Operations Director', 'Concierge Agent', 'Compliance Auditor'] as SimulatedRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRolePerspective(r)}
                className={`px-2.5 py-1 rounded font-semibold transition-colors text-[11px] ${
                  activeRolePerspective === r
                    ? 'bg-[#38BDF8] text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Permission Card for Active Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">CRM & Pipeline</span>
            <div className="text-white font-medium">{rolePermissions[activeRolePerspective].crm}</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Omnichannel Inbox</span>
            <div className="text-white font-medium">{rolePermissions[activeRolePerspective].inbox}</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Digital Fleet & DNS</span>
            <div className="text-white font-medium">{rolePermissions[activeRolePerspective].fleet}</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Billing & Invoices</span>
            <div className="text-white font-medium">{rolePermissions[activeRolePerspective].billing}</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">AI Governance Sign-Off</span>
            <div className="text-[#38BDF8] font-medium">{rolePermissions[activeRolePerspective].aiGovernance}</div>
          </div>
        </div>
      </div>

      {/* Supabase Database Architecture Card */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Supabase PostgreSQL Architecture</h2>
              <p className="text-xs text-slate-400">
                Multi-tenant data isolation with complete Row Level Security (RLS) enforcement.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-400">Schema Ready</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-mono text-[11px]">lib/supabase/schema.sql</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Database Driver</span>
            <div className="text-white font-medium">@supabase/supabase-js & @supabase/ssr</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Row Level Security</span>
            <div className="text-emerald-400 font-medium">Enforced by Tenant ID</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Workspace</span>
            <div className="text-white font-medium">{currentWorkspace.name} ({currentWorkspace.plan})</div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowSql(!showSql)}
            className="inline-flex items-center gap-1.5 text-[#38BDF8] hover:underline font-semibold"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showSql ? 'Hide Supabase Schema' : 'View Supabase RLS Schema'}</span>
          </button>
        </div>

        {showSql && (
          <div className="relative rounded-lg bg-[#070A10] border border-white/10 p-4 font-mono text-xs">
            <button
              onClick={copySql}
              className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-[11px] text-white"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy SQL'}</span>
            </button>
            <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap">{sampleSqlSnippet}</pre>
          </div>
        )}
      </div>

      {/* Team Roster */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="text-sm font-bold text-white">Team Members & Seat Allocations</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">{team.length} / 10 Active Seats</span>
        </div>

        <div className="divide-y divide-white/5">
          {team.map((member) => (
            <div key={member.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                  {member.avatarInitials}
                </div>
                <div>
                  <div className="font-semibold text-white">{member.name}</div>
                  <div className="text-[11px] text-slate-400">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  {member.role}
                </span>
                <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Audit Trail */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="text-sm font-bold text-white">Security & Authorization Audit Trail</h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Immutable cryptographic trace</span>
        </div>

        <div className="divide-y divide-white/5 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{log.action}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-[11px] text-[#38BDF8]">{log.resource}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Actor: <span className="text-slate-300">{log.actor}</span> · Origin: <span className="font-mono text-slate-500">{log.ipAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white">Invite Team Member</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.rostova@diamonds-luxury.com"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assigned Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMember['role'])}
                  className="w-full px-3 py-2 rounded-lg bg-[#070A10] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="Admin">Admin (Full Operational Control)</option>
                  <option value="Manager">Manager (CRM, Inbound & Fleet Operations)</option>
                  <option value="Agent">Agent (Assigned Leads & Inbox Drafting)</option>
                  <option value="Auditor">Auditor (Read-Only Financials & Traces)</option>
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
                  Dispatch Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
