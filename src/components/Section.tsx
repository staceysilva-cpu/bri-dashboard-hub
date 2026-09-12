import type { Section as SectionData } from "@/data/tiles";
import { Tile } from "./Tile";

export function Section({ section }: { section: SectionData }) {
  const primary = section.emphasis === "primary";

  return (
    <section aria-labelledby={section.id} className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <h2
          id={section.id}
          className={
            primary
              ? "text-lg font-semibold tracking-tight text-vault"
              : "text-base font-medium tracking-tight text-text-secondary"
          }
        >
          {section.title}
        </h2>
        {primary ? (
          <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-flamingo via-peach to-buttercream" />
        ) : (
          <span className="h-px flex-1 bg-border" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {section.tiles.map((tile) => (
          <Tile key={tile.label} tile={tile} emphasis={section.emphasis} />
        ))}
      </div>
    </section>
  );
}
