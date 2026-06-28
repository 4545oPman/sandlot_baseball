"use client";

import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PrefectureRegionSelect } from "./prefecture-region-select";
import { EventDatePicker } from "./event-date-picker";
import {
  ACTIVE_STATUS_ORDER,
  LEVEL_LABELS,
  LEVEL_ORDER,
  STATUS_LABELS,
  TIME_OPTIONS,
} from "@/lib/constants";
import type { Level, PostStatus } from "@/lib/types";

export interface Filters {
  /** 選択された開催日 (YYYY-MM-DD) の配列。空は指定なし */
  dates: string[];
  /** 開始時刻の下限 (HH:MM)。"" は指定なし */
  timeFrom: string;
  /** 開始時刻の上限 (HH:MM)。"" は指定なし */
  timeTo: string;
  /** 選択された都道府県の配列。空は指定なし */
  prefectures: string[];
  level: Level | "all";
  status: PostStatus | "all";
}

export const DEFAULT_FILTERS: Filters = {
  dates: [],
  timeFrom: "",
  timeTo: "",
  prefectures: [],
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
    filters.dates.length > 0 ||
    filters.timeFrom !== "" ||
    filters.timeTo !== "" ||
    filters.prefectures.length > 0 ||
    filters.level !== "all" ||
    filters.status !== "all";

  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">開催日</Label>
          <EventDatePicker
            selected={filters.dates}
            onChange={(dates) => onChange({ ...filters, dates })}
            placeholder="すべての日付"
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
          <PrefectureRegionSelect
            selected={filters.prefectures}
            onChange={(prefectures) => onChange({ ...filters, prefectures })}
            placeholder="すべての都道府県"
          />
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
              {ACTIVE_STATUS_ORDER.map((s) => (
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
