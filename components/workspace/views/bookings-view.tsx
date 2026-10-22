'use client';

import React, { useState } from 'react';
import {
  Compass,
  Plus,
  CheckCircle,
  Clock,
  Calendar,
  Users,
  DollarSign,
  X,
  Share2,
  Ticket,
  ArrowUpRight
} from 'lucide-react';
import { TourBooking } from '@/lib/workspace-data';

interface BookingsViewProps {
  bookings: TourBooking[];
  onAddBooking: (b: TourBooking) => void;
}

export function BookingsView({ bookings, onAddBooking }: BookingsViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tourName, setTourName] = useState('Private Amalfi Coast Superyacht Excursion');
  const [customerName, setCustomerName] = useState('');
  const [channel, setChannel] = useState<TourBooking['channel']>('Direct');
  const [date, setDate] = useState('2026-10-30');
  const [guests, setGuests] = useState('8');
  const [totalPrice, setTotalPrice] = useState('4800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    onAddBooking({
      id: `bk-${Date.now()}`,
      tourName,
      customerName,
      channel,
      date,
      guests: Number(guests) || 1,
      totalPrice: Number(totalPrice) || 0,
      status: 'Confirmed',
    });

    setCustomerName('');
    setModalOpen(false);
  };

  const [isSyncingOta, setIsSyncingOta] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<TourBooking | null>(null);

  const handleSyncOta = () => {
    setIsSyncingOta(true);
    setSyncNotice(null);
    setTimeout(() => {
      setIsSyncingOta(false);
      setSyncNotice(
        'Genie OTA Gateway synchronized 14 luxury departure slots with Viator API and 9 tours with GetYourGuide. 0 scheduling conflicts detected.'
      );
    }, 1400);
  };

  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPrice, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Reservations & OTA Distribution Engine
            </h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#2489DA]/15 text-[#38BDF8] border border-[#2489DA]/30">
              ${totalRevenue.toLocaleString()} Intake
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Centralized distribution synchronizing Viator, GetYourGuide, and Direct VIP Portal bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncOta}
            disabled={isSyncingOta}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1E2E4A] bg-[#0E1B33] text-slate-200 text-xs font-semibold hover:border-[#38BDF8]/40 hover:text-white transition-colors disabled:opacity-40"
          >
            <Share2
              className={`w-3.5 h-3.5 ${isSyncingOta ? 'animate-spin text-[#38BDF8]' : 'text-slate-400'}`}
            />
            <span>{isSyncingOta ? 'Syncing OTA Quotas...' : 'Sync OTA Marketplaces'}</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2489DA] text-white font-bold text-xs hover:bg-[#38BDF8] hover:text-slate-950 transition-colors shadow-[0_0_15px_rgba(36,137,218,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Reservation</span>
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="p-3.5 rounded-xl bg-[#0E1B33] border border-[#2489DA]/40 text-xs text-[#38BDF8] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncNotice}</span>
          </div>
          <button onClick={() => setSyncNotice(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Distribution Channel Status Strip (Genie ERP Box Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="box p-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
              Direct Luxury Engine
            </span>
            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              0% Commission
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Integrated on diamonds-luxury.com with instant PCI-DSS Stripe slot locking.
          </p>
        </div>

        <div className="box p-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              Viator Global API
            </span>
            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Connected
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Automated quota locking prevents double-booking across luxury yachts and helicopters.
          </p>
        </div>

        <div className="box p-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              GetYourGuide API
            </span>
            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Synced
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            External vouchers automatically ingested into CRM customer dossiers.
          </p>
        </div>
      </div>

      {/* Bookings Table (Genie ERP High-Density Datatable) */}
      <div className="rounded-xl border border-[#1E2E4A] bg-[#0A1324] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E1B33] border-b border-[#1E2E4A] text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Experience / Tour Asset</th>
                <th className="py-3 px-4">Lead Guest</th>
                <th className="py-3 px-4">Distribution Channel</th>
                <th className="py-3 px-4">Departure & Guests</th>
                <th className="py-3 px-4">Gross Intake</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelectedVoucher(b)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                    {b.tourName}
                  </td>
                  <td className="py-3 px-4 text-slate-300">{b.customerName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        b.channel === 'Direct'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                          : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      }`}
                    >
                      {b.channel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {b.date} ({b.guests} pax)
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    ${b.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Voucher Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedVoucher(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 text-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A]">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs uppercase font-mono tracking-wider text-[#38BDF8] font-bold">
                  Verified Booking Voucher
                </span>
              </div>
              <button onClick={() => setSelectedVoucher(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-[#0E1B33] border border-[#1E2E4A] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedVoucher.tourName}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Lead Guest: <strong className="text-white">{selectedVoucher.customerName}</strong>
                  </div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {selectedVoucher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Reservation Date</span>
                  <span className="text-white font-medium">{selectedVoucher.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Passenger Quota</span>
                  <span className="text-white font-medium">{selectedVoucher.guests} Pax</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Ingestion Gateway</span>
                  <span className="text-sky-300 font-medium">{selectedVoucher.channel} Direct</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Gross Valuation</span>
                  <span className="text-emerald-400 font-bold">${selectedVoucher.totalPrice.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
              <span>Voucher ID: <strong className="font-mono text-white">{selectedVoucher.id.toUpperCase()}</strong></span>
              <span className="text-[#38BDF8]">DIAMONDS Distribution Hub</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-[#1E2E4A] bg-[#0A1324] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4A] mb-4">
              <h3 className="text-base font-bold text-white">Log Tour Reservation</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tour Experience</label>
                <input
                  type="text"
                  required
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Lead Guest Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Lady Genevieve"
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Distribution Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  >
                    <option value="Direct">Direct VIP Portal</option>
                    <option value="Viator">Viator Marketplace</option>
                    <option value="GetYourGuide">GetYourGuide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Passengers (Pax)</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Valuation ($)</label>
                  <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0E1B33] border border-[#1E2E4A] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#1E2E4A] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2489DA] text-white font-bold hover:bg-[#38BDF8] hover:text-slate-950 transition-colors"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
