/**
 * Source of truth for Ad Team Dashboards (repo/URL slug remains `bri-dashboard-hub`).
 *
 * Three fixed sections, 20 tiles, in a locked order — do not reorder, add, or
 * drop tiles here without a spec change. Tiles whose URL isn't known yet are
 * `status: 'pending'` and render as non-clickable stubs with a "URL pending"
 * pill; v1.1 fills them in.
 */

export type TileStatus = "live" | "pending";

export type Tile =
  | { label: string; status: "live"; href: string; note?: string; description?: string }
  | { label: string; status: "pending"; href?: never; note?: string; description?: string };

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
        description:
          "Search Query Performance across every brand in one view. Brand selector on the page.",
      },
      {
        label: "Budget Pacing",
        status: "live",
        href: "https://budget-pacing-dashboard.vercel.app",
        description:
          "Live view of where each brand's ad spend is tracking vs its monthly budget.",
      },
      {
        label: "Runway",
        status: "live",
        href: "https://creative-ads-tracker.vercel.app/launches?brand=FIN",
        note: "Internal Neato tool",
        description:
          "Dashboard for Upcoming Ad Launches and Creative Advertising Tracker.",
      },
      {
        label: "Subscribe & Save",
        status: "live",
        href: "https://sns-dashboard-steel.vercel.app/?brand=earth-animal",
        description:
          "Amazon S&S subscriber counts, growth, and churn by brand.",
      },
      {
        label: "Ad Team To-Do List",
        status: "live",
        href: "https://ad-todo-dashboard.vercel.app/",
        description:
          "Shared task board for the ad team, auto-pulled from Slack.",
      },
      {
        label: "Looker – Ad Reports",
        status: "live",
        href: "https://datastudio.google.com/reporting/9d3d7074-a868-445a-a791-bf55079b3a14/page/Zi07F",
        note: "Data Studio report",
        description:
          "Looker Studio report with cross-brand ad performance.",
      },
      {
        label: "Impact",
        status: "live",
        href: "https://www.impact.neato.com/advertising",
        note: "Amazon ad tool",
        description: "Neato's Performance Tracking Dashboard.",
      },
      {
        label: "Xnurta",
        status: "live",
        href: "https://ai.xnurta.com/home_new?profileType=Sponsored&profileId=790242887465195&tenantId=8881",
        note: "External",
        description: "Neato's advertising third-party platform.",
      },
      {
        label: "Walmart Connect",
        status: "live",
        href: "https://advertising.walmart.com/signin?adtechClientId=d8e4dc23-caef-4401-9e36-fa89422644a2&rd=https%3A%2F%2Fadvertising.walmart.com%2Fadtech-plugin-auth",
        note: "External",
        description:
          "Walmart's ad platform for managing Walmart.com campaigns.",
      },
      {
        label: "Data Dive",
        status: "live",
        href: "https://2.datadive.tools/",
        note: "External",
        description:
          "Third-party Amazon keyword and market research tool.",
      },
      {
        label: "PSR",
        status: "live",
        href: "https://illy-psr.vercel.app/",
        note: "illy-specific",
        description: "illy's Performance Snapshot Report.",
      },
    ],
  },
  {
    id: "in-process-testing",
    title: "In Process / Testing",
    emphasis: "secondary",
    tiles: [
      {
        label: "Ads HQ",
        status: "live",
        href: "https://ads-hq.vercel.app",
        description: "Central Hub for all things ad team.",
      },
      {
        label: "Monthly Customer Report",
        status: "live",
        href: "https://monthly-performance-recap-dashboard.vercel.app",
        description:
          "Monthly Data Recap Specific to Brand Customer Accounts, Including New to Brand.",
      },
      {
        label: "Ad Team Monthly Meeting",
        status: "live",
        href: "https://performance-marketing-monthly-4lgrt5tma.vercel.app",
        note: "Shell live; numbers pending",
        description:
          "Slide-ready monthly ad performance rollup for the internal team meeting.",
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
        description: "Neato's master ASIN and product catalog.",
      },
      {
        label: "Boxscore",
        status: "live",
        href: "https://boxscore-tau.vercel.app/repricing",
        note: "Internal Neato tool",
        description: "Internal Neato pricing, promos, and buy-box tool.",
      },
      {
        label: "Tape",
        status: "live",
        href: "https://tape.neato.com/overview",
        note: "Internal Neato tool",
        description: "Neato's internal billbacks tool.",
      },
      {
        label: "Neatoverse",
        status: "live",
        href: "https://neatoverse.vercel.app/",
        note: "Internal Neato tool",
        description: "Internal Neato company directory and knowledge base.",
      },
      {
        label: "Basecamp",
        status: "live",
        href: "https://basecamp2.neato.com/",
        description: "Neato's internal Marketplace Team Hub.",
      },
      {
        label: "Performance – Supply",
        status: "live",
        href: "https://portal.neato.com/performance",
        description:
          "Supply-side performance view used by the ops/supply team.",
      },
      {
        label: "Brand HQ",
        status: "live",
        href: "https://brandhq.neato.com/",
        description: "Central hub for the brand management teams.",
      },
    ],
  },
];
