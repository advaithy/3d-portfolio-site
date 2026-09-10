import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Sub-path deployments (e.g. GitHub Pages project sites) can build with
  // `BASE_PATH=/3d-portfolio-site/ npm run build`. The router picks the value up
  // through `import.meta.env.BASE_URL`.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
