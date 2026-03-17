import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAvailableSlots, createCheckoutSession } from '../api/bookingApi';
import { getAllServices } from '../api/serviceApi';
import {
  ArrowLeft, ArrowRight, CalendarCheck, Clock, User, Users,
  Phone, MapPin, StickyNote, CheckCircle2, Loader2,
  ChevronLeft, ChevronRight, AlertCircle, CreditCard, ShieldCheck,
} from 'lucide-react';

const STEPS = ['Your Details', 'Date & Staff', 'Consent & Pay'];
const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#22B8C8] focus:ring-2 focus:ring-[#22B8C8]/10 transition-all bg-gray-50';
const inputErrCls = 'w-full border border-red-400 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-gray-50';

// ── Helpers ───────────────────────────────────────────────────────────────────
const toMins   = t => { const [h,m] = t.split(':').map(Number); return h*60+m; };
const fromMins = m => `${Math.floor(m/60).toString().padStart(2,'0')}:${(m%60).toString().padStart(2,'0')}`;

// ── UK Phone Validation ───────────────────────────────────────────────────────
// Accepts: 07xxx xxxxxx | +447xxx xxxxxx | 01xxx xxxxxx | 02x xxxx xxxx etc.
const UK_PHONE_RE = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?[1-9]\d{8,9}|0[1-9]\d{8,9})$/;
export const isValidUKPhone = (v) => {
  const stripped = v.replace(/[\s\-().]/g, '');
  // mobile: 07xxx xxxxxx (11 digits) or +447xxx xxxxxx (13 chars)
  if (/^07\d{9}$/.test(stripped)) return true;
  if (/^\+447\d{9}$/.test(stripped)) return true;
  // landline: 01xxx / 02x / 03xxx – 10 or 11 digits
  if (/^0[1-3]\d{8,9}$/.test(stripped)) return true;
  if (/^\+44[1-3]\d{8,9}$/.test(stripped)) return true;
  return false;
};

// ── Mini calendar ─────────────────────────────────────────────────────────────
function MonthCalendar({ selected, onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0);
  // tomorrow = smallest selectable date (today is NOT bookable)
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const year = viewDate.getFullYear(), month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="bg-white rounded-2xl border border-[#C9AF94]/20 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewDate(new Date(year, month-1, 1))} className="p-1.5 rounded-full hover:bg-gray-100"><ChevronLeft size={18} className="text-gray-500"/></button>
        <span className="font-bold text-gray-800 text-sm">{MONTHS[month]} {year}</span>
        <button onClick={() => setViewDate(new Date(year, month+1, 1))} className="p-1.5 rounded-full hover:bg-gray-100"><ChevronRight size={18} className="text-gray-500"/></button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`}/>;
          const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const cellDate = new Date(year, month, day);
          // Block today AND past — only tomorrow onwards is bookable
          const isDisabled = cellDate < tomorrow;
          const isToday = cellDate.getTime() === today.getTime();
          const isSel = selected === iso;
          return (
            <button key={iso} disabled={isDisabled} onClick={() => onSelect(iso)}
              title={isToday ? 'Same-day bookings are not available' : undefined}
              className={`aspect-square rounded-xl text-sm font-medium transition-all
                ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#22B8C8]/10 cursor-pointer'}
                ${isToday ? 'ring-1 ring-gray-200' : ''}
                ${isSel  ? 'bg-[#22B8C8] text-white hover:bg-[#22B8C8]' : 'text-gray-700'}`}>
              {day}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-gray-400 mt-3 text-center">Bookings must be made at least 1 day in advance.</p>
    </div>
  );
}

function Field({ label, icon, required, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        <span className="text-[#C9AF94]">{icon}</span>{label}{required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function SummaryBlock({ title, children }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-2">{title}</p>
      <div className="bg-[#fdf8f4] rounded-2xl divide-y divide-white overflow-hidden">{children}</div>
    </div>
  );
}
function SummaryRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center px-4 py-2.5 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-gray-700 capitalize">{value}</span>
    </div>
  );
}

const GENDER_CLS = { male: 'bg-blue-50 text-blue-500', female: 'bg-pink-50 text-pink-500', other: 'bg-purple-50 text-purple-500' };
function GenderBadge({ gender }) {
  if (!gender) return null;
  return <span className={`text-[10px] font-black px-2 py-0.5 rounded-full capitalize ${GENDER_CLS[gender] || 'bg-gray-100 text-gray-400'}`}>{gender}</span>;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector(s => s.auth);

  const [services,   setServices]   = useState([]);
  const [step,       setStep]       = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  // ── Step 0 state ─────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    customerName:          user?.name  || '',
    customerEmail:         user?.email || '',
    customerPhone:         '',
    customerAddress:       '',
    customerNotes:         '',
    // Gender locked from profile — only selectable if missing
    customerGender:        user?.gender || '',
    staffGenderPreference: 'any',
    // Service selection (pre-filled from URL param)
    selectedServiceId:     serviceId || '',
  });

  // ── Step 1 state ─────────────────────────────────────────────────────────
  const [selectedDate,  setSelectedDate]  = useState('');
  const [slotsData,     setSlotsData]     = useState([]);
  const [loadingSlots,  setLoadingSlots]  = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime,  setSelectedTime]  = useState('');

  // ── Validation errors ────────────────────────────────────────────────────
  const [phoneError, setPhoneError] = useState('');

  // ── Step 2 state ─────────────────────────────────────────────────────────
  const [paymentType,   setPaymentType]   = useState('deposit');
  const [consent, setConsent] = useState({
    termsAccepted:         false,
    privacyPolicyAccepted: false,
    marketingEmails:       false,
  });

  useEffect(() => {
    if (!accessToken) { navigate('/login'); return; }
    getAllServices().then(data => setServices(Array.isArray(data) ? data : data.data || []));
  }, []);

  // Refetch slots when date / service / gender / preference changes
  useEffect(() => {
    const svcId = form.selectedServiceId;
    if (!selectedDate || !svcId) return;
    setLoadingSlots(true);
    setSlotsData([]);
    setSelectedStaff(null);
    setSelectedTime('');
    getAvailableSlots(svcId, selectedDate, form.customerGender, form.staffGenderPreference)
      .then(setSlotsData)
      .catch(() => setSlotsData([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, form.selectedServiceId, form.customerGender, form.staffGenderPreference]);

  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const activeService = services.find(s => s._id === form.selectedServiceId);

  // End time display when a slot is selected
  const endTime = (selectedTime && activeService)
    ? fromMins(toMins(selectedTime) + activeService.duration)
    : '';

  const canStep0 = form.customerName.trim() && form.customerEmail.trim() &&
                   form.customerPhone.trim() && isValidUKPhone(form.customerPhone) &&
                   form.customerGender && form.selectedServiceId;
  const canStep1 = selectedDate && selectedStaff && selectedTime;
  const canStep2 = consent.termsAccepted && consent.privacyPolicyAccepted;

  const totalPence   = activeService ? Math.round(activeService.price * 100) : 0;
  const depositPence = activeService ? Math.round(totalPence * (activeService.depositPercentage || 0.30)) : 0;
  const chargePence  = paymentType === 'full' ? totalPence : depositPence;

  const handlePay = async () => {
    setError('');
    setSubmitting(true);
    try {
      const { url } = await createCheckoutSession({
        serviceId:             form.selectedServiceId,
        staffId:               selectedStaff._id,
        bookingDate:           selectedDate,
        bookingTime:           selectedTime,
        customerName:          form.customerName,
        customerEmail:         form.customerEmail,
        customerPhone:         form.customerPhone,
        customerAddress:       form.customerAddress,
        customerGender:        form.customerGender,
        customerNotes:         form.customerNotes,
        staffGenderPreference: form.staffGenderPreference,
        paymentType,
        consentData:           consent,
      });
      window.location.href = url;
    } catch (err) {
      setError(err.response?.data?.message || 'Could not start payment. Please try again.');
      setSubmitting(false);
    }
  };

  // Loading state
  if (!services.length) return (
    <div className="flex justify-center items-center h-screen bg-[#fdf8f4]">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-[#22B8C8] animate-spin"/>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4]">
      <div className="max-w-3xl mx-auto py-12 px-4">

        {/* Back */}
        <button onClick={() => step === 0 ? navigate(-1) : setStep(s => s-1)}
          className="inline-flex items-center gap-2 text-[#C9AF94] text-sm font-semibold px-4 py-2 rounded-full bg-[#C9AF94]/10 border border-[#C9AF94]/20 hover:bg-[#C9AF94]/20 hover:-translate-x-1 transition-all mb-8">
          <ArrowLeft size={14}/> {step === 0 ? 'Back' : 'Previous Step'}
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#C9AF94] text-xs font-semibold uppercase tracking-widest mb-1">Booking</p>
          <h1 className="text-3xl font-bold text-gray-900">
            {activeService ? activeService.name : 'Book an Appointment'}
          </h1>
          {activeService && (
            <p className="text-gray-400 text-sm mt-1">
              {activeService.duration} min · £{activeService.price}
            </p>
          )}
        </div>

        {/* Step bar */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[#22B8C8]' : 'text-gray-300'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${i < step  ? 'bg-[#22B8C8] border-[#22B8C8] text-white' :
                    i === step ? 'border-[#22B8C8] text-[#22B8C8]' : 'border-gray-200 text-gray-300'}`}>
                  {i < step ? '✓' : i+1}
                </div>
                <span className="text-xs font-semibold hidden sm:inline">{label}</span>
              </div>
              {i < STEPS.length-1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-[#22B8C8]' : 'bg-gray-200'}`}/>}
            </div>
          ))}
        </div>

        {/* ── STEP 0: Your Details ────────────────────────────────────────── */}
        {step === 0 && (
          <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8 space-y-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <User size={20} className="text-[#22B8C8]"/> Your Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" icon={<User size={14}/>} required>
                <input value={form.customerName} onChange={e => handleField('customerName', e.target.value)}
                  placeholder="Jane Smith" className={inputCls}/>
              </Field>

              <Field label="Email" icon={<User size={14}/>} required>
                <input value={form.customerEmail} onChange={e => handleField('customerEmail', e.target.value)}
                  placeholder="jane@example.com" type="email" className={inputCls}/>
              </Field>

              <Field label="Phone (UK)" icon={<Phone size={14}/>} required>
                <input
                  value={form.customerPhone}
                  onChange={e => {
                    handleField('customerPhone', e.target.value);
                    if (e.target.value && !isValidUKPhone(e.target.value))
                      setPhoneError('Enter a valid UK number e.g. 07700 900000');
                    else setPhoneError('');
                  }}
                  onBlur={e => {
                    if (e.target.value && !isValidUKPhone(e.target.value))
                      setPhoneError('Enter a valid UK number e.g. 07700 900000');
                  }}
                  placeholder="07700 900000" className={phoneError ? inputErrCls : inputCls}/>
                {phoneError && <p className="text-red-400 text-xs mt-1 ml-1">{phoneError}</p>}
              </Field>

              {/* Address */}
              <Field label="Address" icon={<MapPin size={14}/>}>
                <input value={form.customerAddress} onChange={e => handleField('customerAddress', e.target.value)}
                  placeholder="123 High Street, London" className={inputCls}/>
              </Field>

              {/* Service selector */}
              <Field label="Service" icon={<CalendarCheck size={14}/>} required>
                <select value={form.selectedServiceId} onChange={e => { handleField('selectedServiceId', e.target.value); setSelectedDate(''); setSlotsData([]); setSelectedStaff(null); setSelectedTime(''); }}
                  className={inputCls}>
                  <option value="">Select a service</option>
                  {services.filter(s => s.isActive).map(s => (
                    <option key={s._id} value={s._id}>{s.name} — £{s.price} ({s.duration} min)</option>
                  ))}
                </select>
              </Field>

              {/* Gender — locked from profile */}
              <Field label="Your Gender" icon={<User size={14}/>} required>
                {form.customerGender ? (
                  <div className={`${inputCls} flex items-center justify-between cursor-not-allowed opacity-80`}>
                    <span className="capitalize font-medium">{form.customerGender.replace(/-/g,' ')}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">from profile</span>
                  </div>
                ) : (
                  <select value={form.customerGender} onChange={e => handleField('customerGender', e.target.value)} className={inputCls}>
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                )}
              </Field>

              {/* Staff gender preference */}
              <Field label="Preferred Staff Gender" icon={<Users size={14}/>}>
                <select value={form.staffGenderPreference} onChange={e => handleField('staffGenderPreference', e.target.value)} className={inputCls}>
                  <option value="any">No preference</option>
                  <option value="female">Female staff only</option>
                  <option value="male">Male staff only</option>
                </select>
              </Field>
            </div>

            <Field label="Notes (optional)" icon={<StickyNote size={14}/>}>
              <textarea value={form.customerNotes} onChange={e => handleField('customerNotes', e.target.value)}
                rows={3} placeholder="Any special requests..." className={inputCls + ' resize-none'}/>
            </Field>

            <button disabled={!canStep0} onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all">
              Choose Date & Time <ArrowRight size={16}/>
            </button>
          </div>
        )}

        {/* ── STEP 1: Date / Staff / Time ──────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Service summary pill */}
            {activeService && (
              <div className="bg-white rounded-2xl border border-[#C9AF94]/20 p-4 flex items-center gap-3">
                <CalendarCheck size={18} className="text-[#22B8C8] shrink-0"/>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{activeService.name}</p>
                  <p className="text-xs text-gray-400">{activeService.duration} min · £{activeService.price}</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
                <CalendarCheck size={20} className="text-[#22B8C8]"/> Pick a Date
              </h2>
              <MonthCalendar selected={selectedDate} onSelect={setSelectedDate}/>
            </div>

            {selectedDate && (
              <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
                  <Clock size={20} className="text-[#22B8C8]"/> Available Staff & Times
                </h2>

                {loadingSlots && (
                  <div className="flex items-center gap-3 text-gray-400 py-6">
                    <Loader2 size={20} className="animate-spin text-[#22B8C8]"/>
                    <span className="text-sm">Finding available slots...</span>
                  </div>
                )}
                {!loadingSlots && slotsData.length === 0 && (
                  <div className="flex items-center gap-3 bg-amber-50 text-amber-600 rounded-2xl p-4 text-sm">
                    <AlertCircle size={18}/> No available slots on this date. Please try another day.
                  </div>
                )}

                {!loadingSlots && slotsData.map(({ staff, availableSlots }) => (
                  <div key={staff._id}
                    className={`mb-5 rounded-2xl border-2 p-5 transition-all cursor-pointer
                      ${selectedStaff?._id === staff._id ? 'border-[#22B8C8] bg-[#f0fafa]' : 'border-gray-100 hover:border-[#C9AF94]/40'}`}
                    onClick={() => { setSelectedStaff(staff); setSelectedTime(''); }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22B8C8] to-[#C9AF94] flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                        {staff.profileImage ? <img src={staff.profileImage} alt={staff.name} className="w-full h-full object-cover"/> : staff.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-gray-800 text-sm">{staff.name}</p>
                          <GenderBadge gender={staff.gender}/>
                        </div>
                        <p className="text-xs text-gray-400">{availableSlots.length} slots available</p>
                      </div>
                      {selectedStaff?._id === staff._id && <CheckCircle2 size={20} className="text-[#22B8C8] shrink-0"/>}
                    </div>

                    {selectedStaff?._id === staff._id && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {availableSlots.map(slot => {
                          const end = activeService ? fromMins(toMins(slot) + activeService.duration) : '';
                          return (
                            <button key={slot}
                              onClick={e => { e.stopPropagation(); setSelectedTime(slot); }}
                              title={end ? `${slot} – ${end}` : slot}
                              className={`py-2 rounded-xl text-xs font-semibold border transition-all
                                ${selectedTime === slot
                                  ? 'bg-[#22B8C8] text-white border-[#22B8C8]'
                                  : 'border-gray-200 text-gray-600 hover:border-[#22B8C8] hover:text-[#22B8C8]'}`}>
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Show selected time + auto end time */}
                    {selectedStaff?._id === staff._id && selectedTime && (
                      <div className="mt-3 flex items-center gap-2 bg-[#22B8C8]/10 rounded-xl px-4 py-2">
                        <Clock size={14} className="text-[#22B8C8]"/>
                        <span className="text-sm font-bold text-[#22B8C8]">{selectedTime}</span>
                        <span className="text-sm text-gray-400">→</span>
                        <span className="text-sm font-bold text-[#22B8C8]">{endTime}</span>
                        <span className="text-xs text-gray-400 ml-1">({activeService?.duration} min)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button disabled={!canStep1} onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all">
              Review & Pay <ArrowRight size={16}/>
            </button>
          </div>
        )}

        {/* ── STEP 2: Consent & Pay ─────────────────────────────────────────── */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Review & Pay</h2>

            <SummaryBlock title="Service">
              <SummaryRow label="Service"  value={activeService?.name}/>
              <SummaryRow label="Duration" value={`${activeService?.duration} min`}/>
              <SummaryRow label="Price"    value={`£${activeService?.price}`}/>
            </SummaryBlock>

            <SummaryBlock title="Appointment">
              <SummaryRow label="Date"     value={selectedDate}/>
              <SummaryRow label="Start"    value={selectedTime}/>
              <SummaryRow label="End"      value={endTime}/>
              <SummaryRow label="Staff"    value={selectedStaff?.name}/>
            </SummaryBlock>

            <SummaryBlock title="Your Details">
              <SummaryRow label="Name"    value={form.customerName}/>
              <SummaryRow label="Email"   value={form.customerEmail}/>
              <SummaryRow label="Phone"   value={form.customerPhone}/>
              <SummaryRow label="Gender"  value={form.customerGender}/>
              <SummaryRow label="Address" value={form.customerAddress}/>
              <SummaryRow label="Staff preference" value={form.staffGenderPreference === 'any' ? 'No preference' : `${form.staffGenderPreference} staff only`}/>
              <SummaryRow label="Notes"   value={form.customerNotes}/>
            </SummaryBlock>

            {/* Payment option */}
            <div>
              <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-3">Payment Option</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPaymentType('deposit')}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${paymentType === 'deposit' ? 'border-[#22B8C8] bg-[#f0fafa]' : 'border-gray-200 hover:border-[#C9AF94]/40'}`}>
                  <p className="font-bold text-gray-800 text-sm">Pay Deposit</p>
                  <p className="text-2xl font-black text-[#22B8C8] mt-1">£{(depositPence/100).toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">{Math.round((activeService?.depositPercentage||0.30)*100)}% now · balance at salon</p>
                </button>
                <button onClick={() => setPaymentType('full')}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${paymentType === 'full' ? 'border-[#22B8C8] bg-[#f0fafa]' : 'border-gray-200 hover:border-[#C9AF94]/40'}`}>
                  <p className="font-bold text-gray-800 text-sm">Pay in Full</p>
                  <p className="text-2xl font-black text-[#22B8C8] mt-1">£{(totalPence/100).toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">Nothing to pay at salon</p>
                </button>
              </div>
            </div>

            {/* Consent checkboxes */}
            <div>
              <p className="text-xs font-bold text-[#C9AF94] uppercase tracking-widest mb-3 flex items-center gap-1.5"><ShieldCheck size={13}/> Consent</p>
              <div className="space-y-3">
                {[
                  { key: 'termsAccepted',         label: 'I agree to the Terms & Conditions', required: true },
                  { key: 'privacyPolicyAccepted',  label: 'I accept the Privacy Policy',       required: true },
                  { key: 'marketingEmails',        label: 'I\'d like to receive offers and news by email (optional)', required: false },
                ].map(({ key, label, required }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                      ${consent[key] ? 'bg-[#22B8C8] border-[#22B8C8]' : 'border-gray-300 group-hover:border-[#22B8C8]'}`}
                      onClick={() => setConsent(c => ({ ...c, [key]: !c[key] }))}>
                      {consent[key] && <CheckCircle2 size={12} className="text-white"/>}
                    </div>
                    <span className="text-sm text-gray-600 leading-tight">
                      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Slot hold notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <Clock size={16} className="text-amber-500 mt-0.5 shrink-0"/>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your selected slot will be <strong>held for 30 minutes</strong> while you complete payment. It will be released automatically if payment is not completed.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-500 rounded-2xl p-4 text-sm">
                <AlertCircle size={16}/> {error}
              </div>
            )}

            <button onClick={handlePay} disabled={submitting || !canStep2}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg transition-all">
              {submitting
                ? <><Loader2 size={18} className="animate-spin"/> Redirecting to Payment...</>
                : <><CreditCard size={18}/> Pay £{(chargePence/100).toFixed(2)} securely with Stripe</>}
            </button>
            <p className="text-center text-xs text-gray-400">Secured by Stripe · Card details never stored on our servers</p>
          </div>
        )}

      </div>
    </div>
  );
}
