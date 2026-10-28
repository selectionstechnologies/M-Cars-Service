import { Clock, ArrowRight } from 'lucide-react'
import Section, { SectionHeading } from './Section'
import { SERVICES, formatPrice } from '../data'
import { useBooking } from '../BookingContext'

export default function Services() {
  const { openBooking } = useBooking()

  return (
    <Section id="services" className="bg-cream">
      <SectionHeading
        eyebrow="Our Services"
        title="Everything your car needs, under one roof"
        text="Fixed, upfront prices. Pick a service and book your slot instantly."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            className="img-zoom group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={`/images/${s.id}.webp`}
                alt={s.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {s.popular && (
                <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow">
                  Popular
                </span>
              )}
              <span className="absolute -bottom-0 left-5 grid h-12 w-12 translate-y-1/2 place-items-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                <s.icon className="h-6 w-6" />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-9">
            <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs text-slate-500">Starting at</p>
                <p className="text-lg font-bold text-slate-900">{formatPrice(s.price)}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> {s.duration}
              </span>
            </div>

            <button
              onClick={() => openBooking({ serviceId: s.id })}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 py-3 text-sm font-semibold text-white transition group-hover:bg-brand-600"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
