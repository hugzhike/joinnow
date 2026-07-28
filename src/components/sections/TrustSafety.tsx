import { BadgeCheck, Star, Flag, MessageCircle, Landmark, EyeOff, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const commitments = [
  {
    icon: BadgeCheck,
    title: "Profils vérifiés",
    description:
      "Une vérification d'identité sera demandée avant de pouvoir organiser ou rejoindre des activités.",
  },
  {
    icon: Star,
    title: "Notation après chaque activité",
    description:
      "Chaque activité pourra donner lieu à un avis, pour construire une communauté fiable au fil du temps.",
  },
  {
    icon: Flag,
    title: "Signalement et blocage",
    description:
      "Des outils simples pour signaler un comportement inapproprié et bloquer une personne en un geste.",
  },
  {
    icon: MessageCircle,
    title: "Chat accessible après acceptation",
    description:
      "La messagerie ne s'ouvrira qu'une fois ta participation acceptée par l'organisateur, pour limiter les sollicitations non désirées.",
  },
  {
    icon: Landmark,
    title: "Lieux publics recommandés",
    description:
      "L'application encouragera systématiquement des lieux de rendez-vous publics et fréquentés pour les premières rencontres.",
  },
  {
    icon: EyeOff,
    title: "Protection de la vie privée",
    description:
      "Seules les informations nécessaires à l'activité seront visibles par les autres participants — le reste restera privé.",
  },
];

export function TrustSafety() {
  return (
    <section id="securite" className="bg-ink-900 py-20 text-white sm:py-28">
      <div className="section-container flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading
            tone="light"
            eyebrow="Sécurité et confiance"
            title="Pourquoi JoinNow est sûr ?"
            subtitle="Voici les mécanismes prévus pour te protéger, du premier message à la rencontre en vrai."
          />
          <span className="badge bg-white/10 text-white ring-1 ring-inset ring-white/20">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Fonctionnalités prévues pour le lancement — pas encore actives aujourd&rsquo;hui
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <div className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-white/5 p-6 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-400/15 text-mint-400 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/60">
                    Prévu
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
