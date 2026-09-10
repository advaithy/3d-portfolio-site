import { useEffect } from 'react'

const setMeta = (attribute, key, content) => {
  if (!content) return undefined
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  const created = !element
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  const previous = element.getAttribute('content')
  element.setAttribute('content', content)

  return () => {
    if (created) element.remove()
    else if (previous !== null) element.setAttribute('content', previous)
  }
}

/**
 * Keeps the document title and the main SEO meta tags in sync with the route.
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title
    if (title) document.title = title

    const cleanups = [
      setMeta('name', 'description', description),
      setMeta('property', 'og:title', title),
      setMeta('property', 'og:description', description),
      setMeta('name', 'twitter:title', title),
      setMeta('name', 'twitter:description', description),
    ].filter(Boolean)

    return () => {
      document.title = previousTitle
      for (const cleanup of cleanups) cleanup()
    }
  }, [title, description])
}
