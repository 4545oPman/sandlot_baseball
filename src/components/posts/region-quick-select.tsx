"use client";

import { PREFECTURES, QUICK_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// 「その他」= どのクイック地方にも含まれない都道府県
const GROUPED = new Set(QUICK_REGIONS.flatMap((r) => r.prefectures));
const OTHERS = PREFECTURES.filter((p) => !GROUPED.has(p));

const CHIPS: { name: string; prefectures: string[] }[] = [
  ...QUICK_REGIONS,
  { name: "その他", prefectures: OTHERS },
];

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((x) => setB.has(x));
}

export function RegionQuickSelect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (prefectures: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map((chip) => {
        const active = sameSet(selected, chip.prefectures);
        return (
          <button
            key={chip.name}
            type="button"
            onClick={() => onChange(active ? [] : chip.prefectures)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background text-foreground hover:bg-accent/50"
            )}
          >
            {chip.name}
          </button>
        );
      })}
    </div>
  );
}
