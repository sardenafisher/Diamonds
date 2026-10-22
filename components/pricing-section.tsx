'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Starter Workspace',
      subtitle: 'For boutique operations, independent consultancies, and single operators.',
      monthlyPrice: 79,
      annualPrice: 63,
      features: [
        'Up to 3 team member seats',
        'Omnichannel inbox (WhatsApp, Email & Web)',
        'Core CRM contacts & deal pipeline',
        'Single WordPress website management',
        'Direct booking calendar engine',
        'Standard business hours support',
      ],
      popular: false,
      ctaText: 'Pre-Register for Starter',
    },
    {
      name: 'Professional Growth',
      subtitle: 'For expanding teams, multi-channel businesses, and active tour operators.',
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        'Up to 15 team member seats',
        'Full omnichannel communications (WhatsApp, Social & Email)',
        'Advanced CRM pipelines & automated task assignments',
        'Up to 5 WordPress websites & domain health monitors',
        'Viator & GetYourGuide marketplace distribution sync',
        'Visual workflow automation engine',
        'Grounded AI draft assistant with human sign-off',
        'Operational reporting & revenue intelligence',
        'Priority onboarding & queue escalation',
      ],
      popular: true,
      ctaText: 'Pre-Register for Professional',
    },
    {
      name: 'Enterprise Operations',
      subtitle: 'For multi-location brands and large organizations requiring custom governance.',
      monthlyPrice: 449,
      annualPrice: 359,
      features: [
        'Unlimited team seats & custom role permissions',
        'Multi-workspace isolation & department partitions',
        'Unlimited websites, domains, and hosting endpoints',
        'Multi-channel OTA marketplace integration fleet',
        'Custom workflow triggers & external webhook webhooks',
        'Dedicated SLA & custom audit trail retention',
        'Enterprise single sign-on (SSO / SAML)',
        'Dedicated onboarding engineer & quarterly review',
      ],
      popular: false,
      ctaText: 'Pre-Register for Enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#0B101B] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#38BDF8] mb-3">
            Subscription Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Predictable subscription pricing tailored to your operational scale.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            DIAMONDS operates as a recurring software subscription. Choose the workspace tier that fits your team size and operational scope.
          </p>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex items-center gap-3 mb-12">
          <div className="p-1 rounded-lg bg-black/40 border border-white/10 flex items-center text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] text-emerald-400 font-mono">Save 20%</span>
            </button>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Phase 1 Early Access Preview
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  plan.popular
                    ? 'bg-[#0E1524] border-2 border-[#38BDF8] shadow-2xl shadow-sky-950/50'
                    : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-8 px-3 py-0.5 rounded-full bg-[#38BDF8] text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    Recommended For Teams
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="py-4 my-4 border-y border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-400 font-sans">
                        / workspace / month
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {billingCycle === 'annual' ? 'Billed annually · Indicative early preview' : 'Billed monthly · Cancel anytime'}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      Included Capabilities:
                    </div>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wide uppercase flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? 'bg-[#38BDF8] text-slate-950 hover:bg-[#7dd3fc]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase 1 Commercial Disclaimer Box */}
        <div className="mt-12 p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Phase 1 Commercial Preview Note</span>
              <p className="mt-0.5 leading-relaxed">
                Tiers and pricing models represent the intended commercial structure. Final pricing, quota allowances, and volume tiers will be confirmed prior to public subscription launch. No credit card is required to join the waitlist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
