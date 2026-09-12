# Bri's Dashboard Hub — v1 Build Spec

**End user:** Bri (Neato ad team)
**Business owner:** Stacey
**Delivered by:** Casey
**Date:** 2026-09-11

---

## Goal

Ship a **whiteboard-style landing page** — a single public URL Bri opens each day. Every dashboard/tool she touches is laid out as labeled tiles, grouped by three fixed sections. Fast visual scan. Clickable. Nothing fancy. Not a data dashboard — a well-organized link hub.

This is DISTINCT from Stacey's Personal Hub. Do not confuse the two. This one is for the ad team's workflow.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript strict
- **Styling:** Tailwind CSS v4
- **React:** pin `18.3.1` (do NOT upgrade to 19 — breaks Recharts 2.x if it ever enters; consistent with the rest of Casey's fleet)
- **Package manager:** pnpm
- **Deploy:** Vercel (public preview, no SSO gate)

Neato brand tokens (Vault text, Flamingo/Peach/Buttercream accents, Inter font). Consistent with `stacey-hub`, `ads-hq`, `multi-brand-sqp-dashboard`. Reuse the same design language.

---

## Layout — Three Fixed Sections, In This Order

**LOCKED. Do not reorder. Do not add or drop tiles.** Missing URLs are stubbed as tiles with a "URL pending" pill — the tile still renders, it just doesn't link out yet. v1.1 fills them in.

### Section 1 — Active Ad Team Dashboards (11 tiles, highest visual weight)

| Order | Label | URL | Notes |
|-------|-------|-----|-------|
| 1 | Multi-Brand SQP | https://multi-brand-sqp-dashboard.vercel.app | Root URL — brand selector lives on the page |
| 2 | Budget Pacing | https://budget-pacing-dashboard.vercel.app | |
| 3 | Runway | https://creative-ads-tracker.vercel.app/launches?brand=FIN | External (Wallaby's build). **Preserve `?brand=FIN` on the link exactly.** |
| 4 | Subscribe & Save | *(URL pending)* | Stub tile — no link. "URL pending" pill. |
| 5 | Ad Team To-Do List | https://ad-todo-dashboard.vercel.app/ | |
| 6 | Looker – Ad Reports | *(URL pending)* | Stub tile. Data Studio report (distinct from To-Do List). |
| 7 | Impact | *(URL pending)* | Stub tile. Amazon ad tool. |
| 8 | Xnurta | *(URL pending)* | Stub tile. External. |
| 9 | Walmart Connect | *(URL pending)* | Stub tile. External. |
| 10 | Data Dive | *(URL pending)* | Stub tile. External. |
| 11 | PSR | https://illy-psr.vercel.app/ | illy-specific. |

### Section 2 — In Process / Testing (3 tiles)

| Order | Label | URL | Notes |
|-------|-------|-----|-------|
| 1 | Ads HQ | https://ads-hq.vercel.app | Casey's build. |
| 2 | Monthly Customer Report | https://monthly-performance-recap-dashboard.vercel.app | Renamed from MPR. |
| 3 | Perf-Marketing Monthly | https://performance-marketing-monthly-4lgrt5tma.vercel.app | Shell live; numeric refresh pending. |

### Section 3 — Other Teams / Adjacent Tools (6 tiles)

| Order | Label | URL | Notes |
|-------|-------|-----|-------|
| 1 | Atlas – Master Catalog | https://atlas.neato.com/ | |
| 2 | Boxscore | *(URL pending)* | Stub. Internal Neato tool. |
| 3 | Neatoverse | *(URL pending)* | Stub. Internal Neato tool. |
| 4 | Basecamp | https://basecamp2.neato.com/ | |
| 5 | Performance – Supply | https://portal.neato.com/performance | |
| 6 | Brand HQ | https://brandhq.neato.com/ | |

**Total: 20 tiles.** 11 with live URLs + 9 pending stubs.

---

## Design

- **Feel:** whiteboard / clean grid / labeled tiles. NOT a data dashboard. No charts, no metrics, no tables.
- **Section headers:** clear, distinct. Section 1 gets visual weight (it's the daily-driver set). Sections 2 and 3 lighter.
- **Tiles:** consistent size, brand-name label, subtle hover state (elevate/darken slightly), click opens URL in **new tab** (`target="_blank" rel="noopener noreferrer"`).
- **Pending stubs:** render exact same tile shape, no click target (or `cursor: not-allowed`), small "URL pending" pill in a muted tone (Buttercream or muted grey). Same size as live tiles — do not shrink or hide.
- **Grid:** responsive. Desktop primary — aim for a 4-tile-wide grid on wide screens, 3 on medium, 2 on tablet, 1 column on mobile. Bri uses desktop; mobile just needs to work.
- **Auth:** public URL, no login gate.
- **Colors:** Vault (`#1a1d2e` or equivalent) text on white/off-white background. Flamingo/Peach/Buttercream gradient permitted in header stripe or Section 1 accent. Do not overdo — this is a hub, not a marketing page.
- **Font:** Inter throughout.
- **Header:** small "Bri's Dashboards" or similar title top-left, no nav (single page). No footer needed beyond a small "Neato · updated {date}" line.

---

## Structure

Single page. No routes. No client state beyond hover.

```
src/
├── app/
│   ├── layout.tsx           # Inter font, Neato tokens
│   ├── page.tsx             # The hub — imports Section + Tile
│   └── globals.css          # Tailwind + Neato color vars
├── components/
│   ├── Section.tsx          # Header + tile grid
│   └── Tile.tsx             # Live tile OR pending stub (variant by prop)
├── data/
│   └── tiles.ts             # Typed array of 3 sections, 20 tiles (source of truth)
└── lib/
    └── tokens.ts            # (optional) Neato color constants
```

Keep it dead simple. Server components everywhere. No `'use client'` needed.

---

## Data source

Single hard-coded TypeScript file `src/data/tiles.ts` with the 3 sections + 20 tiles from the tables above. Include a `status: 'live' | 'pending'` field per tile.

Do NOT invent tiles. Do NOT add favorites, recent, sub-groups, or usage tracking. Static only.

---

## Deliverables

1. Fresh repo in `~/projects/bri-dashboard-hub` (already initialized directory — you scaffold the Next app inside it).
2. Push to a new GitHub repo under `staceysilva-cpu` (auth via `gh` CLI). Repo name `bri-dashboard-hub`.
3. Deploy to Vercel, public URL (no SSO / no deployment protection).
4. Verify: all 20 tiles render, live URLs open in new tab, pending stubs show "URL pending" pill, section order is Section 1 → 2 → 3.
5. Regression: page loads 200, 0 `__next_error__` / `Invariant` markers in headless DOM.
6. Update `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md` at end.
7. Commit + push to `main`. Report preview URL back.

---

## Verification checklist (mandatory before you sign off)

- [ ] `curl -sI <preview-url>` returns 200 (not 401 — SSO must be off)
- [ ] Headless DOM contains all 20 tile labels (grep for "Multi-Brand SQP", "Runway", "PSR", "Ads HQ", "Monthly Customer Report", "Brand HQ", etc.)
- [ ] Runway tile href = `https://creative-ads-tracker.vercel.app/launches?brand=FIN` **exactly** (query param preserved)
- [ ] All live tiles have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] Pending tiles do NOT have `href` (or have `aria-disabled="true"`) and DO show "URL pending" text
- [ ] Section headers appear in order: `Active Ad Team Dashboards` → `In Process` → `Other Teams`
- [ ] Mobile viewport (375px): tiles stack, no horizontal overflow

---

## Boundaries

- **Do NOT** invent tiles or add ones not on the list.
- **Do NOT** try to resolve TBD URLs on your own — stub them.
- **Do NOT** add sub-groups, favorites, recent-used, or usage tracking.
- **Do NOT** gate the URL behind SSO or a login.
- **Do NOT** touch other Casey projects — this is a fresh repo, self-contained.
- **Do NOT** upgrade React past 18.3.1.
- **Do NOT** add analytics/telemetry.

---

## When done

Commit + push to main. Write STATUS.md with:
- Preview URL
- List of live vs pending tiles
- Any deviations from this spec (there should be none)
- Regression verification results (curl status, tile count, error-marker scan)

Then exit. Casey will verify and hand off to Luke → Stacey.
