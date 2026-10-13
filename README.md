# BhanuAI

Personal portfolio site. React + TypeScript, Vite, Tailwind, shadcn/ui.

## Running it

```bash
npm install
npm run dev
```

Dev server runs on port 8080 (set in `vite.config.ts`).

## Scripts

| | |
|---|---|
| `npm run dev` | dev server with HMR |
| `npm run build` | production build to `dist/` |
| `npm run preview` | serve the built output |
| `npm run lint` | eslint |
| `npm test` | vitest |

## Where things live

Almost all the content is in `src/data/profile.ts`: bio, skills, projects,
experience, achievements. Editing that file is usually all you need; the
components just render it.

- `src/components/portfolio/` - the page sections (Hero, About, Projects, etc.)
- `src/components/ui/` - shadcn components, mostly untouched
- `src/index.css` - theme tokens, glass/card utilities, keyframes
- `public/resume.pdf` - linked from the Resume button in the hero

The hero portrait is `src/assets/profile-hero.webp`, a cut-out on a transparent
background so the card can supply its own backdrop. If you swap it, keep the
3:4 framing or the crop will clip.

## Env

Optional. Set a canonical origin for JSON-LD and Open Graph tags:

```
VITE_SITE_URL=https://yourdomain.com
```
