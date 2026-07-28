"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Fades and slides content in the first time it enters the viewport. */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(node);

    // Safety net: tools that render the full page without scrolling (crawlers,
    // full-page screenshots, print) never trigger the observer. Never let
    // content stay permanently invisible because of that.
    const fallback = window.setTimeout(reveal, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: visible ? `${delayMs}ms` : undefined }}
      className={cn(
        "opacity-0",
        visible && "animate-fade-in-up",
        className
      )}
    >
      {children}
    </div>
  );
}
