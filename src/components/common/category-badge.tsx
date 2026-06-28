import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Category } from "@/lib/types";

const CATEGORY_STYLES: Record<Category, string> = {
  match: "bg-primary text-primary-foreground",
  helper: "bg-sky-600 text-white",
  ground: "bg-orange-500 text-white",
};

export function CategoryBadge({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        CATEGORY_STYLES[category],
        className
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
