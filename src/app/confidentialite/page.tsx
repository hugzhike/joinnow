import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment JoinNow collecte et utilise les données de la liste d'attente.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Politique de confidentialité" updatedAt="27 juillet 2026">
      <p>
        JoinNow (« nous ») est actuellement en phase de préparation. Cette
        page décrit comment les informations transmises via le formulaire de
        liste d&rsquo;attente de ce site sont traitées. Elle sera complétée
        et formalisée avec un conseil juridique avant le lancement public de
        l&rsquo;application.
      </p>

      <h2>Quelles données sont collectées</h2>
      <p>Lorsque tu t&rsquo;inscris sur la liste d&rsquo;attente, nous collectons :</p>
      <ul>
        <li>ton prénom ;</li>
        <li>ton adresse email ;</li>
        <li>ta ville ;</li>
        <li>ta tranche d&rsquo;âge, si tu choisis de la renseigner ;</li>
        <li>les activités qui t&rsquo;intéressent ;</li>
        <li>la fréquence à laquelle tu rencontres le problème décrit sur cette page ;</li>
        <li>la plateforme mobile que tu utilises (iPhone ou Android) ;</li>
        <li>ton souhait, ou non, de devenir ambassadeur·rice local·e.</li>
      </ul>

      <h2>Pourquoi ces données sont collectées</h2>
      <p>
        Ces informations servent uniquement à mesurer l&rsquo;intérêt pour le
        projet JoinNow, à prioriser les prochaines villes de lancement, et à
        te contacter lorsque l&rsquo;application sera prête à être testée.
        Elles ne sont ni vendues, ni partagées avec des tiers à des fins
        commerciales.
      </p>

      <h2>Où sont stockées ces données</h2>
      <p>
        Ces données sont stockées dans une base de données sécurisée
        Supabase. Il n&rsquo;existe plus de fichier local sur le serveur qui
        exécute le site&nbsp;: la migration vers Supabase a déjà été
        effectuée — voir le fichier README du projet pour le détail
        technique.
      </p>

      <h2>Tes droits</h2>
      <p>
        Conformément au RGPD, tu peux demander l&rsquo;accès, la correction ou
        la suppression de tes données à tout moment en écrivant à{" "}
        <a href="mailto:hugz.hike@gmail.com">hugz.hike@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
