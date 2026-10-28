import { useEffect, useState } from 'react'
import { X, Gift, ArrowRight } from 'lucide-react'
import { useBooking } from '../BookingContext'
import { FIRST_VISIT_DISCOUNT, OFFER_CODE } from '../data'

const SEEN_KEY = 'mcs_offer_seen'
const DELAY_MS = 6000

const safeGet = (k) => {
  try { return localStorage.getItem(k) } catch { return null }
}
const safeSet = (k, v) => {
  try { localStorage.setItem(k, v) } catch { /* ignore */ }
}

// Welcome offer shown once to first-time visitors, nudging them into a booking.
export default function OfferPopup() {
  const { open: bookingOpen, openBooking } = useBooking()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (safeGet(SEEN_KEY) || safeGet('mcs_bookings')) return
    const timer = setTimeout(() => setShow(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  // never stack on top of the booking modal
  useEffect(() => {
    if (bookingOpen && show) dismiss()
  }, [bookingOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    safeSet(SEEN_KEY, '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Welcome offer">
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={dismiss} />
      <div className="animate-pop-in relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
        <button onClick={dismiss} className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-1.5 text-white hover:bg-white/30" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 px-8 pt-10 pb-8 text-white">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/15">
            <Gift className="h-8 w-8" />
          </span>
          <p className="mt-4 text-sm font-semibold tracking-widest uppercase text-brand-100">Welcome offer</p>
          <h2 className="mt-1 text-4xl font-extrabold">{FIRST_VISIT_DISCOUNT}% OFF</h2>
          <p className="mt-1 text-brand-100">your first car service</p>
        </div>
        <div className="px-8 py-7">
          <p className="text-slate-600">
            Book any service or package today and your discount is applied automatically.
          </p>
          <div className="mx-auto mt-4 w-fit rounded-lg border-2 border-dashed border-brand-500/40 bg-brand-50 px-5 py-2 font-mono text-lg font-bold tracking-widest text-brand-700">
            {OFFER_CODE}
          </div>
          <button
            onClick={() => {
              dismiss()
              openBooking()
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700"
          >
            Claim Offer &amp; Book <ArrowRight className="h-5 w-5" />
          </button>
          <button onClick={dismiss} className="mt-3 text-sm text-slate-400 hover:text-slate-600">
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
