'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './brand-icon';

interface FooterProps {
  onOpenLegal: (tab: 'privacy' | 'terms' | 'security') => void;
  onOpenEarlyAccess: () => void;
}

export function Footer({ onOpenLegal, onOpenEarlyAccess }: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#05080E] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand info column */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <BrandLogo />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The unified digital business management platform uniting customer relationships, multichannel communications, website assets, tour bookings, and automated workflows into one workspace.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Architecture Preview · Phase 1
            </div>
          </div>

          {/* Column: Product */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/experience"
                  className="text-[#38BDF8] hover:text-[#7dd3fc] font-semibold transition-colors"
                >
                  Client Booking Portal ↗
                </Link>
              </li>
              <li>
                <Link
                  href="/workspace"
                  className="text-white hover:text-[#38BDF8] font-semibold transition-colors"
                >
                  Staff Workspace ↗
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#platform')}
                  className="hover:text-white transition-colors"
                >
                  Workspace Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#ecosystem')}
                  className="hover:text-white transition-colors"
                >
                  Omnichannel CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#workflows')}
                  className="hover:text-white transition-colors"
                >
                  Connected Workflows
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#automation')}
                  className="hover:text-white transition-colors"
                >
                  Governed AI Drafts
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Solutions */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white">
              Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('#ecosystem')}
                  className="hover:text-white transition-colors"
                >
                  Service Firms
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#ecosystem')}
                  className="hover:text-white transition-colors"
                >
                  Tours & Activities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#ecosystem')}
                  className="hover:text-white transition-colors"
                >
                  Digital Agencies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#ecosystem')}
                  className="hover:text-white transition-colors"
                >
                  Commerce Operators
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Integrations & Pricing */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white">
              Ecosystem
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('#integrations')}
                  className="hover:text-white transition-colors"
                >
                  All Integrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#integrations')}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#integrations')}
                  className="hover:text-white transition-colors"
                >
                  WordPress Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#pricing')}
                  className="hover:text-white transition-colors"
                >
                  Subscription Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Company & Governance */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('#why-diamonds')}
                  className="hover:text-white transition-colors"
                >
                  Why DIAMONDS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenEarlyAccess()}
                  className="hover:text-white transition-colors"
                >
                  Request Early Access
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('security')}
                  className="hover:text-white transition-colors"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} DIAMONDS Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('security')}
              className="hover:text-slate-300 transition-colors"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
