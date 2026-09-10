import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation, profile } from '../data/profile'

const CTA = { label: "Let's talk", href: '#contact' }
const mobileNavigation = [...navigation, CTA]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a
          href="#hero"
          className="flex items-center gap-3 text-sm font-semibold tracking-wide text-white"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 font-display text-xs text-ink-950">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-slate-300 transition-colors hover:text-accent-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={CTA.href}
          className="hidden rounded-full border border-accent-400/50 px-4 py-2 text-sm font-medium text-accent-400 transition-colors hover:bg-accent-400/10 md:inline-block"
        >
          {CTA.label}
        </a>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 md:hidden"
          >
            <ul className="container-page flex flex-col py-4 text-sm">
              {mobileNavigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block py-3 text-slate-300 transition-colors hover:text-accent-400"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
