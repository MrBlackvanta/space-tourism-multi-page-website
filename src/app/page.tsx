import { PageBackground } from "@/components/layout";
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
      <h1>{SITE_NAME}</h1>
    </>
  );
}
