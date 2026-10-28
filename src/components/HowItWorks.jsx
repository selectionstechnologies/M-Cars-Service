import Section, { SectionHeading } from './Section'
import { BadgeCheck, MapPin } from 'lucide-react'
import { STEPS, WHY_US, HIGHLIGHTS } from '../data'
import { useBooking } from '../BookingContext'

export function HowItWorks() {
  const { openBooking } = useBooking()

  return (
    <Section
      id="how"
      className="bg-ink-900"
      background={
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/workshop.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-900/85" />
        </div>
      }
    >
      <SectionHeading
        light
        eyebrow="How it Works"
        title="Service booked in 3 simple steps"
        text="No phone queues, no waiting rooms. Book online and we take care of everything."
      />

      <div className="relative mt-16 grid gap-10 md:grid-cols-3">
        <div className="absolute top-8 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-brand-600/60 to-transparent md:block" />
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative text-center">
            <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-xl shadow-brand-600/30">
              <s.icon className="h-7 w-7" />
              <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-ink-900">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-slate-400">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <button
          onClick={() => openBooking()}
          className="rounded-full bg-white px-8 py-4 font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:bg-brand-50"
        >
          Start Booking — it&apos;s free
        </button>
      </div>
    </Section>
  )
}

export function WhyUs() {
  return (
    <Section id="why" className="bg-white">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="img-zoom overflow-hidden rounded-3xl shadow-2xl shadow-slate-300">
            <img
              src="/images/mechanic.webp"
              alt="M Cars Service mechanic working on a car"
              loading="lazy"
              decoding="async"
              className="h-[26rem] w-full object-cover lg:h-[34rem]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-100 sm:-right-6 sm:left-auto">
            <MapPin className="h-8 w-8 text-brand-600" />
            <div>
              <p className="font-serif text-2xl font-semibold text-ink-900">Manchester</p>
              <p className="text-sm font-medium text-slate-600">164a Plymouth Grove, M13 0AF</p>
            </div>
          </div>
          <div className="absolute top-6 -left-3 hidden items-center gap-3 rounded-2xl bg-ink-900/90 px-4 py-3 text-white shadow-xl backdrop-blur sm:flex">
            <BadgeCheck className="h-6 w-6 text-gold-400" />
            <span className="text-sm font-semibold">All makes &amp; models</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">Why M Cars Service</p>
          <h2 className="mt-3 text-4xl text-slate-900 sm:text-5xl">
            The workshop you can actually trust
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We built M Cars Service around one idea: treat every car like our own, and every customer like family.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {WHY_US.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <w.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-cream p-6 sm:p-8 lg:grid-cols-4">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="text-center">
            <p className="font-serif text-2xl font-semibold text-brand-600 sm:text-3xl">{h.title}</p>
            <p className="mt-1 text-sm text-slate-600">{h.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
