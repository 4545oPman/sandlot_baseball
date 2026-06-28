import Link from "next/link";
import { Plus } from "lucide-react";

// 一覧ページに固定表示する新規投稿ボタン
export function FloatingPostButton() {
  return (
    <Link
      href="/new"
      aria-label="募集を新規投稿"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
    >
      <Plus className="size-5" />
      <span className="font-semibold">募集を投稿</span>
    </Link>
  );
}
