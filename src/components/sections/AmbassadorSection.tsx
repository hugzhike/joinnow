"use client";

import Link from "next/link";
import { CalendarPlus, Megaphone, Sparkle, Lightbulb } from "lucide-react";
import { track } from "@/lib/analytics";

const perks = [
  {
    icon: CalendarPlus,
    text: "Organiser les toutes premières activités de ta ville",
  },
  {
    icon: Megaphone,
    text: "Inviter ta communauté et faire grandir le réseau local",
  },
  {
    icon: Sparkle,
    text: "Tester l'application en avant-première, avant tout le monde",
  },
  {
    icon: Lightbulb,
    text: "Influencer les prochaines fonctionnalités du produit",
  },
];

export function AmbassadorSection() {
  const handleClick = () => {
    track("ambassador_cta_click", { location: "ambassador_section" });
    window.dispatchEvent(new CustomEvent("joinnow:preselect-ambassador"));
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-flame-500 via-flame-600 to-ink-900"
      />
      <div className="section-container relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-5 text-white">
          <span className="eyebrow w-fit bg-white/15 text-white">Programme ambassadeurs</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Lance JoinNow dans ta ville
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/85">
            Nice n&rsquo;est que le début. Si tu veux que JoinNow arrive plus
            vite près de chez toi — ou que tu veuilles simplement façonner le
            produit dès le premier jour — le programme ambassadeurs est fait
            pour toi.
          </p>
          <div>
            <Link
              href="#waitlist"
              onClick={handleClick}
              className="btn-ghost-light w-fit px-8 py-4 text-base"
            >
              Devenir ambassadeur
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {perks.map((perk) => (
            <div
              key={perk.text}
              className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-white/10 p-5 text-white ring-1 ring-inset ring-white/15 backdrop-blur"
            >
              <perk.icon className="h-6 w-6 text-white" aria-hidden="true" />
              <p className="text-sm font-medium leading-relaxed">{perk.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
