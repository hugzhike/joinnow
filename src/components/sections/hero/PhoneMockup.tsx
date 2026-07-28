"use client";

import { useEffect, useState } from "react";
import { MapPin, Radio } from "lucide-react";
import { heroMockupActivities } from "@/data/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { Avatar } from "@/components/ui/Avatar";

const notifications = [
  { emoji: "🎾", text: "Julien vient de rejoindre Padel à 18h" },
  { emoji: "🏃", text: "3 personnes rejoignent Running de 5 km" },
  { emoji: "✅", text: "Maya vient d'être vérifiée" },
  { emoji: "🍻", text: "Nouvelle activité : Verre entre voyageurs" },
];

/** Ticks a small "active now" counter up and down to feel alive — purely illustrative UI, not a real metric. */
function useLiveCount(base: number) {
  const [count, setCount] = useState(base);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + (Math.random() > 0.5 ? 1 : -1));
      setBump(true);
      setTimeout(() => setBump(false), 400);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return { count, bump };
}

export function PhoneMockup() {
  const [notifIndex, setNotifIndex] = useState(0);
  const { count, bump } = useLiveCount(128);

  useEffect(() => {
    const id = setInterval(() => {
      setNotifIndex((i) => (i + 1) % notifications.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const notif = notifications[notifIndex];

  return (
    <div
      role="img"
      aria-label="Aperçu de l'application JoinNow : activités disponibles près de Nice, avec profils vérifiés et places restantes"
      className="relative mx-auto w-full max-w-[320px] animate-float sm:max-w-[360px]"
    >
      {/* Ambient glow behind the phone */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-10 -z-10 h-72 rounded-full bg-flame-300/40 blur-3xl"
      />

      <div className="relative rounded-[2.75rem] border-[6px] border-ink-900 bg-ink-900 shadow-[0_40px_80px_-20px_rgba(11,14,31,0.55)]">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink-900" />
        <div className="relative overflow-hidden rounded-[2.25rem] bg-cloud-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-xs font-semibold text-ink-900">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-ink-900" />
              <span className="h-2 w-2 rounded-full bg-ink-900" />
              <span className="h-2 w-2 rounded-full bg-ink-900" />
            </span>
          </div>

          {/* Live notification toast */}
          <div className="px-4 pt-1.5">
            <div
              key={notifIndex}
              className="animate-toast-in flex items-center gap-2 rounded-2xl bg-ink-900 px-3.5 py-2.5 text-white shadow-lg"
            >
              <span className="text-base leading-none">{notif.emoji}</span>
              <p className="truncate text-xs font-semibold">{notif.text}</p>
            </div>
          </div>

          {/* App header */}
          <div className="flex items-start justify-between px-5 pb-4 pt-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Autour de toi
              </p>
              <p className="flex items-center gap-1.5 text-lg font-extrabold text-ink-900">
                <MapPin className="h-4 w-4 text-flame-500" aria-hidden="true" />
                Nice, France
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-mint-50 px-2.5 py-1.5 text-xs font-bold text-mint-600">
              <Radio className="h-3 w-3" aria-hidden="true" />
              <span className={bump ? "animate-count-pop inline-block" : "inline-block"}>
                {count}
              </span>{" "}
              actifs
            </span>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-4">
            {["Tout", "Sport", "Sorties", "Aujourd'hui"].map((chip, i) => (
              <span
                key={chip}
                className={
                  "flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold " +
                  (i === 0
                    ? "bg-flame-500 text-white"
                    : "bg-white text-ink-500 ring-1 ring-inset ring-ink-100")
                }
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Activity list */}
          <div className="flex flex-col gap-2.5 px-4 pb-4">
            {heroMockupActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} variant="mini" />
            ))}
          </div>

          {/* Recently joined strip */}
          <div className="flex items-center gap-2 border-t border-ink-900/5 px-5 py-3.5">
            <div className="flex -space-x-2">
              {["Julien", "Camille", "Maya"].map((name) => (
                <Avatar key={name} seed={name} size="sm" />
              ))}
            </div>
            <p className="text-xs font-medium text-ink-500">
              <span className="font-bold text-ink-900">+12</span> ont rejoint une
              activité aujourd&rsquo;hui
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
