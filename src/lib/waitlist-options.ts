import type { AgeRange, ProblemFrequency } from "@/types/waitlist";

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
