'use client';

import React, { useState } from 'react';
import { WorkspaceHeader } from '@/components/workspace/workspace-header';
import { WorkspaceSidebar, WorkspaceTab } from '@/components/workspace/workspace-sidebar';
import { OverviewView } from '@/components/workspace/views/overview-view';
import { CrmView } from '@/components/workspace/views/crm-view';
import { InboxView } from '@/components/workspace/views/inbox-view';
import { WebsitesView } from '@/components/workspace/views/websites-view';
import { BookingsView } from '@/components/workspace/views/bookings-view';
import { WorkflowsView } from '@/components/workspace/views/workflows-view';
import { AnalyticsView } from '@/components/workspace/views/analytics-view';
import { SubscriptionsView } from '@/components/workspace/views/subscriptions-view';
import { SettingsView } from '@/components/workspace/views/settings-view';
import {
  INITIAL_CUSTOMERS,
  INITIAL_CONVERSATIONS,
  INITIAL_WEBSITES,
  INITIAL_BOOKINGS,
  INITIAL_WORKFLOWS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_TEAM,
  Customer,
  Conversation,
  ConversationMessage,
  WebsiteAsset,
  TourBooking,
  WorkflowRule,
  SoftwareSubscription,
  TeamMember,
} from '@/lib/workspace-data';
import { useAuth } from '@/lib/auth-context';
import { BrandLogo } from '@/components/brand-icon';
import { ArrowRight, Lock, Sparkles, UserCheck, Shield, Bot, Zap } from 'lucide-react';
import Link from 'next/link';

export default function WorkspacePage() {
  const { user, signIn, signUp, demoLogin } = useAuth();
  const [currentTab, setCurrentTab] = useState<WorkspaceTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core operational datasets with live state mutations
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [websites, setWebsites] = useState<WebsiteAsset[]>(INITIAL_WEBSITES);
  const [bookings, setBookings] = useState<TourBooking[]>(INITIAL_BOOKINGS);
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS);
  const [subscriptions, setSubscriptions] = useState<SoftwareSubscription[]>(INITIAL_SUBSCRIPTIONS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  // Selected chat conversation in Inbox
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    INITIAL_CONVERSATIONS[0].id
  );

  // Auth gate form state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authCompany, setAuthCompany] = useState('');
  const [authError, setAuthError] = useState('');

  // Count unread conversations
  const unreadCount = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  // Handlers
  const handleAddCustomer = (newCustomer: Omit<Customer, 'id' | 'createdAt'>) => {
    const created: Customer = {
      ...newCustomer,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCustomers([created, ...customers]);
  };

  const handleOpenInboxForCustomer = (customerId: string) => {
    const existing = conversations.find((c) => c.customerId === customerId);
    if (existing) {
      setSelectedConversationId(existing.id);
    } else {
      const targetCustomer = customers.find((c) => c.id === customerId);
      if (targetCustomer) {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          customerId: targetCustomer.id,
          customerName: targetCustomer.fullName,
          customerEmail: targetCustomer.email,
          channel: 'whatsapp',
          status: 'open',
          unreadCount: 0,
          lastMessage: 'Conversation initialized from CRM.',
          lastMessageTime: 'Just now',
          messages: [
            {
              id: `msg-${Date.now()}`,
              senderType: 'agent',
              senderName: user ? user.fullName : 'Marcus Vance',
              content: `Hello ${targetCustomer.fullName}, thank you for your inquiry. How may we assist your team today?`,
              timestamp: 'Just now',
              isApproved: true,
            },
          ],
        };
        setConversations([newConv, ...conversations]);
        setSelectedConversationId(newConv.id);
      }
    }
    setCurrentTab('inbox');
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderType: 'agent' as const,
            senderName: user ? user.fullName : 'Marcus Vance',
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isApproved: true,
          };
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const handleApproveDraft = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const updatedMessages = c.messages.map((m) => {
            if (m.isAiDraft) {
              return {
                ...m,
                senderType: 'agent' as const,
                senderName: `${user ? user.fullName : 'Marcus Vance'} (Approved)`,
                isAiDraft: false,
                isApproved: true,
              };
            }
            return m;
          });
          return {
            ...c,
            unreadCount: 0,
            lastMessage: 'AI Draft Authorized & Dispatched to client via WhatsApp',
            lastMessageTime: 'Just now',
            messages: updatedMessages,
          };
        }
        return c;
      })
    );
  };

  const handleEditDraft = (conversationId: string, newText: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const updatedMessages = c.messages.map((m) => {
            if (m.isAiDraft) {
              return {
                ...m,
                content: newText,
              };
            }
            return m;
          });
          return {
            ...c,
            messages: updatedMessages,
          };
        }
        return c;
      })
    );
  };

  const handleAddAiDraft = (conversationId: string, draftText: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const cleanMsgs = c.messages.filter((m) => !(m.isAiDraft && !m.isApproved));
          const newDraftMsg: ConversationMessage = {
            id: `msg-ai-${Date.now()}`,
            senderType: 'ai_assistant',
            senderName: 'DIAMONDS AI (Gemini 3.8 Flash)',
            content: draftText,
            timestamp: 'Just now',
            isAiDraft: true,
            isApproved: false,
          };
          return {
            ...c,
            lastMessage: 'AI Grounded Proposal Generated (Pending Authorization)',
            lastMessageTime: 'Just now',
            messages: [...cleanMsgs, newDraftMsg],
          };
        }
        return c;
      })
    );
  };

  const handleSimulateInbound = (channel: 'whatsapp' | 'instagram' | 'email') => {
    const timestamp = Date.now();
    const presets = {
      whatsapp: {
        name: 'Eleonora Grimaldi',
        company: 'Grimaldi Heritage Foundation',
        email: 'e.grimaldi@grimaldi-heritage.mc',
        phone: '+377 98 06 20 00',
        stage: 'Negotiation' as const,
        source: 'WhatsApp' as const,
        inquiry: 'Good afternoon. Inquiring regarding private Riva charter for 8 guests from Monaco Port Hercule to Portofino with onboard sommelier on Oct 14.',
      },
      instagram: {
        name: 'Lucas Moreau',
        company: 'Moreau Capital Geneva',
        email: 'l.moreau@moreau-cap.ch',
        phone: '+41 22 819 9000',
        stage: 'New Lead' as const,
        source: 'Instagram' as const,
        inquiry: 'Saw your private jet charter dispatch for the St. Moritz winter opening. Do you manage direct helicopter helipad transfers to Kulm Hotel?',
      },
      email: {
        name: 'Dr. Heinrich Weber',
        company: 'Weber Precision Bio',
        email: 'h.weber@weber-bio.de',
        phone: '+49 89 2444 8000',
        stage: 'Proposal' as const,
        source: 'Email' as const,
        inquiry: 'Requesting confidential executive itinerary for 14 board members in Lake Como villa next month, including security detail and private chef.',
      },
    };

    const chosen = presets[channel];
    const newCustId = `cust-${timestamp}`;
    const newConvId = `conv-${timestamp}`;

    const newCustomer: Customer = {
      id: newCustId,
      fullName: chosen.name,
      email: chosen.email,
      phone: chosen.phone,
      company: chosen.company,
      source: chosen.source,
      tier: 'VIP',
      lifetimeValue: 35000,
      dealStage: chosen.stage,
      dealValue: 35000,
      assignedAgent: 'Marcus Vance',
      notes: `Inbound simulation via ${chosen.source} channel gateway.`,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const newConversation: Conversation = {
      id: newConvId,
      customerId: newCustId,
      customerName: chosen.name,
      customerEmail: chosen.email,
      channel,
      status: 'open',
      unreadCount: 1,
      lastMessage: chosen.inquiry,
      lastMessageTime: 'Just now',
      messages: [
        {
          id: `msg-${timestamp}`,
          senderType: 'customer',
          senderName: chosen.name,
          content: chosen.inquiry,
          timestamp: 'Just now',
        },
        {
          id: `msg-ai-${timestamp}`,
          senderType: 'ai_assistant',
          senderName: 'DIAMONDS AI (Gemini 3.8 Flash)',
          content: `Dear ${chosen.name},\n\nThank you for reaching out to DIAMONDS Luxury Concierge regarding your upcoming requirements. We have verified exclusive availability and would be delighted to host your party with private sommelier pairings and priority berth clearance.\n\nShall we stage the detailed formal prospectus for your review?`,
          timestamp: 'Just now',
          isAiDraft: true,
          isApproved: false,
        },
      ],
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversationId(newConvId);
    setCurrentTab('inbox');
  };

  const handleAddWebsite = (site: WebsiteAsset) => {
    setWebsites([site, ...websites]);
  };

  const handleAddBooking = (booking: TourBooking) => {
    setBookings([booking, ...bookings]);
  };

  const handleToggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
  };

  const handleAddWorkflow = (rule: WorkflowRule) => {
    setWorkflows([rule, ...workflows]);
  };

  const handleAddSubscription = (sub: SoftwareSubscription) => {
    setSubscriptions([sub, ...subscriptions]);
  };

  const handleInviteMember = (member: TeamMember) => {
    setTeam([...team, member]);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'signin') {
      const res = await signIn(authEmail, authPassword);
      if (res?.error) setAuthError(res.error);
    } else {
      const res = await signUp(authEmail, authPassword, authName, authCompany);
      if (res?.error) setAuthError(res.error);
    }
  };

  // Auth gate check
  if (!user) {
    return (
      <div className="min-h-screen bg-[#070E1A] text-[#E2E8F0] flex flex-col justify-between p-4 sm:p-6">
        <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4">
          <Link href="/">
            <BrandLogo className="h-7" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Supabase PostgreSQL RLS Active
            </span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-md rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 sm:p-8 text-slate-200 shadow-2xl space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#2489DA]/15 border border-[#2489DA]/30 flex items-center justify-center text-[#38BDF8] mx-auto mb-3 shadow-[0_0_20px_rgba(36,137,218,0.3)]">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {authMode === 'signin' ? 'Sign in to DIAMONDS' : 'Create Organization Workspace'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials or launch an instant preview session.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            {/* Quick 1-Click Launch */}
            <div className="p-4 rounded-xl bg-[#0E1B33] border border-[#1E2E4A] space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                Instant Preview Access
              </span>
              <p className="text-xs text-slate-400 leading-normal">
                Test the live Genie ERP workspace immediately with pre-loaded demo records:
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => demoLogin('Owner')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#2489DA] text-white font-bold text-xs uppercase hover:bg-[#38BDF8] hover:text-slate-950 transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(36,137,218,0.3)]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Launch as Owner (Marcus)</span>
                </button>
                <button
                  type="button"
                  onClick={() => demoLogin('Manager')}
                  className="py-2 px-3 rounded-xl border border-[#1E2E4A] bg-[#070E1A] text-slate-200 font-semibold text-xs hover:border-[#38BDF8]/40 hover:text-white transition-colors"
                >
                  Elena (Manager)
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center text-xs text-slate-500 uppercase tracking-wider">
              <div className="border-t border-[#1E2E4A] w-full" />
              <span className="bg-[#0A1324] px-3 font-mono text-[10px]">Or with email</span>
              <div className="border-t border-[#1E2E4A] w-full" />
            </div>

            {/* Email form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={authCompany}
                      onChange={(e) => setAuthCompany(e.target.value)}
                      placeholder="DIAMONDS Holdings Monaco"
                      className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-slate-300 font-medium mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="marcus@diamonds-luxury.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2489DA] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-lg"
              >
                {authMode === 'signin' ? 'Sign In to Workspace' : 'Create Organization Workspace'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-400">
              {authMode === 'signin' ? (
                <div>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-[#38BDF8] hover:underline font-semibold"
                  >
                    Register new workspace
                  </button>
                </div>
              ) : (
                <div>
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="text-[#38BDF8] hover:underline font-semibold"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full text-center text-[11px] text-slate-400 pb-4">
          DIAMONDS Unified Operating System • Genie ERP Architecture
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070E1A] text-[#E2E8F0] flex flex-col font-sans">
      {/* Top Header */}
      <WorkspaceHeader
        mobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenNewCustomer={() => setCurrentTab('crm')}
        onNavigateTab={setCurrentTab}
        onSimulateInbound={handleSimulateInbound}
        unreadCount={unreadCount}
      />

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <WorkspaceSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          unreadCount={unreadCount}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Workspace Stage */}
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'overview' && (
            <OverviewView
              customers={customers}
              conversations={conversations}
              websites={websites}
              bookings={bookings}
              onNavigateTab={setCurrentTab}
              onApproveDraft={handleApproveDraft}
              onSimulateInbound={handleSimulateInbound}
            />
          )}

          {currentTab === 'crm' && (
            <CrmView
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onOpenInboxForCustomer={handleOpenInboxForCustomer}
            />
          )}

          {currentTab === 'inbox' && (
            <InboxView
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
              onSendMessage={handleSendMessage}
              onApproveDraft={handleApproveDraft}
              onEditDraft={handleEditDraft}
              onAddAiDraft={handleAddAiDraft}
              onSimulateInbound={handleSimulateInbound}
            />
          )}

          {currentTab === 'websites' && (
            <WebsitesView websites={websites} onAddWebsite={handleAddWebsite} />
          )}

          {currentTab === 'bookings' && (
            <BookingsView bookings={bookings} onAddBooking={handleAddBooking} />
          )}

          {currentTab === 'workflows' && (
            <WorkflowsView
              workflows={workflows}
              onToggleWorkflow={handleToggleWorkflow}
              onAddWorkflow={handleAddWorkflow}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView customers={customers} bookings={bookings} />
          )}

          {currentTab === 'subscriptions' && (
            <SubscriptionsView
              subscriptions={subscriptions}
              onAddSubscription={handleAddSubscription}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView team={team} onInviteMember={handleInviteMember} />
          )}
        </main>
      </div>
    </div>
  );
}
