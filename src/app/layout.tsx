import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "草野球マッチ | 練習試合・助っ人・グラウンドの募集掲示板",
  description:
    "草野球の練習試合相手・助っ人・グラウンド譲渡の募集を投稿・検索できるサービスです。スマホからかんたんに探せます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        {/* 日本語フォント (Noto Sans JP)。中国語フォントへのフォールバックを防ぐ */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6">
          <div className="mx-auto max-w-3xl px-4 text-center text-xs text-muted-foreground">
            草野球マッチ — デモ版（モックデータ）
          </div>
        </footer>
      </body>
    </html>
  );
}
