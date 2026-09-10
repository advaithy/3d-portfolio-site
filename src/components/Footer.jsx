import SocialIcon from './SocialIcon'
import { profile, socials } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <ul className="flex items-center gap-4">
          {socials.map((social) => {
            const external = social.href.startsWith('http')
            return (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                  aria-label={social.name}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-accent-400/50 hover:text-accent-400"
                >
                  <SocialIcon name={social.icon} className="size-4" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
