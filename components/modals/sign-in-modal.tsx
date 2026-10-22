'use client';

import React, { useEffect } from 'react';
import { X, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../brand-icon';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEarlyAccess: () => void;
}

export function SignInModal({ isOpen, onClose, onOpenEarlyAccess }: SignInModalProps) {
  const router = useRouter();
  const { signIn, demoLogin } = useAuth();
  const [email, setEmail] = React.useState('marcus.vance@apexoperations.io');
  const [password, setPassword] = React.useState('••••••••');
  const [error, setError] = React.useState('');

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn(email, password);
    if (res.error) {
      setError(res.error);
    } else {
      onClose();
      router.push('/workspace');
    }
  };

  const handleLaunchDemo = () => {
    demoLogin('Owner');
    onClose();
    router.push('/workspace');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sign-in-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B101B] p-6 sm:p-8 text-slate-200 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5">
          <BrandLogo className="mb-3" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <Lock className="w-3 h-3" />
            <span>Phase 2 Multi-Tenant Workspace</span>
          </div>
          <h2 id="sign-in-title" className="text-xl font-bold tracking-tight text-white">
            Workspace Sign In
          </h2>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Access your unified CRM, communications, websites, and distribution channels.
          </p>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-5 space-y-2">
          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Instant Preview Workspace</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Launch directly into the live workspace with pre-populated multi-channel operations.
          </p>
          <button
            onClick={handleLaunchDemo}
            className="w-full py-2 px-3 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase hover:bg-[#7dd3fc] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Launch Workspace as Marcus (Owner)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSignIn} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-white text-slate-950 font-bold text-xs uppercase hover:bg-slate-200 transition-colors"
            >
              Sign In with Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
