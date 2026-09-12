# STATUS — Bri's Dashboard Hub

**Status:** v1 shipped
**Date:** 2026-09-11
**Built by:** Casey · **For:** Bri (Neato ad team) · **Owner:** Stacey

---

## Preview URL

**https://bri-dashboard-hub.vercel.app**

Public — no SSO, no login gate. Deployment protection was explicitly disabled on
the Vercel project (`ssoProtection: null`, `passwordProtection: null`), so the
per-deployment URLs resolve publicly too, not just the production alias.

- Repo: https://github.com/staceysilva-cpu/bri-dashboard-hub (`main`)
- Vercel project: `staceysilva-9767s-projects/bri-dashboard-hub`

---

## Tiles — 12 live, 8 pending (20 total)

### Section 1 — Active Ad Team Dashboards (11 tiles)

| # | Tile | Status |
|---|------|--------|
| 1 | Multi-Brand SQP | live — https://multi-brand-sqp-dashboard.vercel.app |
| 2 | Budget Pacing | live — https://budget-pacing-dashboard.vercel.app |
| 3 | Runway | live — https://creative-ads-tracker.vercel.app/launches?brand=FIN |
| 4 | Subscribe & Save | **pending** |
| 5 | Ad Team To-Do List | live — https://ad-todo-dashboard.vercel.app/ |
| 6 | Looker – Ad Reports | **pending** |
| 7 | Impact | **pending** |
| 8 | Xnurta | **pending** |
| 9 | Walmart Connect | **pending** |
| 10 | Data Dive | **pending** |
| 11 | PSR | live — https://illy-psr.vercel.app/ |

### Section 2 — In Process / Testing (3 tiles)

| # | Tile | Status |
|---|------|--------|
| 1 | Ads HQ | live — https://ads-hq.vercel.app |
| 2 | Monthly Customer Report | live — https://monthly-performance-recap-dashboard.vercel.app |
| 3 | Perf-Marketing Monthly | live — https://performance-marketing-monthly-4lgrt5tma.vercel.app |

### Section 3 — Other Teams / Adjacent Tools (6 tiles)

| # | Tile | Status |
|---|------|--------|
| 1 | Atlas – Master Catalog | live — https://atlas.neato.com/ |
| 2 | Boxscore | **pending** |
| 3 | Neatoverse | **pending** |
| 4 | Basecamp | live — https://basecamp2.neato.com/ |
| 5 | Performance – Supply | live — https://portal.neato.com/performance |
| 6 | Brand HQ | live — https://brandhq.neato.com/ |

**Pending (8), for v1.1:** Subscribe & Save, Looker – Ad Reports, Impact,
Xnurta, Walmart Connect, Data Dive, Boxscore, Neatoverse.

---

## Deviations from spec

One, and it's a bookkeeping correction rather than a build change:

**Live/pending counts.** The spec's summary line reads "11 with live URLs + 9
pending stubs." The per-tile tables in the same spec actually specify **12 live
and 8 pending**. The build follows the tables — every tile matches its table row
exactly, and the total of 20 is unchanged. The summary line appears to have
miscounted. No tile was added, dropped, reordered, or re-statused.

Everything else is per spec: React pinned 18.3.1, no charts/metrics/tables, no
sub-groups or favorites, no analytics, no auth gate, no invented tiles, no
attempt to resolve pending URLs.

One judgment call worth naming: the spec suggested Vault as `#1a1d2e or
equivalent`, but the rest of Casey's fleet (`stacey-hub`, `ads-hq`,
`multi-brand-sqp-dashboard`) uses `#222223`. Since the spec also asks to reuse
the same design language, the build uses the fleet token `#222223`.

---

## Regression verification

All run against the live production URL on 2026-09-11.

| Check | Result |
|---|---|
| `curl -sI https://bri-dashboard-hub.vercel.app` | **200** (not 401 — SSO off) |
| Per-deployment URL public | **200** (was 302→sso-api before protection was disabled) |
| `__next_error__` / `Invariant` markers in DOM | **0** |
| All 20 tile labels in headless DOM | **20 / 20 present** |
| Live tiles (anchors) | **12** |
| `target="_blank"` | **12 / 12** |
| `rel="noopener noreferrer"` | **12 / 12** |
| Pending tiles with `aria-disabled="true"`, no `href` | **8 / 8** |
| "URL pending" pill on every stub | **8 / 8** |
| Runway href query param preserved | **exact** — `.../launches?brand=FIN` |
| Section header order | Active Ad Team Dashboards → In Process / Testing → Other Teams / Adjacent Tools |
| Production build | `next build` clean, 3 static routes, TypeScript strict passes |

**Mobile (375px):** measured via Chrome DevTools Protocol with true mobile
emulation — `scrollWidth` 375 = `clientWidth` 375, widest element right edge
355px, 20 tiles present, single column. No horizontal overflow.

Note: a plain headless screenshot at `--window-size=375` *appears* to show tiles
running off the right edge. That is a headless-desktop-mode artifact (no mobile
viewport emulation), not a real layout bug — the CDP measurement above is the
authoritative check. Anyone re-verifying should use device emulation.

---

## Next (v1.1)

Fill in the 8 pending URLs in `src/data/tiles.ts` — change `status: "pending"`
to `status: "live"` and add `href`. Nothing else needs to change; the tile
component switches variant off that field. Bump `LAST_UPDATED` in
`src/app/page.tsx` when the list changes.
