'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../brand-icon';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export function EarlyAccessModal({ isOpen, onClose, initialPlan = 'Professional' }: EarlyAccessModalProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('6–25');
  const [focusArea, setFocusArea] = useState('Omnichannel CRM & Operations');
  const [selectedPlanOverride, setSelectedPlanOverride] = useState<string | null>(null);
  const plan = selectedPlanOverride ?? initialPlan;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid work email address.');
      return;
    }
    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setFullName('');
    setCompanyName('');
    setSelectedPlanOverride(null);
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0B101B] p-6 sm:p-8 text-slate-200 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 id="early-access-title" className="text-xl font-bold text-white mb-2">
              Early Access Request Received
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <span className="text-white font-medium">{fullName}</span>. Your registration for the{' '}
              <span className="text-[#38BDF8] font-medium">{plan}</span> workspace tier has been recorded. Our team reviews submissions on a rolling basis to ensure onboarding availability.
            </p>
            <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 text-left text-xs text-slate-400 mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span>Confirmation Email</span>
                <span className="text-slate-200">{email}</span>
              </div>
              <div className="flex justify-between">
                <span>Workspace Tier</span>
                <span className="text-slate-200">{plan} Tier</span>
              </div>
              <div className="flex justify-between">
                <span>Operational Focus</span>
                <span className="text-slate-200">{focusArea}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/5">
                <span>Status</span>
                <span className="text-emerald-400 font-medium">Waitlist Position Confirmed</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <BrandLogo className="mb-4" />
              <h2 id="early-access-title" className="text-2xl font-bold tracking-tight text-white">
                Request Early Access
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Join our private customer preview. We will contact you when your workspace cohort opens.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullname" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Aura Digital Group"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@company.com"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="teamsize" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Team Size
                  </label>
                  <select
                    id="teamsize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  >
                    <option value="1–5">1–5 team members</option>
                    <option value="6–25">6–25 team members</option>
                    <option value="26–100">26–100 team members</option>
                    <option value="100+">100+ enterprise</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="plan" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Preferred Tier
                  </label>
                  <select
                    id="plan"
                    value={plan}
                    onChange={(e) => setSelectedPlanOverride(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                  >
                    <option value="Starter">Starter Workspace</option>
                    <option value="Professional">Professional Growth</option>
                    <option value="Enterprise">Enterprise Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="focusarea" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Primary Digital Priority
                </label>
                <select
                  id="focusarea"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                >
                  <option value="Omnichannel CRM & Operations">Omnichannel CRM & Customer Messaging</option>
                  <option value="Websites & WordPress Infrastructure">Websites, WordPress & Domain Management</option>
                  <option value="Tour & Booking Marketplace Distribution">Tour & Activity Booking Distribution</option>
                  <option value="Automated Workflows & Business AI">Workflow Automation & Governed AI</option>
                  <option value="All-in-One Unified Suite">All-in-One Unified Suite</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#38BDF8] text-slate-950 font-semibold text-sm hover:bg-[#7dd3fc] transition-colors"
                >
                  <span>Submit Early Access Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-normal">
                By registering, you agree to receive onboarding updates from DIAMONDS. No credit card required.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
