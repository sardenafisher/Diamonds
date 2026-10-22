'use client';

import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { BrandLogo } from '../brand-icon';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'security';
}

export function LegalModal({ isOpen, onClose, defaultTab = 'terms' }: LegalModalProps) {
  const [tabOverride, setTabOverride] = useState<'privacy' | 'terms' | 'security' | null>(null);
  const activeTab = tabOverride ?? defaultTab;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl border border-white/10 bg-[#0B101B] p-6 sm:p-8 text-slate-200 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4">
          <BrandLogo className="mb-3" />
          <h2 id="legal-modal-title" className="text-xl font-bold text-white">
            Governance & Legal Information
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Phase 1 Platform Preview Documentation & Operating Principles
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-white/10 gap-2 mb-4 text-xs font-medium">
          <button
            onClick={() => setTabOverride('terms')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-[#38BDF8] text-[#38BDF8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
          <button
            onClick={() => setTabOverride('privacy')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-[#38BDF8] text-[#38BDF8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <button
            onClick={() => setTabOverride('security')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-[#38BDF8] text-[#38BDF8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Security & Compliance
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pr-2 text-xs text-slate-300 space-y-4 leading-relaxed">
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">1. Platform Preview & Subscription Model</h4>
              <p>
                DIAMONDS is provided as a software-as-a-service platform for commercial business management. Features described across marketing materials reflect the product roadmap and architectural design of the unified operating system.
              </p>
              <h4 className="font-semibold text-white text-sm">2. Human-in-the-Loop Governance</h4>
              <p>
                All automated assistants and drafted communications provided by DIAMONDS are subject to authorized human review before transmission, ensuring that the business retains absolute authority over customer correspondence.
              </p>
              <h4 className="font-semibold text-white text-sm">3. Third-Party Integrations</h4>
              <p>
                Connectivity with third-party networks, messaging protocols, marketplace distribution APIs, and hosting providers is subject to the respective external providers terms and operational availability.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">1. Customer Data Confidentiality</h4>
              <p>
                DIAMONDS does not monetize, sell, or cross-train models on customer data. Business records, conversational records, and billing parameters remain the exclusive property of the subscribing tenant.
              </p>
              <h4 className="font-semibold text-white text-sm">2. Workspace Isolation</h4>
              <p>
                Every subscriber account operates in an isolated workspace container with strict tenant boundary enforcement and role-based permissions.
              </p>
              <h4 className="font-semibold text-white text-sm">3. Inbound Inquiry Processing</h4>
              <p>
                Customer messages received through authorized web hooks and messaging channels are processed solely to populate CRM records and generate suggested response drafts for authorized review.
              </p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">1. Encryption at Rest & in Transit</h4>
              <p>
                All network traffic is encrypted using TLS 1.3. Stored database records and sensitive API secrets are secured with AES-256 encryption.
              </p>
              <h4 className="font-semibold text-white text-sm">2. Role-Based Access Control (RBAC)</h4>
              <p>
                Subscribers can configure granular team privileges, ensuring that support staff, sales managers, and administrators only access permissible modules.
              </p>
              <h4 className="font-semibold text-white text-sm">3. Auditability</h4>
              <p>
                All automation executions and dispatch actions log an immutable trace showing the initiating trigger and reviewing team member.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
