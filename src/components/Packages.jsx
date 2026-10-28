import { Check } from 'lucide-react'
import Section, { SectionHeading } from './Section'
import { PACKAGES, formatPrice } from '../data'
import { useBooking } from '../BookingContext'

export default function Packages() {
  const { openBooking } = useBooking()

  return (
    <Section id="packages" className="bg-white">
      <SectionHeading
        eyebrow="Service Packages"
        title="Save more with a bundle"
        text="Combine the services your car needs most and save up to 25%."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PACKAGES.map((p) => {
          const save = p.was - p.price
          return (
            <article
              key={p.id}
              className={`img-zoom relative flex flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 ${
                p.highlight
                  ? 'bg-ink-900 text-white shadow-2xl shadow-brand-600/20 ring-2 ring-brand-600 lg:scale-105'
                  : 'border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={`/images/${p.id}.webp`} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {p.highlight && (
                  <span className="absolute top-4 right-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-lg">
                    Most Popular
                  </span>
                )}
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-slate-200">{p.tagline}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 pt-6">

              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold tracking-tight">{formatPrice(p.price)}</span>
                <span className={`pb-1 text-sm line-through ${p.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {formatPrice(p.was)}
                </span>
              </div>
              <span className="mt-2 inline-block w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                You save {formatPrice(save)}
              </span>

              <ul className="mt-8 flex-1 space-y-3.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600/15">
                      <Check className="h-3.5 w-3.5 text-brand-500" />
                    </span>
                    <span className={p.highlight ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openBooking({ serviceId: p.id })}
                className={`mt-8 w-full rounded-full py-3.5 font-semibold transition ${
                  p.highlight
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white'
                }`}
              >
                Get {p.name}
              </button>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
