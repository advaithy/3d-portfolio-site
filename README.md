# 3d-portfolio-site

A professional 3D interactive personal website built with React, Three.js, Tailwind CSS and Vite.

Live sections: hero with an animated WebGL scene, about, skills, projects, contact and footer.

## Features

- **3D hero scene** — hand-rolled Three.js scene with floating geometric shapes, a starfield and
  camera/group parallax that follows the pointer. All GPU resources are disposed on unmount and the
  render loop pauses when the tab is hidden.
- **Motion** — Framer Motion scroll reveals and menu transitions; the 3D animation honours
  `prefers-reduced-motion`.
- **Responsive dark UI** — Tailwind CSS v4 theme tokens, professional typography (Space Grotesk +
  Inter) and layouts tuned for mobile, tablet and desktop.
- **Routing** — React Router with a home page and a 404 page.
- **SEO** — meta, Open Graph and Twitter tags in `index.html` plus a `usePageMeta` hook that keeps
  the title/description in sync per route.
- **Accessibility** — semantic landmarks, skip link, labelled navigation, ARIA meters for skill
  bars and visible focus styles.
- **Performance** — below-the-fold sections and the Three.js bundle are lazy loaded via
  `React.lazy` / dynamic `import()`.

## Tech stack

| Purpose    | Library                     |
| ---------- | --------------------------- |
| UI         | React 19                    |
| 3D         | Three.js                    |
| Styling    | Tailwind CSS v4             |
| Animation  | Framer Motion               |
| Routing    | React Router                |
| Build tool | Vite                        |
| Linting    | oxlint                      |

## Getting started

```bash
npm install
cp .env.example .env   # optional: set your site URL and contact email
npm run dev            # start the dev server on http://localhost:5173
```

### Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Production build into `dist/`      |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Lint the project with oxlint       |

## Customisation

All copy lives in [`src/data/profile.js`](src/data/profile.js) — edit that single file to make the
site yours:

- `profile` — name, initials, role, tagline, location, summary paragraphs and highlights.
- `socials` — LinkedIn, GitHub and email links (used by the hero, contact section and footer).
- `skills` — skill groups and proficiency levels (0–100) rendered as animated bars.
- `projects` — portfolio cards with description, tags, link and gradient accent.
- `navigation` — header links.

Other useful places:

- **Colours & fonts** — the `@theme` block in [`src/index.css`](src/index.css).
- **3D scene** — [`src/three/heroScene.js`](src/three/heroScene.js). Change `PALETTE`,
  `GEOMETRY_FACTORIES` or pass `{ shapeCount }` from
  [`src/three/HeroCanvas.jsx`](src/three/HeroCanvas.jsx), which also re-creates the scene whenever
  the reduced-motion preference changes.
- **Static SEO tags & favicon** — [`index.html`](index.html) and `public/favicon.svg`.

## Environment configuration

Copy `.env.example` to `.env`. Only `VITE_`-prefixed variables are exposed to the browser, so never
put secrets there.

| Variable             | Description                                  |
| -------------------- | -------------------------------------------- |
| `VITE_SITE_URL`      | Canonical site URL used in profile metadata  |
| `VITE_CONTACT_EMAIL` | Email address shown in the contact section   |

## Project structure

```
src/
├── components/   Header, Hero, About, Skills, Projects, Contact, Footer, Section, SocialIcon
├── data/         profile.js – all site content
├── hooks/        usePageMeta.js, usePrefersReducedMotion.js
├── pages/        Home.jsx, NotFound.jsx
├── three/        heroScene.js (Three.js scene) and HeroCanvas.jsx (React wrapper)
├── App.jsx       Layout and routes
└── main.jsx      Entry point
```

## Deployment

`npm run build` produces a static `dist/` folder that can be hosted on GitHub Pages, Netlify,
Vercel or any static host. For a sub-path deployment (for example GitHub Pages project sites), set
`base` in `vite.config.js`; the router already uses `import.meta.env.BASE_URL` as its basename.
Because this is a single-page app, configure your host to rewrite unknown paths to `index.html`.

## License

[MIT](LICENSE)
