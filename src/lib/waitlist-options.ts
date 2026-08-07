import type { AgeRange, ProblemFrequency } from "@/types/waitlist";
import type { PopularActivityType } from "@/types/activity";
import { popularActivityTypes } from "@/data/activities";

export const ageRangeOptions: { value: AgeRange; label: string }[] = [
  { value: "18-24", label: "18-24 ans" },
  { value: "25-29", label: "25-29 ans" },
  { value: "30-35", label: "30-35 ans" },
  { value: "36+", label: "36 ans et plus" },
];

export const frequencyOptions: { value: ProblemFrequency; label: string }[] = [
  { value: "quotidiennement", label: "Presque tous les jours" },
  { value: "plusieurs-fois-semaine", label: "Plusieurs fois par semaine" },
  { value: "quelques-fois-mois", label: "Quelques fois par mois" },
  { value: "rarement", label: "Rarement" },
];

/** Pseudo-activity id used for the free-text "Autre" pill in the waitlist form. */
export const OTHER_ACTIVITY_ID = "autre";

/**
 * Activity pills shown in the waitlist form's "Quelles activités
 * t'intéressent ?" question. Starts from the shared `popularActivityTypes`
 * (also used by the marketing "Activités populaires" section) and appends
 * form-only options plus a free-text "Autre" pill — kept as its own list so
 * the marketing section isn't affected by form-specific additions.
 */
export const waitlistActivityOptions: PopularActivityType[] = [
  ...popularActivityTypes,
  { id: "cinema", label: "Cinéma", emoji: "🎬", category: "sorties" },
  { id: "musee-expo", label: "Musée / expo", emoji: "🏛️", category: "sorties" },
  { id: "bowling", label: "Bowling", emoji: "🎳", category: "loisirs" },
  { id: "karting", label: "Karting", emoji: "🏎️", category: "sport" },
  { id: "escalade", label: "Escalade", emoji: "🧗", category: "sport" },
  { id: "piscine-natation", label: "Piscine / natation", emoji: "🏊", category: "sport" },
  { id: "velo", label: "Vélo", emoji: "🚴", category: "sport" },
  { id: "concert", label: "Concert", emoji: "🎤", category: "sorties" },
  { id: "restaurant", label: "Restaurant", emoji: "🍽️", category: "sorties" },
  { id: "yoga", label: "Yoga", emoji: "🧘", category: "sport" },
  { id: "ski-snowboard", label: "Ski / snowboard", emoji: "⛰️", category: "sport" },
  { id: "gaming", label: "Gaming", emoji: "🎮", category: "loisirs" },
  { id: OTHER_ACTIVITY_ID, label: "Autre", emoji: "➕", category: "loisirs" },
];
