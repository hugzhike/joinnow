import { popularActivityTypes } from "@/data/activities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function PopularActivities() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-container flex flex-col gap-12">
        <SectionHeading
          eyebrow="Activités populaires"
          title="Ce que les gens veulent déjà faire ensemble"
          subtitle="Une sélection non exhaustive des activités les plus demandées par nos premiers utilisateurs à Nice."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popularActivityTypes.map((activity, index) => (
            <Reveal key={activity.id} delayMs={index * 40}>
              <div className="card flex flex-col items-center gap-3 p-6 text-center transition-transform duration-200 hover:-translate-y-1">
                <span className="text-3xl" role="img" aria-label={activity.label}>
                  {activity.emoji}
                </span>
                <span className="text-sm font-bold text-ink-900">{activity.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
