'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Anchor,
  Compass,
  Calendar,
  Users,
  CheckCircle,
  Shield,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  Phone,
  Mail,
  Building,
  User,
  Sliders,
  Award,
  Layers,
  Plane,
  Star,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from '@/components/brand-icon';

interface ExperienceCharter {
  id: string;
  title: string;
  location: string;
  category: 'Superyacht' | 'Private Jet' | 'Villa Estate' | 'Day Cruise';
  basePrice: number;
  duration: string;
  capacity: number;
  description: string;
  imageUrl: string;
  features: string[];
}

const EXPERIENCES: ExperienceCharter[] = [
  {
    id: 'exp-1',
    title: 'Riva Dolceriva 48 Coastal Yacht Charter',
    location: 'Monaco Port Hercule → Portofino',
    category: 'Superyacht',
    basePrice: 6800,
    duration: 'Full Day (8 Hours)',
    capacity: 8,
    description: 'Bespoke Mediterranean coastline cruise departing from Monaco Port Hercule. Includes licensed captain, crew, premium open bar, and snorkeling equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&auto=format&fit=crop&q=80',
    features: ['Licensed Master Captain & Deckhand', 'Laurent-Perrier Champagne Welcome', 'Seabob F5 S Underwater Scooter', 'Monaco & Italian Riviera Fuel Included'],
  },
  {
    id: 'exp-2',
    title: 'Pilatus PC-24 Alpine Jet & Helipad Transfer',
    location: 'Geneva Cointrin (GVA) → St. Moritz Engadin (SMV)',
    category: 'Private Jet',
    basePrice: 9400,
    duration: 'Flight + Direct Helicopter Transfer',
    capacity: 6,
    description: 'Direct mountain executive jet flight into Samedan/St. Moritz with onward private Airbus H125 helicopter landing directly at partner luxury resort helipads.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
    features: ['Zero Commercial Queue Terminal GVA', 'Helicopter Helipad Dropoff', 'Ski & Excess Luggage Compartment', 'In-flight Michelin Catering'],
  },
  {
    id: 'exp-3',
    title: 'Lake Como Villa Sola Cabiati Private Wooden Yacht',
    location: 'Bellagio → Tremezzo → Villa Balbianello',
    category: 'Day Cruise',
    basePrice: 4200,
    duration: 'Half Day (5 Hours)',
    capacity: 10,
    description: 'Handcrafted mahogany Venetian launch through historic Lake Como villas. Private water access to Villa del Balbianello and curated historical commentary.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    features: ['Classic Mahogany Venetian Launch', 'Private Villa Docking Permissions', 'Local Sommelier Wine Tasting', 'Drone Photography Add-on Ready'],
  },
  {
    id: 'exp-4',
    title: 'Amalfi Sunset Catamaran & Positano Anchorage',
    location: 'Capri Marina Grande → Faraglioni → Positano',
    category: 'Superyacht',
    basePrice: 5600,
    duration: 'Sunset & Evening (6 Hours)',
    capacity: 14,
    description: 'Exclusive twin-hull catamaran anchored off Positano cliffs at golden hour. Private swim stops in Li Galli private nature reserve.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    features: ['Twin-hull Stability', 'Private Chef Sunset Dinner', 'Stand-Up Paddleboards & Kayaks', 'Positano Harbor Tender Service'],
  },
];

interface AddonOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ADDONS: AddonOption[] = [
  {
    id: 'addon-sommelier',
    name: 'Executive Sommelier & Vintage Grand Cru Pairing',
    description: 'Certified sommelier pouring 4 premier cru French/Italian selections paired with local caviar & canapés.',
    price: 1200,
  },
  {
    id: 'addon-heli',
    name: 'Helipad Chauffeured Terminal Transfer',
    description: 'Point-to-point luxury Mercedes Maybach or twin-turbine helicopter connection from city center.',
    price: 1850,
  },
  {
    id: 'addon-security',
    name: 'Executive Close Protection & Private Security',
    description: 'Discreet, licensed executive security detail for VIP passengers during shoreside excursions.',
    price: 950,
  },
  {
    id: 'addon-chef',
    name: 'Private Michelin-Trained Chef Onboard',
    description: 'Customized multi-course tasting menu prepared live using seasonal market provisions.',
    price: 1600,
  },
];

export default function ExperiencePage() {
  const [selectedExp, setSelectedExp] = useState<ExperienceCharter>(EXPERIENCES[0]);
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [guestCount, setGuestCount] = useState(4);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-sommelier']);

  // Guest Details
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const item = ADDONS.find((a) => a.id === addonId);
    return acc + (item ? item.price : 0);
  }, 0);

  const subtotal = selectedExp.basePrice + addonsTotal;
  const portTaxes = Math.round(subtotal * 0.08);
  const total = subtotal + portTaxes;
  const deposit = Math.round(total * 0.3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const ref = `DIA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-[#E2E8F0] selection:bg-[#38BDF8]/20 selection:text-[#38BDF8]">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#080D17]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <BrandLogo />
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-white/10" />
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
              Private Client Experience Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
            >
              <span>Back Office Workspace</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#0B1120] to-[#070A10] py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/40 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Client Booking Engine · Powered by DIAMONDS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Curated Private Charters & Alpine Logistics
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Explore bespoke luxury charters, book directly with instant rate verification, and coordinate customized VIP enhancements. Every reservation synchronizes directly with the DIAMONDS centralized operations ledger.
            </p>
          </div>
        </div>
      </section>

      {/* Main Experience Booking Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {submitted ? (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto rounded-2xl border border-emerald-500/30 bg-[#0B101B] p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                Reservation Request Authorized
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Booking Reference: {bookingRef}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Thank you, <span className="text-white font-medium">{fullName}</span>. Your request has been written to the DIAMONDS centralized dispatch ledger. A senior concierge agent will confirm dockage slots and flight manifests within 15 minutes.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-3 text-xs">
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-slate-400">Experience</span>
                <span className="font-semibold text-white">{selectedExp.title}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-slate-400">Departure Date</span>
                <span className="font-semibold text-white font-mono">{selectedDate}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-slate-400">Party Size</span>
                <span className="font-semibold text-white">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-white/5">
                <span className="text-slate-400">Total Charter Quote</span>
                <span className="font-bold text-white font-mono">${total.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">30% Holding Deposit</span>
                <span className="font-bold text-emerald-400 font-mono">${deposit.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Next Step Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/workspace"
                className="flex-1 text-center py-2.5 px-4 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
              >
                Inspect in DIAMONDS Workspace CRM
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="py-2.5 px-4 rounded-lg border border-white/10 text-white font-semibold text-xs hover:bg-white/5 transition-colors"
              >
                Book Another Experience
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Experience Selector & Add-on Customizer */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Select Experience */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] flex items-center justify-center font-mono">1</span>
                    Select Curated Experience
                  </h2>
                  <span className="text-xs text-[#38BDF8] font-mono">{EXPERIENCES.length} Available</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXPERIENCES.map((exp) => {
                    const isSelected = selectedExp.id === exp.id;
                    return (
                      <div
                        key={exp.id}
                        onClick={() => setSelectedExp(exp)}
                        className={`cursor-pointer rounded-xl border p-4 transition-all space-y-3 ${
                          isSelected
                            ? 'border-[#38BDF8] bg-[#38BDF8]/5 ring-1 ring-[#38BDF8]/30 shadow-lg'
                            : 'border-white/10 bg-[#0B101B] hover:border-white/20'
                        }`}
                      >
                        <div className="relative h-32 rounded-lg overflow-hidden bg-slate-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={exp.imageUrl}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                            {exp.category}
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#070A10]/90 font-mono text-[11px] font-bold text-[#38BDF8]">
                            ${exp.basePrice.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-bold text-white line-clamp-1">{exp.title}</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Compass className="w-3 h-3 text-[#38BDF8]" />
                            <span className="truncate">{exp.location}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Up to {exp.capacity}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Capacity */}
              <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B101B] p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] flex items-center justify-center font-mono">2</span>
                  Itinerary Schedule & Party
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Charter Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Passenger Count (Max {selectedExp.capacity})
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max={selectedExp.capacity}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="flex-1 accent-[#38BDF8]"
                      />
                      <span className="w-8 text-center font-mono text-xs font-bold text-white bg-white/5 px-2 py-1 rounded">
                        {guestCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Bespoke VIP Add-Ons */}
              <div className="space-y-4 rounded-xl border border-white/10 bg-[#0B101B] p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] flex items-center justify-center font-mono">3</span>
                    Curated VIP Enhancements
                  </h2>
                  <span className="text-[11px] text-slate-400">Optional services</span>
                </div>

                <div className="space-y-3">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer rounded-lg border p-3.5 transition-all flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'border-[#38BDF8]/60 bg-[#38BDF8]/5'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#38BDF8] border-[#38BDF8] text-slate-950'
                                  : 'border-white/20'
                              }`}
                            >
                              {isChecked && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-bold text-white">{addon.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>

                        <div className="text-xs font-mono font-bold text-[#38BDF8] shrink-0 pt-0.5">
                          +${addon.price.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Pricing Calculation & Client Details Drawer */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="rounded-xl border border-white/10 bg-[#080D17] p-5 sm:p-6 space-y-5 shadow-2xl">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Charter Summary & Quotation
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live pricing calculated from verified fleet tariff schedules.
                  </p>
                </div>

                {/* Selected item chip */}
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 space-y-1 text-xs">
                  <div className="font-semibold text-white">{selectedExp.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{selectedDate}</span>
                    <span>·</span>
                    <span>{guestCount} Guests</span>
                    <span>·</span>
                    <span>{selectedExp.duration}</span>
                  </div>
                </div>

                {/* Pricing Line Items */}
                <div className="space-y-2 text-xs border-y border-white/10 py-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Charter Rate</span>
                    <span className="font-mono text-white">${selectedExp.basePrice.toLocaleString()}</span>
                  </div>

                  {selectedAddons.map((addonId) => {
                    const add = ADDONS.find((a) => a.id === addonId);
                    if (!add) return null;
                    return (
                      <div key={add.id} className="flex justify-between text-slate-400 text-[11px]">
                        <span className="truncate pr-2">+ {add.name}</span>
                        <span className="font-mono text-white shrink-0">${add.price.toLocaleString()}</span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                    <span>Aviation / Maritime Dues & Taxes (8%)</span>
                    <span className="font-mono text-white">${portTaxes.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#38BDF8]">${total.toLocaleString()} USD</span>
                  </div>

                  <div className="flex justify-between text-xs text-emerald-400 pt-1">
                    <span>Required Deposit (30%)</span>
                    <span className="font-mono font-semibold">${deposit.toLocaleString()} USD</span>
                  </div>
                </div>

                {/* Guest Contact Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Primary Passenger Information
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">Work / Family Office</label>
                      <input
                        type="text"
                        placeholder="e.g. Montgomery Trust"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+377 98 00 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="v.montgomery@montgomery-trust.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">Special Dietary & Logistics Requirements</label>
                    <textarea
                      rows={2}
                      placeholder="Helipad clearance, vintage preferences, onboard security..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Authorize Charter Reservation</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center pt-1">
                    <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Instant sync with DIAMONDS CRM & Viator ledger</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080D17] py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-5" />
            <span className="text-[11px] text-slate-400">· Premium Enterprise Operating System</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="hover:text-white transition-colors">Platform Overview</Link>
            <Link href="/workspace" className="hover:text-white transition-colors">Staff Workspace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
