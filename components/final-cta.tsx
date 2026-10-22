'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './brand-icon';

interface FinalCtaProps {
  onOpenEarlyAccess: (email?: string) => void;
}

export function FinalCta({ onOpenEarlyAccess }: FinalCtaProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid business email.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0B101B] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-950/25 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BrandLogo className="mb-6 justify-center" />

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
          Bring your digital operations into one connected workspace.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop losing momentum across fractured tools. Register your interest for private preview access to DIAMONDS and experience unified business management.
        </p>

        {submitted ? (
          <div className="mt-10 p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 max-w-md mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Early Access Request Recorded</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We have added <span className="text-white font-medium">{email}</span> to the onboarding queue. Our customer architecture team will notify you prior to cohort launch.
            </p>
          </div>
        ) : (
          <div className="mt-10 max-w-md mx-auto">
            {error && (
              <div className="mb-3 text-xs text-rose-400 text-left">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-sky-500/10"
              >
                <span>Request Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No credit card required
              </span>
              <span>·</span>
              <button
                onClick={() => onOpenEarlyAccess(email)}
                className="hover:text-white underline transition-colors"
              >
                Complete detailed questionnaire
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
