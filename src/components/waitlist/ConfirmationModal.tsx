"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Copy, MessageCircle, X } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { track } from "@/lib/analytics";
import type { WaitlistSubmitResult } from "@/types/waitlist";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  firstName: string;
  result: WaitlistSubmitResult;
  onClose: () => void;
}

export function ConfirmationModal({ firstName, result, onClose }: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const shareMessage = `Je viens de m'inscrire sur JoinNow, l'app pour trouver des gens dispo pour une activité, maintenant. Rejoins-moi : ${result.referralLink}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.referralLink);
      setCopied(true);
      track("referral_share", { method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API unavailable — the link is still visible to copy manually */
    }
  };

  const handleWhatsApp = () => {
    track("referral_share", { method: "whatsapp" });
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank", "noopener,noreferrer");
  };

  const handleInstagram = async () => {
    track("referral_share", { method: "instagram" });
    if (navigator.share) {
      try {
        await navigator.share({ text: shareMessage, url: result.referralLink });
        return;
      } catch {
        /* user cancelled the native share sheet — fall back to clipboard below */
      }
    }
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore — link remains visible in the modal */
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-900/60 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full flex-col gap-6 overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl outline-none sm:max-w-lg sm:rounded-[2rem] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cloud-100 text-ink-500 hover:bg-cloud-200"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-50 text-mint-500">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </div>
          <h2 id="confirmation-title" className="text-2xl font-extrabold text-ink-900">
            Merci {firstName} !
          </h2>
          <p className="text-ink-500">
            Tu es actuellement le{" "}
            <span className="font-bold text-flame-600">n°{result.position}</span>{" "}
            sur la liste d&rsquo;attente JoinNow.
          </p>
        </div>

        <div className="rounded-2xl bg-cloud-100 p-4 text-center text-sm text-ink-600">
          Plus tu invites de personnes dans ta ville, plus JoinNow pourra être
          lancé rapidement près de chez toi.
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="referral-link" className="text-sm font-semibold text-ink-700">
            Ton lien de parrainage personnel
          </label>
          <div className="flex items-center gap-2 rounded-xl bg-cloud-100 p-2 pl-4">
            <input
              id="referral-link"
              readOnly
              value={result.referralLink}
              className="min-w-0 flex-1 truncate bg-transparent text-sm text-ink-700 outline-none"
              onFocus={(event) => event.currentTarget.select()}
            />
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                copied ? "bg-mint-500 text-white" : "bg-white text-ink-700 ring-1 ring-inset ring-ink-100"
              )}
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn bg-[#25D366] text-white hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={handleInstagram}
              className="btn bg-gradient-to-br from-flame-500 via-flame-600 to-ink-800 text-white hover:brightness-95"
            >
              <InstagramGlyph className="h-4 w-4" />
              Instagram
            </button>
          </div>
        </div>

        <button type="button" onClick={onClose} className="btn-secondary w-full">
          Fermer
        </button>
      </div>
    </div>,
    document.body
  );
}
