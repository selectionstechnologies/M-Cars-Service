import { useEffect, useMemo, useState } from 'react'
import {
  X, ArrowLeft, ArrowRight, Check, CheckCircle2, Truck, Store, CalendarDays, Clock, Car, User, Tag, MessageCircle,
} from 'lucide-react'
import { useBooking } from '../BookingContext'
import {
  SERVICES, PACKAGES, ALL_BOOKABLE, TIME_SLOTS, COMPANY, OFFER_CODE, FIRST_VISIT_DISCOUNT, formatPrice, todayISO,
} from '../data'

const STEP_LABELS = ['Service', 'Schedule', 'Details', 'Confirm']
const STORAGE_KEY = 'mcs_bookings'


const readBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const emptyForm = () => ({
  serviceId: '',
  pickup: false,
  carModel: '',
  date: todayISO(),
  slot: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
  promo: readBookings().length === 0 ? OFFER_CODE : '',
})

const inputCls =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10'

export default function BookingModal() {
  const { open, preset, closeBooking } = useBooking()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(null)

  // reset each time the modal opens, applying any preset from the page
  useEffect(() => {
    if (!open) return
    const base = emptyForm()
    const next = { ...base, ...Object.fromEntries(Object.entries(preset).filter(([, v]) => v)) }
    setForm(next)
    setErrors({})
    setConfirmed(null)
    // skip straight to scheduling when the visitor already chose a service
    setStep(preset.serviceId ? 1 : 0)
  }, [open, preset])

  // lock page scroll + close on Escape
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeBooking()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeBooking])

  const service = ALL_BOOKABLE.find((s) => s.id === form.serviceId)
  const promoValid = form.promo.trim().toUpperCase() === OFFER_CODE
  const pricing = useMemo(() => {
    const subtotal = service?.price ?? 0
    const discount = promoValid ? Math.round((subtotal * FIRST_VISIT_DISCOUNT) / 100) : 0
    return { subtotal, discount, total: subtotal - discount }
  }, [service, promoValid])

  if (!open) return null

  const set = (key) => (e) => {
    const value = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = (s) => {
    const er = {}
    if (s === 0 && !form.serviceId) er.serviceId = 'Please choose a service'
    if (s === 1) {
      if (!form.carModel.trim()) er.carModel = 'Tell us your car make & model'
      if (!form.date) er.date = 'Pick a date'
      if (!form.slot) er.slot = 'Pick a time slot'
    }
    if (s === 2) {
      if (form.name.trim().length < 2) er.name = 'Enter your name'
      if (!/^[+\d][\d\s-]{9,}$/.test(form.phone.trim())) er.phone = 'Enter a valid phone number'
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email'
      if (form.pickup && !form.address.trim()) er.address = 'Collection address is required'
    }
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const next = () => validate(step) && setStep((s) => s + 1)
  const back = () => setStep((s) => Math.max(0, s - 1))

  const confirm = () => {
    const booking = {
      id: `MCS-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      ...form,
      serviceName: service.name,
      ...pricing,
      createdAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...readBookings(), booking]))
    } catch {
      /* storage unavailable — booking still shown as confirmed */
    }
    setConfirmed(booking)
  }

  const whatsappMsg = confirmed
    ? `${COMPANY.whatsapp}?text=${encodeURIComponent(
        `Hi M Cars Service, I just booked ${confirmed.serviceName} (Ref ${confirmed.id}) for ${confirmed.date} at ${confirmed.slot}. Car: ${confirmed.carModel}.`,
      )}`
    : '#'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Book a service">
      <div className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm" onClick={closeBooking} />

      <div className="animate-pop-in relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{confirmed ? 'Booking Confirmed' : 'Book Your Service'}</h2>
            {!confirmed && <p className="text-xs text-slate-500">Takes less than a minute · No payment now</p>}
          </div>
          <button onClick={closeBooking} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress */}
        {!confirmed && (
          <div className="px-6 pt-5">
            <ol className="flex items-center gap-2">
              {STEP_LABELS.map((label, i) => (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                      i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className={`hidden text-xs font-semibold sm:block ${i <= step ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                  {i < STEP_LABELS.length - 1 && <span className={`h-0.5 flex-1 rounded ${i < step ? 'bg-emerald-500' : 'bg-slate-100'}`} />}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {confirmed ? (
            <Success booking={confirmed} whatsappHref={whatsappMsg} onClose={closeBooking} />
          ) : (
            <>
              {step === 0 && <StepService form={form} set={set} error={errors.serviceId} />}
              {step === 1 && <StepSchedule form={form} set={set} errors={errors} />}
              {step === 2 && <StepDetails form={form} set={set} errors={errors} promoValid={promoValid} />}
              {step === 3 && <StepReview form={form} service={service} pricing={pricing} goTo={setStep} />}
            </>
          )}
        </div>

        {/* Footer */}
        {!confirmed && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-6 py-4">
            <div className="min-w-0">
              {service ? (
                <>
                  <p className="truncate text-xs text-slate-500">{service.name}</p>
                  <p className="font-bold text-slate-900">
                    {formatPrice(pricing.total)}
                    {pricing.discount > 0 && (
                      <span className="ml-2 text-xs font-medium text-slate-400 line-through">{formatPrice(pricing.subtotal)}</span>
                    )}
                  </p>
                </>
              ) : (
                <p className="text-sm text-slate-500">Select a service</p>
              )}
            </div>
            <div className="flex gap-2">
              {step > 0 && (
                <button onClick={back} className="flex items-center gap-1 rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={next}
                  className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={confirm}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                >
                  <Check className="h-4 w-4" /> Confirm Booking
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FieldError({ msg }) {
  return msg ? <p className="mt-1.5 text-sm font-medium text-brand-600">{msg}</p> : null
}

function ServiceOption({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex items-center gap-3 rounded-xl border-2 p-2.5 text-left transition ${
        selected ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <img
        src={`/images/${item.id}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-12 w-12 shrink-0 rounded-lg object-cover transition ${selected ? 'ring-2 ring-brand-600' : ''}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-slate-900">{item.name}</span>
        <span className="text-sm text-slate-500">{formatPrice(item.price)}</span>
      </span>
      {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />}
    </button>
  )
}

function StepService({ form, set, error }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900">What does your car need?</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceOption key={s.id} item={s} selected={form.serviceId === s.id} onSelect={() => set('serviceId')(s.id)} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">Or save with a package</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PACKAGES.map((p) => (
            <ServiceOption key={p.id} item={p} selected={form.serviceId === p.id} onSelect={() => set('serviceId')(p.id)} />
          ))}
        </div>
      </div>
      <FieldError msg={error} />
    </div>
  )
}

function StepSchedule({ form, set, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900">How would you like to come in?</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { value: false, icon: Store, title: 'Drop at garage', text: '164a Plymouth Grove' },
            { value: true, icon: Truck, title: 'Collection', text: 'We collect your car' },
          ].map((o) => (
            <button
              key={o.title}
              type="button"
              onClick={() => set('pickup')(o.value)}
              className={`rounded-xl border-2 p-4 text-left transition ${form.pickup === o.value ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <o.icon className={`h-6 w-6 ${form.pickup === o.value ? 'text-brand-600' : 'text-slate-500'}`} />
              <p className="mt-2 text-sm font-semibold text-slate-900">{o.title}</p>
              <p className="text-xs text-slate-500">{o.text}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Car make &amp; model</span>
          <input value={form.carModel} onChange={set('carModel')} placeholder="e.g. Ford Focus 2019" className={inputCls} />
          <FieldError msg={errors.carModel} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Date</span>
          <input type="date" min={todayISO()} value={form.date} onChange={set('date')} className={inputCls} />
          <FieldError msg={errors.date} />
        </label>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-700">Available time slots</h3>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('slot')(t)}
              className={`rounded-lg border py-2.5 text-sm font-semibold transition ${
                form.slot === t ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 text-slate-700 hover:border-brand-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <FieldError msg={errors.slot} />
      </div>
    </div>
  )
}

function StepDetails({ form, set, errors, promoValid }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-900">Your contact details</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" className={inputCls} />
          <FieldError msg={errors.name} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone / WhatsApp</span>
          <input value={form.phone} onChange={set('phone')} type="tel" placeholder="07xxx xxxxxx" autoComplete="tel" className={inputCls} />
          <FieldError msg={errors.phone} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email <span className="text-slate-400">(optional)</span></span>
        <input value={form.email} onChange={set('email')} type="email" placeholder="you@example.com" autoComplete="email" className={inputCls} />
        <FieldError msg={errors.email} />
      </label>
      {form.pickup && (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Collection address</span>
          <input value={form.address} onChange={set('address')} placeholder="House number, street, postcode" autoComplete="street-address" className={inputCls} />
          <FieldError msg={errors.address} />
        </label>
      )}
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Notes for the mechanic <span className="text-slate-400">(optional)</span></span>
        <textarea value={form.notes} onChange={set('notes')} rows={2} placeholder="Any noises, warning lights or concerns?" className={inputCls} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Promo code</span>
        <div className="relative">
          <input value={form.promo} onChange={set('promo')} placeholder="Enter code" className={`${inputCls} pr-28 uppercase`} />
          {promoValid && (
            <span className="absolute top-1/2 right-3 mt-0.75 flex -translate-y-1/2 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <Tag className="h-3 w-3" /> {FIRST_VISIT_DISCOUNT}% off
            </span>
          )}
        </div>
      </label>
    </div>
  )
}

function StepReview({ form, service, pricing, goTo }) {
  const rows = [
    { icon: Car, label: 'Service', value: service.name, step: 0 },
    { icon: CalendarDays, label: 'Date', value: new Date(`${form.date}T00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }), step: 1 },
    { icon: Clock, label: 'Time', value: form.slot, step: 1 },
    { icon: form.pickup ? Truck : Store, label: 'Mode', value: form.pickup ? `Collection — ${form.address}` : 'Drop at garage', step: 1 },
    { icon: Car, label: 'Vehicle', value: form.carModel, step: 1 },
    { icon: User, label: 'Contact', value: `${form.name} · ${form.phone}`, step: 2 },
  ]

  return (
    <div>
      <h3 className="font-semibold text-slate-900">Review your booking</h3>
      <ul className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-3 px-4 py-3">
            <r.icon className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="w-20 shrink-0 text-sm text-slate-500">{r.label}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">{r.value}</span>
            <button onClick={() => goTo(r.step)} className="text-xs font-semibold text-brand-600 hover:underline">
              Edit
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-5 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(pricing.subtotal)}</span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between font-medium text-emerald-600">
            <span>First-visit discount ({FIRST_VISIT_DISCOUNT}%)</span>
            <span>− {formatPrice(pricing.discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
          <span>Estimated total</span>
          <span>{formatPrice(pricing.total)}</span>
        </div>
        <p className="pt-1 text-xs text-slate-500">Pay after service · Card, cash or bank transfer</p>
      </div>
    </div>
  )
}

function Success({ booking, whatsappHref, onClose }) {
  return (
    <div className="py-4 text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
      </span>
      <h3 className="mt-5 text-2xl font-extrabold text-slate-900">You&apos;re all set, {booking.name.split(' ')[0]}!</h3>
      <p className="mx-auto mt-2 max-w-sm text-slate-600">
        Your <b>{booking.serviceName}</b> is booked for <b>{booking.date}</b> at <b>{booking.slot}</b>. Our team will call you shortly to confirm.
      </p>
      <div className="mx-auto mt-6 inline-block rounded-xl border-2 border-dashed border-slate-200 px-6 py-3">
        <p className="text-xs text-slate-500">Booking reference</p>
        <p className="font-mono text-xl font-bold tracking-wider text-slate-900">{booking.id}</p>
      </div>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <MessageCircle className="h-5 w-5" /> Confirm on WhatsApp
        </a>
        <button onClick={onClose} className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-200">
          Done
        </button>
      </div>
    </div>
  )
}
