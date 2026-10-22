'use client';

import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import { BrandLogo } from '../brand-icon';
import { useAuth } from '@/lib/auth-context';

interface WorkspaceHeaderProps {
  onOpenNewCustomer?: () => void;
  mobileMenuToggle: () => void;
}

export function WorkspaceHeader({ onOpenNewCustomer, mobileMenuToggle }: WorkspaceHeaderProps) {
  const { user, workspaces, currentWorkspace, switchWorkspace, signOut, isConfigured } = useAuth();
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="h-16 border-b border-white/10 bg-[#080D17] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
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

        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-semibold text-white hover:bg-white/[0.08] transition-colors"
          >
            <div className="w-5 h-5 rounded bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center font-bold text-[10px]">
              {currentWorkspace.name.charAt(0)}
            </div>
            <span className="truncate max-w-[140px] sm:max-w-[180px]">
              {currentWorkspace.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {workspaceDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0B101B] p-2 shadow-2xl z-50 text-xs">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Workspaces ({workspaces.length})
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
                        ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-semibold leading-snug">{ws.name}</div>
                      <div className="text-[10px] text-slate-400">{ws.plan} Plan</div>
                    </div>
                    {ws.id === currentWorkspace.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-white/5 px-1">
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Tenant Isolation Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Quick Search Simulator */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            readOnly
            value=""
            placeholder="Search records, deals, websites, bookings... (⌘K)"
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Right: Actions, Public Link, User Menu */}
      <div className="flex items-center gap-3">
        {/* Client Portal Link */}
        <Link
          href="/experience"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 hover:bg-[#38BDF8]/20 transition-colors"
        >
          <span>Client Booking Portal</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Public Site Link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-2 py-1"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* User Account Menu */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/15 flex items-center justify-center text-xs font-bold text-white">
              {user ? user.fullName.split(' ').map((n) => n[0]).join('') : 'U'}
            </div>
            <div className="text-left hidden lg:block text-xs">
              <div className="font-semibold text-white leading-tight">
                {user ? user.fullName : 'Guest'}
              </div>
              <div className="text-[10px] text-slate-400">{user?.role || 'Member'}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0B101B] p-2 shadow-2xl z-50 text-xs">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <div className="font-semibold text-white">{user?.fullName}</div>
                <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
              </div>
              <div className="space-y-0.5">
                <div className="px-3 py-1.5 text-[11px] text-slate-400">
                  Role: <span className="text-white font-medium">{user?.role}</span>
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
  );
}
