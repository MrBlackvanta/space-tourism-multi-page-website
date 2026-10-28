import { Signature, SiteHeader } from "@/components/layout";
import { SITE_NAME, SITE_URL } from "@/data";
import { openGraphBase, twitterBase } from "@/lib";
import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Bellefair } from "next/font/google";
import "./globals.css";

const bellefair = Bellefair({
  variable: "--font-bellefair",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  openGraph: openGraphBase,
  twitter: twitterBase,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bellefair.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="relative isolate grid min-h-dvh grid-rows-[auto_1fr]">
        <SiteHeader />
        <main className="grid">{children}</main>
        <Signature />
      </body>
    </html>
  );
}
