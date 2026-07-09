import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  Coins,
  Trophy,
  Building2,
  Mail,
  ChevronLeft,
  ExternalLink,
  Link2,
  Shield,
  Zap,
  Clock,
  Flag,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/common/category-badge";
import { StatusBadge } from "@/components/common/status-badge";
import { LEVEL_LABELS, HIGH_COR_BAT_LABELS } from "@/lib/constants";
import {
  formatEventDate,
  formatFee,
  formatPositions,
  buildBoardTitle,
  googleMapsSearchUrl,
  googleMapsEmbedUrl,
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
        {/* 掲示板タイトル: 日時・場所・グラウンド名 */}
        <h1 className="text-xl font-bold leading-snug sm:text-2xl">
          {buildBoardTitle(post)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {post.teamName}
        </p>
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
              value={
                <a
                  href={googleMapsSearchUrl(post)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                >
                  {post.venue}
                  <ExternalLink className="size-3.5" />
                </a>
              }
            />
            <DetailRow
              icon={Trophy}
              label="レベル"
              value={LEVEL_LABELS[post.level]}
            />
            {/* 助っ人は費用項目を表示しない */}
            {post.category !== "helper" && (
              <DetailRow
                icon={Coins}
                label="費用"
                value={formatFee(post.fee)}
              />
            )}
            {post.capacity !== null && (
              <DetailRow
                icon={Users}
                label="募集人数"
                value={`${post.capacity}名`}
              />
            )}
            {post.category === "helper" && (
              <DetailRow
                icon={Shield}
                label="ポジション"
                value={formatPositions(post.positions)}
              />
            )}
            {post.ageGroup && (
              <DetailRow
                icon={Users}
                label="当日の年齢層"
                value={post.ageGroup}
              />
            )}
            {post.highCorBat && (
              <DetailRow
                icon={Zap}
                label="高反発バット"
                value={HIGH_COR_BAT_LABELS[post.highCorBat]}
              />
            )}
            {post.meetingTime && (
              <DetailRow
                icon={Clock}
                label="集合時間"
                value={post.meetingTime}
              />
            )}
            {post.meetingPlace && (
              <DetailRow
                icon={Flag}
                label="集合場所"
                value={post.meetingPlace}
              />
            )}
            {post.contact && (
              <DetailRow icon={Mail} label="連絡先" value={post.contact} />
            )}
            {post.teamUrl && (
              <DetailRow
                icon={Link2}
                label="チーム紹介"
                value={
                  <a
                    href={post.teamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                  >
                    チームページを見る
                    <ExternalLink className="size-3.5" />
                  </a>
                }
              />
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Google マップ（球場名で検索した位置を表示） */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">アクセス</h2>
          <a
            href={googleMapsSearchUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary underline-offset-2 hover:underline"
          >
            Google マップで開く
            <ExternalLink className="size-3.5" />
          </a>
        </div>
        <div className="overflow-hidden rounded-xl border">
          <iframe
            title={`${post.venue} の地図`}
            src={googleMapsEmbedUrl(post)}
            className="h-56 w-full sm:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          ※ 地図は球場名でのGoogleマップ検索結果です。正確な場所は投稿者にご確認ください。
        </p>
      </div>

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
