import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Coins,
  Clock,
  Trophy,
  Building2,
  Mail,
  ChevronLeft,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/common/category-badge";
import { StatusBadge } from "@/components/common/status-badge";
import { LEVEL_LABELS } from "@/lib/constants";
import {
  formatEventDate,
  formatFee,
  formatDeadline,
} from "@/lib/format";
import type { Post } from "@/lib/types";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="font-medium break-words">{value}</dd>
      </div>
    </div>
  );
}

export function PostDetail({ post }: { post: Post }) {
  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/">
          <ChevronLeft className="size-4" />
          一覧に戻る
        </Link>
      </Button>

      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={post.category} />
        <StatusBadge status={post.status} />
      </div>

      <div>
        <h1 className="text-xl font-bold leading-snug sm:text-2xl">
          {post.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{post.teamName}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <dl className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-6 sm:divide-y-0">
            <DetailRow
              icon={CalendarDays}
              label="開催日時"
              value={formatEventDate(post.eventDate)}
            />
            <DetailRow
              icon={MapPin}
              label="場所"
              value={`${post.prefecture}・${post.venue}`}
            />
            <DetailRow
              icon={Building2}
              label="球場名"
              value={post.venue}
            />
            <DetailRow
              icon={Trophy}
              label="レベル"
              value={LEVEL_LABELS[post.level]}
            />
            <DetailRow
              icon={Coins}
              label="費用"
              value={formatFee(post.fee)}
            />
            {post.capacity !== null && (
              <DetailRow
                icon={Users}
                label="募集人数"
                value={`${post.capacity}名`}
              />
            )}
            <DetailRow
              icon={Clock}
              label="募集期限"
              value={formatDeadline(post.deadline)}
            />
            {post.contact && (
              <DetailRow icon={Mail} label="連絡先" value={post.contact} />
            )}
          </dl>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-2 text-sm font-semibold">詳細説明</h2>
        <Card>
          <CardContent className="p-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {post.description}
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          className="w-full sm:w-auto"
          disabled={post.status === "closed"}
        >
          {post.status === "closed" ? "募集は終了しました" : "この募集に応募する"}
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/">他の募集を見る</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        ※ こちらはモックデータを使用したデモ画面です。応募機能は未接続です。
      </p>
    </div>
  );
}
