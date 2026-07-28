import Link from "next/link";
import { Mail, MapPin, Music2, Smartphone } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { Logo } from "./Logo";

const legalLinks = [
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#activites", label: "Activités" },
  { href: "/#securite", label: "Sécurité" },
  { href: "/#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900 text-white/70">
      <div className="section-container flex flex-col gap-14 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo className="text-white" />
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              JoinNow connecte les gens disponibles autour de toi pour une
              activité, maintenant. Actuellement en préparation à Nice et dans
              les Alpes-Maritimes.
            </p>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Conçu à Nice, France
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/40">Produit</p>
            <nav className="flex flex-col gap-2.5 text-sm text-white/65" aria-label="Liens produit">
              {productLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/40">Légal</p>
            <nav className="flex flex-col gap-2.5 text-sm text-white/65" aria-label="Liens légaux">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-white/40">Nous suivre</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/joinnow.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JoinNow sur Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <InstagramGlyph className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@joinnow.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JoinNow sur TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Music2 className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@joinnow.app"
                aria-label="Contacter JoinNow par email"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-white/70">
            Bientôt disponible — sois prévenu·e dès la sortie
          </p>
          <div className="flex gap-3">
            <Link
              href="/#waitlist"
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
            >
              <Smartphone className="h-4 w-4" aria-hidden="true" />
              App Store — bientôt
            </Link>
            <Link
              href="/#waitlist"
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
            >
              <Smartphone className="h-4 w-4" aria-hidden="true" />
              Google Play — bientôt
            </Link>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <p className="text-center text-xs text-white/40 sm:text-left">
          © {new Date().getFullYear()} JoinNow. Tous droits réservés. Nom
          provisoire, projet en cours de développement.
        </p>
      </div>
    </footer>
  );
}
