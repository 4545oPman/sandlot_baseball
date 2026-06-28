"use client";

import { CalendarDays, ChevronDown, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Date -> "YYYY-MM-DD"（ローカルの年月日。タイムゾーンずれを避ける）
function dateToYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// "YYYY-MM-DD" -> Date（ローカル正午。DST等の境界ずれを避ける）
function ymdToDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}

export function EventDatePicker({
  selected,
  onChange,
  placeholder = "すべての日付",
}: {
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const selectedDates = selected.map(ymdToDate);

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? `${ymdToDate(selected[0]).getMonth() + 1}/${ymdToDate(selected[0]).getDate()}`
        : `${selected.length}日を選択中`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <span className="flex items-center gap-2 truncate">
            <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
            <span
              className={cn(
                "truncate",
                selected.length === 0 && "text-muted-foreground"
              )}
            >
              {summary}
            </span>
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
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => onChange((dates ?? []).map(dateToYmd).sort())}
          disabled={{ before: new Date() }}
        />
        {selected.length > 0 && (
          <div className="flex justify-end border-t p-2">
            <button
              type="button"
              onClick={() => onChange([])}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
              選択をクリア
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
