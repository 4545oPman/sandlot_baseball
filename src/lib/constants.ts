import type { Category, Level, PostStatus } from "./types";

// お問い合わせ・改善要望フォーム（Google フォーム）のURL。
// TODO: 実際の Google フォームの公開URLに差し替えてください。
export const CONTACT_FORM_URL = "https://forms.gle/your-form-id";

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

// レベルラベル（0.5刻みのレンジ。"2.0" は 2.0以上）
export const LEVEL_LABELS: Record<Level, string> = {
  any: "レベル不問",
  "1.0": "1.0〜1.5",
  "1.5": "1.5〜2.0",
  "2.0": "2.0以上",
};

export const LEVEL_ORDER: Level[] = ["any", "1.0", "1.5", "2.0"];

// 時間帯フィルター用の時刻候補（1時間刻み）
export const TIME_OPTIONS: string[] = (() => {
  const out: string[] = [];
  for (let h = 6; h <= 22; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
  }
  return out;
})();

// 募集状況ラベル
export const STATUS_LABELS: Record<PostStatus, string> = {
  open: "募集中",
  closing_soon: "締切間近",
  closed: "募集終了",
};

export const STATUS_ORDER: PostStatus[] = ["open", "closing_soon", "closed"];

// 投稿・絞り込みで選べる募集状況（「募集終了」は表示しないため除外）
export const ACTIVE_STATUS_ORDER: PostStatus[] = ["open", "closing_soon"];

// 地方区分（日本七地域区分）。都道府県選択をまとめやすくするためのグルーピング
export interface Region {
  name: string;
  prefectures: string[];
}

export const REGIONS: Region[] = [
  { name: "北海道", prefectures: ["北海道"] },
  {
    name: "東北",
    prefectures: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  },
  {
    name: "関東",
    prefectures: [
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
    ],
  },
  {
    name: "中部",
    prefectures: [
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
    ],
  },
  {
    name: "近畿",
    prefectures: [
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
    ],
  },
  {
    name: "中国・四国",
    prefectures: [
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
    ],
  },
  {
    name: "九州",
    prefectures: [
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ],
  },
];

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
