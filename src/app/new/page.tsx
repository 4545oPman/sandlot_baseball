import type { Metadata } from "next";

import { PostForm } from "@/components/posts/post-form";

export const metadata: Metadata = {
  title: "募集を新規投稿 | 草野球マッチ",
  description: "練習試合・助っ人・グラウンド譲渡の募集を投稿します。",
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-5">
      <PostForm />
    </div>
  );
}
