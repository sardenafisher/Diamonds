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
  Layers
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

export function WorkspaceSidebar({
  currentTab,
  onSelectTab,
  unreadCount = 1,
  isOpenMobile,
  onCloseMobile,
}: WorkspaceSidebarProps) {
  const menuItems = [
    { id: 'overview' as WorkspaceTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'crm' as WorkspaceTab, label: 'CRM & Pipelines', icon: Users },
    {
      id: 'inbox' as WorkspaceTab,
      label: 'Omnichannel Inbox',
      icon: MessageSquare,
      badge: unreadCount > 0 ? `${unreadCount}` : undefined,
    },
    { id: 'websites' as WorkspaceTab, label: 'Websites & Hosting', icon: Globe },
    { id: 'bookings' as WorkspaceTab, label: 'Bookings & Tours', icon: Compass },
    {
      id: 'workflows' as WorkspaceTab,
      label: 'Workflows & AI',
      icon: Workflow,
      statusDot: true,
    },
    { id: 'analytics' as WorkspaceTab, label: 'Analytics & BI', icon: BarChart3 },
    { id: 'subscriptions' as WorkspaceTab, label: 'Subscriptions & Costs', icon: CreditCard },
    { id: 'settings' as WorkspaceTab, label: 'Settings & Team', icon: Settings },
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#090E18] border-r border-white/10 p-4 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Digital Operations
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800/40">
                      {item.badge}
                    </span>
                  )}

                  {item.statusDot && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Platform Info Box */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-white font-semibold text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Engine</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            Multi-tenant Row Level Security policies active across all tables.
          </p>
        </div>
      </aside>
    </>
  );
}
