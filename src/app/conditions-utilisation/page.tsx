import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation de la liste d'attente et du site JoinNow.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Conditions d'utilisation" updatedAt="27 juillet 2026">
      <p>
        Ce site présente le projet JoinNow, une application mobile en cours
        de développement, et permet de s&rsquo;inscrire à une liste
        d&rsquo;attente. Ces conditions concernent l&rsquo;usage de ce site
        de présentation ; des conditions générales d&rsquo;utilisation
        dédiées à l&rsquo;application seront publiées avant son lancement.
      </p>

      <h2>Objet du site</h2>
      <p>
        JoinNow n&rsquo;est pas encore disponible au téléchargement. Ce site
        a pour seul objectif de présenter le concept, de mesurer
        l&rsquo;intérêt du public et de collecter des inscriptions à la
        liste d&rsquo;attente.
      </p>

      <h2>Inscription à la liste d&rsquo;attente</h2>
      <p>
        En t&rsquo;inscrivant, tu acceptes que les informations transmises
        soient utilisées conformément à notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>. Ton
        inscription ne constitue ni un engagement contractuel, ni une
        garantie d&rsquo;accès à l&rsquo;application à une date précise.
      </p>

      <h2>Programme ambassadeurs</h2>
      <p>
        Cocher la case « ambassadeur·rice » exprime un intérêt à participer
        au lancement local du produit. Cela ne constitue pas un engagement
        contractuel de notre part ni du tien ; les modalités précises du
        programme seront communiquées directement aux personnes
        intéressées.
      </p>

      <h2>Démonstration de l&rsquo;application</h2>
      <p>
        Les activités, profils et interfaces présentés dans les
        démonstrations de ce site sont fictifs et servent uniquement à
        illustrer le fonctionnement futur du produit.
      </p>

      <h2>Modifications</h2>
      <p>
        Ces conditions peuvent évoluer à mesure que le projet progresse. La
        date de dernière mise à jour est indiquée en haut de cette page.
      </p>
    </LegalLayout>
  );
}
