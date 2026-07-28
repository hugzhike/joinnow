import { LegalHeader } from "./LegalHeader";
import { Footer } from "@/components/layout/Footer";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <LegalHeader />
      <main className="flex-1 py-14 sm:py-20">
        <article className="section-container max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-400">Dernière mise à jour : {updatedAt}</p>
          <div className="prose-legal mt-10 flex flex-col gap-6 text-ink-600">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
