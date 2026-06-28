import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PostDetail } from "@/components/posts/post-detail";
import { MOCK_POSTS, getPostById } from "@/lib/mock-data";
import { isPastEvent } from "@/lib/format";

export function generateStaticParams() {
  // 募集終了・開催日が過ぎたものは事前生成しない
  return MOCK_POSTS.filter(
    (post) => post.status !== "closed" && !isPastEvent(post.eventDate)
  ).map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return { title: "募集が見つかりません | 草野球マッチ" };
  return {
    title: `${post.title} | 草野球マッチ`,
    description: post.description.slice(0, 120),
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostById(id);

  // 募集終了・開催日が過ぎた募集は表示しない
  if (!post || post.status === "closed" || isPastEvent(post.eventDate)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5">
      <PostDetail post={post} />
    </div>
  );
}
