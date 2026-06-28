// 募集種別
export type Category = "match" | "helper" | "ground";

// 募集状況
export type PostStatus = "open" | "closing_soon" | "closed";

// チームのレベル（0.5刻みのレンジ。キーはレンジの下限値、"2.0" は 2.0以上）
export type Level = "any" | "1.0" | "1.5" | "2.0";

// 募集投稿データ
export interface Post {
  id: string;
  /** 募集種別 */
  category: Category;
  /** チーム名 */
  teamName: string;
  /** 開催日時 (ISO 8601) */
  eventDate: string;
  /** 都道府県 */
  prefecture: string;
  /** 球場名 / グラウンド名 */
  venue: string;
  /** レベル */
  level: Level;
  /** 費用 (円)。0 は無料 / 応相談は null */
  fee: number | null;
  /** 募集人数 (グラウンド譲渡では使わない場合 null) */
  capacity: number | null;
  /** 募集期限 (ISO 8601) */
  deadline: string;
  /** 詳細説明 */
  description: string;
  /** 募集状況 */
  status: PostStatus;
  /** 投稿日時 (ISO 8601) */
  createdAt: string;
  /** 連絡先 (任意) */
  contact?: string;
  /** チーム紹介ページのURL (任意) */
  teamUrl?: string;
}
