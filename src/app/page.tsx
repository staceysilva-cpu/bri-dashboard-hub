import { Section } from "@/components/Section";
import { sections } from "@/data/tiles";

/** Bumped by hand when the tile list changes — not a build timestamp. */
const LAST_UPDATED = "September 11, 2026";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-10">
        <div className="mb-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-flamingo via-peach to-buttercream" />
        <h1 className="text-2xl font-semibold tracking-tight text-vault">
          Ad Team Dashboards
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Everything the ad team touches, one click away.
        </p>
      </header>

      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}

      <footer className="border-t border-border pt-5 text-xs text-text-muted">
        Neato · updated {LAST_UPDATED}
      </footer>
    </main>
  );
}
