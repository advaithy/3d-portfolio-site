import { motion } from 'framer-motion'

/**
 * Shared section shell: semantic markup, accessible heading and reveal animation.
 */
export default function Section({ id, eyebrow, title, description, children, className = '' }) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400">
              {eyebrow}
            </p>
          )}
          <h2 id={headingId} className="font-display text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base text-slate-400">{description}</p>}
        </motion.div>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
