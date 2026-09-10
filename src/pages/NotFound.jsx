import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { profile } from '../data/profile'

export default function NotFound() {
  usePageMeta({
    title: `Page not found — ${profile.name}`,
    description: 'The page you were looking for does not exist.',
  })

  return (
    <section className="flex min-h-svh items-center" aria-labelledby="notfound-heading">
      <div className="container-page text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">404</p>
        <h1 id="notfound-heading" className="mt-4 font-display text-4xl font-bold text-white">
          This page drifted out of orbit
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The link you followed does not exist (any more). Let&apos;s get you back home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
