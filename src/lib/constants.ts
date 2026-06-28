import type { Category, Level, PostStatus } from "./types";

// 募集種別ラベル
export const CATEGORY_LABELS: Record<Category, string> = {
  match: "練習試合",
  helper: "助っ人募集",
  ground: "グラウンド譲渡",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  match: "対戦相手となるチームを募集します",
  helper: "試合に参加してくれる助っ人を募集します",
  ground: "予約済みグラウンドの枠を譲ります",
};

// タブ表示順
export const CATEGORY_ORDER: Category[] = ["match", "helper", "ground"];

// レベルラベル
export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "初心者歓迎",
  casual: "エンジョイ",
  intermediate: "中級",
  advanced: "上級・経験者",
  any: "レベル不問",
};

export const LEVEL_ORDER: Level[] = [
  "any",
  "beginner",
  "casual",
  "intermediate",
  "advanced",
];

// 募集状況ラベル
export const STATUS_LABELS: Record<PostStatus, string> = {
  open: "募集中",
  closing_soon: "締切間近",
  closed: "募集終了",
};

export const STATUS_ORDER: PostStatus[] = ["open", "closing_soon", "closed"];

// 都道府県一覧
export const PREFECTURES: string[] = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];
