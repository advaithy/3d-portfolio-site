import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { profile, socials } from '../data/profile'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <HeroCanvas className="size-full" />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/60 to-ink-950" />
      </div>

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-400">
            <span className="size-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            {profile.role}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300 sm:text-xl">{profile.tagline}</p>
          <p className="mt-3 text-sm text-slate-500">{profile.location}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-transform hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-400/60 hover:text-accent-400"
            >
              Get in touch
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="transition-colors hover:text-accent-400"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute inset-x-0 bottom-8 mx-auto w-fit text-xs uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-accent-400"
      >
        Scroll
      </a>
    </section>
  )
}
