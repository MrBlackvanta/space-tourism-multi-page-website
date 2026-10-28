import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import Hero from "./hero";

describe("Hero", () => {
  it("reads both heading lines as one sentence", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /^So, you want to travel to Space$/,
      }),
    ).toBeInTheDocument();
  });

  it("sends Explore to the destination page", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      "/destination",
    );
  });
});
