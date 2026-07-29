"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Smartphone } from "lucide-react";
import { waitlistSchema, type WaitlistFormValues } from "@/lib/validation";
import { popularActivityTypes } from "@/data/activities";
import { ageRangeOptions, frequencyOptions } from "@/lib/waitlist-options";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "./ConfirmationModal";
import type { WaitlistSubmitResult } from "@/types/waitlist";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-flame-700">
      <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      email: "",
      city: "",
      ageRange: undefined,
      activities: [],
      frequency: undefined,
      platform: undefined,
      wantsAmbassador: false,
      referredBy: undefined,
    },
  });

  const [result, setResult] = useState<WaitlistSubmitResult | null>(null);
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const activities = watch("activities");
  const ageRange = watch("ageRange");
  const frequency = watch("frequency");
  const platform = watch("platform");
  const wantsAmbassador = watch("wantsAmbassador");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setValue("referredBy", ref);
  }, [setValue]);

  useEffect(() => {
    const handler = () => setValue("wantsAmbassador", true);
    window.addEventListener("joinnow:preselect-ambassador", handler);
    return () => window.removeEventListener("joinnow:preselect-ambassador", handler);
  }, [setValue]);

  const markStarted = () => {
    if (!hasStarted) {
      setHasStarted(true);
      track("waitlist_form_start");
    }
  };

  const toggleActivity = (id: string) => {
    const isSelected = activities.includes(id);
    const next = isSelected ? activities.filter((a) => a !== id) : [...activities, id];
    setValue("activities", next, { shouldValidate: true });
    track("activity_selected", { activity: id, selected: !isSelected });
  };

  const onSubmit = async (values: WaitlistFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setSubmitError(
          data?.error ?? "Une erreur est survenue, réessaie dans quelques instants."
        );
        return;
      }

      const data = (await res.json()) as WaitlistSubmitResult;
      track("waitlist_form_submit", {
        city: values.city,
        ambassador: values.wantsAmbassador,
        activitiesCount: values.activities.length,
      });
      setSubmittedFirstName(values.firstName);
      setResult(data);
      reset();
    } catch {
      setSubmitError("Impossible de contacter le serveur. Vérifie ta connexion et réessaie.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-ink-700">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              onFocus={markStarted}
              className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-ink-900 outline-none transition-colors focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
              placeholder="Camille"
              {...register("firstName")}
            />
            {errors.firstName ? (
              <span id="firstName-error">
                <FieldError message={errors.firstName.message} />
              </span>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-700">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-ink-900 outline-none transition-colors focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
              placeholder="camille@email.com"
              {...register("email")}
            />
            {errors.email ? (
              <span id="email-error">
                <FieldError message={errors.email.message} />
              </span>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-ink-700">
            Ville
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-ink-900 outline-none transition-colors focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
            placeholder="Nice, Antibes, Cagnes-sur-Mer..."
            {...register("city")}
          />
          {errors.city ? (
            <span id="city-error">
              <FieldError message={errors.city.message} />
            </span>
          ) : null}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-700">
            Tranche d&rsquo;âge <span className="font-normal text-ink-400">(facultatif)</span>
          </legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tranche d'âge">
            {ageRangeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={ageRange === option.value}
                onClick={() =>
                  setValue("ageRange", ageRange === option.value ? undefined : option.value)
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  ageRange === option.value
                    ? "bg-ink-900 text-white"
                    : "bg-cloud-100 text-ink-500 hover:bg-cloud-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-700">
            Quelles activités t&rsquo;intéressent ?
          </legend>
          <div className="flex flex-wrap gap-2">
            {popularActivityTypes.map((activity) => {
              const selected = activities.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleActivity(activity.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    selected
                      ? "bg-flame-500 text-white"
                      : "bg-cloud-100 text-ink-500 hover:bg-cloud-200"
                  )}
                >
                  <span aria-hidden="true">{activity.emoji}</span>
                  {activity.label}
                </button>
              );
            })}
          </div>
          {errors.activities ? (
            <FieldError message={errors.activities.message} />
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-700">
            À quelle fréquence rencontres-tu ce problème ?
          </legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Fréquence">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={frequency === option.value}
                onClick={() => setValue("frequency", option.value, { shouldValidate: true })}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  frequency === option.value
                    ? "bg-ink-900 text-white"
                    : "bg-cloud-100 text-ink-500 hover:bg-cloud-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.frequency ? <FieldError message={errors.frequency.message} /> : null}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-700">
            Sur quel téléphone es-tu ?
          </legend>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Plateforme mobile">
            {(
              [
                { value: "iphone" as const, label: "iPhone", icon: Smartphone },
                { value: "android" as const, label: "Android", icon: Smartphone },
              ]
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={platform === option.value}
                onClick={() => setValue("platform", option.value, { shouldValidate: true })}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                  platform === option.value
                    ? "border-flame-500 bg-flame-50 text-flame-700"
                    : "border-ink-100 bg-white text-ink-500 hover:bg-cloud-50"
                )}
              >
                <option.icon className="h-4 w-4" aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
          {errors.platform ? <FieldError message={errors.platform.message} /> : null}
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-mint-50 p-4">
          <input
            type="checkbox"
            checked={wantsAmbassador}
            onChange={(event) => setValue("wantsAmbassador", event.target.checked)}
            className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-ink-200 text-mint-600 focus:ring-mint-400"
          />
          <span className="text-sm font-medium text-ink-700">
            Je souhaite devenir ambassadeur·rice dans ma ville pour aider à
            lancer JoinNow plus vite.
          </span>
        </label>

        {submitError ? (
          <p role="alert" className="rounded-xl bg-flame-50 p-3 text-sm font-medium text-flame-700">
            {submitError}
          </p>
        ) : null}

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-base">
          {isSubmitting ? "Envoi en cours..." : "Rejoindre la liste d'attente"}
        </button>

        <p className="text-center text-sm text-ink-400">
          En m&rsquo;inscrivant, j&rsquo;accepte la{" "}
          <a href="/confidentialite" className="underline hover:text-ink-600">
            politique de confidentialité
          </a>
          .
        </p>
      </form>

      {result ? (
        <ConfirmationModal
          firstName={submittedFirstName}
          result={result}
          onClose={() => setResult(null)}
        />
      ) : null}
    </>
  );
}
