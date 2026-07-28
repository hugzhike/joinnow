import { Compass, Send, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Découvre les activités autour de toi",
    description:
      "Ouvre l'app et vois en un coup d'œil ce qui se passe près de toi, maintenant ou dans les prochaines heures.",
  },
  {
    icon: Send,
    number: "02",
    title: "Rejoins une activité ou publie la tienne",
    description:
      "Une place disponible te convient ? Demande à rejoindre. Rien ne te plaît ? Crée la tienne en quelques secondes.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Rencontre le groupe dans la vie réelle",
    description:
      "Une fois accepté, retrouve les autres participants sur place. Simple, spontané, sans prise de tête.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28">
      <div className="section-container flex flex-col gap-14">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="Trois étapes, aucune organisation compliquée"
          subtitle="JoinNow est pensé pour aller du besoin à la rencontre en quelques minutes."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 120} className="relative">
              <div className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-flame-500 text-white shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-105">
                    <step.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-extrabold text-ink-100">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-ink-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{step.description}</p>
              </div>

              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute right-[-1.75rem] top-1/2 hidden h-px w-8 -translate-y-1/2 border-t-2 border-dashed border-flame-300 lg:block"
                />
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
