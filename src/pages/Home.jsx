import { Suspense, lazy } from 'react'
import Hero from '../components/Hero'
import usePageMeta from '../hooks/usePageMeta'
import { profile } from '../data/profile'

// Below-the-fold sections are code-split so the hero paints as early as possible.
const About = lazy(() => import('../components/About'))
const Skills = lazy(() => import('../components/Skills'))
const Projects = lazy(() => import('../components/Projects'))
const Contact = lazy(() => import('../components/Contact'))

const SectionFallback = () => <div className="h-64" aria-hidden="true" />

export default function Home() {
  usePageMeta({
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  })

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  )
}
