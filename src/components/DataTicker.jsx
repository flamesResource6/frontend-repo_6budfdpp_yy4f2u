import { useEffect, useRef, useState } from 'react'

const itemsInitial = [
  { id: 1, text: 'Agent: Active' },
  { id: 2, text: 'Prompt Engineering: Ready' },
  { id: 3, text: 'Semantic Field: Loading...' },
]

export default function DataTicker() {
  const [items, setItems] = useState(itemsInitial)
  const [cursorOn, setCursorOn] = useState(true)
  const [typed, setTyped] = useState('')
  const idxRef = useRef(0)
  const charRef = useRef(0)

  useEffect(() => {
    const blink = setInterval(() => setCursorOn((v) => !v), 500)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    // Simple typewriter loop across lines
    const current = items[idxRef.current % items.length].text
    const typer = setInterval(() => {
      const next = current.slice(0, charRef.current + 1)
      setTyped(next)
      charRef.current += 1
      if (next.length === current.length) {
        clearInterval(typer)
        setTimeout(() => {
          setTyped('')
          charRef.current = 0
          idxRef.current = (idxRef.current + 1) % items.length
        }, 900)
      }
    }, 30)
    return () => clearInterval(typer)
  }, [items])

  return (
    <div className="pointer-events-none select-none fixed top-6 left-6 z-40 font-[var(--font-machine)] text-[12px] tracking-wide text-electric">
      <div className="bg-white/60 backdrop-blur-sm border border-electric/30 px-3 py-1.5 rounded-sm shadow-sm">
        <span>{typed}</span>
        <span className={`inline-block w-2 ${cursorOn ? 'opacity-100' : 'opacity-0'}`}>▌</span>
      </div>
    </div>
  )
}
