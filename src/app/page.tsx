import { HeroPage, PageBackground } from "@/components/layout";
import { SITE_NAME } from "@/data";
import { openGraphBase } from "@/lib";
import type { Metadata } from "next";

const title = `${SITE_NAME} | Travel beyond Earth`;
const description =
  "Book a trip to the Moon, Mars, Europa or Titan, meet the crew who will fly you there, and see the craft that gets you off the ground.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, title, description, url: "/" },
};

export default function Home() {
  return (
    <>
      <PageBackground page="home" />
      <HeroPage
        eyebrow="So, you want to travel to"
        title="Space"
        description="Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!"
        link={{ label: "Explore", href: "/destination" }}
      />
    </>
  );
}
