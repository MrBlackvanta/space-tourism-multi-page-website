"use client";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import NavLinks from "./nav-links";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const toggle = toggleRef.current;
    const { scrollY } = window;
    const { style } = document.body;
    style.position = "fixed";
    style.insetInline = "0";
    style.top = `${-scrollY}px`;
    dialog.showModal();

    const close = () => setOpen(false);
    const tablet = window.matchMedia("(min-width: 48rem)");
    const closeOnTablet = (change: MediaQueryListEvent) => {
      if (change.matches) close();
    };
    window.addEventListener("popstate", close);
    tablet.addEventListener("change", closeOnTablet);

    return () => {
      window.removeEventListener("popstate", close);
      tablet.removeEventListener("change", closeOnTablet);
      dialog.close();
      style.position = "";
      style.insetInline = "";
      style.top = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="ml-auto md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="-mr-3 flex size-12 items-center justify-center text-muted"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        onClose={close}
        className="size-full max-h-none max-w-none overflow-clip bg-transparent text-white transition-[display,overlay] transition-discrete duration-300 backdrop:bg-transparent motion-reduce:transition-none"
      >
        <div
          className={`relative ml-auto h-full w-63.5 overflow-y-auto bg-night/15 pt-29.25 pl-8 backdrop-blur-2xl transition-transform duration-300 motion-reduce:transition-none starting:translate-x-full ${open ? "" : "translate-x-full"}`}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute top-5 right-3 flex size-12 items-center justify-center text-muted"
          >
            <CloseIcon />
          </button>
          <NavLinks variant="menu" onNavigate={close} />
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="absolute inset-0 -z-10 cursor-default"
        />
      </dialog>
    </div>
  );
}
