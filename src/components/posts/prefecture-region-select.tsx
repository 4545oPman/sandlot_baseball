"use client";

import { Check, ChevronDown, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PrefectureRegionSelect({
  selected,
  onChange,
  placeholder = "すべての都道府県",
}: {
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const summary =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? selected[0]
        : `${selected.length}件を選択中`;

  function togglePref(pref: string) {
    onChange(
      selected.includes(pref)
        ? selected.filter((p) => p !== pref)
        : [...selected, pref]
    );
  }

  function toggleRegion(prefectures: string[], allSelected: boolean) {
    if (allSelected) {
      onChange(selected.filter((p) => !prefectures.includes(p)));
    } else {
      onChange([...new Set([...selected, ...prefectures])]);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <span
            className={cn(
              "line-clamp-1 text-left",
              selected.length === 0 && "text-muted-foreground"
            )}
          >
            {summary}
          </span>
          <div className="flex items-center gap-1">
            {selected.length > 0 && (
              <span
                role="button"
                tabIndex={0}
                aria-label="選択をクリア"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange([]);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange([]);
                  }
                }}
                className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </span>
            )}
            <ChevronDown className="size-4 shrink-0 opacity-60" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>都道府県を選ぶ</DialogTitle>
        </DialogHeader>

        <div className="-mx-1 flex-1 space-y-3 overflow-y-auto px-1">
          {REGIONS.map((region) => {
            const selectedInRegion = region.prefectures.filter((p) =>
              selected.includes(p)
            );
            const allSelected =
              selectedInRegion.length === region.prefectures.length;
            const someSelected = selectedInRegion.length > 0;

            return (
              <div
                key={region.name}
                className="rounded-lg border bg-card p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">
                      {region.name}
                    </span>
                    {someSelected && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {selectedInRegion.length}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toggleRegion(region.prefectures, allSelected)
                    }
                    className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {allSelected ? "地方を解除" : "地方をすべて選択"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {region.prefectures.map((pref) => {
                    const isSelected = selected.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => togglePref(pref)}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-2 py-1.5 text-left text-sm transition-colors",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-input hover:bg-accent/40"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded border",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input"
                          )}
                        >
                          {isSelected && <Check className="size-3" />}
                        </span>
                        <span className="line-clamp-1">{pref}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onChange([])}
            disabled={selected.length === 0}
            className="sm:mr-auto"
          >
            <X className="size-4" />
            選択をクリア
          </Button>
          <DialogClose asChild>
            <Button>
              {selected.length > 0
                ? `${selected.length}件で決定`
                : "閉じる"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
