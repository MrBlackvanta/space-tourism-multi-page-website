import { Logo } from "@/components/icons";
import { SITE_NAME } from "@/data";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";

export default function SiteHeader() {
  return (
    <header className="relative z-10 flex h-22 items-center px-6 md:h-24 md:pr-0 md:pl-10 lg:h-34 lg:pt-10 lg:pl-16">
      <Link href="/" aria-label={`${SITE_NAME}, home`} className="shrink-0">
        <Logo className="size-10 md:size-12" />
      </Link>
      <div className="-mr-8 ml-16 hidden h-px flex-1 bg-white/25 lg:block" />
      <NavLinks variant="header" />
      <MobileMenu />
    </header>
  );
}
