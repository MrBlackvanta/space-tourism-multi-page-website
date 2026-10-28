import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import InteriorPage from "./interior-page";

describe("InteriorPage", () => {
  it("names the page with its title alone, keeping the number out of the heading", () => {
    render(
      <InteriorPage number="01" title="Pick your destination">
        <p>Body</p>
      </InteriorPage>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Pick your destination" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
