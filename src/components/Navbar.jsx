import { useEffect, useState } from 'react'
import { Menu, X, CalendarCheck } from 'lucide-react'
import { COMPANY } from '../data'
import { useBooking } from '../BookingContext'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#packages', label: 'Packages' },
  { href: '#why', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Logo({ light = false }) {
  return (
    <a href="#top" className="flex flex-col leading-none" aria-label={COMPANY.name}>
      <span className={`font-serif text-[1.9rem] font-semibold ${light ? 'text-white' : 'text-ink-900'}`}>
        M Cars <em className={`font-medium italic ${light ? 'text-gold-400' : 'text-brand-600'}`}>Service</em>
      </span>
      <span className={`mt-1 text-[0.62rem] font-bold tracking-[0.32em] uppercase ${light ? 'text-gold-300' : 'text-gold-500'}`}>
        Servicing &amp; Repairs · Manchester
      </span>
    </a>
  )
}

export default function Navbar() {
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      // highlight the section currently under the header
      let current = '#top'
      for (const l of LINKS) {
        const el = document.querySelector(l.href)
        if (el && el.getBoundingClientRect().top <= 120) current = l.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 bg-cream/95 backdrop-blur transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-black/5' : ''}`}>
      <nav className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative py-2 text-[0.82rem] font-semibold tracking-[0.18em] uppercase transition ${
                  active === l.href ? 'text-brand-600' : 'text-ink-900 hover:text-brand-600'
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-transform duration-300 ${
                    active === l.href ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => openBooking()}
          className="hidden items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 lg:flex"
        >
          <CalendarCheck className="h-5 w-5" /> Book a Service
        </button>

        <button
          className="rounded-lg p-2 text-ink-900 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="animate-fade-up border-t border-black/5 bg-cream px-4 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold tracking-[0.18em] text-ink-900 uppercase hover:bg-black/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setMenuOpen(false)
              openBooking()
            }}
            className="w-full rounded-full bg-brand-600 py-3.5 font-semibold text-white"
          >
            Book a Service
          </button>
        </div>
      )}
    </header>
  )
}
