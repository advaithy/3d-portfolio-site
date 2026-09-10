import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const supported = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

const subscribe = (onChange) => {
  if (!supported()) return () => {}
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

const getSnapshot = () => (supported() ? window.matchMedia(QUERY).matches : false)

const getServerSnapshot = () => false

/**
 * Tracks the user's reduced-motion preference and re-renders when it changes.
 */
export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
