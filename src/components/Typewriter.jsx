import { useEffect, useState } from 'react'

// Types each phrase, pauses, deletes it, then moves to the next — forever.
export default function Typewriter({ words, typeSpeed = 70, deleteSpeed = 35, pause = 1800, className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && text === word) delay = pause
    else if (deleting && text === '') delay = 300

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse rounded-full bg-current align-baseline" />
    </span>
  )
}
