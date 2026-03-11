import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSessionBooking } from '../api/bookingApi';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function BookingSuccess() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const sessionId = params.get('session_id');

  const [booking, setBooking] = useState(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!sessionId) { navigate('/'); return; }

    getSessionBooking(sessionId)
      .then(setBooking)
      .catch(err => {
        const msg = err.response?.data?.message;
        if (err.response?.status === 402) {
          setError('Payment was not completed. No charge was made.');
        } else {
          setError(msg || 'Something went wrong retrieving your booking. Please contact us.');
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

  const total   = booking.totalAmount   / 100;
  const paid    = booking.paidAmount    / 100;
  const balance = booking.balanceRemaining / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Your appointment for <strong className="text-gray-600">{booking.service?.name}</strong> on{' '}
          <strong className="text-gray-600">
            {new Date(booking.bookingDate).toLocaleDateString('en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </strong>{' '}at{' '}
          <strong className="text-gray-600">{booking.bookingTime}</strong> is confirmed.
        </p>

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

        <p className="text-xs text-gray-400 mb-6">
          Confirmation sent to <strong>{booking.customerEmail}</strong>
        </p>

        <button onClick={() => navigate('/services')}
          className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl">
          Back to Services
        </button>
      </div>
    </div>
  );
}
