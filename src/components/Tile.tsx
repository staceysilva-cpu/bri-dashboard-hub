import type { Tile as TileData } from "@/data/tiles";

type TileProps = {
  tile: TileData;
  /** Section 1 tiles carry a little more weight than the rest. */
  emphasis: "primary" | "secondary";
};

const base =
  "group flex min-h-[104px] flex-col justify-between rounded-xl border border-border bg-surface p-4 transition";

export function Tile({ tile, emphasis }: TileProps) {
  const header = (
    <div className="flex flex-col gap-1">
      <span
        className={
          emphasis === "primary"
            ? "text-[15px] font-semibold leading-snug text-vault"
            : "text-[15px] font-medium leading-snug text-vault"
        }
      >
        {tile.label}
      </span>
      {tile.description ? (
        <span className="text-[12px] leading-snug text-text-secondary">
          {tile.description}
        </span>
      ) : null}
    </div>
  );

  if (tile.status === "pending") {
    return (
      <div
        aria-disabled="true"
        className={`${base} cursor-not-allowed bg-receipt/70`}
      >
        {header}
        <span className="mt-3 inline-flex w-fit items-center rounded-full bg-buttercream px-2.5 py-1 text-[11px] font-medium text-text-secondary">
          URL pending
        </span>
      </div>
    );
  }

  return (
    <a
      href={tile.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} hover:-translate-y-0.5 hover:border-mocha hover:shadow-md hover:shadow-vault/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vault`}
    >
      {header}
      {tile.note ? (
        <span className="mt-3 text-[11px] leading-snug text-text-secondary">
          {tile.note}
        </span>
      ) : (
        <span className="mt-3 text-[11px] text-text-muted opacity-0 transition group-hover:opacity-100">
          Open ↗
        </span>
      )}
    </a>
  );
}
