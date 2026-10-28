import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import PageBackground from "./page-background";

vi.mock("@/data", () => ({
  backgrounds: {
    crew: {
      mobile: { src: "/crew-mobile.webp", width: 375, height: 812 },
      tablet: { src: "/crew-tablet.webp", width: 768, height: 1024 },
      desktop: { src: "/crew-desktop.webp", width: 1440, height: 900 },
    },
  },
}));

describe("PageBackground", () => {
  it("serves each breakpoint its own crop, widest first, with its dimensions", () => {
    const { container } = render(<PageBackground page="crew" />);

    const sources = [...container.querySelectorAll("source")].map((source) => [
      source.media,
      source.srcset,
      source.getAttribute("width"),
      source.getAttribute("height"),
    ]);

    expect(sources).toEqual([
      ["(min-width: 64rem)", "/crew-desktop.webp", "1440", "900"],
      ["(min-width: 48rem)", "/crew-tablet.webp", "768", "1024"],
    ]);
  });

  it("falls back to the mobile crop as a decorative, high-priority image", () => {
    const { container } = render(<PageBackground page="crew" />);

    const image = container.querySelector("img");

    expect(image).toHaveAttribute("src", "/crew-mobile.webp");
    expect(image).toHaveAttribute("width", "375");
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).not.toHaveAttribute("loading", "lazy");
  });
});
