"use client";

import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  LEVEL_LABELS,
  LEVEL_ORDER,
  PREFECTURES,
  STATUS_LABELS,
  STATUS_ORDER,
  TIME_OPTIONS,
} from "@/lib/constants";
import type { Level, PostStatus } from "@/lib/types";

export interface Filters {
  date: string;
  /** 開始時刻の下限 (HH:MM)。"" は指定なし */
  timeFrom: string;
  /** 開始時刻の上限 (HH:MM)。"" は指定なし */
  timeTo: string;
  prefecture: string;
  level: Level | "all";
  status: PostStatus | "all";
}

export const DEFAULT_FILTERS: Filters = {
  date: "",
  timeFrom: "",
  timeTo: "",
  prefecture: "all",
  level: "all",
  status: "all",
};

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const hasActiveFilter =
    filters.date !== "" ||
    filters.timeFrom !== "" ||
    filters.timeTo !== "" ||
    filters.prefecture !== "all" ||
    filters.level !== "all" ||
    filters.status !== "all";

  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label htmlFor="filter-date" className="text-xs text-muted-foreground">
            開催日（以降）
          </Label>
          <Input
            id="filter-date"
            type="date"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">時間帯（開始）</Label>
          <div className="flex items-center gap-1.5">
            <Select
              value={filters.timeFrom || "any"}
              onValueChange={(v) =>
                onChange({ ...filters, timeFrom: v === "any" ? "" : v })
              }
            >
              <SelectTrigger className="px-2">
                <SelectValue placeholder="指定なし" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">指定なし</SelectItem>
                {TIME_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">〜</span>
            <Select
              value={filters.timeTo || "any"}
              onValueChange={(v) =>
                onChange({ ...filters, timeTo: v === "any" ? "" : v })
              }
            >
              <SelectTrigger className="px-2">
                <SelectValue placeholder="指定なし" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">指定なし</SelectItem>
                {TIME_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">都道府県</Label>
          <Select
            value={filters.prefecture}
            onValueChange={(v) => onChange({ ...filters, prefecture: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての都道府県</SelectItem>
              {PREFECTURES.map((pref) => (
                <SelectItem key={pref} value={pref}>
                  {pref}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">レベル</Label>
          <Select
            value={filters.level}
            onValueChange={(v) =>
              onChange({ ...filters, level: v as Filters["level"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのレベル</SelectItem>
              {LEVEL_ORDER.map((l) => (
                <SelectItem key={l} value={l}>
                  {LEVEL_LABELS[l]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">募集状況</Label>
          <Select
            value={filters.status}
            onValueChange={(v) =>
              onChange({ ...filters, status: v as Filters["status"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての状況</SelectItem>
              {STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilter && (
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-muted-foreground"
          >
            <X className="size-4" />
            条件をクリア
          </Button>
        </div>
      )}
    </div>
  );
}
