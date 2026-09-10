import * as THREE from 'three'

const PALETTE = [0x38bdf8, 0x6366f1, 0xa855f7, 0x22d3ee]

const GEOMETRY_FACTORIES = [
  () => new THREE.IcosahedronGeometry(1, 0),
  () => new THREE.TorusGeometry(0.7, 0.26, 16, 48),
  () => new THREE.OctahedronGeometry(1, 0),
  () => new THREE.DodecahedronGeometry(1, 0),
  () => new THREE.TorusKnotGeometry(0.55, 0.18, 96, 16),
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Creates the animated hero scene on the supplied canvas.
 *
 * Every GPU resource created here is tracked so that `dispose()` can release it,
 * which keeps the renderer from leaking WebGL contexts across route changes.
 *
 * @param {HTMLCanvasElement} canvas target canvas element
 * @param {{ shapeCount?: number }} [options]
 * @returns {() => void} dispose function
 */
export function createHeroScene(canvas, options = {}) {
  const { shapeCount = 14 } = options
  const parent = canvas.parentElement ?? canvas
  const reducedMotion = prefersReducedMotion()

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x05070d, 0.035)

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
  camera.position.set(0, 0, 12)

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
  } catch {
    // WebGL is unavailable (older browsers, blocked contexts): fail gracefully.
    return () => {}
  }

  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const geometries = []
  const materials = []
  const shapes = []
  const group = new THREE.Group()
  scene.add(group)

  for (let index = 0; index < shapeCount; index += 1) {
    const geometry = GEOMETRY_FACTORIES[index % GEOMETRY_FACTORIES.length]()
    const material = new THREE.MeshStandardMaterial({
      color: PALETTE[index % PALETTE.length],
      roughness: 0.25,
      metalness: 0.65,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    })

    geometries.push(geometry)
    materials.push(material)

    const mesh = new THREE.Mesh(geometry, material)
    const radius = 3.6 + Math.random() * 4.4
    const angle = (index / shapeCount) * Math.PI * 2
    mesh.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 6.5,
      Math.sin(angle) * radius - 2,
    )
    const scale = 0.35 + Math.random() * 0.5
    mesh.scale.setScalar(scale)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)

    shapes.push({
      mesh,
      basePosition: mesh.position.clone(),
      floatSpeed: 0.35 + Math.random() * 0.6,
      floatOffset: Math.random() * Math.PI * 2,
      floatAmplitude: 0.25 + Math.random() * 0.5,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.2,
      ),
    })
    group.add(mesh)
  }

  const starGeometry = new THREE.BufferGeometry()
  const starCount = 420
  const starPositions = new Float32Array(starCount * 3)
  for (let index = 0; index < starCount; index += 1) {
    starPositions[index * 3] = (Math.random() - 0.5) * 40
    starPositions[index * 3 + 1] = (Math.random() - 0.5) * 26
    starPositions[index * 3 + 2] = (Math.random() - 0.5) * 30 - 6
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.045,
    transparent: true,
    opacity: 0.65,
  })
  const stars = new THREE.Points(starGeometry, starMaterial)
  geometries.push(starGeometry)
  materials.push(starMaterial)
  scene.add(stars)

  const ambient = new THREE.AmbientLight(0x8ab4ff, 1.25)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.1)
  keyLight.position.set(5, 6, 8)
  const rimLight = new THREE.PointLight(0x6366f1, 40, 40)
  rimLight.position.set(-7, -4, 4)
  scene.add(ambient, keyLight, rimLight)

  const pointer = new THREE.Vector2(0, 0)
  const targetPointer = new THREE.Vector2(0, 0)

  const handlePointerMove = (event) => {
    const { innerWidth, innerHeight } = window
    targetPointer.set((event.clientX / innerWidth) * 2 - 1, -((event.clientY / innerHeight) * 2 - 1))
  }

  const resize = () => {
    const width = parent.clientWidth || window.innerWidth
    const height = parent.clientHeight || window.innerHeight
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }

  resize()

  const resizeObserver =
    typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
  resizeObserver?.observe(parent)
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })

  const clock = new THREE.Clock()
  let frameId = 0
  let running = true
  // Accumulated animation time, advanced only while the loop is running so that
  // pausing (hidden tab) never causes a visible jump on resume.
  let elapsed = 0

  const renderFrame = () => {
    elapsed += clock.getDelta()

    pointer.lerp(targetPointer, 0.05)

    for (const shape of shapes) {
      const { mesh, basePosition, floatSpeed, floatOffset, floatAmplitude, spin } = shape
      if (!reducedMotion) {
        mesh.rotation.x += spin.x * 0.01
        mesh.rotation.y += spin.y * 0.01
        mesh.rotation.z += spin.z * 0.01
        mesh.position.y =
          basePosition.y + Math.sin(elapsed * floatSpeed + floatOffset) * floatAmplitude
      }
    }

    group.rotation.y += (pointer.x * 0.45 - group.rotation.y) * 0.04
    group.rotation.x += (-pointer.y * 0.3 - group.rotation.x) * 0.04
    stars.rotation.y = reducedMotion ? 0 : elapsed * 0.012
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.9 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  const animate = () => {
    if (!running) return
    frameId = window.requestAnimationFrame(animate)
    renderFrame()
  }

  animate()

  // Pause the render loop when the tab is hidden to save battery/GPU cycles.
  const handleVisibilityChange = () => {
    if (document.hidden) {
      running = false
      window.cancelAnimationFrame(frameId)
    } else if (!running) {
      running = true
      // Discard the time spent hidden before resuming the loop.
      clock.getDelta()
      animate()
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)

  return function dispose() {
    running = false
    window.cancelAnimationFrame(frameId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    resizeObserver?.disconnect()

    for (const geometry of geometries) geometry.dispose()
    for (const material of materials) material.dispose()
    scene.clear()
    renderer.dispose()
    renderer.forceContextLoss?.()
  }
}
