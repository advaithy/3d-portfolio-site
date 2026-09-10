import { useEffect, useRef } from 'react'
import { createHeroScene } from './heroScene'

/**
 * Mounts the Three.js hero scene and guarantees teardown on unmount.
 */
export default function HeroCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const dispose = createHeroScene(canvas)
    return dispose
  }, [])

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
