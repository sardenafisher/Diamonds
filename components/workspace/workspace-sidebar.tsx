'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Globe,
  Compass,
  Workflow,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  Activity,
  Sparkles,
  Bot,
  ExternalLink
} from 'lucide-react';

export type WorkspaceTab =
  | 'overview'
  | 'crm'
  | 'inbox'
  | 'websites'
  | 'bookings'
  | 'workflows'
  | 'analytics'
  | 'subscriptions'
  | 'settings';

interface WorkspaceSidebarProps {
  currentTab: WorkspaceTab;
  onSelectTab: (tab: WorkspaceTab) => void;
  unreadCount?: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavGroup {
  groupTitle: string;
  items: {
    id: WorkspaceTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    shortcut?: string;
    statusDot?: boolean;
    isAi?: boolean;
  }[];
}

export function WorkspaceSidebar({
  currentTab,
  onSelectTab,
  unreadCount = 1,
  isOpenMobile,
  onCloseMobile,
}: WorkspaceSidebarProps) {
  const navGroups: NavGroup[] = [
    {
      groupTitle: 'Core ERP & Intelligence',
      items: [
        { id: 'overview', label: 'Overview Cockpit', icon: LayoutDashboard, shortcut: '⌘1' },
        { id: 'crm', label: 'CRM & Pipelines', icon: Users, shortcut: '⌘2' },
        {
          id: 'inbox',
          label: 'Omnichannel Inbox',
          icon: MessageSquare,
          badge: unreadCount > 0 ? `${unreadCount}` : undefined,
          shortcut: '⌘3',
        },
        { id: 'analytics', label: 'Analytics & BI', icon: BarChart3, shortcut: '⌘4' },
      ],
    },
    {
      groupTitle: 'Digital Assets & Channels',
      items: [
        { id: 'websites', label: 'Websites Fleet', icon: Globe, shortcut: '⌘5' },
        { id: 'bookings', label: 'Bookings & OTA', icon: Compass, shortcut: '⌘6' },
      ],
    },
    {
      groupTitle: 'AI Studio & Automations',
      items: [
        {
          id: 'workflows',
          label: 'AI Agents & Flows',
          icon: Bot,
          statusDot: true,
          shortcut: '⌘7',
          isAi: true,
        },
      ],
    },
    {
      groupTitle: 'Finance & Governance',
      items: [
        { id: 'subscriptions', label: 'Subscriptions & Costs', icon: CreditCard, shortcut: '⌘8' },
        { id: 'settings', label: 'Settings & RBAC', icon: Settings, shortcut: '⌘9' },
      ],
    },
  ];

  const handleSelect = (tab: WorkspaceTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#0A1324] border-r border-[#1E2E4A]/80 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list with custom scrollbar */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.groupTitle}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-[#1A5FA8]/25 text-[#38BDF8] border border-[#38BDF8]/30 shadow-[0_0_12px_rgba(56,189,248,0.15)] font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#38BDF8]'
                              : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#2489DA]/20 text-[#38BDF8] border border-[#2489DA]/40 font-bold">
                            {item.badge}
                          </span>
                        )}

                        {item.statusDot && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            ACTIVE
                          </span>
                        )}

                        {item.shortcut && !item.badge && !item.statusDot && (
                          <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Platform Info Box - Genie ERP Style */}
        <div className="p-3 m-3 rounded-xl bg-[#070E1A]/80 border border-[#1E2E4A] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-white font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase Enterprise</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400">
              <Activity className="w-2.5 h-2.5" />
              11ms
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Multi-tenant PostgreSQL RLS active with real-time audit ledger.
          </p>
          <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
            <span>Tenant: <strong className="text-white font-normal">prod_diamonds</strong></span>
            <span className="text-[#38BDF8]">v4.5 Genie</span>
          </div>
        </div>
      </aside>
    </>
  );
}
