import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="bg-cloud-100 py-20 sm:py-28">
      <div className="section-container flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Liste d'attente"
          title="Sois parmi les premiers à essayer JoinNow"
          subtitle="Deux minutes pour t'inscrire. On te préviendra dès que JoinNow est prêt à être testé près de chez toi."
        />

        <div className="card w-full max-w-2xl p-6 sm:p-10">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
