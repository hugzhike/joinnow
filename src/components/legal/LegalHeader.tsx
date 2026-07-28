import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function LegalHeader() {
  return (
    <header className="border-b border-ink-900/5 bg-cloud-50">
      <div className="section-container flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400">
          <Logo />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour à l&rsquo;accueil
        </Link>
      </div>
    </header>
  );
}
