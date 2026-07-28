"use client";

import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { PhoneMockup } from "@/components/sections/hero/PhoneMockup";
import { HeroSocialProof } from "@/components/sections/hero/HeroSocialProof";
import { track } from "@/lib/analytics";

const microTrust = ["100% gratuit pour commencer", "Sans engagement", "Centré activités, pas rencontres"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-cloud-50 via-flame-50/40 to-cloud-100 pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pt-28"
    >
      {/* Subtle textured backdrop: dot grid fading toward the bottom of the hero */}
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      {/* Ambient drifting color blobs — same brand palette, just alive */}
      <div
        aria-hidden="true"
        className="animate-drift-a pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-flame-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-drift-b pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-mint-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-drift-a pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sun-300/25 blur-3xl [animation-delay:-8s]"
      />

      <div className="section-container relative grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <span className="eyebrow">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Bientôt à Nice · Alpes-Maritimes
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.75rem]">
            Ne fais plus jamais
            <br />
            une activité <span className="text-flame-500">seul.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            Trouve quelqu&rsquo;un de dispo en quelques minutes pour jouer,
            courir, sortir ou explorer — près de chez toi, maintenant. Sport,
            sorties, voyages et rencontres amicales.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#waitlist"
              onClick={() => track("cta_primary_click", { location: "hero" })}
              className="btn-primary group px-8 py-4 text-base"
            >
              Rejoindre la liste d&rsquo;attente
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#comment-ca-marche"
              onClick={() => track("cta_secondary_click", { location: "hero" })}
              className="btn-secondary px-8 py-4 text-base"
            >
              Voir comment ça marche
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {microTrust.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-ink-500">
                <Check className="h-4 w-4 flex-shrink-0 text-mint-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <HeroSocialProof />
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}
