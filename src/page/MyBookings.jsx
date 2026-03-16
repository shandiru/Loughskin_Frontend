import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMyBookings } from '../api/bookingApi';
import { requestBookingCancellation } from '../api/bookingApi';
import {
  CalendarCheck, Clock, User, CheckCircle2, XCircle, AlertCircle,
  Loader2, ChevronDown, ChevronUp, Phone, MapPin, CreditCard,
  RefreshCw, X,
} from 'lucide-react';

const STATUS = {
  pending:   { cls: 'bg-yellow-100 text-yellow-700',  label: 'Pending' },
  confirmed: { cls: 'bg-blue-100 text-blue-700',      label: 'Confirmed' },
  completed: { cls: 'bg-green-100 text-green-700',    label: 'Completed' },
  cancelled: { cls: 'bg-red-100 text-red-700',        label: 'Cancelled' },
  'no-show': { cls: 'bg-gray-100 text-gray-500',      label: 'No Show' },
};

const CANCEL_REQ = {
  pending:  { cls: 'bg-orange-100 text-orange-700', label: 'Cancel Requested' },
  approved: { cls: 'bg-red-100 text-red-600',       label: 'Cancellation Approved' },
  rejected: { cls: 'bg-gray-100 text-gray-500',     label: 'Cancel Request Rejected' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] || { cls: 'bg-gray-100 text-gray-500', label: status };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${s.cls}`}>{s.label}</span>;
}

function toMins(t) { const [h,m] = t.split(':').map(Number); return h*60+m; }
function fromMins(m) { return `${Math.floor(m/60).toString().padStart(2,'0')}:${(m%60).toString().padStart(2,'0')}`; }

// ── Cancel Request Modal ──────────────────────────────────────────────────────
function CancelModal({ booking, onClose, onSubmitted }) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async () => {
    setErr('');
    setLoading(true);
    try {
      await requestBookingCancellation(booking._id, reason);
      onSubmitted();
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">Request Cancellation</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
            <p className="font-semibold mb-1">⚠️ Cancellation is subject to admin review</p>
            <p>Your request will be reviewed. Refunds are at the admin's discretion.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-sm space-y-1">
            <p className="font-semibold text-gray-700">{booking.service?.name}</p>
            <p className="text-gray-500">{new Date(booking.bookingDate).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })} at {booking.bookingTime}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Reason (optional)</label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
              placeholder="Tell us why you need to cancel..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#22B8C8] focus:ring-2 focus:ring-[#22B8C8]/10 bg-gray-50 resize-none"/>
          </div>
          {err && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={14}/> {err}</p>}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold text-sm hover:bg-gray-50">
              Keep Booking
            </button>
            <button onClick={submit} disabled={loading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 size={16} className="animate-spin"/> : <XCircle size={16}/>}
              Request Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────
function BookingCard({ booking, onCancelRequest }) {
  const [expanded, setExpanded] = useState(false);
  const svc = booking.service;
  const staff = booking.staffMember?.userId;
  const endTime = svc ? fromMins(toMins(booking.bookingTime) + svc.duration) : '';
  const date = new Date(booking.bookingDate);

  // ✅ FIX: Compare date-only (strip time) so today's bookings are never "past"
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const bookingDay = new Date(date);
  bookingDay.setHours(0, 0, 0, 0);
  const isPast = bookingDay < todayStart;

  const canRequestCancel = !isPast &&
    !['cancelled'].includes(booking.status) &&
    booking.cancelRequestStatus !== 'pending' &&
    booking.cancelRequestStatus !== 'approved';

  const paid    = ((booking.paidAmount       || 0) / 100).toFixed(2);
  const balance = ((booking.balanceRemaining || 0) / 100).toFixed(2);
  const total   = ((booking.totalAmount      || 0) / 100).toFixed(2);

  return (
    <div className={`bg-white rounded-3xl border-2 transition-all overflow-hidden ${
      booking.status === 'cancelled' ? 'border-gray-100 opacity-70' :
      booking.cancelRequestStatus === 'pending' ? 'border-orange-200' :
      'border-[#C9AF94]/20 hover:border-[#22B8C8]/30'
    }`}>
      {/* Header */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              booking.status === 'completed' ? 'bg-green-100' :
              booking.status === 'cancelled' ? 'bg-red-100' :
              'bg-[#22B8C8]/10'
            }`}>
              {booking.status === 'completed' ? <CheckCircle2 size={20} className="text-green-500"/> :
               booking.status === 'cancelled' ? <XCircle size={20} className="text-red-400"/> :
               <CalendarCheck size={20} className="text-[#22B8C8]"/>}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm truncate">{svc?.name || 'Service'}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {date.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })} · {booking.bookingTime}
                {endTime && ` – ${endTime}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={booking.status}/>
            {expanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
          </div>
        </div>

        {/* Cancel request badge */}
        {booking.cancelRequestStatus && booking.cancelRequestStatus !== 'rejected' && (
          <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${CANCEL_REQ[booking.cancelRequestStatus]?.cls}`}>
            <RefreshCw size={11}/>
            {CANCEL_REQ[booking.cancelRequestStatus]?.label}
          </div>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">Booking #</p>
              <p className="font-mono font-bold text-gray-800 text-xs">{booking.bookingNumber}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">Duration</p>
              <p className="font-semibold text-gray-800">{svc?.duration || booking.duration} min</p>
            </div>
            {staff && (
              <div className="bg-gray-50 rounded-2xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Staff</p>
                <p className="font-semibold text-gray-800">{staff.firstName} {staff.lastName}</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">Source</p>
              <p className="font-semibold text-gray-800 capitalize">{booking.bookingSource || 'website'}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#f0fafa] rounded-2xl p-4 space-y-2 text-sm">
            <p className="text-xs font-bold text-[#22B8C8] uppercase tracking-wide flex items-center gap-1.5">
              <CreditCard size={12}/> Payment
            </p>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-gray-800">£{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Paid</span>
              <span className="font-bold text-[#22B8C8]">£{paid}</span>
            </div>
            {parseFloat(balance) > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Balance at salon</span>
                <span className="font-bold text-amber-500">£{balance}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                booking.paymentType === 'full' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>{booking.paymentType === 'full' ? 'Full' : 'Deposit'}</span>
            </div>
            {booking.refundAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Refunded</span>
                <span className="font-bold text-green-600">£{(booking.refundAmount/100).toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {booking.customerNotes && (
            <div className="bg-amber-50 rounded-2xl p-3 text-sm">
              <p className="text-xs font-bold text-amber-600 mb-1">Your Notes</p>
              <p className="text-gray-700">{booking.customerNotes}</p>
            </div>
          )}

          {/* Cancel reason shown if cancelled */}
          {booking.status === 'cancelled' && booking.cancellationReason && (
            <div className="bg-red-50 rounded-2xl p-3 text-sm">
              <p className="text-xs font-bold text-red-500 mb-1">Cancellation Reason</p>
              <p className="text-gray-700">{booking.cancellationReason}</p>
            </div>
          )}

          {/* Cancel button */}
          {canRequestCancel && (
            <button onClick={() => onCancelRequest(booking)}
              className="w-full border-2 border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
              <XCircle size={16}/> Request Cancellation
            </button>
          )}
          {booking.cancelRequestStatus === 'pending' && (
            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 rounded-2xl p-3 text-sm">
              <RefreshCw size={14}/> Cancellation request pending admin review
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyBookings() {
  const navigate = useNavigate();
  const { user, accessToken } = useSelector(s => s.auth);
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('upcoming'); // upcoming | past | all
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    if (!accessToken) { navigate('/login'); return; }
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMyBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: Use date-only comparison so today's bookings show as upcoming
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const filtered = bookings.filter(b => {
    const d = new Date(b.bookingDate);
    d.setHours(0, 0, 0, 0);
    if (filter === 'upcoming') return d >= todayStart && b.status !== 'cancelled';
    if (filter === 'past')     return d < todayStart  || b.status === 'cancelled';
    return true;
  }).sort((a, b) => {
    if (filter === 'past') return new Date(b.bookingDate) - new Date(a.bookingDate);
    return new Date(a.bookingDate) - new Date(b.bookingDate);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4]">
      <div className="max-w-2xl mx-auto py-12 px-4">

        <div className="mb-8">
          <p className="text-[#C9AF94] text-xs font-semibold uppercase tracking-widest mb-1">Account</p>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">
            {user?.name || user?.email} · {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 border border-[#C9AF94]/20">
          {['upcoming','past','all'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                filter === f ? 'bg-[#22B8C8] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#22B8C8]"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <CalendarCheck size={48} className="text-gray-200 mx-auto mb-4"/>
            <p className="text-gray-400 font-semibold">No {filter} bookings</p>
            {filter === 'upcoming' && (
              <button onClick={() => navigate('/services')}
                className="mt-4 bg-[#22B8C8] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#1a9aad] transition-all">
                Book an Appointment
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <BookingCard key={b._id} booking={b} onCancelRequest={setCancelTarget}/>
            ))}
          </div>
        )}
      </div>

      {cancelTarget && (
        <CancelModal
          booking={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onSubmitted={() => { setCancelTarget(null); load(); }}
        />
      )}
    </div>
  );
}