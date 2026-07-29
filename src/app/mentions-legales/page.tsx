import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales sur l'éditeur et l'hébergeur du site JoinNow.",
};

export default function LegalNoticePage() {
  return (
    <LegalLayout title="Mentions légales" updatedAt="27 juillet 2026">
      <p>
        <strong>JoinNow</strong>{" "}
        est un nom provisoire de projet, actuellement en phase de test de
        concept. Aucune structure juridique définitive n&rsquo;a encore été
        créée à la date de publication de cette page. Les informations
        ci-dessous seront complétées dès l&rsquo;immatriculation
        d&rsquo;une entité pour le projet.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Responsable de la publication : équipe fondatrice de JoinNow.
        <br />
        Contact : <a href="mailto:hugz.hike@gmail.com">hugz.hike@gmail.com</a>
        <br />
        <em>[Raison sociale, forme juridique, adresse et numéro SIRET à
        compléter dès la création de la société.]</em>
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
        CA 91789, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&rsquo;ensemble des contenus présents sur ce site (textes, visuels,
        logo provisoire) est la propriété de l&rsquo;équipe JoinNow, sauf
        mention contraire, et ne peut être reproduit sans autorisation.
      </p>
    </LegalLayout>
  );
}
