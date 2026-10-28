import { useEffect, useState } from 'react'
import { ArrowRight, BadgeCheck, Wallet, MapPin } from 'lucide-react'
import { FIRST_VISIT_DISCOUNT } from '../data'
import { useBooking } from '../BookingContext'
import Typewriter from './Typewriter'

const BANNERS = ['/images/hero.webp', '/images/hero-2.webp', '/images/hero-3.webp']
const BANNER_INTERVAL = 6000

const HEADLINES = [
  'booked in 60 seconds',
  'by skilled mechanics',
  'at honest, fixed prices',
  'with quality parts only',
]

export default function Hero() {
  const { openBooking } = useBooking()
  const [slide, setSlide] = useState(0)

  // restart the timer whenever the slide changes (including manual dot clicks)
  useEffect(() => {
    const timer = setTimeout(() => setSlide((s) => (s + 1) % BANNERS.length), BANNER_INTERVAL)
    return () => clearTimeout(timer)
  }, [slide])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-900 pt-[88px]">
      {/* rotating banner photos */}
      <div className="pointer-events-none absolute inset-0">
        {BANNERS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === slide ? 'animate-ken-burns opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/65 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <p className="animate-fade-up text-xs font-bold tracking-[0.3em] text-white/90 uppercase sm:text-sm">
            Car Servicing &amp; Repairs · Manchester
          </p>

          <h1 className="animate-fade-up mt-6 text-[2.6rem] leading-[1.1] text-white [animation-delay:100ms] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block sm:whitespace-nowrap">Expert care for your car,</span>
            {/* fixed height so the layout doesn't jump while typing */}
            <em className="block min-h-[2.2em] font-medium text-gold-300 italic sm:min-h-[1.1em] sm:whitespace-nowrap">
              <Typewriter words={HEADLINES} />
            </em>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/85 [animation-delay:200ms] sm:text-xl">
            Servicing, repairs, diagnostics, air con and valeting for all makes and models — at fixed, upfront prices
            from our garage on Plymouth Grove.
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap gap-4 [animation-delay:300ms]">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-brand-500"
            >
              Book a Service
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <a
              href="#services"
              className="rounded-full border border-white/60 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-ink-900"
            >
              Explore Services
            </a>
          </div>

          <div className="animate-fade-up mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80 [animation-delay:400ms]">
            <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-gold-400" /> All makes &amp; models</span>
            <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-gold-400" /> Pay after service</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-400" /> Manchester M13 0AF</span>
          </div>
        </div>
      </div>

      {/* offer ribbon */}
      <button
        onClick={() => openBooking()}
        className="absolute top-[112px] right-6 hidden rounded-full border border-gold-400/40 bg-ink-900/60 px-5 py-2.5 text-sm font-semibold text-gold-300 backdrop-blur transition hover:bg-ink-900/80 lg:block"
      >
        {FIRST_VISIT_DISCOUNT}% off your first service →
      </button>

      {/* banner dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2.5">
        {BANNERS.map((src, i) => (
          <button
            key={src}
            onClick={() => setSlide(i)}
            aria-label={`Show banner ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${i === slide ? 'w-8 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </section>
  )
}
