import { useEffect } from 'react'
import Hero from './components/Hero'
import DataTicker from './components/DataTicker'
import './index.css'

function App() {
  useEffect(() => {
    // Fluid background: faint gradient following cursor
    const el = document.getElementById('fluid-bg')
    if (!el) return
    const handle = (e) => {
      const { clientX: x, clientY: y } = e
      const g1 = `radial-gradient(600px 600px at ${x}px ${y}px, rgba(0,0,0,0.03), transparent 60%)`
      const g2 = `radial-gradient(800px 600px at ${window.innerWidth - x}px ${y}px, rgba(0,0,0,0.02), transparent 70%)`
      el.style.background = `${g1}, ${g2}`
      el.style.transition = 'background 120ms linear'
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div className="bg-white text-ink min-h-[100svh]">
      <DataTicker />
      <Hero />
    </div>
  )
}

export default App