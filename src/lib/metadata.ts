import { SITE_NAME } from "@/data";
import type { Metadata } from "next";

const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Space tourism: the home page, headlined “So, you want to travel to space”, over Earth at night.",
};

export const openGraphBase = {
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
  images: [shareImage],
} satisfies Metadata["openGraph"];

export const twitterBase = {
  card: "summary_large_image",
  images: [shareImage],
} satisfies Metadata["twitter"];
