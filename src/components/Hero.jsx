import { motion } from 'framer-motion'
import StructuralLanguage from './StructuralLanguage'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white text-ink">
      {/* Fluid magnetic background */}
      <div className="absolute inset-0" aria-hidden>
        <div id="fluid-bg" className="h-full w-full"></div>
      </div>

      {/* Left content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-6 min-h-[100svh] items-end">
          <div className="col-span-12 lg:col-span-7 pb-16 lg:pb-24">
            <motion.h1
              initial={{ filter: 'blur(12px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="font-[var(--font-human)] italic leading-[0.95] text-[48px] sm:text-[64px] lg:text-[80px] tracking-tight"
              style={{ wordBreak: 'break-word' }}
            >
              Words<br/>into<br/>Worlds
            </motion.h1>

            <TypewriterSubhead />

            <div className="mt-20">
              <a
                href="#start"
                className="group inline-flex items-center px-6 py-3 border border-ink text-ink text-[14px] font-[var(--font-machine)] tracking-[0.1em] hover:bg-electric hover:text-white hover:border-transparent transition-colors duration-100"
              >
                Start the Engineering
              </a>
            </div>
          </div>
          {/* Right abstract structure */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6">
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[80vh] opacity-90">
              <StructuralLanguage />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 z-10">
        <div className="font-[var(--font-machine)] text-[12px] tracking-[0.2em]">01 / PHILOSOPHY</div>
        <div className="mt-2 h-10 w-px bg-ink" />
      </div>
    </section>
  )
}

function TypewriterSubhead() {
  const text = 'Brands, Strategy, Design and Technology.'
  return (
    <div className="mt-6">
      <motion.p
        className="font-[var(--font-machine)] text-[16px] tracking-[0.1em] uppercase text-ink"
        initial={{ opacity: 1 }}
        aria-live="polite"
      >
        {text.split('').map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * i, duration: 0 }}
          >
            {c}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}
