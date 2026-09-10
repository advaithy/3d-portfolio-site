import { motion } from 'framer-motion'
import Section from './Section'
import { profile } from '../data/profile'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer with a designer's eye"
      description="A short introduction to how I work and what I care about."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-slate-300">
          {profile.summary.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <dl className="surface-card divide-y divide-white/5 p-6">
          {profile.highlights.map((highlight) => (
            <div key={highlight.label} className="py-4 first:pt-0 last:pb-0">
              <dt className="text-xs uppercase tracking-[0.2em] text-accent-400">
                {highlight.label}
              </dt>
              <dd className="mt-2 text-sm text-slate-300">{highlight.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
