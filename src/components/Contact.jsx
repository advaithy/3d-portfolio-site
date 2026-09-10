import { motion } from 'framer-motion'
import Section from './Section'
import SocialIcon from './SocialIcon'
import { profile, socials } from '../data/profile'

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="The fastest way to reach me is LinkedIn or email. I read every message."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {socials.map((social, index) => {
          const external = social.href.startsWith('http')
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
              className="surface-card flex items-center gap-4 p-6 transition-colors hover:border-accent-400/50 hover:bg-white/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-400">
                <SocialIcon name={social.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{social.name}</span>
                <span className="block truncate text-sm text-slate-400">{social.handle}</span>
              </span>
            </motion.a>
          )
        })}
      </div>

      <p className="mt-10 text-sm text-slate-400">
        Prefer email?{' '}
        <a
          href={`mailto:${profile.email}`}
          className="font-medium text-accent-400 underline underline-offset-4"
        >
          {profile.email}
        </a>
      </p>
    </Section>
  )
}
