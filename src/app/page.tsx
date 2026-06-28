import { PostBrowser } from "@/components/posts/post-browser";
import { FloatingPostButton } from "@/components/layout/floating-post-button";
import { MOCK_POSTS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-5 pb-24">
      <div className="mb-4">
        <h1 className="text-lg font-bold">募集を探す</h1>
        <p className="text-sm text-muted-foreground">
          練習試合・助っ人・グラウンド譲渡の募集を探せます。
        </p>
      </div>

      <PostBrowser posts={MOCK_POSTS} />

      <FloatingPostButton />
    </div>
  );
}
