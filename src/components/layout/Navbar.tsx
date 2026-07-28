"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#activites", label: "Activités" },
  { href: "#securite", label: "Sécurité" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-cloud-50/85 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between sm:h-20">
        <Link
          href="#top"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-400"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink-500 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="#waitlist"
            onClick={() => track("cta_primary_click", { location: "navbar" })}
            className="btn-primary"
          >
            Accès anticipé
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 ring-1 ring-inset ring-ink-100 lg:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-ink-900/5 bg-cloud-50 transition-[max-height] duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav
          className="section-container flex flex-col gap-1 py-4"
          aria-label="Navigation mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-semibold text-ink-700 hover:bg-cloud-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#waitlist"
            onClick={() => {
              setMenuOpen(false);
              track("cta_primary_click", { location: "navbar_mobile" });
            }}
            className="btn-primary mt-2 w-full"
          >
            Accès anticipé
          </Link>
        </nav>
      </div>
    </header>
  );
}
