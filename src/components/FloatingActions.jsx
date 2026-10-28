import { useEffect, useState } from 'react'
import { CalendarCheck, Phone } from 'lucide-react'
import { COMPANY } from '../data'
import { useBooking } from '../BookingContext'

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  )
}

// Call button bottom-left, WhatsApp bottom-right (always visible),
// plus a "Book Now" pill in the middle on mobile once the visitor scrolls.
export default function FloatingActions() {
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href={COMPANY.phoneHref}
        aria-label={`Call now ${COMPANY.phone}`}
        className="group fixed bottom-5 left-5 z-30 flex h-14 items-center gap-2 rounded-full bg-brand-600 px-4 text-white shadow-xl shadow-brand-600/30 transition hover:scale-105 hover:bg-brand-700 sm:bottom-6 sm:left-6"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-600/40 [animation-duration:2.5s]" />
        <Phone className="h-6 w-6" />
        <span className="hidden font-semibold sm:inline">Call Now</span>
      </a>

      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-30 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-xl shadow-emerald-500/30 transition hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="hidden font-semibold sm:inline">WhatsApp</span>
      </a>

      <button
        onClick={() => openBooking()}
        className={`fixed bottom-5 left-1/2 z-30 flex h-14 -translate-x-1/2 items-center gap-2 rounded-full bg-ink-900 px-6 font-semibold text-white shadow-xl transition-all duration-300 lg:hidden ${
          scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
        }`}
      >
        <CalendarCheck className="h-5 w-5" /> Book Now
      </button>
    </>
  )
}
