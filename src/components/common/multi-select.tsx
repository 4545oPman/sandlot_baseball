"use client";

import { Check, ChevronDown, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "すべて",
  className,
}: {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? placeholder)
        : `${selected.length}件を選択中`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-ring",
            className
          )}
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
      </PopoverTrigger>
      <PopoverContent className="max-h-72 overflow-y-auto">
        {options.length === 0 ? (
          <p className="px-2 py-3 text-center text-sm text-muted-foreground">
            候補がありません
          </p>
        ) : (
          options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
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
                <span className="line-clamp-1">{opt.label}</span>
              </button>
            );
          })
        )}
      </PopoverContent>
    </Popover>
  );
}
