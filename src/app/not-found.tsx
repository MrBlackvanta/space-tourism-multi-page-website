import { HeroPage, PageBackground } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <PageBackground page="home" />
      <HeroPage
        eyebrow="Page not found"
        title="404"
        description="Looks like this page drifted out of orbit, or it was never on the flight plan. Head back home and pick your next destination from there."
        link={{ label: "Home", href: "/" }}
      />
    </>
  );
}
