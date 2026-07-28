import { z } from "zod";

/**
 * Shared validation schema for the waitlist form — used both client-side
 * (react-hook-form) and server-side (the /api/waitlist route) so the two
 * never drift apart.
 */
export const waitlistSchema = z.object({
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
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
