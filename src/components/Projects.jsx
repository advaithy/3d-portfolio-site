import { motion } from 'framer-motion'
import Section from './Section'
import { projects } from '../data/profile'

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Portfolio"
      title="Selected projects"
      description="A few things I have designed, built and shipped."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
            className="group surface-card relative overflow-hidden p-6 transition-colors hover:border-accent-400/40"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${project.accent}`}
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold text-white">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {project.title}
                </a>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
