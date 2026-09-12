# DECISIONS — Bri's Dashboard Hub

Decisions made during the v1 build, and why. Newest first.

---

## 2026-09-11 — Followed the spec's tile tables over its summary count

The spec says "Total: 20 tiles. 11 with live URLs + 9 pending stubs," but its
own per-tile tables list 12 live and 8 pending. The tables are the authoritative
per-tile source — they name each tile, its URL, and its status — so the build
follows them. Total is 20 either way, and no tile was added, dropped, reordered,
or re-statused.

Flagged in STATUS.md rather than silently reconciled, because if the summary was
right and a table row is wrong, that's a content bug only Stacey or Bri can
adjudicate.

---

## 2026-09-11 — `Tile` is a discriminated union, not a flat optional-href object

The obvious shape is `{ label, status, href?: string }`. Instead:

```ts
| { label: string; status: "live";    href: string;  note?: string }
| { label: string; status: "pending"; href?: never;  note?: string }
```

v1.1 is precisely the operation of flipping 8 pending tiles to live, done by
someone editing a data file — likely quickly, possibly not by Casey. With a flat
type, setting `status: "live"` and forgetting the `href` compiles fine and ships
a dead tile; pasting a URL while leaving `status: "pending"` compiles fine and
silently hides a working link. The union makes both a type error at the point of
edit. The cost is two lines of type; the benefit lands on the most likely future
change to this repo.

---

## 2026-09-11 — Vault token is `#222223`, not the spec's `#1a1d2e`

The spec offers `#1a1d2e or equivalent` and also asks to reuse the design
language of `stacey-hub`, `ads-hq`, and `multi-brand-sqp-dashboard`. Those all
use `#222223`. Matching the fleet honors the stronger of the two instructions —
"consistent with the rest of Casey's fleet" is a real constraint; the specific
hex was offered with an explicit escape hatch. Noted in STATUS.md.

---

## 2026-09-11 — Skipped `src/lib/tokens.ts`

The spec listed it as optional. Colors live in `globals.css` as Tailwind v4
`@theme` tokens and are used as utility classes. A TS mirror of the same hexes
with no consumer is a second source of truth that can drift from the first.
Added back the moment something needs colors in JS.

---

## 2026-09-11 — Footer date is a hand-maintained constant

`LAST_UPDATED` in `page.tsx` is a literal, not `new Date()`. At build time a
date call would re-stamp on every unrelated redeploy, telling Bri when the site
was rebuilt rather than when her links last changed — which is the only thing
the line is for. At request time it would also force the page out of static
rendering.

---

## 2026-09-11 — Disabled Vercel deployment protection at the project level

The production alias was already public, but per-deployment URLs returned
`302 → vercel.com/sso-api`. The spec requires "public preview, no SSO gate," and
preview links are how this gets passed around during handoff, so protection was
turned off project-wide (`ssoProtection: null`, `passwordProtection: null`)
rather than relying on production being exempt.

This is the one deliberately public-facing setting in the build. The page holds
only links to other dashboards — every one of which enforces its own auth — so
the hub itself exposes nothing beyond the names and locations of internal tools.

---

## 2026-09-11 — Pending stubs are `<div>`, not disabled `<a>`

An anchor without `href` is not focusable and announces inconsistently; an
anchor *with* `href` that's visually disabled is still clickable via keyboard.
A `<div aria-disabled="true">` with a text pill states the condition in words
rather than by styling alone, and can't be activated by any input path.

---

## 2026-09-11 — Mobile overflow verified via CDP, not screenshot

A headless screenshot at `--window-size=375` appears to show tiles overflowing
the right edge. That is an artifact of headless desktop mode not applying mobile
viewport emulation. Measured through the DevTools Protocol with
`Emulation.setDeviceMetricsOverride({mobile: true})`: `scrollWidth` 375 ==
`clientWidth` 375, widest element right edge 355px. No overflow.

Recorded because the misleading screenshot is reproducible, and the next person
to check mobile will hit it and think the layout is broken.

---

## 2026-09-11 — Mirrored `stacey-hub`'s config rather than `create-next-app`

Copied `package.json`, `tsconfig.json`, `postcss.config.mjs`, and the
`pnpm-workspace.yaml` React overrides from `stacey-hub`. The scaffolder would
have pulled React 19, which the spec forbids, and would have needed unwinding.
Starting from a known-good fleet config also keeps the build reproducible
alongside its siblings. No files outside this repo were touched.
