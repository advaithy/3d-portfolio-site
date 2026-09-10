import { useEffect, useRef } from 'react'
import { createHeroScene } from './heroScene'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Mounts the Three.js hero scene and guarantees teardown on unmount.
 * The scene is rebuilt when the reduced-motion preference changes.
 */
export default function HeroCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const dispose = createHeroScene(canvas, { reducedMotion })
    return dispose
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
      data-testid="hero-canvas"
    />
  )
}
