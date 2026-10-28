import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import SiteHeader from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/destination" }));

describe("SiteHeader", () => {
  it("links the logo home under the site's name", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Space tourism, home" }),
    ).toHaveAttribute("href", "/");
  });

  it("exposes one main navigation while the menu is closed", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("navigation", { name: "Main" })).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
  });
});
