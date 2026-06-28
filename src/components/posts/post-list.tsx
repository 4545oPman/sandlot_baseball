import { SearchX } from "lucide-react";

import { PostCard } from "./post-card";
import type { Post } from "@/lib/types";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <SearchX className="mb-3 size-8 text-muted-foreground" />
        <p className="font-medium">条件に合う募集が見つかりませんでした</p>
        <p className="mt-1 text-sm text-muted-foreground">
          絞り込み条件を変更してお試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
