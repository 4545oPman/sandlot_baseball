// 表示用フォーマットヘルパー
// 日本向けサービスのため、日時は常に JST (Asia/Tokyo) で表示する

import type { Level, Post } from "./types";
import { LEVEL_LABELS } from "./constants";

const TZ = "Asia/Tokyo";
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

// JST における年月日時分・曜日を取り出す
function jstParts(iso: string) {
  const d = new Date(iso);
  const fmt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const map: Record<string, string> = {};
  for (const p of fmt.formatToParts(d)) map[p.type] = p.value;
  // weekday を曜日記号に統一
  const wdIndex = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  })
    .format(d)
    .trim();
  const enToIdx: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    year: map.year,
    month: map.month,
    day: map.day,
    hour: map.hour,
    minute: map.minute,
    weekday: WEEKDAYS[enToIdx[wdIndex] ?? 0],
  };
}

/** 2026年7月12日(日) 09:00 のような形式 */
export function formatEventDate(iso: string): string {
  const p = jstParts(iso);
  return `${p.year}年${p.month}月${p.day}日(${p.weekday}) ${p.hour}:${p.minute}`;
}

/** 7/12(日) 09:00 の短縮形式 */
export function formatEventDateShort(iso: string): string {
  const p = jstParts(iso);
  return `${p.month}/${p.day}(${p.weekday}) ${p.hour}:${p.minute}`;
}

/** ラベル無しで表示する場合のレベル表記。数値レンジには "Lv." を付ける */
export function formatLevel(level: Level): string {
  return level === "any" ? LEVEL_LABELS.any : `Lv. ${LEVEL_LABELS[level]}`;
}

/** 費用表示。null は応相談、0 は無料 */
export function formatFee(fee: number | null): string {
  if (fee === null) return "応相談";
  if (fee === 0) return "無料";
  return `${fee.toLocaleString("ja-JP")}円`;
}

/** ISO の JST 日付部分 (YYYY-MM-DD) を取り出す（絞り込み比較用） */
export function toDateInputValue(iso: string): string {
  const p = jstParts(iso);
  return `${p.year}-${p.month.padStart(2, "0")}-${p.day.padStart(2, "0")}`;
}

/** ISO の JST 開始時刻 (HH:MM) を取り出す（時間帯フィルター比較用） */
export function eventTimeJst(iso: string): string {
  const p = jstParts(iso);
  return `${p.hour}:${p.minute}`;
}

/** 今日の JST 日付 (YYYY-MM-DD) */
export function todayJst(): string {
  return toDateInputValue(new Date().toISOString());
}

/** 開催日が過ぎた募集か（JSTの日付基準。開催日当日は過去扱いしない） */
export function isPastEvent(iso: string): boolean {
  return toDateInputValue(iso) < todayJst();
}

/**
 * 掲示板のタイトル。日時・場所（都道府県）・グラウンド名から自動生成する。
 * 例) 7/12(日) 09:00｜東京都・駒沢オリンピック公園 軟式野球場
 */
export function buildBoardTitle(post: Post): string {
  return `${formatEventDateShort(post.eventDate)}｜${post.prefecture}・${post.venue}`;
}

/** Google マップで球場名を開く URL */
export function googleMapsSearchUrl(post: Post): string {
  const query = encodeURIComponent(`${post.prefecture} ${post.venue}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Google マップ埋め込み用 URL（APIキー不要の output=embed 形式） */
export function googleMapsEmbedUrl(post: Post): string {
  const query = encodeURIComponent(`${post.prefecture} ${post.venue}`);
  return `https://maps.google.com/maps?q=${query}&hl=ja&z=15&output=embed`;
}
