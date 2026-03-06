import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getServiceById } from '../api/serviceApi';
import { getAvailableSlots, createBooking } from '../api/bookingApi';
import {
  ArrowLeft, ArrowRight, CalendarCheck, Clock, User,
  Phone, MapPin, StickyNote, CheckCircle2, Loader2,
  ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';

const STEPS = ['Your Details', 'Pick a Date & Time', 'Confirm'];

// ── Mini calendar ───────────────────────────────────────────────────────────
function MonthCalendar({ selected, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];

  return (
    <div className="bg-white rounded-2xl border border-[#C9AF94]/20 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-500" />
        </button>
        <span className="font-bold text-gray-800 text-sm">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={18} className="text-gray-500" />
        </button>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const cellDate = new Date(year, month, day);
          const isPast = cellDate < today;
          const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const isSelected = selected === iso;
          return (
            <button
              key={iso}
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={`aspect-square rounded-xl text-sm font-medium transition-all
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#22B8C8]/10 cursor-pointer'}
                ${isSelected ? 'bg-[#22B8C8] text-white hover:bg-[#22B8C8]' : 'text-gray-700'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function BookingPage() {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((s) => s.auth);

  const [service, setService]   = useState(null);
  const [step, setStep]         = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const [error, setError]       = useState('');

  // Step 1 – customer details
  const [form, setForm] = useState({
    customerName:    user?.name || '',
    customerEmail:   user?.email || '',
    customerPhone:   '',
    customerAddress: '',
    customerGender:  user?.gender || '',
    customerNotes:   '',
  });

  // Step 2 – date / time / staff
  const [selectedDate, setSelectedDate]   = useState('');
  const [slotsData, setSlotsData]         = useState([]);  // [{staff, availableSlots}]
  const [loadingSlots, setLoadingSlots]   = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime]   = useState('');

  useEffect(() => {
    if (!accessToken) navigate('/login');
    getServiceById(serviceId).then(setService);
  }, [serviceId]);

  // Load slots whenever date changes
  useEffect(() => {
    if (!selectedDate || !serviceId) return;
    setLoadingSlots(true);
    setSlotsData([]);
    setSelectedStaff(null);
    setSelectedTime('');
    getAvailableSlots(serviceId, selectedDate, form.customerGender)
      .then(setSlotsData)
      .catch(() => setSlotsData([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, serviceId, form.customerGender]);

  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canProceedStep0 = form.customerName.trim() && form.customerEmail.trim() && form.customerPhone.trim() && form.customerGender;
  const canProceedStep1 = selectedDate && selectedStaff && selectedTime;

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const booking = await createBooking({
        ...form,
        serviceId,
        staffId:     selectedStaff._id,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        bookingSource: 'website',
      });
      setSuccessBooking(booking);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!service) return (
    <div className="flex justify-center items-center h-screen bg-[#fdf8f4]">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-[#22B8C8] animate-spin" />
    </div>
  );

  if (successBooking) return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Requested!</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Your appointment for <strong className="text-gray-600">{service.name}</strong> on{' '}
          <strong className="text-gray-600">{selectedDate}</strong> at{' '}
          <strong className="text-gray-600">{selectedTime}</strong> has been submitted.
        </p>
        <div className="bg-[#fdf8f4] rounded-2xl p-4 mb-6 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Booking #</span>
            <span className="font-bold text-gray-700">{successBooking.bookingNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="font-bold text-yellow-500 capitalize">{successBooking.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="font-bold text-gray-700">£{(successBooking.totalAmount / 100).toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl"
        >
          Back to Services
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4]">
      <div className="max-w-3xl mx-auto py-12 px-4">

        {/* Back */}
        <button
          onClick={() => step === 0 ? navigate(`/service/${serviceId}`) : setStep(s => s - 1)}
          className="inline-flex items-center gap-2 text-[#C9AF94] text-sm font-semibold px-4 py-2 rounded-full bg-[#C9AF94]/10 border border-[#C9AF94]/20 hover:bg-[#C9AF94]/20 hover:-translate-x-1 transition-all mb-8"
        >
          <ArrowLeft size={14} /> {step === 0 ? 'Back to Service' : 'Previous Step'}
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#C9AF94] text-xs font-semibold uppercase tracking-widest mb-1">Booking</p>
          <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
          <p className="text-gray-400 text-sm mt-1">Duration: {service.duration} min · £{service.price}</p>
        </div>

        {/* Step bar */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[#22B8C8]' : 'text-gray-300'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${i < step ? 'bg-[#22B8C8] border-[#22B8C8] text-white' :
                    i === step ? 'border-[#22B8C8] text-[#22B8C8]' : 'border-gray-200 text-gray-300'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-xs font-semibold hidden sm:inline">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-[#22B8C8]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 0: Customer Details ── */}
        {step === 0 && (
          <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8 space-y-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <User size={20} className="text-[#22B8C8]" /> Your Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" icon={<User size={14} />}>
                <input value={form.customerName} onChange={e => handleField('customerName', e.target.value)}
                  placeholder="Jane Smith" className={inputCls} />
              </Field>
              <Field label="Email" icon={<User size={14} />}>
                <input value={form.customerEmail} onChange={e => handleField('customerEmail', e.target.value)}
                  placeholder="jane@example.com" type="email" className={inputCls} />
              </Field>
              <Field label="Phone" icon={<Phone size={14} />}>
                <input value={form.customerPhone} onChange={e => handleField('customerPhone', e.target.value)}
                  placeholder="07700 900000" className={inputCls} />
              </Field>
              <Field label="Gender" icon={<User size={14} />}>
                <select value={form.customerGender} onChange={e => handleField('customerGender', e.target.value)} className={inputCls}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>
            </div>

            <Field label="Address (optional)" icon={<MapPin size={14} />}>
              <input value={form.customerAddress} onChange={e => handleField('customerAddress', e.target.value)}
                placeholder="123 High Street, London" className={inputCls} />
            </Field>

            <Field label="Notes (optional)" icon={<StickyNote size={14} />}>
              <textarea value={form.customerNotes} onChange={e => handleField('customerNotes', e.target.value)}
                rows={3} placeholder="Any special requests or information..." className={inputCls + ' resize-none'} />
            </Field>

            <button
              disabled={!canProceedStep0}
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── Step 1: Date / Time / Staff ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
                <CalendarCheck size={20} className="text-[#22B8C8]" /> Pick a Date
              </h2>
              <MonthCalendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>

            {selectedDate && (
              <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <Clock size={20} className="text-[#22B8C8]" /> Available Staff & Times
                </h2>

                {loadingSlots && (
                  <div className="flex items-center gap-3 text-gray-400 py-6">
                    <Loader2 size={20} className="animate-spin text-[#22B8C8]" />
                    <span className="text-sm">Finding available slots...</span>
                  </div>
                )}

                {!loadingSlots && slotsData.length === 0 && (
                  <div className="flex items-center gap-3 bg-amber-50 text-amber-600 rounded-2xl p-4 text-sm">
                    <AlertCircle size={18} />
                    No available slots on this date. Please try another day.
                  </div>
                )}

                {!loadingSlots && slotsData.map(({ staff, availableSlots }) => (
                  <div key={staff._id} className={`mb-5 rounded-2xl border-2 p-5 transition-all cursor-pointer
                    ${selectedStaff?._id === staff._id ? 'border-[#22B8C8] bg-[#f0fafa]' : 'border-gray-100 hover:border-[#C9AF94]/40'}`}
                    onClick={() => { setSelectedStaff(staff); setSelectedTime(''); }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22B8C8] to-[#C9AF94] flex items-center justify-center text-white font-bold text-sm">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{staff.name}</p>
                        <p className="text-xs text-gray-400">{availableSlots.length} slots available</p>
                      </div>
                      {selectedStaff?._id === staff._id && (
                        <CheckCircle2 size={20} className="text-[#22B8C8] ml-auto" />
                      )}
                    </div>

                    {selectedStaff?._id === staff._id && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={e => { e.stopPropagation(); setSelectedTime(slot); }}
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all
                              ${selectedTime === slot
                                ? 'bg-[#22B8C8] text-white border-[#22B8C8]'
                                : 'border-gray-200 text-gray-600 hover:border-[#22B8C8] hover:text-[#22B8C8]'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Review Booking <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ── Step 2: Confirm ── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Review & Confirm</h2>

            <SummaryBlock title="Service">
              <SummaryRow label="Service"  value={service.name} />
              <SummaryRow label="Duration" value={`${service.duration} min`} />
              <SummaryRow label="Price"    value={`£${service.price}`} />
            </SummaryBlock>

            <SummaryBlock title="Appointment">
              <SummaryRow label="Date"  value={selectedDate} />
              <SummaryRow label="Time"  value={selectedTime} />
              <SummaryRow label="Staff" value={selectedStaff?.name} />
            </SummaryBlock>

            <SummaryBlock title="Your Details">
              <SummaryRow label="Name"   value={form.customerName} />
              <SummaryRow label="Email"  value={form.customerEmail} />
              <SummaryRow label="Phone"  value={form.customerPhone} />
              <SummaryRow label="Gender" value={form.customerGender} />
              {form.customerAddress && <SummaryRow label="Address" value={form.customerAddress} />}
              {form.customerNotes   && <SummaryRow label="Notes"   value={form.customerNotes} />}
            </SummaryBlock>

            <div className="bg-[#fdf8f4] rounded-2xl p-4 text-sm space-y-2">
              <div className="flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span>
                <span>£{service.price}</span>
              </div>
              <p className="text-gray-400 text-xs">Payment will be arranged at the salon. A deposit may be required.</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-500 rounded-2xl p-4 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <><CalendarCheck size={18} /> Confirm Booking</>}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────
const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#22B8C8] focus:ring-2 focus:ring-[#22B8C8]/10 transition-all bg-gray-50';

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        <span className="text-[#C9AF94]">{icon}</span>{label}
      </label>
      {children}
    </div>
  );
}

function SummaryBlock({ title, children }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-3">{title}</p>
      <div className="bg-[#fdf8f4] rounded-2xl divide-y divide-white overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-gray-700 capitalize">{value}</span>
    </div>
  );
}
