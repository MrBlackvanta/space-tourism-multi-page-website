"use client";

import { navLinks } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksVariant = "header" | "menu";

const variants: Record<
  NavLinksVariant,
  { nav?: string; list: string; link: string }
> = {
  header: {
    nav: "h-full bg-white/5 backdrop-blur-2xl max-md:hidden md:ml-10 md:flex-1 md:px-10 lg:ml-0 lg:min-w-[calc(50%+1rem)] lg:flex-none lg:px-16",
    list: "flex h-full justify-end gap-12",
    link: "h-full items-center after:inset-x-0 after:bottom-0 after:h-0.75 after:scale-x-0 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
  },
  menu: {
    list: "flex flex-col",
    link: "py-4 after:inset-y-4 after:right-0 after:w-0.75 after:scale-y-0 hover:after:scale-y-100 aria-[current=page]:after:scale-y-100",
  },
};

type NavLinksProps = {
  variant: NavLinksVariant;
  onNavigate?: () => void;
};

export default function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const route = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const { nav, list, link } = variants[variant];

  return (
    <nav aria-label="Main" className={nav}>
      <ul className={list}>
        {navLinks.map(({ label, href }, index) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={route === href ? "page" : undefined}
              className={`relative flex gap-3 font-condensed text-preset-8 uppercase after:absolute after:bg-white/50 after:transition-transform after:duration-300 aria-[current=page]:after:bg-white motion-reduce:after:transition-none ${link}`}
            >
              <span aria-hidden="true" className="font-bold">
                {String(index).padStart(2, "0")}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
