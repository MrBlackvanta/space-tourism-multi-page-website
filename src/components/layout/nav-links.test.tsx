import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vite-plus/test";
import NavLinks from "./nav-links";

vi.mock("next/navigation", () => ({ usePathname: vi.fn(() => "/") }));

function currentLinks() {
  return screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("aria-current") === "page");
}

describe("NavLinks", () => {
  it("links the four pages in order, numbered from 00", () => {
    render(<NavLinks variant="header" />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/",
      "/destination",
      "/crew",
      "/technology",
    ]);
    expect(links[0]).toHaveTextContent("00Home");
    expect(links[3]).toHaveTextContent("03Technology");
  });

  it("keeps the number out of each link's accessible name", () => {
    render(<NavLinks variant="header" />);

    expect(
      screen.getByRole("link", { name: "Destination" }),
    ).toBeInTheDocument();
  });

  it("marks the current page, ignoring a trailing slash", () => {
    vi.mocked(usePathname).mockReturnValue("/crew/");
    render(<NavLinks variant="header" />);

    expect(currentLinks()).toEqual([
      screen.getByRole("link", { name: "Crew" }),
    ]);
  });

  it("marks home only on the root path", () => {
    vi.mocked(usePathname).mockReturnValue("/technology");
    render(<NavLinks variant="menu" />);

    expect(currentLinks()).toEqual([
      screen.getByRole("link", { name: "Technology" }),
    ]);
  });

  it("reports each followed link", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<NavLinks variant="menu" onNavigate={onNavigate} />);

    await user.click(screen.getByRole("link", { name: "Crew" }));

    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
