import { cn } from "@/lib/utils";

type BadgeTone = "flame" | "mint" | "ink" | "sun";

const toneClass: Record<BadgeTone, string> = {
  flame: "bg-flame-50 text-flame-600",
  mint: "bg-mint-50 text-mint-600",
  ink: "bg-ink-50 text-ink-500",
  sun: "bg-sun-300/30 text-flame-700",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "ink", className }: BadgeProps) {
  return <span className={cn("badge", toneClass[tone], className)}>{children}</span>;
}
