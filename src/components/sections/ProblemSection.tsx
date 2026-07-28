import { Users, Puzzle, MapPinned, Plane, Clock3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const situations = [
  {
    icon: Users,
    title: "Tes amis ne sont pas disponibles",
    description:
      "Tu as envie de faire quelque chose, mais personne dans ton entourage n'est libre ce soir ou ce week-end.",
  },
  {
    icon: Puzzle,
    title: "Il manque une personne pour compléter une équipe",
    description:
      "Un 4e pour le padel, un joueur de plus pour le foot à 5 : le terrain est réservé, il manque juste du monde.",
  },
  {
    icon: MapPinned,
    title: "Tu viens d'arriver dans une nouvelle ville",
    description:
      "Nouveau logement, nouveau travail, aucun réseau sur place. Se faire des amis prend du temps à reconstruire.",
  },
  {
    icon: Plane,
    title: "Tu voyages seul",
    description:
      "Tu es de passage quelque part et tu aimerais partager un verre, une balade ou une activité avec quelqu'un sur place.",
  },
  {
    icon: Clock3,
    title: "Tu veux sortir sans tout organiser à l'avance",
    description:
      "Pas envie de monter un événement trois jours en avance pour un simple café ou un footing improvisé.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-cloud-100 py-20 sm:py-28">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Le problème"
          title="Trouver quelqu'un de dispo, maintenant, est plus dur que ça ne devrait l'être"
          subtitle="Ces situations reviennent tout le temps — et il n'existe pas vraiment de bon outil pour les résoudre dans l'instant."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation, index) => (
            <Reveal key={situation.title} delayMs={index * 80}>
              <div className="card flex h-full flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flame-50 text-flame-600">
                  <situation.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900">{situation.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {situation.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delayMs={situations.length * 80} className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-center gap-3 rounded-[var(--radius-card)] bg-ink-900 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-flame-400">
                Le constat
              </p>
              <p className="text-xl font-bold leading-snug">
                Les réseaux sociaux montrent ce que les gens ont fait.
              </p>
              <p className="text-xl font-bold leading-snug text-flame-400">
                JoinNow montre ce qu&rsquo;ils veulent faire maintenant.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
