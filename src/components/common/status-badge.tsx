import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { PostStatus } from "@/lib/types";

const STATUS_STYLES: Record<PostStatus, string> = {
  open: "bg-primary/10 text-primary border-primary/20",
  closing_soon: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  status,
  className,
}: {
  status: PostStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
        className
      )}
    >
      {status !== "closed" && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            status === "open" ? "bg-primary" : "bg-amber-500"
          )}
          aria-hidden
        />
      )}
      {STATUS_LABELS[status]}
    </span>
  );
}
