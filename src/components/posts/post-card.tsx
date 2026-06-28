import Link from "next/link";
import { Users, Coins, Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/common/category-badge";
import { StatusBadge } from "@/components/common/status-badge";
import {
  formatEventDateShort,
  formatFee,
  formatDeadline,
  formatLevel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  const isClosed = post.status === "closed";

  return (
    <Link href={`/posts/${post.id}`} className="block">
      <Card
        className={cn(
          "h-full p-4 transition-shadow hover:shadow-md",
          isClosed && "opacity-70"
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-muted-foreground">
              {formatLevel(post.level)}
            </span>
          </div>
          <StatusBadge status={post.status} />
        </div>

        {/* 掲示板タイトル: 日時・場所・グラウンド名 */}
        <h3 className="mb-1 text-base font-bold leading-snug">
          <span className="text-primary">
            {formatEventDateShort(post.eventDate)}
          </span>
          <span className="mx-1 text-muted-foreground">｜</span>
          <span>
            {post.prefecture}・{post.venue}
          </span>
        </h3>

        {/* キャッチコピー（投稿者の見出し）とチーム名 */}
        <p className="mb-3 line-clamp-1 text-xs text-muted-foreground">
          {post.title}（{post.teamName}）
        </p>

        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
          <div className="flex items-center gap-1.5 text-foreground">
            <Coins className="size-4 shrink-0 text-primary" />
            <span>{formatFee(post.fee)}</span>
          </div>
          {post.capacity !== null && (
            <div className="flex items-center gap-1.5 text-foreground">
              <Users className="size-4 shrink-0 text-primary" />
              <span>{post.capacity}名募集</span>
            </div>
          )}
        </dl>

        <div className="mt-3 flex items-center gap-1.5 border-t pt-2 text-xs text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          <span>募集期限: {formatDeadline(post.deadline)}</span>
        </div>
      </Card>
    </Link>
  );
}
