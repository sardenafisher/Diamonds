'use client';

import React, { useState } from 'react';
import { Compass, Plus, CheckCircle, Clock, Calendar, Users, DollarSign, X, Share2 } from 'lucide-react';
import { TourBooking } from '@/lib/workspace-data';

interface BookingsViewProps {
  bookings: TourBooking[];
  onAddBooking: (b: TourBooking) => void;
}

export function BookingsView({ bookings, onAddBooking }: BookingsViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tourName, setTourName] = useState('Private Amalfi Coast Catamaran Excursion');
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
      setSyncNotice('Synchronized 14 tour schedules with Viator API and 9 tours with GetYourGuide. 0 scheduling conflicts detected.');
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Tour & Activity Booking Distribution
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronize bookings across Viator, GetYourGuide, and your direct website booking engine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncOta}
            disabled={isSyncingOta}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-slate-200 text-xs font-semibold hover:bg-white/5 transition-colors disabled:opacity-40"
          >
            <Share2 className={`w-3.5 h-3.5 ${isSyncingOta ? 'animate-spin text-[#38BDF8]' : ''}`} />
            <span>{isSyncingOta ? 'Syncing Viator & GYG...' : 'Sync OTA Marketplaces'}</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#7dd3fc] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Reservation</span>
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs text-sky-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>{syncNotice}</span>
          </div>
          <button onClick={() => setSyncNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Distribution Channel Status Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              Direct Booking Engine
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">Live 0% Commission</span>
          </div>
          <p className="text-[11px] text-slate-400">Integrated on WordPress site. Real-time slot locking.</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              Viator Marketplace API
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">12 Tours Synced</span>
          </div>
          <p className="text-[11px] text-slate-400">Availability quotas synced automatically to avoid double-booking.</p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              GetYourGuide Connectivity
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">8 Tours Synced</span>
          </div>
          <p className="text-[11px] text-slate-400">Voucher numbers ingested directly into CRM customer records.</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-xl border border-white/10 bg-[#080D17] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B101B] border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Tour / Activity Name</th>
                <th className="py-3 px-4">Lead Guest</th>
                <th className="py-3 px-4">Distribution Channel</th>
                <th className="py-3 px-4">Date & Guests</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => setSelectedVoucher(b)}
                  className="hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-white">{b.tourName}</td>
                  <td className="py-3 px-4 text-slate-300">{b.customerName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        b.channel === 'Direct'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                          : 'bg-sky-950/60 text-sky-300 border border-sky-800/40'
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
                    <span className="text-emerald-400 font-medium">{b.status}</span>
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
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0B101B] p-6 text-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#38BDF8]">
                  Verified Booking Voucher
                </span>
              </div>
              <button onClick={() => setSelectedVoucher(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedVoucher.tourName}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">Guest: <strong className="text-white">{selectedVoucher.customerName}</strong></div>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {selectedVoucher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Reservation Date</span>
                  <span className="text-white font-medium">{selectedVoucher.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Guest Count</span>
                  <span className="text-white font-medium">{selectedVoucher.guests} Passengers</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Booking Channel</span>
                  <span className="text-sky-300 font-medium">{selectedVoucher.channel} API</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans uppercase">Gross Amount</span>
                  <span className="text-emerald-400 font-bold">${selectedVoucher.totalPrice.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
              <span>Voucher ID: {selectedVoucher.id.toUpperCase()}</span>
              <span>Logged by DIAMONDS Distribution Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0B101B] p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Log Tour Reservation</h3>
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
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Lead Guest Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Direct">Direct Web</option>
                    <option value="Viator">Viator</option>
                    <option value="GetYourGuide">GetYourGuide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#0F172A] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Guests Count</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Price ($ USD)</label>
                  <input
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#38BDF8] text-slate-950 font-bold hover:bg-[#7dd3fc]"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
