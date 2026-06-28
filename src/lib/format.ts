// 表示用フォーマットヘルパー

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/** 2026年7月12日(日) 13:00 のような形式 */
export function formatEventDate(iso: string): string {
  const d = new Date(iso);
  const date = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

/** 7/12(日) 13:00 の短縮形式 (一覧カード用) */
export function formatEventDateShort(iso: string): string {
  const d = new Date(iso);
  const date = `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAYS[d.getDay()]})`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

/** 7月10日 のような期限表示 */
export function formatDeadline(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 費用表示。null は応相談、0 は無料 */
export function formatFee(fee: number | null): string {
  if (fee === null) return "応相談";
  if (fee === 0) return "無料";
  return `${fee.toLocaleString("ja-JP")}円`;
}

/** ISO の日付部分 (YYYY-MM-DD) を取り出す */
export function toDateInputValue(iso: string): string {
  return iso.slice(0, 10);
}
