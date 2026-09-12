# ARCHITECTURE — Bri's Dashboard Hub

A single static page that renders a list of links. That is the whole system.
There is no database, no API, no client state, no auth, and no data fetching.

## Stack

- Next.js 16.2.7, App Router
- React 18.3.1 (pinned — see DECISIONS)
- TypeScript, `strict: true`
- Tailwind CSS v4 (`@theme` tokens, no `tailwind.config.js`)
- pnpm, with `overrides` pinning React in `pnpm-workspace.yaml`
- Deployed on Vercel as fully static output

## File map

```
src/
├── app/
│   ├── layout.tsx     Inter via next/font, <html>/<body> shell, metadata
│   ├── page.tsx       Header, maps sections → <Section>, footer
│   └── globals.css    Tailwind import + Neato @theme tokens
├── components/
│   ├── Section.tsx    Section heading + responsive tile grid
│   └── Tile.tsx       Renders a live tile (<a>) or a pending stub (<div>)
└── data/
    └── tiles.ts       Source of truth: 3 sections, 20 tiles
```

`src/lib/tokens.ts` from the spec sketch was not created — the color constants
live in `globals.css` as Tailwind `@theme` tokens and are consumed as utility
classes (`text-vault`, `bg-buttercream`). A parallel TS copy would be a second
source of truth for the same values with nothing reading it.

## Data flow

```
src/data/tiles.ts  →  page.tsx  →  Section.tsx  →  Tile.tsx
   (sections[])       (maps)       (grid)          (variant by status)
```

One direction, no branching. To change what's on the page, edit `tiles.ts`.

## Key types

```ts
type Tile =
  | { label: string; status: "live";    href: string;  note?: string }
  | { label: string; status: "pending"; href?: never;  note?: string }
```

A discriminated union, deliberately. `status: "live"` *requires* `href`;
`status: "pending"` *forbids* it via `href?: never`. So a pending tile that
accidentally carries a URL, or a live tile missing one, is a compile error
rather than a runtime surprise — which matters because v1.1 is exactly the
change of flipping pending tiles to live, and that's where a typo would land.

`Section.emphasis` is `"primary" | "secondary"`. Section 1 is `primary` and
gets the heavier heading, the gradient rule, and bolder tile labels; sections 2
and 3 are `secondary` with a lighter heading and a hairline rule.

## Rendering

Everything is a React Server Component. There is no `'use client'` anywhere and
no client-side JS beyond what Next ships by default. Hover and focus states are
pure CSS. The whole page prerenders to static HTML at build time.

The footer date is a hand-maintained constant (`LAST_UPDATED` in `page.tsx`),
not `new Date()` — a build timestamp would churn on every unrelated deploy and
would tell Bri when the site was rebuilt, not when her links last changed.

## Grid

`grid-cols-1` → `sm:grid-cols-2` → `md:grid-cols-3` → `xl:grid-cols-4`.
Desktop is the primary target; mobile just has to work. Tiles are uniform
(`min-h-[104px]`), and pending stubs are the exact same shape as live tiles —
never shrunk or hidden — so the grid reads as a stable whiteboard even while a
third of it is unlinked.

## Accessibility

- Live tiles: real `<a>` with `target="_blank" rel="noopener noreferrer"` and a
  visible `focus-visible` outline.
- Pending tiles: a `<div>`, not a disabled link — no `href`, `aria-disabled="true"`,
  `cursor-not-allowed`, and a visible "URL pending" pill so the state is
  conveyed by text and not by color alone.
- Each `<section>` is tied to its heading with `aria-labelledby`.

## Deploy

Vercel, connected to `staceysilva-cpu/bri-dashboard-hub`, production from
`main`. Deployment protection is off at the project level so the URL is public
to anyone with the link.
