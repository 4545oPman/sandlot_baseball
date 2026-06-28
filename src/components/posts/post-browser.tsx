"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostList } from "./post-list";
import { FilterBar, DEFAULT_FILTERS, type Filters } from "./filter-bar";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  CATEGORY_DESCRIPTIONS,
} from "@/lib/constants";
import { toDateInputValue, eventTimeJst } from "@/lib/format";
import type { Category, Post } from "@/lib/types";

function filterPosts(
  posts: Post[],
  category: Category,
  filters: Filters
): Post[] {
  return posts
    .filter((p) => p.category === category)
    .filter((p) =>
      filters.date ? toDateInputValue(p.eventDate) >= filters.date : true
    )
    .filter((p) =>
      filters.timeFrom ? eventTimeJst(p.eventDate) >= filters.timeFrom : true
    )
    .filter((p) =>
      filters.timeTo ? eventTimeJst(p.eventDate) <= filters.timeTo : true
    )
    .filter((p) =>
      filters.prefecture === "all"
        ? true
        : p.prefecture === filters.prefecture
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

  const counts = useMemo(() => {
    const map = {} as Record<Category, number>;
    for (const c of CATEGORY_ORDER) {
      map[c] = filterPosts(posts, c, filters).length;
    }
    return map;
  }, [posts, filters]);

  const visiblePosts = useMemo(
    () => filterPosts(posts, category, filters),
    [posts, category, filters]
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
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {CATEGORY_ORDER.map((c) => (
        <TabsContent key={c} value={c}>
          <PostList posts={c === category ? visiblePosts : []} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
