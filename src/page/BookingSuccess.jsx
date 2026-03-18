import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSessionBooking } from '../api/bookingApi';
import { CheckCircle2, Loader2, AlertCircle, ClipboardList, ChevronRight, X } from 'lucide-react';
import { ConsultationFormUI } from '../components/ConsultationFormModal';

// ── Booking Confirmed view ────────────────────────────────────────────────────
function BookingConfirmed({ booking, formDone, onFillForm }) {
  const navigate   = useNavigate();
  const total      = booking.totalAmount      / 100;
  const paid       = booking.paidAmount       / 100;
  const balance    = booking.balanceRemaining / 100;
  const isFormDone = booking.consultationFormCompleted || formDone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-md w-full text-center">

        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Your appointment for <strong className="text-gray-600">{booking.service?.name}</strong> on{' '}
          <strong className="text-gray-600">
            {new Date(booking.bookingDate).toLocaleDateString('en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </strong>{' '}at{' '}
          <strong className="text-gray-600">{booking.bookingTime}</strong> is confirmed.
        </p>

        {/* Booking summary */}
        <div className="bg-[#fdf8f4] rounded-2xl p-4 mb-6 text-left space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Booking #</span>
            <span className="font-bold text-gray-700 font-mono">{booking.bookingNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="font-bold text-green-500 capitalize">{booking.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Staff</span>
            <span className="font-semibold text-gray-700">
              {booking.staffMember?.userId
                ? `${booking.staffMember.userId.firstName} ${booking.staffMember.userId.lastName}`
                : '—'}
            </span>
          </div>
          <div className="border-t border-gray-200 my-1" />
          <div className="flex justify-between">
            <span className="text-gray-400">Paid today</span>
            <span className="font-bold text-gray-700">£{paid.toFixed(2)}</span>
          </div>
          {balance > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Balance at salon</span>
              <span className="font-bold text-amber-500">£{balance.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span className="text-gray-600">Total</span>
            <span className="text-gray-800">£{total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-5">
          Confirmation sent to <strong>{booking.customerEmail}</strong>
        </p>

        {/* ── Consultation Form choice ────────────────────────────────────────── */}
        {isFormDone ? (
          <div className="w-full mb-3 bg-green-50 text-green-600 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm border border-green-200">
            <CheckCircle2 size={16} /> Consultation Form Submitted ✓
          </div>
        ) : (
          <div className="bg-[#f0fafa] border border-[#22B8C8]/20 rounded-2xl p-5 mb-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#22B8C8]/10 flex items-center justify-center shrink-0 mt-0.5">
                <ClipboardList size={18} className="text-[#22B8C8]" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Client Consultation Form</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Our team needs this before your appointment. You can fill it now or come back to it anytime from <strong>My Bookings</strong>.
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={onFillForm}
                className="flex-1 bg-[#22B8C8] hover:bg-[#1a9aad] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5">
                <ClipboardList size={15} /> Fill Now
              </button>
              <button
                onClick={() => navigate('/my-bookings')}
                className="flex-1 border-2 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all">
                <X size={14} /> Skip for Now
              </button>
            </div>
          </div>
        )}

        <button onClick={() => navigate('/my-bookings')}
          className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl hover:-translate-y-0.5 hover:shadow-lg transition-all">
          View My Bookings
        </button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BookingSuccess() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const sessionId = params.get('session_id');

  const [booking,  setBooking]  = useState(null);
  const [error,    setError]    = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formDone, setFormDone] = useState(false);

  useEffect(() => {
    if (!sessionId) { navigate('/'); return; }
    getSessionBooking(sessionId)
      .then(b => {
        setBooking(b);
        // Don't auto-open — customer chooses to fill or skip
      })
      .catch(err => {
        if (err.response?.status === 402) {
          setError('Payment was not completed. No charge was made.');
        } else {
          setError(err.response?.data?.message || 'Something went wrong retrieving your booking. Please contact us.');
        }
      });
  }, [sessionId]);

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#f5ede4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-400 text-sm mb-6">{error}</p>
        <button onClick={() => navigate('/services')}
          className="w-full bg-[#22B8C8] text-white font-bold py-3.5 rounded-2xl">
          Back to Services
        </button>
      </div>
    </div>
  );

  if (!booking) return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#f5ede4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <Loader2 size={48} className="animate-spin text-[#22B8C8] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirming your booking...</h2>
        <p className="text-gray-400 text-sm">Just a moment while we set everything up.</p>
      </div>
    </div>
  );

  // Show consultation form when customer chose to fill it
  if (showForm && !formDone && !booking.consultationFormCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4] py-10 px-4">
        <ConsultationFormUI
          booking={booking}
          onComplete={() => { setFormDone(true); setShowForm(false); }}
          onSkip={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <BookingConfirmed
      booking={booking}
      formDone={formDone}
      onFillForm={() => setShowForm(true)}
    />
  );
}
