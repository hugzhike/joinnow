import { z } from "zod";
import { OTHER_ACTIVITY_ID } from "./waitlist-options";

/**
 * Shared validation schema for the waitlist form — used both client-side
 * (react-hook-form) and server-side (the /api/waitlist route) so the two
 * never drift apart.
 */
export const waitlistSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "Ton prénom doit contenir au moins 2 caractères.")
      .max(60, "Ton prénom est trop long."),
    email: z
      .string()
      .trim()
      .min(1, "L'adresse email est obligatoire.")
      .email("Cette adresse email ne semble pas valide."),
    city: z
      .string()
      .trim()
      .min(2, "Indique ta ville (ex : Nice, Antibes, Cagnes-sur-Mer...).")
      .max(80, "Le nom de la ville est trop long."),
    ageRange: z.enum(["18-24", "25-29", "30-35", "36+"]).optional(),
    activities: z
      .array(z.string())
      .min(1, "Choisis au moins une activité qui t'intéresse."),
    // Free-text precision shown when the "Autre" pill is selected. Only
    // required (2-60 chars) in that case — see the superRefine below.
    otherActivity: z
      .string()
      .trim()
      .max(60, "La précision est trop longue (60 caractères max).")
      .optional(),
    frequency: z.enum(
      [
        "quotidiennement",
        "plusieurs-fois-semaine",
        "quelques-fois-mois",
        "rarement",
      ],
      { error: "Indique à quelle fréquence tu rencontres ce problème." }
    ),
    platform: z.enum(["iphone", "android"], {
      error: "Précise si tu es sur iPhone ou Android.",
    }),
    wantsAmbassador: z.boolean(),
    referredBy: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.activities.includes(OTHER_ACTIVITY_ID)) return;
    const trimmed = data.otherActivity?.trim() ?? "";
    if (trimmed.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["otherActivity"],
        message: "Précise quelle activité t'intéresse (2 caractères minimum).",
      });
    }
  });

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;

/**
 * Resolves the "Autre" pseudo-activity into the free-text value the user
 * typed, so anything downstream (storage, etc.) only ever sees real
 * activity labels — never the "autre" placeholder id.
 */
export function resolveActivities({
  activities,
  otherActivity,
}: Pick<WaitlistFormValues, "activities" | "otherActivity">): string[] {
  if (!activities.includes(OTHER_ACTIVITY_ID)) return activities;
  const trimmed = otherActivity?.trim();
  if (!trimmed) return activities.filter((activity) => activity !== OTHER_ACTIVITY_ID);
  return activities.map((activity) => (activity === OTHER_ACTIVITY_ID ? trimmed : activity));
}
