// 募集種別
export type Category = "match" | "helper" | "ground";

// 募集状況
export type PostStatus = "open" | "closing_soon" | "closed";

// チームのレベル（最終的な野球経験の目安。事実ベースで揺れにくくする）
export type Level = "any" | "juniorhigh" | "highschool" | "college";

// 守備位置
export type Position = "P" | "C" | "1B" | "2B" | "3B" | "SS" | "OF";

// 高反発バットの可否
export type HighCorBat = "ok" | "ng" | "either";

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
  /** 募集ポジション（主に助っ人募集で使用）。空/未指定は「不問」 */
  positions?: Position[];
  /** 当日の年齢層（任意）。例: "30代中心" */
  ageGroup?: string;
  /** 高反発バットの可否（任意） */
  highCorBat?: HighCorBat;
  /** 集合時間 (HH:MM, 任意) */
  meetingTime?: string;
  /** 具体的な集合場所（任意） */
  meetingPlace?: string;
  /** 詳細説明 */
  description: string;
  /** 募集状況 */
  status: PostStatus;
  /** 投稿日時 (ISO 8601)。更新順ソートに使用 */
  createdAt: string;
  /** 連絡先 (任意) */
  contact?: string;
  /** チーム紹介ページのURL (任意) */
  teamUrl?: string;
}
