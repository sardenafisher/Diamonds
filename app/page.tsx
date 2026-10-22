'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProblemSection } from '@/components/problem-section';
import { ConnectedExperience } from '@/components/connected-experience';
import { EcosystemSection } from '@/components/ecosystem-section';
import { AutomationAiSection } from '@/components/automation-ai-section';
import { IntegrationsSection } from '@/components/integrations-section';
import { PricingSection } from '@/components/pricing-section';
import { WhyDiamonds } from '@/components/why-diamonds';
import { FinalCta } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { EarlyAccessModal } from '@/components/modals/early-access-modal';
import { SignInModal } from '@/components/modals/sign-in-modal';
import { LegalModal } from '@/components/modals/legal-modal';

export default function LandingPage() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Professional');
  const [signInOpen, setSignInOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'security'>('terms');

  const handleOpenEarlyAccess = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    setEarlyAccessOpen(true);
  };

  const handleOpenLegal = (tab: 'privacy' | 'terms' | 'security') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070A10] text-[#E2E8F0] selection:bg-[#0EA5E9]/20 selection:text-[#38BDF8]">
      {/* 1. Top Bar Navigation */}
      <Navbar
        onOpenEarlyAccess={() => handleOpenEarlyAccess()}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 2. Hero Section with Interactive Workspace Simulator */}
        <Hero onOpenEarlyAccess={() => handleOpenEarlyAccess()} />

        {/* 3. The Problem DIAMONDS Solves (Editorial layout) */}
        <ProblemSection />

        {/* 4. The Connected Business Experience (Interactive Workflow Scrubber) */}
        <ConnectedExperience />

        {/* 5. The Product Ecosystem (Asymmetric Bento Architecture) */}
        <EcosystemSection />

        {/* 6. Automation & AI with Human Governance */}
        <AutomationAiSection />

        {/* 7. Integrations Matrix (Interactive category filters + search + roadmap) */}
        <IntegrationsSection />

        {/* 8. Subscription Model & Pricing Preview */}
        <PricingSection onSelectPlan={(plan) => handleOpenEarlyAccess(plan)} />

        {/* 9. Why DIAMONDS (Core Architectural Pillars) */}
        <WhyDiamonds />

        {/* 10. Final Call to Action */}
        <FinalCta onOpenEarlyAccess={(email) => handleOpenEarlyAccess()} />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenEarlyAccess={() => handleOpenEarlyAccess()}
      />

      {/* Interactive Global Modals */}
      <EarlyAccessModal
        isOpen={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
        initialPlan={selectedPlan}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onOpenEarlyAccess={() => handleOpenEarlyAccess()}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        defaultTab={legalTab}
      />
    </div>
  );
}
