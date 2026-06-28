"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostList } from "./post-list";
import { FilterBar, DEFAULT_FILTERS, type Filters } from "./filter-bar";
import type { MultiSelectOption } from "@/components/common/multi-select";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  CATEGORY_DESCRIPTIONS,
} from "@/lib/constants";
import {
  toDateInputValue,
  eventTimeJst,
  isPastEvent,
  formatEventDateShort,
} from "@/lib/format";
import type { Category, Post } from "@/lib/types";

function filterPosts(
  posts: Post[],
  category: Category,
  filters: Filters
): Post[] {
  return posts
    .filter((p) => p.category === category)
    .filter((p) =>
      filters.dates.length === 0
        ? true
        : filters.dates.includes(toDateInputValue(p.eventDate))
    )
    .filter((p) =>
      filters.timeFrom ? eventTimeJst(p.eventDate) >= filters.timeFrom : true
    )
    .filter((p) =>
      filters.timeTo ? eventTimeJst(p.eventDate) <= filters.timeTo : true
    )
    .filter((p) =>
      filters.prefectures.length === 0
        ? true
        : filters.prefectures.includes(p.prefecture)
    )
    .filter((p) => (filters.level === "all" ? true : p.level === filters.level))
    .filter((p) =>
      filters.status === "all" ? true : p.status === filters.status
    )
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}

export function PostBrowser({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<Category>("match");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // 「募集終了」を除外し、開催日が過ぎた募集は自動的に表示しない（=削除扱い）
  const activePosts = useMemo(
    () => posts.filter((p) => p.status !== "closed" && !isPastEvent(p.eventDate)),
    [posts]
  );

  // 絞り込みの選択肢（実在する日付・都道府県のみ）
  const dateOptions = useMemo<MultiSelectOption[]>(() => {
    const seen = new Map<string, string>();
    for (const p of activePosts) {
      const value = toDateInputValue(p.eventDate);
      if (!seen.has(value)) seen.set(value, formatEventDateShort(p.eventDate));
    }
    return [...seen.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      // 時刻部分を除いた日付ラベルにする
      .map(([value, label]) => ({ value, label: label.split(" ")[0] }));
  }, [activePosts]);

  const counts = useMemo(() => {
    const map = {} as Record<Category, number>;
    for (const c of CATEGORY_ORDER) {
      map[c] = filterPosts(activePosts, c, filters).length;
    }
    return map;
  }, [activePosts, filters]);

  const visiblePosts = useMemo(
    () => filterPosts(activePosts, category, filters),
    [activePosts, category, filters]
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
        <FilterBar
          filters={filters}
          onChange={setFilters}
          dateOptions={dateOptions}
        />
      </div>

      {CATEGORY_ORDER.map((c) => (
        <TabsContent key={c} value={c}>
          <PostList posts={c === category ? visiblePosts : []} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
