import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function BookingCancelled() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#f5ede4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-red-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Your payment was cancelled and your slot has been released. No charge was made.
        </p>
        <button onClick={() => navigate(-2)}
          className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl mb-3">
          Try Again
        </button>
        <button onClick={() => navigate('/services')}
          className="w-full border border-gray-200 text-gray-500 font-semibold py-3.5 rounded-2xl">
          Back to Services
        </button>
      </div>
    </div>
  );
}
