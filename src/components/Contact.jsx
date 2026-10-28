import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import { Logo } from './Navbar'
import Section from './Section'
import { COMPANY, FIRST_VISIT_DISCOUNT } from '../data'
import { useBooking } from '../BookingContext'

export function CtaBanner() {
  const { openBooking } = useBooking()

  return (
    <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-700 px-6 py-16 text-center sm:px-12 lg:py-20">
        <img src="/images/cta.webp" alt="" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-700/95 via-brand-600/85 to-ink-900/80" />
        <h2 className="relative text-4xl text-white sm:text-5xl">
          Your car deserves the best. Book today.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
          First-time customers get {FIRST_VISIT_DISCOUNT}% off. Same-day slots available.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openBooking()}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand-700 shadow-xl transition hover:-translate-y-0.5"
          >
            Book Now <ArrowRight className="h-5 w-5" />
          </button>
          <a
            href={COMPANY.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const items = [
    { icon: Phone, label: 'Call us', value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: COMPANY.whatsapp },
    { icon: MapPin, label: 'Visit our garage', value: COMPANY.address, href: COMPANY.mapLink },
  ]

  return (
    <Section id="contact" className="bg-cream">
      <div>
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">Contact</p>
          <h2 className="mt-3 text-4xl text-slate-900 sm:text-5xl">Visit our garage</h2>
          <p className="mt-4 text-lg text-slate-600">Prefer to talk first? Reach us any way you like.</p>
        </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => {
              const content = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
                    <it.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-500">{it.label}</span>
                    <span className="block font-semibold text-slate-900">{it.value}</span>
                  </span>
                </>
              )
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a
                      href={it.href}
                      target={it.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-4 transition hover:translate-x-1"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
      </div>
    </Section>
  )
}

export function Footer() {
  const { openBooking } = useBooking()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 pt-16 pb-28 text-slate-400 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Car servicing, repairs, diagnostics and valeting with honest, fixed pricing — 164a Plymouth Grove, Manchester.
          </p>
          <button
            onClick={() => openBooking()}
            className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Book a Service
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {['Services', 'Packages', 'Reviews', 'FAQ', 'Contact'].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Get in Touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={COMPANY.phoneHref} className="hover:text-white">{COMPANY.phone}</a></li>
            <li><a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp us</a></li>
            <li>
              <a href={COMPANY.mapLink} target="_blank" rel="noreferrer" className="hover:text-white">
                164a Plymouth Grove,<br />Manchester M13 0AF,<br />United Kingdom
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-white">Find Us</h3>
          <a
            href={COMPANY.mapLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-white"
          >
            <MapPin className="h-4 w-4" /> Open in Google Maps
          </a>
        </div>
        <div className="mt-4 h-64 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-80">
          <iframe
            title="M Cars Service location"
            src={COMPANY.mapEmbed}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 pt-6 text-center text-sm sm:px-6 lg:px-8">
        © {year} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  )
}
