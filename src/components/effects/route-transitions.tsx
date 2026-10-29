"use client";

import { canAnimateViews, routeOrder, runViewTransition } from "@/lib";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const COMMIT_BUDGET = 1000;
const PAINT_BUDGET = 400;

function after(wait: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, wait);
  });
}

function visibleImagesDecoded() {
  const images = [
    ...document.querySelectorAll<HTMLImageElement>("main img"),
  ].filter((image) => image.checkVisibility());

  return Promise.all(images.map((image) => image.decode().catch(() => {})));
}

function sameDocumentHref(link: HTMLAnchorElement) {
  if (link.target || link.hasAttribute("download")) return null;
  if (link.origin !== location.origin) return null;
  if (link.pathname === location.pathname && link.search === location.search) {
    return null;
  }

  return link.pathname + link.search;
}

export default function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const commit = useRef<(() => void) | null>(null);

  useEffect(() => {
    const resolve = commit.current;
    if (!resolve) return;

    commit.current = null;
    void Promise.race([visibleImagesDecoded(), after(PAINT_BUDGET)]).then(
      resolve,
    );
  }, [pathname]);

  useEffect(() => {
    function claim(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (!canAnimateViews()) return;

      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = sameDocumentHref(link);
      if (!href) return;

      event.preventDefault();
      commit.current?.();

      const direction =
        routeOrder(link.pathname) >= routeOrder(location.pathname)
          ? "forward"
          : "back";

      const root = document.documentElement;
      if (link.closest("dialog")) root.dataset.fromMenu = "";

      runViewTransition("route", direction, () => {
        delete root.dataset.fromMenu;
        const committed = new Promise<void>((resolve) => {
          commit.current = resolve;
        });
        router.push(href);

        return Promise.race([committed, after(COMMIT_BUDGET + PAINT_BUDGET)]);
      });
    }

    document.addEventListener("click", claim, true);
    return () => document.removeEventListener("click", claim, true);
  }, [router]);

  return null;
}
