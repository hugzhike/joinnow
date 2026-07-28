import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generated avatar placeholder — a deterministic gradient + initials.
 * Deliberately not a real photo: illustrative only, same idea as the
 * default avatars in Linear/Slack/Vercel. Colors are drawn from the
 * existing brand palette so nothing outside the approved theme is used.
 */
const gradients = [
  "from-flame-400 to-flame-600",
  "from-mint-400 to-mint-600",
  "from-ink-500 to-ink-700",
  "from-sun-400 to-flame-500",
  "from-mint-300 to-mint-600",
  "from-flame-300 to-flame-600",
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function initialsFrom(seed: string): string {
  const parts = seed.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const sizeClass = {
  xs: "h-5 w-5 text-[9px]",
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

const badgeClass = {
  xs: "h-2.5 w-2.5",
  sm: "h-3.5 w-3.5",
  md: "h-[1.125rem] w-[1.125rem]",
  lg: "h-5 w-5",
} as const;

interface AvatarProps {
  seed: string;
  size?: keyof typeof sizeClass;
  verified?: boolean;
  online?: boolean;
  className?: string;
}

export function Avatar({ seed, size = "md", verified, online, className }: AvatarProps) {
  const gradient = gradients[hashSeed(seed) % gradients.length];

  return (
    <span className={cn("relative inline-flex flex-shrink-0", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ring-2 ring-white",
          gradient,
          sizeClass[size]
        )}
      >
        {initialsFrom(seed)}
      </span>
      {online ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -right-0.5 -top-0.5 rounded-full bg-mint-400 ring-2 ring-white",
            badgeClass[size]
          )}
        />
      ) : null}
      {verified ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-white text-mint-500 ring-2 ring-white",
            badgeClass[size]
          )}
        >
          <BadgeCheck className="h-full w-full" fill="currentColor" stroke="white" strokeWidth={1.5} />
        </span>
      ) : null}
    </span>
  );
}
