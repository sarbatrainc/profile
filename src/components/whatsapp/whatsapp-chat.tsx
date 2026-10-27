"use client";

import { useEffect, useRef, useState } from "react";

import { siteConfig, whatsappLink } from "@/config/site.config";
import { WhatsappIcon } from "@/components/ui/icons";

const STORAGE_KEY = "whatsappChatDismissed";

/**
 * Floating WhatsApp chat widget ("agent") that opens a conversation in your
 * WhatsApp via https://wa.me/<YOUR_PHONE>. The number is read from
 * NEXT_PUBLIC_PHONE (never hardcoded); when absent the widget is hidden
 * entirely instead of rendering an invented contact.
 */
export function WhatsAppChat() {
  const phoneLink = whatsappLink(siteConfig.chatDefaultText);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const phoneLinkRef = useRef(phoneLink);
  // Keep the ref in sync (phoneLink is effectively constant for the component's
  // lifetime, so this never causes extra renders — it just keeps the value fresh).
  useEffect(() => {
    phoneLinkRef.current = phoneLink;
  });

  // Auto-open once after a short delay (disabled under reduced motion / once dismissed).
  useEffect(() => {
    const link = phoneLinkRef.current;
    if (!link || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (localStorage.getItem(STORAGE_KEY) === "true") return;
    const timer = window.setTimeout(() => setOpen(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  // Close on Escape and outside clicks.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onOutside = (e: Event) => {
      if (panelRef.current && panelRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  if (!phoneLink) return null;

  const send = () => {
    const message = text.trim() || siteConfig.chatDefaultText;
    const url = whatsappLink(message) ?? phoneLink;
    localStorage.setItem(STORAGE_KEY, "true");
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] font-sans"
      aria-live="polite"
      aria-label="WhatsApp chat"
    >
      {open && (
        <div
          ref={panelRef as React.RefObject<HTMLDivElement>}
          className="mb-3 flex w-72 flex-col gap-3 rounded-2xl border border-border bg-surface-2 p-4 shadow-float"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center self-start rounded-full bg-whatsapp text-whatsapp-on"
            >
              <WhatsappIcon size={18} />
            </span>
            <p className="text-sm text-subtle">{siteConfig.chatGreeting}</p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={3}
            placeholder="Type your message…"
            className="w-full resize-none rounded-lg border border-border bg-surface-2/60 px-3 py-2 text-sm text-foreground placeholder-muted outline-none ring-accent/50 transition-colors file:font-sans focus-within:ring-2"
          />

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={dismiss}
              className="text-xs font-medium text-muted hover:text-foreground"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={send}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-whatsapp-on transition-colors duration-200 hover:bg-whatsapp-hover focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Send to WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          localStorage.removeItem(STORAGE_KEY);
          setOpen(true);
        }}
        className="grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-on shadow-float transition-colors duration-200 hover:bg-whatsapp-hover focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {open ? (
          <WhatsappIcon size={22} />
        ) : (
          <WhatsappIcon size={26} className="animate-[bounce_2s_ease-in-out_infinite]" />
        )}
      </button>
    </div>
  );
}
