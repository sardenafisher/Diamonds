'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from './brand-icon';

import Link from 'next/link';

interface NavbarProps {
  onOpenEarlyAccess: (plan?: string) => void;
  onOpenSignIn: () => void;
}

export function Navbar({ onOpenEarlyAccess, onOpenSignIn }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Workflows', href: '#workflows' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Why DIAMONDS', href: '#why-diamonds' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#070A10]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <BrandLogo />
        </a>

        {/* Zone 2: Single-line Text Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            href="/experience"
            className="text-xs font-semibold tracking-wide uppercase text-slate-300 hover:text-white px-2 py-1.5 transition-colors whitespace-nowrap"
          >
            Client Portal
          </Link>
          <Link
            href="/workspace"
            className="text-xs font-bold tracking-wide uppercase text-[#38BDF8] hover:text-[#7dd3fc] px-2.5 py-1.5 transition-colors whitespace-nowrap"
          >
            Launch Workspace
          </Link>
          <button
            onClick={onOpenSignIn}
            className="text-xs font-semibold tracking-wide uppercase text-slate-300 hover:text-white px-2 py-1.5 transition-colors whitespace-nowrap"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenEarlyAccess()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-950 font-semibold text-xs tracking-wide uppercase hover:bg-slate-200 transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#0B101B]/95 backdrop-blur-xl px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-200 hover:text-[#38BDF8] py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/experience"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-lg border border-white/10 text-slate-200 text-xs font-semibold tracking-wide uppercase hover:bg-white/5"
            >
              Client Booking Portal
            </Link>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-lg bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-bold tracking-wide uppercase hover:bg-[#38BDF8]/25"
            >
              Launch Workspace
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg border border-white/10 text-slate-200 text-xs font-semibold tracking-wide uppercase hover:bg-white/5"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg bg-[#38BDF8] text-slate-950 text-xs font-semibold tracking-wide uppercase hover:bg-[#7dd3fc]"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
