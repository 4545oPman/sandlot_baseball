import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_FORM_URL } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
            aria-hidden
          >
            野
          </span>
          <span className="text-base font-bold tracking-tight">
            草野球マッチ
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          {/* お問い合わせ・改善要望（Googleフォーム） */}
          <Button asChild variant="ghost" size="sm">
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="size-4" />
              お問い合わせ
            </a>
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/new">
              <Plus className="size-4" />
              募集を投稿
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
