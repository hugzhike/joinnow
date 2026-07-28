"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * App-like sticky bottom action bar, mobile only. Appears once the hero's
 * own CTA has scrolled out of view, and hides again once the real waitlist
 * form is on screen so there's never a redundant button covering it.
 */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [waitlistVisible, setWaitlistVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const waitlist = document.getElementById("waitlist");
    if (!hero || !waitlist) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-70% 0px 0px 0px" }
    );
    const waitlistObserver = new IntersectionObserver(
      ([entry]) => setWaitlistVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    heroObserver.observe(hero);
    waitlistObserver.observe(waitlist);

    return () => {
      heroObserver.disconnect();
      waitlistObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !waitlistVisible;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/5 bg-cloud-50/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-15px_rgba(11,14,31,0.25)] backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <Link
        href="#waitlist"
        tabIndex={visible ? 0 : -1}
        onClick={() => track("cta_primary_click", { location: "mobile_sticky_bar" })}
        className="btn-primary group w-full py-3.5 text-sm"
      >
        Rejoindre la liste d&rsquo;attente
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
