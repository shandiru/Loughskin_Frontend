import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getSessionBooking } from '../api/bookingApi';
import axiosInstance from '../api/axiosInstance';
import {
  CheckCircle2, Loader2, AlertCircle, ClipboardList,
  ChevronRight, ShieldCheck, Send,
} from 'lucide-react';

// ── Medical history options (matches the image exactly) ──────────────────────
const MEDICAL_OPTIONS = [
  'Heart conditions / Pacemaker',
  'High / Low blood pressure',
  'Diabetes (Type I / II)',
  'Epilepsy / Seizures',
  'Blood clotting disorders / On blood thinners',
  'Autoimmune disease',
  'Cancer (current or past)',
  'Keloid / Hypertrophic scarring',
  'Skin conditions (eczema, psoriasis, dermatitis)',
  'Active acne or infection',
  'Cold sores (Herpes simplex)',
  'Hepatitis / HIV / Other bloodborne conditions',
  'Respiratory conditions (asthma, COPD, etc.)',
  'Allergies (latex, lidocaine, adhesives, ingredients)',
  'Pregnant / Breastfeeding',
  'Other relevant medical history',
];

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#22B8C8] focus:ring-2 focus:ring-[#22B8C8]/10 transition-all bg-gray-50';

// ── Consultation Form Component ───────────────────────────────────────────────
function ConsultationForm({ booking, onComplete }) {
  const [form, setForm] = useState({
    fullName:                booking.customerName || '',
    dateOfBirth:             '',
    age:                     '',
    address:                 booking.customerAddress || '',
    phone:                   booking.customerPhone || '',
    email:                   booking.customerEmail || '',
    emergencyContact:        '',
    medicalHistory:          [],
    currentMedications:      '',
    pastSurgeries:           '',
    treatmentAreasOfInterest:'',
    signature:               '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  const toggleMedical = (item) => {
    setForm(f => ({
      ...f,
      medicalHistory: f.medicalHistory.includes(item)
        ? f.medicalHistory.filter(x => x !== item)
        : [...f.medicalHistory, item],
    }));
  };

  const canSubmit = form.fullName.trim() && form.dateOfBirth && form.signature.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError('');
    setSubmitting(true);
    try {
      await axiosInstance.post(`/bookings/${booking._id}/consultation-form`, form);
      onComplete();
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4] py-10 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#22B8C8]/10 flex items-center justify-center mx-auto mb-4">
            <ClipboardList size={32} className="text-[#22B8C8]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Client Consultation</h1>
          <p className="text-gray-400 text-sm">
            Booking <span className="font-mono font-bold text-gray-600">{booking.bookingNumber}</span>
            {' · '}{booking.service?.name}
          </p>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-sm mx-auto">
            Please complete this form before your appointment. Your data will be sent securely to our team and{' '}
            <strong>not stored on our servers</strong>.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8 space-y-6">

          {/* Personal Details */}
          <div>
            <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-4">Personal Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="Jane Smith" className={inp} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <input type="date" value={form.dateOfBirth}
                  onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                  className={inp} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Age</label>
                <input value={form.age}
                  onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                  placeholder="e.g. 28" className={inp} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Address</label>
                <input value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="123 High Street, London" className={inp} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Phone</label>
                <input value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="07700 900000" className={inp} />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Email</label>
                <input type="email" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@example.com" className={inp} />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Emergency Contact &amp; Phone
                </label>
                <input value={form.emergencyContact}
                  onChange={e => setForm(f => ({ ...f, emergencyContact: e.target.value }))}
                  placeholder="Sarah Smith — 07900 123456" className={inp} />
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div>
            <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-1">Medical History</p>
            <p className="text-xs text-gray-400 mb-4">Please tick all that apply:</p>
            <div className="space-y-3">
              {MEDICAL_OPTIONS.map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleMedical(item)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
                      ${form.medicalHistory.includes(item)
                        ? 'bg-[#22B8C8] border-[#22B8C8]'
                        : 'border-gray-300 group-hover:border-[#22B8C8]'}`}>
                    {form.medicalHistory.includes(item) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-4">Additional Information</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Current Medications / Supplements
                </label>
                <textarea value={form.currentMedications}
                  onChange={e => setForm(f => ({ ...f, currentMedications: e.target.value }))}
                  rows={2} placeholder="List any medications or supplements..." className={inp + ' resize-none'} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Past Surgeries</label>
                <textarea value={form.pastSurgeries}
                  onChange={e => setForm(f => ({ ...f, pastSurgeries: e.target.value }))}
                  rows={2} placeholder="Any relevant surgeries..." className={inp + ' resize-none'} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Treatment Areas of Interest
                </label>
                <textarea value={form.treatmentAreasOfInterest}
                  onChange={e => setForm(f => ({ ...f, treatmentAreasOfInterest: e.target.value }))}
                  rows={2} placeholder="e.g. face, neck, back..." className={inp + ' resize-none'} />
              </div>
            </div>
          </div>

          {/* Liability Waiver & Signature */}
          <div className="bg-[#fdf8f4] rounded-2xl p-5 border border-[#C9AF94]/20">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-[#C9AF94]" />
              <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest">Liability Waiver &amp; E-Signature</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              By typing my name below, I agree this constitutes my e-signature to the liability waiver.
              I confirm the information above is accurate and I consent to treatment.
            </p>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
              Type Full Name as Signature <span className="text-red-400">*</span>
            </label>
            <input value={form.signature}
              onChange={e => setForm(f => ({ ...f, signature: e.target.value }))}
              placeholder="Jane Smith" className={inp + ' font-semibold italic'} />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-500 rounded-2xl p-4 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={submitting || !canSubmit}
            className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all">
            {submitting
              ? <><Loader2 size={18} className="animate-spin" /> Submitting...</>
              : <><Send size={18} /> Submit  Consultation Form</>}
          </button>

          <p className="text-center text-xs text-gray-400">
            Your form data is sent securely to our team and not stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Booking Confirmed view ────────────────────────────────────────────────────
function BookingConfirmed({ booking, formDone, onFillForm }) {
  const navigate = useNavigate();
  const total   = booking.totalAmount    / 100;
  const paid    = booking.paidAmount     / 100;
  const balance = booking.balanceRemaining / 100;
  const isFormDone = booking.consultationFormCompleted || formDone;

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

        <p className="text-xs text-gray-400 mb-4">
          Confirmation sent to <strong>{booking.customerEmail}</strong>
        </p>

        {/* Consultation Form CTA */}
        {!isFormDone ? (
          <button onClick={onFillForm}
            className="w-full mb-3 bg-gradient-to-r from-[#C9AF94] to-[#b89a7a] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <ClipboardList size={18} />
            Fill Consultation Form
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="w-full mb-3 bg-green-50 text-green-600 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm border border-green-200">
            <CheckCircle2 size={16} /> Consultation Form Submitted ✓
          </div>
        )}

        <button onClick={() => navigate('/services')}
          className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl">
          Back to Services
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
        // Auto-open form if not yet completed
        if (!b.consultationFormCompleted) setShowForm(true);
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

  // Show consultation form (auto on first visit if not already completed)
  if (showForm && !formDone && !booking.consultationFormCompleted) {
    return (
      <ConsultationForm
        booking={booking}
        onComplete={() => {
          setFormDone(true);
          setShowForm(false);
        }}
      />
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
