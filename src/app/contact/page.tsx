import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter l'équipe JoinNow.",
};

export default function ContactPage() {
  return (
    <LegalLayout title="Contact" updatedAt="27 juillet 2026">
      <p>
        Une question sur le projet, un partenariat, une envie de rejoindre
        l&rsquo;aventure en tant qu&rsquo;ambassadeur·rice ? Écris-nous
        directement, on répond personnellement à chaque message.
      </p>

      <a
        href="mailto:hello@joinnow.app"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-flame-500 px-6 py-3.5 text-sm font-semibold text-white no-underline shadow-[var(--shadow-glow)] transition-colors hover:bg-flame-600"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        hello@joinnow.app
      </a>

      <p>
        Tu peux aussi nous suivre sur Instagram et TikTok (liens en bas de
        page) pour suivre l&rsquo;avancée du projet avant même le lancement
        officiel.
      </p>
    </LegalLayout>
  );
}
