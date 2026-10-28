import { useState } from 'react'
import { Star, ExternalLink, Plus, Minus } from 'lucide-react'
import Section, { SectionHeading } from './Section'
import { COMPANY, FAQS } from '../data'

// Links to the real Google Business listing instead of showing made-up reviews.
export function Testimonials() {
  return (
    <Section id="reviews" className="bg-cream">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5 sm:p-14">
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-gold-400 text-gold-400" />
          ))}
        </div>
        <h2 className="mt-5 text-4xl text-ink-900 sm:text-5xl">
          See what our customers <em className="text-brand-600">say</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Read genuine reviews from M Cars Service customers on Google — and if we&apos;ve worked on your car, we&apos;d
          love to hear from you.
        </p>
        <a
          href={COMPANY.mapLink}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Read our Google reviews <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Section>
  )
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <Section id="faq" className="bg-white">
      <SectionHeading eyebrow="FAQ" title="Questions? We've got answers" />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200">
        {FAQS.map((f, i) => {
          const isOpen = openIdx === i
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-slate-900">{f.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 leading-relaxed text-slate-600">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
