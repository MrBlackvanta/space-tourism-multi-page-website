"use client";

import { navLinks } from "@/data";
import { routePath } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksVariant = "header" | "menu";

const variants: Record<
  NavLinksVariant,
  { nav?: string; list: string; link: string; indicator: string }
> = {
  header: {
    nav: "h-full bg-white/5 backdrop-blur-2xl max-md:hidden md:ml-10 md:flex-1 md:px-10 lg:ml-0 lg:min-w-[calc(50%+1rem)] lg:flex-none lg:pr-[calc(max(0rem,50cqw-45rem)+4rem)] lg:pl-16",
    list: "flex h-full justify-end gap-12",
    link: "h-full items-center",
    indicator:
      "inset-x-0 bottom-0 h-0.75 scale-x-0 group-hover/link:scale-x-100 group-aria-[current=page]/link:v-nav-indicator group-aria-[current=page]/link:scale-x-100",
  },
  menu: {
    list: "flex flex-col",
    link: "py-4",
    indicator:
      "inset-y-4 right-0 w-0.75 scale-y-0 group-hover/link:scale-y-100 group-aria-[current=page]/link:scale-y-100",
  },
};

type NavLinksProps = {
  variant: NavLinksVariant;
  onNavigate?: () => void;
};

export default function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const route = routePath(usePathname());
  const { nav, list, link, indicator } = variants[variant];

  return (
    <nav aria-label="Main" className={nav}>
      <ul className={list}>
        {navLinks.map(({ label, href }, index) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={route === href ? "page" : undefined}
              className={`group/link relative flex gap-3 font-condensed text-preset-8 uppercase ${link}`}
            >
              <span aria-hidden="true" className="font-bold">
                {String(index).padStart(2, "0")}
              </span>
              {label}
              <span
                aria-hidden="true"
                className={`absolute bg-white/50 transition-transform duration-300 group-aria-[current=page]/link:bg-white motion-reduce:transition-none ${indicator}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
