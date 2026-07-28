"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { demoActivities } from "@/data/activities";
import type { ActivityCategory, ActivityTimeframe } from "@/types/activity";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { RadarMap } from "@/components/sections/radar/RadarMap";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CategoryFilter = ActivityCategory | "tout";
type TimeframeFilter = ActivityTimeframe | "tout";

const categoryChips: { value: CategoryFilter; label: string }[] = [
  { value: "tout", label: "Tout" },
  { value: "sport", label: "Sport" },
  { value: "sorties", label: "Sorties" },
  { value: "voyage", label: "Voyage" },
  { value: "loisirs", label: "Loisirs" },
];

const timeframeChips: { value: TimeframeFilter; label: string }[] = [
  { value: "tout", label: "Tout" },
  { value: "aujourdhui", label: "Aujourd'hui" },
  { value: "dans-lheure", label: "Dans l'heure" },
  { value: "ce-weekend", label: "Ce week-end" },
];

export function ActivityRadar() {
  const [category, setCategory] = useState<CategoryFilter>("tout");
  const [timeframe, setTimeframe] = useState<TimeframeFilter>("tout");
  const [spotlightId, setSpotlightId] = useState("padel-18h");

  const filtered = useMemo(() => {
    return demoActivities.filter((activity) => {
      const matchesCategory = category === "tout" || activity.category === category;
      const matchesTimeframe =
        timeframe === "tout" || activity.timeframes.includes(timeframe);
      return matchesCategory && matchesTimeframe;
    });
  }, [category, timeframe]);

  const spotlightActivity =
    demoActivities.find((a) => a.id === spotlightId) ?? demoActivities[0];

  return (
    <section id="activites" className="bg-cloud-100 py-20 sm:py-28">
      <div className="section-container flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Démo interactive
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
            Découvre ce qui se passe autour de toi
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
            Ceci est une démonstration avec des activités fictives — aucun
            compte n&rsquo;est nécessaire pour l&rsquo;essayer. Clique sur un
            point du radar ou filtre par type d&rsquo;activité, comme dans la
            vraie application.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <RadarMap selectedId={spotlightId} onSelect={setSpotlightId} />
          <ActivityCard key={spotlightActivity.id} activity={spotlightActivity} />
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-900/5 pt-10">
          <p className="text-center text-sm font-bold uppercase tracking-wide text-ink-400">
            Toutes les activités du moment
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categoryChips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => {
                  setCategory(chip.value);
                  track("demo_interaction", { filter: "category", value: chip.value });
                }}
                aria-pressed={category === chip.value}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  category === chip.value
                    ? "bg-flame-500 text-white shadow-[var(--shadow-soft)]"
                    : "bg-white text-ink-500 ring-1 ring-inset ring-ink-100 hover:bg-cloud-50"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {timeframeChips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => {
                  setTimeframe(chip.value);
                  track("demo_interaction", { filter: "timeframe", value: chip.value });
                }}
                aria-pressed={timeframe === chip.value}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  timeframe === chip.value
                    ? "bg-ink-900 text-white shadow-[var(--shadow-soft)]"
                    : "bg-white text-ink-500 ring-1 ring-inset ring-ink-100 hover:bg-cloud-50"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="card mx-auto flex max-w-md flex-col items-center gap-2 p-10 text-center">
            <p className="text-lg font-bold text-ink-900">Aucune activité pour ces filtres</p>
            <p className="text-sm text-ink-500">
              Dans l&rsquo;app, tu pourrais publier la tienne en quelques
              secondes. Essaie une autre combinaison de filtres pour voir
              plus d&rsquo;exemples.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
