"use client";

import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/**
 * Shows real, live signup counts pulled from our own waitlist — never a
 * fabricated number. Falls back to an honest, count-free message while
 * loading or if the count is still zero.
 */
export function HeroSocialProof() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/waitlist")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (!cancelled && data && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        /* silently ignore — social proof is a nice-to-have, not critical */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-inset ring-ink-900/5">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-500" />
      </span>
      <p className="text-sm font-semibold text-ink-700">
        {count && count > 0 ? (
          <>
            <AnimatedCounter value={count} className="text-flame-600" />{" "}
            personne{count > 1 ? "s" : ""} déjà inscrite{count > 1 ? "s" : ""} à Nice
          </>
        ) : (
          "Rejoins les premiers utilisateurs à Nice"
        )}
      </p>
    </div>
  );
}
