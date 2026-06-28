"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

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
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  LEVEL_LABELS,
  LEVEL_ORDER,
  PREFECTURES,
  STATUS_LABELS,
  STATUS_ORDER,
} from "@/lib/constants";

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

          <Field label="募集タイトル" htmlFor="title" required>
            <Input
              id="title"
              required
              placeholder="例）日曜午前に練習試合できるチーム募集！"
            />
          </Field>

          <Field label="チーム名" htmlFor="teamName" required>
            <Input id="teamName" required placeholder="例）世田谷ベースボールクラブ" />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="開催日時" htmlFor="eventDate" required>
              <Input id="eventDate" type="datetime-local" required />
            </Field>
            <Field label="募集期限" htmlFor="deadline" required>
              <Input id="deadline" type="date" required />
            </Field>
          </div>

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
            <Field label="球場名" htmlFor="venue" required>
              <Input id="venue" required placeholder="例）駒沢オリンピック公園 軟式野球場" />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="レベル" required>
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
                  {STATUS_ORDER.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="費用（円）" htmlFor="fee" hint="無料の場合は0、応相談の場合は空欄">
              <Input id="fee" type="number" min={0} placeholder="例）3000" />
            </Field>
            <Field
              label="募集人数"
              htmlFor="capacity"
              hint="グラウンド譲渡などで不要な場合は空欄"
            >
              <Input id="capacity" type="number" min={0} placeholder="例）1" />
            </Field>
          </div>

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
