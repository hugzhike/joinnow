"use client";

import { MapPin, Users } from "lucide-react";
import type { Activity } from "@/types/activity";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { useState } from "react";

interface ActivityCardProps {
  activity: Activity;
  variant?: "full" | "mini";
}

export function ActivityCard({ activity, variant = "full" }: ActivityCardProps) {
  const [joined, setJoined] = useState(false);
  const isFull = activity.spotsLeft === 0;

  if (variant === "mini") {
    return (
      <div className="card group flex items-center gap-3 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]">
        <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-flame-50 text-xl">
          {activity.emoji}
          <Avatar
            seed={activity.organizer.name}
            size="xs"
            verified={activity.organizer.verified}
            className="absolute -bottom-1.5 -right-1.5"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink-900">{activity.title}</p>
          <p className="truncate text-xs text-ink-400">
            {activity.countdownLabel ?? activity.timeLabel} · {activity.zone}
          </p>
        </div>
        <span className="badge flex-shrink-0 bg-mint-50 text-mint-600">
          {activity.spotsLeft === 1
            ? "1 place"
            : `${activity.spotsLeft} places`}
        </span>
      </div>
    );
  }

  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-flame-50 text-2xl">
            {activity.emoji}
          </div>
          <div>
            <p className="font-bold text-ink-900">{activity.title}</p>
            <p className="text-sm text-ink-400">
              {activity.countdownLabel ? (
                <span className="font-semibold text-flame-600">
                  {activity.countdownLabel}
                </span>
              ) : (
                activity.timeLabel
              )}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "badge flex-shrink-0",
            isFull ? "bg-ink-50 text-ink-400" : "bg-mint-50 text-mint-600"
          )}
        >
          {isFull ? "Complet" : `${activity.spotsLeft} place${activity.spotsLeft > 1 ? "s" : ""}`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-flame-500" aria-hidden="true" />
          {activity.zone} · {activity.distanceKm < 10
            ? `${activity.distanceKm.toFixed(1)} km`
            : `${Math.round(activity.distanceKm)} km`}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-flame-500" aria-hidden="true" />
          {activity.participants}/{activity.spotsTotal} participants
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-ink-900/5 pt-4">
        <div className="flex items-center gap-2.5">
          <Avatar seed={activity.organizer.name} size="sm" verified={activity.organizer.verified} />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink-900">{activity.organizer.name}</p>
            <p className="text-xs text-ink-400">
              {activity.organizer.activitiesHosted} activités organisées
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isFull}
          onClick={() => {
            setJoined(true);
            track("demo_interaction", { action: "join_click", activity: activity.id });
          }}
          className={cn(
            "btn px-5 py-2.5 text-sm",
            joined
              ? "bg-mint-50 text-mint-600"
              : "bg-flame-500 text-white hover:bg-flame-600"
          )}
        >
          {isFull ? "Complet" : joined ? "Demande envoyée" : "Rejoindre"}
        </button>
      </div>
    </div>
  );
}
