import useReveal from '../useReveal'

export function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-500">{eyebrow}</p>
      <h2 className={`mt-3 text-4xl sm:text-5xl ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg ${light ? 'text-slate-300' : 'text-slate-600'}`}>{text}</p>}
    </div>
  )
}

export default function Section({ id, className = '', background = null, children }) {
  const ref = useReveal()
  return (
    <section id={id} className={`relative overflow-hidden py-20 lg:py-28 ${className}`}>
      {background}
      <div ref={ref} className="reveal relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
