"use client";

import { demoActivities } from "@/data/activities";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const pinIds = [
  "padel-18h",
  "running-5km",
  "randonnee-mercantour",
  "verre-voyageurs",
  "surf-golfe-juan",
  "beach-volley",
] as const;

const pins = pinIds
  .map((id, index) => {
    const activity = demoActivities.find((a) => a.id === id);
    if (!activity) return null;
    const angle = (index / pinIds.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 39;
    return {
      activity,
      top: 50 + radius * Math.sin(angle),
      left: 50 + radius * Math.cos(angle),
    };
  })
  .filter((p): p is NonNullable<typeof p> => p !== null);

interface RadarMapProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function RadarMap({ selectedId, onSelect }: RadarMapProps) {
  return (
    <div
      role="group"
      aria-label="Carte interactive des activités à proximité (démonstration) — chaque point est une activité que tu peux sélectionner"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      {/* Concentric radar rings */}
      {[100, 74, 48].map((size) => (
        <div
          key={size}
          aria-hidden="true"
          className="absolute rounded-full border border-flame-300/40"
          style={{
            width: `${size}%`,
            height: `${size}%`,
            top: `${(100 - size) / 2}%`,
            left: `${(100 - size) / 2}%`,
          }}
        />
      ))}

      {/* Rotating sweep */}
      <div
        aria-hidden="true"
        className="animate-radar-sweep absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,90,54,0.35), transparent 28%, transparent 100%)",
        }}
      />

      {/* Center: you */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="animate-pulse-ring relative flex h-4 w-4 items-center justify-center rounded-full bg-flame-500 ring-4 ring-white">
          <span className="absolute -bottom-6 whitespace-nowrap rounded-full bg-ink-900 px-2 py-0.5 text-[10px] font-bold text-white">
            Toi
          </span>
        </span>
      </div>

      {pins.map(({ activity, top, left }) => {
        const isSelected = activity.id === selectedId;
        return (
          <button
            key={activity.id}
            type="button"
            onClick={() => {
              onSelect(activity.id);
              track("demo_interaction", { action: "radar_pin_click", activity: activity.id });
            }}
            aria-pressed={isSelected}
            aria-label={`${activity.title} — ${activity.zone}`}
            style={{ top: `${top}%`, left: `${left}%` }}
            className={cn(
              "absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400 focus-visible:ring-offset-2",
              isSelected
                ? "scale-110 bg-flame-500 ring-4 ring-flame-200"
                : "bg-white ring-2 ring-white"
            )}
          >
            <span aria-hidden="true">{activity.emoji}</span>
          </button>
        );
      })}
    </div>
  );
}
