"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostList } from "./post-list";
import { FilterBar, DEFAULT_FILTERS, type Filters } from "./filter-bar";
import { RegionQuickSelect } from "./region-quick-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  CATEGORY_DESCRIPTIONS,
} from "@/lib/constants";
import {
  toDateInputValue,
  eventTimeJst,
  isPastEvent,
  upcomingWeekendDates,
} from "@/lib/format";
import type { Category, Post } from "@/lib/types";

type SortKey = "date" | "updated";

// 初期状態は「直近の土日」で絞り込み（募集中・締切間近のみは closed 除外で自動的に成立）
function initialFilters(): Filters {
  return { ...DEFAULT_FILTERS, dates: upcomingWeekendDates() };
}

function matchFilters(post: Post, filters: Filters): boolean {
  if (
    filters.dates.length > 0 &&
    !filters.dates.includes(toDateInputValue(post.eventDate))
  )
    return false;
  if (filters.timeFrom && eventTimeJst(post.eventDate) < filters.timeFrom)
    return false;
  if (filters.timeTo && eventTimeJst(post.eventDate) > filters.timeTo)
    return false;
  if (
    filters.prefectures.length > 0 &&
    !filters.prefectures.includes(post.prefecture)
  )
    return false;
  if (filters.level !== "all" && post.level !== filters.level) return false;
  if (filters.positions.length > 0) {
    const posPositions = post.positions ?? [];
    // ポジション不問（空）の募集はどの条件にも合致。指定ありは重なりがあれば合致
    const match =
      posPositions.length === 0 ||
      posPositions.some((p) => filters.positions.includes(p));
    if (!match) return false;
  }
  if (filters.status !== "all" && post.status !== filters.status) return false;
  return true;
}

function sortPosts(posts: Post[], sort: SortKey): Post[] {
  const arr = [...posts];
  if (sort === "updated") {
    arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else {
    arr.sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  }
  return arr;
}

function selectPosts(
  posts: Post[],
  category: Category,
  filters: Filters,
  sort: SortKey
): Post[] {
  return sortPosts(
    posts.filter((p) => p.category === category && matchFilters(p, filters)),
    sort
  );
}

export function PostBrowser({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Category>("match");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState<SortKey>("date");

  // 「募集終了」を除外し、開催日が過ぎた募集は自動的に表示しない（=削除扱い）
  const activePosts = useMemo(
    () => posts.filter((p) => p.status !== "closed" && !isPastEvent(p.eventDate)),
    [posts]
  );

  const counts = useMemo(() => {
    const map = {} as Record<Category, number>;
    for (const c of CATEGORY_ORDER) {
      map[c] = selectPosts(activePosts, c, filters, sort).length;
    }
    return map;
  }, [activePosts, filters, sort]);

  const visiblePosts = useMemo(
    () => selectPosts(activePosts, category, filters, sort),
    [activePosts, category, filters, sort]
  );

  return (
    <Tabs
      value={category}
      onValueChange={(v) => setCategory(v as Category)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        {CATEGORY_ORDER.map((c) => (
          <TabsTrigger key={c} value={c} className="text-xs sm:text-sm">
            {CATEGORY_LABELS[c]}
            <span className="ml-1 text-[10px] text-muted-foreground">
              {counts[c]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-3 space-y-3">
        <p className="text-sm text-muted-foreground">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>

        {/* ワンタップ地方フィルター */}
        <RegionQuickSelect
          selected={filters.prefectures}
          onChange={(prefectures) => setFilters({ ...filters, prefectures })}
        />

        <FilterBar filters={filters} onChange={setFilters} category={category} />

        {/* 並び替え */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">
            {visiblePosts.length}件
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">並び替え</span>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-9 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">日付＆時間順</SelectItem>
                <SelectItem value="updated">更新順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {CATEGORY_ORDER.map((c) => (
        <TabsContent key={c} value={c}>
          <PostList posts={c === category ? visiblePosts : []} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
