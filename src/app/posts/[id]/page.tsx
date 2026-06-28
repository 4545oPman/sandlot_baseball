import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PostDetail } from "@/components/posts/post-detail";
import { MOCK_POSTS, getPostById } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ id: post.id }));
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

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5">
      <PostDetail post={post} />
    </div>
  );
}
