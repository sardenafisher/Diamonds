'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  ChevronDown,
  ExternalLink,
  Shield,
  User,
  LogOut,
  Building,
  Check,
  Plus,
  Zap,
  Bot,
  MessageSquare,
  Globe,
  Compass,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from '../brand-icon';
import { useAuth } from '@/lib/auth-context';
import { WorkspaceTab } from './workspace-sidebar';

interface WorkspaceHeaderProps {
  onOpenNewCustomer?: () => void;
  mobileMenuToggle: () => void;
  onNavigateTab?: (tab: WorkspaceTab) => void;
  onSimulateInbound?: (channel: 'whatsapp' | 'instagram' | 'email') => void;
  unreadCount?: number;
}

export function WorkspaceHeader({
  onOpenNewCustomer,
  mobileMenuToggle,
  onNavigateTab,
  onSimulateInbound,
  unreadCount = 1,
}: WorkspaceHeaderProps) {
  const { user, workspaces, currentWorkspace, switchWorkspace, signOut } = useAuth();
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle keyboard shortcut Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchIndex = [
    { title: 'Elena Rostova', type: 'Customer', detail: 'Monte Carlo • $140,000 Pipeline', tab: 'crm' as WorkspaceTab },
    { title: 'Marcus Vance', type: 'Customer', detail: 'London / Dubai • $85,000 Pipeline', tab: 'crm' as WorkspaceTab },
    { title: 'Villa Amalfi VIP Charter', type: 'Conversation', detail: 'WhatsApp Business • High Intent', tab: 'inbox' as WorkspaceTab },
    { title: 'Supercar Alpine Tour Inquiry', type: 'Conversation', detail: 'Instagram Direct • Luxury Tier', tab: 'inbox' as WorkspaceTab },
    { title: 'amalfi-superyachts.com', type: 'Website Asset', detail: 'WordPress Enterprise • 99.98% Uptime', tab: 'websites' as WorkspaceTab },
    { title: 'swiss-alps-heli.com', type: 'Website Asset', detail: 'Headless Next.js • SSL Active', tab: 'websites' as WorkspaceTab },
    { title: 'Monaco GP Superyacht Berth', type: 'Booking', detail: 'Viator OTA • $42,000 Confirmed', tab: 'bookings' as WorkspaceTab },
    { title: 'St. Moritz Glacier Heli-Ski', type: 'Booking', detail: 'Direct Booking • $18,500 Confirmed', tab: 'bookings' as WorkspaceTab },
    { title: 'AI Concierge Dispatcher', type: 'AI Agent', detail: 'Trigger: High-ticket Lead • Active', tab: 'workflows' as WorkspaceTab },
  ];

  const filteredSearch = searchQuery.trim() === ''
    ? searchIndex.slice(0, 5)
    : searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const notifications = [
    { id: 1, title: 'Inbound WhatsApp Inquiry', desc: 'Elena Rostova sent dates for Monaco GP charter', time: '2m ago', unread: true },
    { id: 2, title: 'OTA Reservation Synced', desc: 'Viator confirmed 4 guests for Amalfi Coastal Cruise', time: '18m ago', unread: true },
    { id: 3, title: 'AI Agent Proposal Drafted', desc: 'Gemini 3.8 Flash generated quote for Marcus Vance', time: '45m ago', unread: false },
    { id: 4, title: 'Fleet Ping Check Complete', desc: '4/4 websites healthy with 99.98% uptime', time: '1h ago', unread: false },
  ];

  return (
    <>
      <header className="h-16 border-b border-[#1E2E4A]/80 bg-[#0A1324] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
        {/* Left: Brand + Workspace Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={mobileMenuToggle}
            className="lg:hidden p-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="hidden sm:block">
            <BrandLogo className="h-6" />
          </Link>

          {/* Workspace Switcher (Genie ERP Style) */}
          <div className="relative">
            <button
              onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-xs font-semibold text-white hover:border-[#38BDF8]/40 transition-colors"
            >
              <div className="w-5 h-5 rounded bg-[#2489DA]/20 text-[#38BDF8] flex items-center justify-center font-bold text-[10px] border border-[#2489DA]/30">
                {currentWorkspace.name.charAt(0)}
              </div>
              <span className="truncate max-w-[130px] sm:max-w-[170px]">
                {currentWorkspace.name}
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden md:inline">
                PROD
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {workspaceDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] p-2 shadow-2xl z-50 text-xs">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Organizations & Tenants ({workspaces.length})
                </div>
                <div className="space-y-1 my-1">
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        switchWorkspace(ws.id);
                        setWorkspaceDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        ws.id === currentWorkspace.id
                          ? 'bg-[#1A5FA8]/25 text-[#38BDF8] font-bold border border-[#38BDF8]/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-semibold leading-snug">{ws.name}</div>
                        <div className="text-[10px] text-slate-400">{ws.plan} Enterprise Tier</div>
                      </div>
                      {ws.id === currentWorkspace.id && <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/5 px-1">
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>PostgreSQL RLS Isolation Enforced</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Command Palette Trigger (Cmd+K) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#070E1A] border border-[#1E2E4A] text-xs text-slate-400 hover:border-[#38BDF8]/40 hover:text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick search ERP records, deals, sites, flows...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Inbound Simulation, Quick Create, Notifications, Portal, User */}
        <div className="flex items-center gap-2.5">
          {/* Inbound Omnichannel Simulator Button */}
          {onSimulateInbound && (
            <div className="relative hidden xl:flex items-center gap-1">
              <button
                onClick={() => onSimulateInbound('whatsapp')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold text-xs hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
                title="Simulate inbound WhatsApp inquiry"
              >
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>+ Inbound Lead</span>
              </button>
            </div>
          )}

          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setQuickCreateOpen(!quickCreateOpen)}
              className="px-2.5 py-1.5 rounded-lg bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(36,137,218,0.3)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {quickCreateOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] p-1.5 shadow-2xl z-50 text-xs">
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    if (onOpenNewCustomer) onOpenNewCustomer();
                    else if (onNavigateTab) onNavigateTab('crm');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white text-left"
                >
                  <User className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>New Customer Lead</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    if (onNavigateTab) onNavigateTab('bookings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>New Reservation</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    if (onNavigateTab) onNavigateTab('websites');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white text-left"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Deploy Website Asset</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    if (onNavigateTab) onNavigateTab('workflows');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-200 hover:bg-white/5 hover:text-white text-left"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Configure AI Agent Rule</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1.5 rounded-lg border border-[#1E2E4A] bg-[#070E1A] text-slate-400 hover:text-white hover:border-[#38BDF8]/40 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] ring-2 ring-[#0A1324] animate-pulse"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] p-3 shadow-2xl z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                  <span className="font-bold text-white text-xs">Operational Alerts</span>
                  <span className="text-[10px] font-mono text-[#38BDF8]">{notifications.filter(n => n.unread).length} New</span>
                </div>
                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg border transition-colors ${
                        n.unread
                          ? 'bg-[#1A5FA8]/15 border-[#38BDF8]/30 text-white'
                          : 'bg-white/[0.02] border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-medium text-[11px]">
                        <span>{n.title}</span>
                        <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Client Booking Portal Link */}
          <Link
            href="/experience"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#2489DA]/15 text-[#38BDF8] border border-[#38BDF8]/30 hover:bg-[#2489DA]/25 transition-colors"
          >
            <span>Client Portal</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* User Account Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#1A5FA8] border border-[#38BDF8]/40 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_8px_rgba(56,189,248,0.25)]">
                {user ? user.fullName.split(' ').map((n) => n[0]).join('') : 'U'}
              </div>
              <div className="text-left hidden xl:block text-xs">
                <div className="font-semibold text-white leading-tight">
                  {user ? user.fullName : 'Executive Admin'}
                </div>
                <div className="text-[10px] text-slate-400">{user?.role || 'Super Admin'}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] p-2 shadow-2xl z-50 text-xs">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="font-semibold text-white">{user?.fullName || 'Executive Admin'}</div>
                  <div className="text-[11px] text-slate-400 truncate">{user?.email || 'admin@diamonds-luxury.com'}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="px-3 py-1.5 text-[11px] text-slate-400">
                    Role: <span className="text-[#38BDF8] font-medium">{user?.role || 'Super Admin'}</span>
                  </div>
                  <div className="px-3 py-1.5 text-[11px] text-slate-400">
                    Database: <span className="text-emerald-400 font-medium">Supabase / PostgreSQL</span>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-white/5">
                  <button
                    onClick={() => {
                      signOut();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg text-left transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Universal Search Modal (Cmd+K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center p-4 pt-20">
          <div className="w-full max-w-xl rounded-2xl border border-[#1E2E4A] bg-[#0A1324] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3.5 border-b border-[#1E2E4A] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#38BDF8]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CRM deals, conversations, websites, bookings, AI rules..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ERP Search Results ({filteredSearch.length})
              </div>
              {filteredSearch.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchModalOpen(false);
                    if (onNavigateTab) onNavigateTab(item.tab);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1E2E4A]/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#2489DA]/15 border border-[#2489DA]/30 text-[#38BDF8] flex items-center justify-center font-bold text-xs">
                      {item.type === 'Customer' && <User className="w-3.5 h-3.5" />}
                      {item.type === 'Conversation' && <MessageSquare className="w-3.5 h-3.5" />}
                      {item.type === 'Website Asset' && <Globe className="w-3.5 h-3.5" />}
                      {item.type === 'Booking' && <Compass className="w-3.5 h-3.5" />}
                      {item.type === 'AI Agent' && <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 group-hover:text-slate-300">
                    <span>Jump</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <div className="p-2.5 border-t border-[#1E2E4A] bg-[#070E1A]/80 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-mono">ESC</kbd> to exit</span>
              <span className="text-[#38BDF8]">DIAMONDS Unified ERP Index</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
