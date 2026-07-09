"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACTIVE_STATUS_ORDER,
  AGE_GROUP_OPTIONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  HIGH_COR_BAT_LABELS,
  HIGH_COR_BAT_ORDER,
  LEVEL_LABELS,
  LEVEL_ORDER,
  POSITION_LABELS,
  POSITION_ORDER,
  PREFECTURES,
  STATUS_LABELS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Position } from "@/lib/types";

function Field({
  label,
  htmlFor,
  required,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function PostForm() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<string>("match");
  const [prefecture, setPrefecture] = useState<string>("");
  const [level, setLevel] = useState<string>("any");
  const [status, setStatus] = useState<string>("open");
  const [positions, setPositions] = useState<Position[]>([]);
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [highCorBat, setHighCorBat] = useState<string>("either");
  // 掲示板タイトルのプレビュー / Googleマップ検索に使う入力
  const [eventDate, setEventDate] = useState<string>("");
  const [venue, setVenue] = useState<string>("");

  function togglePosition(p: Position) {
    setPositions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  // 日時・場所・グラウンド名から掲示板タイトルを組み立てる（プレビュー用）
  const boardTitlePreview = (() => {
    const parts: string[] = [];
    if (eventDate) {
      const d = new Date(eventDate);
      if (!Number.isNaN(d.getTime())) {
        const wd = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
        const t = `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes()
        ).padStart(2, "0")}`;
        parts.push(`${d.getMonth() + 1}/${d.getDate()}(${wd}) ${t}`);
      }
    }
    const place = [prefecture, venue].filter(Boolean).join("・");
    if (place) parts.push(place);
    return parts.join("｜");
  })();

  const mapsSearchUrl = venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${prefecture} ${venue}`.trim()
      )}`
    : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // バックエンド未接続のため、送信は行わず完了画面を表示するのみ
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h2 className="text-lg font-bold">投稿が完了しました（デモ）</h2>
          <p className="text-sm text-muted-foreground">
            こちらはモックデータを使用したデモのため、実際には保存されません。
          </p>
          <div className="mt-2 flex gap-2">
            <Button asChild>
              <Link href="/">一覧に戻る</Link>
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              続けて投稿する
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/">
          <ChevronLeft className="size-4" />
          一覧に戻る
        </Link>
      </Button>

      <div>
        <h1 className="text-xl font-bold">募集を新規投稿</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          必要な情報を入力して募集を投稿しましょう。
        </p>
      </div>

      <Card>
        <CardContent className="space-y-5 p-5">
          <Field label="募集種別" required>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_ORDER.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="チーム名" htmlFor="teamName" required>
            <Input id="teamName" required placeholder="例）世田谷ベースボールクラブ" />
          </Field>

          <Field label="開催日時" htmlFor="eventDate" required>
            <Input
              id="eventDate"
              type="datetime-local"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="都道府県" required>
              <Select value={prefecture} onValueChange={setPrefecture}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {PREFECTURES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="球場名 / グラウンド名"
              htmlFor="venue"
              required
              hint="入力後、Googleマップで正式名称・場所を確認できます。"
            >
              <div className="flex gap-2">
                <Input
                  id="venue"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="例）駒沢オリンピック公園 軟式野球場"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Googleマップで球場名を検索"
                  disabled={!mapsSearchUrl}
                  asChild={!!mapsSearchUrl}
                >
                  {mapsSearchUrl ? (
                    <a
                      href={mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Search className="size-4" />
                    </a>
                  ) : (
                    <Search className="size-4" />
                  )}
                </Button>
              </div>
            </Field>
          </div>

          {/* 自動生成される掲示板タイトルのプレビュー */}
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              掲示板に表示されるタイトル（日時・場所・グラウンド名から自動作成）
            </p>
            <p className="mt-1 font-semibold">
              {boardTitlePreview || "（日時・都道府県・球場名を入力すると表示されます）"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="レベル"
              required
              hint="チームの最も高い野球経験レベルの目安です。"
            >
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_ORDER.map((l) => (
                    <SelectItem key={l} value={l}>
                      {LEVEL_LABELS[l]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="募集状況" required>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVE_STATUS_ORDER.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* 助っ人は費用を取らないため費用欄は表示しない */}
            {category !== "helper" && (
              <Field
                label="費用（円）"
                htmlFor="fee"
                hint="無料の場合は0のまま。応相談の場合は空欄"
              >
                <Input
                  id="fee"
                  type="number"
                  min={0}
                  defaultValue={0}
                  placeholder="例）0"
                />
              </Field>
            )}
            {/* 練習試合はチーム単位の募集のため人数欄は表示しない */}
            {category !== "match" && (
              <Field
                label="募集人数"
                htmlFor="capacity"
                hint="グラウンド譲渡などで不要な場合は空欄"
              >
                <Input id="capacity" type="number" min={0} placeholder="例）1" />
              </Field>
            )}
          </div>

          {/* 助っ人募集: ポジション（複数選択可・未選択は不問） */}
          {category === "helper" && (
            <Field label="募集ポジション" hint="未選択の場合は「不問」になります。">
              <div className="flex flex-wrap gap-2">
                {POSITION_ORDER.map((p) => {
                  const active = positions.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePosition(p)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:bg-accent/50"
                      )}
                    >
                      {POSITION_LABELS[p]}
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          {/* 試合当日の情報（グラウンド譲渡では不要） */}
          {category !== "ground" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="当日の年齢層" hint="任意">
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_GROUP_OPTIONS.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="高反発バット" hint="任意">
                <Select value={highCorBat} onValueChange={setHighCorBat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HIGH_COR_BAT_ORDER.map((b) => (
                      <SelectItem key={b} value={b}>
                        {HIGH_COR_BAT_LABELS[b]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="集合時間" htmlFor="meetingTime" hint="任意">
                <Input id="meetingTime" type="time" />
              </Field>
              <Field
                label="具体的な集合場所"
                htmlFor="meetingPlace"
                hint="任意。バックネット裏・正面入口など"
              >
                <Input
                  id="meetingPlace"
                  placeholder="例）第一球場 バックネット裏"
                />
              </Field>
            </div>
          )}

          <Field label="詳細説明" htmlFor="description" required>
            <Textarea
              id="description"
              required
              rows={6}
              placeholder="活動内容、ルール、持ち物、雰囲気などを記入してください。"
            />
          </Field>

          <Field label="連絡先" htmlFor="contact" hint="メールアドレスや電話番号など">
            <Input id="contact" placeholder="例）example@example.com" />
          </Field>

          <Field
            label="チーム紹介URL"
            htmlFor="teamUrl"
            hint="チームのホームページやSNSのURL（任意）。"
          >
            <Input
              id="teamUrl"
              type="url"
              inputMode="url"
              placeholder="例）https://example.com/teams/your-team"
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto">
          この内容で投稿する
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/">キャンセル</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        ※ こちらはモックデータを使用したデモ画面です。投稿内容は保存されません。
      </p>
    </form>
  );
}
