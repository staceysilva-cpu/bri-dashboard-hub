/**
 * Source of truth for Bri's Dashboard Hub.
 *
 * Three fixed sections, 20 tiles, in a locked order — do not reorder, add, or
 * drop tiles here without a spec change. Tiles whose URL isn't known yet are
 * `status: 'pending'` and render as non-clickable stubs with a "URL pending"
 * pill; v1.1 fills them in.
 */

export type TileStatus = "live" | "pending";

export type Tile =
  | { label: string; status: "live"; href: string; note?: string }
  | { label: string; status: "pending"; href?: never; note?: string };

export type Section = {
  /** Stable id, used as the section heading anchor. */
  id: string;
  title: string;
  /** Section 1 is the daily-driver set and carries the most visual weight. */
  emphasis: "primary" | "secondary";
  tiles: Tile[];
};

export const sections: Section[] = [
  {
    id: "active-ad-team-dashboards",
    title: "Active Ad Team Dashboards",
    emphasis: "primary",
    tiles: [
      {
        label: "Multi-Brand SQP",
        status: "live",
        href: "https://multi-brand-sqp-dashboard.vercel.app",
        note: "Brand selector on the page",
      },
      {
        label: "Budget Pacing",
        status: "live",
        href: "https://budget-pacing-dashboard.vercel.app",
      },
      {
        label: "Runway",
        status: "live",
        href: "https://creative-ads-tracker.vercel.app/launches?brand=FIN",
        note: "External",
      },
      { label: "Subscribe & Save", status: "pending" },
      {
        label: "Ad Team To-Do List",
        status: "live",
        href: "https://ad-todo-dashboard.vercel.app/",
      },
      { label: "Looker – Ad Reports", status: "pending", note: "Data Studio report" },
      { label: "Impact", status: "pending", note: "Amazon ad tool" },
      { label: "Xnurta", status: "pending", note: "External" },
      { label: "Walmart Connect", status: "pending", note: "External" },
      { label: "Data Dive", status: "pending", note: "External" },
      {
        label: "PSR",
        status: "live",
        href: "https://illy-psr.vercel.app/",
        note: "illy-specific",
      },
    ],
  },
  {
    id: "in-process-testing",
    title: "In Process / Testing",
    emphasis: "secondary",
    tiles: [
      { label: "Ads HQ", status: "live", href: "https://ads-hq.vercel.app" },
      {
        label: "Monthly Customer Report",
        status: "live",
        href: "https://monthly-performance-recap-dashboard.vercel.app",
      },
      {
        label: "Perf-Marketing Monthly",
        status: "live",
        href: "https://performance-marketing-monthly-4lgrt5tma.vercel.app",
        note: "Shell live; numbers pending",
      },
    ],
  },
  {
    id: "other-teams-adjacent-tools",
    title: "Other Teams / Adjacent Tools",
    emphasis: "secondary",
    tiles: [
      {
        label: "Atlas – Master Catalog",
        status: "live",
        href: "https://atlas.neato.com/",
      },
      { label: "Boxscore", status: "pending", note: "Internal Neato tool" },
      { label: "Neatoverse", status: "pending", note: "Internal Neato tool" },
      { label: "Basecamp", status: "live", href: "https://basecamp2.neato.com/" },
      {
        label: "Performance – Supply",
        status: "live",
        href: "https://portal.neato.com/performance",
      },
      { label: "Brand HQ", status: "live", href: "https://brandhq.neato.com/" },
    ],
  },
];
