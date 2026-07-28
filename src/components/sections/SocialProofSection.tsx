import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";

/**
 * These are illustrative scenarios, not real reviews — JoinNow has not
 * launched yet. Each card repeats the disclaimer so it can never be
 * screenshotted out of context and mistaken for a genuine testimonial.
 */
const scenarios = [
  {
    quote:
      "Enfin une application qui me permet de jouer au padel même quand mes amis travaillent.",
    name: "Léa",
    context: "Joueuse de padel, scénario illustratif",
  },
  {
    quote:
      "Je viens d'arriver à Nice et j'ai rencontré des gens dès le premier week-end.",
    name: "Marc",
    context: "Nouvel arrivant à Nice, scénario illustratif",
  },
  {
    quote:
      "Je voyageais seule et j'ai trouvé quelqu'un pour boire un verre le soir même, sans rien organiser.",
    name: "Ines",
    context: "Voyageuse de passage, scénario illustratif",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-container flex flex-col gap-12">
        <SectionHeading
          eyebrow="Exemples, pas encore de vrais avis"
          title="Le type d'expérience qu'on veut rendre possible"
          subtitle="JoinNow n'est pas encore lancé publiquement : ces scénarios illustrent les usages visés par le produit, inspirés des situations décrites plus haut — ce ne sont pas des témoignages d'utilisateurs existants."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s, index) => (
            <Reveal key={s.name} delayMs={index * 100}>
              <figure className="card flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-sun-500" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="badge bg-cloud-100 text-ink-400">Exemple</span>
                </div>

                <blockquote className="flex-1 text-base leading-relaxed text-ink-700">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-3 border-t border-ink-900/5 pt-4">
                  <Avatar seed={s.name} size="sm" />
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-ink-900">{s.name}</p>
                    <p className="text-xs text-ink-400">{s.context}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
