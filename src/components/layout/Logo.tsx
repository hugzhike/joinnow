import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-extrabold tracking-tight", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-flame-400 to-flame-600 text-white shadow-[var(--shadow-soft)]">
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-mint-400 ring-2 ring-white animate-pulse-ring" />
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M12 2v6M12 16v6M2 12h6M16 12h6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-xl leading-none">
        Join<span className="text-flame-500">Now</span>
      </span>
    </span>
  );
}
