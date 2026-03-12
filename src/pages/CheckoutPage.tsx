import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Clock, CheckCircle, Loader2, CreditCard, X } from 'lucide-react';

const SERVICE_FEE = 10;

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function SuccessModal({ details, onClose }: { details: any, onClose: () => void }) {
  console.log('SuccessModal rendered with details:', details);
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 sm:p-6">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-300">
        {/* Close Button Top Right - Compact */}
        <button 
          onClick={() => {
            console.log('Modal: Close button clicked');
            onClose();
          }}
          className="absolute right-4 top-4 z-[110] p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 border border-white/20 sm:right-6 sm:top-6"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-center pt-10 pb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight sm:text-3xl">Booking Confirmed!</h2>
          <p className="mt-1 text-blue-100 text-sm font-medium opacity-90 max-w-[240px] mx-auto leading-tight">Your service has been scheduled and confirmed.</p>
        </div>
        
        <div className="p-5 sm:p-8">
          <div className="mb-4 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-200/50 last:border-0">
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Service</span>
              <span className="text-slate-900 font-bold text-sm">{details.serviceTitle}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-200/50 last:border-0">
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Customer</span>
              <span className="text-slate-900 font-bold text-sm">{details.name}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-200/50 last:border-0">
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Date & Time</span>
              <span className="text-slate-900 font-bold text-sm">{details.date} at {details.time}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-200/50 last:border-0">
              <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Total Paid</span>
              <span className="text-blue-600 font-black text-xl tracking-tighter">${details.servicePrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3.5 mb-6 border border-blue-100 shadow-inner">
            <p className="text-[13px] text-blue-900 leading-snug text-center font-medium">
              Confirmation sent to <span className="text-blue-600 font-bold underline underline-offset-2">{details.email}</span>
            </p>
          </div>

          <button
            onClick={() => {
              console.log('Modal: Done button clicked');
              onClose();
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
          >
            <span>Back to Dashboard</span>
            <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || { service: { title: 'Service', price: 99, duration: '2-4 hours' } };
  const total = (service.price || 99) + SERVICE_FEE;

  // Personal info
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });
  // Schedule
  const [schedule, setSchedule] = useState({ date: '', time: '', notes: '' });
  // Payment (fake)
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all';

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    const rawCard = card.number.replace(/\s/g, '');
    if (rawCard.length < 16) { setError('Please enter a valid 16-digit card number.'); return; }
    if (card.expiry.length < 5) { setError('Please enter a valid expiry date (MM/YY).'); return; }
    if (card.cvc.length < 3) { setError('Please enter a valid 3-digit CVC.'); return; }
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address) {
      setError('Please fill in all personal information fields.'); return;
    }
    if (!schedule.date || !schedule.time) { setError('Please select a preferred date and time.'); return; }

    setIsProcessing(true);

    try {
      // 1. Save booking to database (Admin Panel)
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          address: form.address,
          serviceTitle: service.title,
          servicePrice: total,
          date: schedule.date,
          time: schedule.time,
          notes: schedule.notes
        }),
      });

      if (!bookingRes.ok) throw new Error('Failed to save booking');

      // 2. Send confirmation email via backend proxy (Nodemailer)
      // We don't await this or block the UI if it fails, but we try our best
      fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          serviceTitle: service.title,
          servicePrice: total,
          address: form.address,
          date: schedule.date,
          time: schedule.time,
        }),
      }).catch(err => console.error('Background email send failed:', err));

      // 3. Show success state
      setIsProcessing(false);
      setIsSuccess(true);
      // Wait time to let the "Payment Successful" button state settle
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred during checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </button>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Complete Your Booking</h1>
          <p className="mt-1.5 text-gray-500 font-medium">Fill in your details to book {service.title}</p>
        </div>

        <form onSubmit={handlePay}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">

              {/* Step 1 – Personal Information */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">1</div>
                  <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                      <input required type="text" placeholder="John" className={inputClass}
                        value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                      <input required type="text" placeholder="Doe" className={inputClass}
                        value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input required type="email" placeholder="john@example.com" className={inputClass}
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input required type="tel" placeholder="(555) 123-4567" className={inputClass}
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Address</label>
                    <input required type="text" placeholder="123 Main St, City, State 12345" className={inputClass}
                      value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Step 2 – Schedule */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">2</div>
                  <h2 className="text-lg font-bold text-gray-900">Schedule Your Service</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                      <input required type="date" className={inputClass}
                        value={schedule.date} min={new Date().toISOString().split('T')[0]}
                        onChange={e => setSchedule({ ...schedule, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time</label>
                      <input required type="time" className={inputClass}
                        value={schedule.time}
                        onChange={e => setSchedule({ ...schedule, time: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes (Optional)</label>
                    <textarea rows={3} placeholder="Any special instructions or details about the service..."
                      className={`${inputClass} resize-none`}
                      value={schedule.notes} onChange={e => setSchedule({ ...schedule, notes: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Step 3 – Payment (fake) */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">3</div>
                  <h2 className="text-lg font-bold text-gray-900">Payment Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`${inputClass} pl-11`}
                        value={card.number}
                        onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        maxLength={5}
                        className={inputClass}
                        value={card.expiry}
                        onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        maxLength={4}
                        className={inputClass}
                        value={card.cvc}
                        onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Pay Button */}

              <button
                type="submit"
                disabled={isProcessing || isSuccess}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl py-5 text-base font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
                  isSuccess ? 'bg-green-500 shadow-green-600/25' : 'bg-blue-600 shadow-blue-600/25 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Processing Payment…</>
                ) : isSuccess ? (
                  <><CheckCircle className="h-5 w-5" /> Payment Successful!</>
                ) : (
                  <><Lock className="h-5 w-5" /> Pay ${total.toFixed(2)}</>
                )}
              </button>
              <p className="text-center text-sm text-gray-400">Your payment is secured with 256-bit SSL encryption</p>
            </div>

            {/* Right Column – Order Summary */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{service.title}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{service.duration || '2-4 hours'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Price</span>
                    <span className="font-semibold text-gray-900">${(service.price || 99).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="font-semibold text-gray-900">${SERVICE_FEE.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                  {['Free cancellation up to 24h before', '100% satisfaction guaranteed', 'Verified professionals'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isSuccess && (
        <SuccessModal
          onClose={() => {
            console.log('CheckoutPage: onClose called, navigating to /services');
            navigate('/services');
          }}
          details={{
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            serviceTitle: service.title,
            servicePrice: total,
            date: schedule.date,
            time: schedule.time,
          }}
        />
      )}
    </div>
  );
}
