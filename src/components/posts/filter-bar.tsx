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
import { PREFECTURES, STATUS_LABELS, STATUS_ORDER } from "@/lib/constants";
import type { PostStatus } from "@/lib/types";

export interface Filters {
  date: string;
  prefecture: string;
  status: PostStatus | "all";
}

export const DEFAULT_FILTERS: Filters = {
  date: "",
  prefecture: "all",
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
    filters.prefecture !== "all" ||
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
