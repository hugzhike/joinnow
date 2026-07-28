import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="section-container flex flex-col gap-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Toutes les questions qu'on nous pose"
          subtitle="Et si on n'a pas répondu à la tienne, écris-nous directement — voir la page contact en bas de page."
        />

        <div className="mx-auto w-full max-w-3xl">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
