import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import HeroPage from "./hero-page";

function renderHeroPage() {
  render(
    <HeroPage
      eyebrow="So, you want to travel to"
      title="Space"
      description="Sit back and relax."
      link={{ label: "Explore", href: "/destination" }}
    />,
  );
}

describe("HeroPage", () => {
  it("reads the eyebrow and the title as one heading", () => {
    renderHeroPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^So, you want to travel to Space$/,
      }),
    ).toBeInTheDocument();
  });

  it("renders the description and its one link", () => {
    renderHeroPage();

    expect(screen.getByText("Sit back and relax.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/destination",
    );
  });
});
