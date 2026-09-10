/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to personalise the website – no component changes required.
 */

const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://advaithy.github.io/3d-portfolio-site'
const email = import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@example.com'

export const profile = {
  name: 'Advaith S Y',
  initials: 'ASY',
  role: 'Software Engineer',
  tagline: 'I design and engineer products that feel as good as they look.',
  location: 'Available worldwide · Remote friendly',
  siteUrl,
  email,
  // Sourced from https://www.linkedin.com/in/advaithsy
  summary: [
    'I am a software engineer who enjoys living at the intersection of design and engineering. I build interfaces that are fast, accessible and memorable, and back them with services that stay boring under pressure.',
    'My work spans the full product lifecycle: shaping the idea, prototyping the experience, shipping the code and measuring what happens next. I care about craft, clear communication and leaving codebases better than I found them.',
  ],
  highlights: [
    { label: 'Focus', value: 'Full-stack product engineering' },
    { label: 'Interests', value: '3D on the web, design systems, developer experience' },
    { label: 'Approach', value: 'Ship small, measure, iterate' },
  ],
}

export const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/advaithsy',
    handle: 'in/advaithsy',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/advaithy',
    handle: '@advaithy',
    icon: 'github',
  },
  {
    name: 'Email',
    href: `mailto:${profile.email}`,
    handle: profile.email,
    icon: 'mail',
  },
]

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 92 },
      { name: 'TypeScript / JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Three.js / WebGL', level: 78 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 86 },
      { name: 'Python', level: 82 },
      { name: 'REST & GraphQL APIs', level: 84 },
      { name: 'SQL & NoSQL data stores', level: 80 },
    ],
  },
  {
    category: 'Platform & Craft',
    items: [
      { name: 'CI/CD & GitHub Actions', level: 85 },
      { name: 'Cloud (AWS / Azure)', level: 78 },
      { name: 'Testing & observability', level: 82 },
      { name: 'Product & UX design', level: 76 },
    ],
  },
]

export const projects = [
  {
    title: 'Immersive 3D Portfolio',
    description:
      'This site: a React + Three.js experience with a hand-rolled WebGL scene, motion-safe animations and a perfect-by-default responsive layout.',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Vite'],
    href: 'https://github.com/advaithy/3d-portfolio-site',
    accent: 'from-cyan-500/30 to-indigo-500/10',
  },
  {
    title: 'Design System Toolkit',
    description:
      'A component library and token pipeline that keeps product surfaces consistent, accessible and themeable across multiple applications.',
    tags: ['Design systems', 'TypeScript', 'Accessibility'],
    href: 'https://github.com/advaithy',
    accent: 'from-fuchsia-500/30 to-purple-500/10',
  },
  {
    title: 'Realtime Data Dashboard',
    description:
      'Streaming analytics dashboard with incremental rendering, virtualised tables and sub-second updates over websockets.',
    tags: ['Node.js', 'WebSockets', 'Data viz'],
    href: 'https://github.com/advaithy',
    accent: 'from-emerald-500/30 to-teal-500/10',
  },
  {
    title: 'Developer Experience Automation',
    description:
      'Tooling that trimmed CI feedback loops and automated release notes, changelogs and environment provisioning for the whole team.',
    tags: ['GitHub Actions', 'Automation', 'DX'],
    href: 'https://github.com/advaithy',
    accent: 'from-amber-500/30 to-orange-500/10',
  },
]

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
