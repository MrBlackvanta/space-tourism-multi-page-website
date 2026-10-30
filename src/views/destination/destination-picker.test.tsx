import { swipe } from "@/test/touch";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import DestinationPicker from "./destination-picker";

vi.mock("@/data", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/data")>()),
  destinations: ["Moon", "Mars", "Titan"].map((name, index) => ({
    name,
    description: `${name} description`,
    distance: `${index + 1} km`,
    travelTime: `${index + 1} days`,
    image: { src: `/${name}.webp`, width: 445, height: 445 },
  })),
}));

function selectedTab() {
  return screen.getByRole("tab", { selected: true });
}

function visiblePlanets(container: HTMLElement) {
  return [...container.querySelectorAll("img:not([hidden])")].map((image) =>
    image.getAttribute("src"),
  );
}

describe("DestinationPicker", () => {
  it("opens on the first destination with its planet, distance and travel time", () => {
    const { container } = render(<DestinationPicker />);

    const panel = screen.getByRole("tabpanel", { name: "Moon" });

    expect(selectedTab()).toHaveAccessibleName("Moon");
    expect(
      within(panel).getByRole("heading", { level: 2, name: "Moon" }),
    ).toBeInTheDocument();
    expect(within(panel).getByText("1 km")).toBeInTheDocument();
    expect(within(panel).getByText("1 days")).toBeInTheDocument();
    expect(visiblePlanets(container)).toEqual(["/Moon.webp"]);
  });

  it("swaps the panel and the planet when another tab is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<DestinationPicker />);

    await user.click(screen.getByRole("tab", { name: "Titan" }));

    const panel = screen.getByRole("tabpanel", { name: "Titan" });

    expect(selectedTab()).toHaveAccessibleName("Titan");
    expect(within(panel).getByText("Titan description")).toBeInTheDocument();
    expect(within(panel).getByText("3 km")).toBeInTheDocument();
    expect(visiblePlanets(container)).toEqual(["/Titan.webp"]);
  });

  it("swipes to the next destination from the planet", () => {
    const { container } = render(<DestinationPicker />);

    swipe(container.querySelector("img:not([hidden])")!, -80);

    expect(selectedTab()).toHaveAccessibleName("Mars");
    expect(visiblePlanets(container)).toEqual(["/Mars.webp"]);
  });

  it("keeps only the selected tab in the tab order", async () => {
    const user = userEvent.setup();
    render(<DestinationPicker />);

    await user.tab();
    expect(screen.getByRole("tab", { name: "Moon" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  it("moves focus and selection with the arrow keys, wrapping at both ends", async () => {
    const user = userEvent.setup();
    render(<DestinationPicker />);

    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Titan" })).toHaveFocus();
    expect(selectedTab()).toHaveAccessibleName("Titan");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Moon" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Mars" })).toHaveFocus();
    expect(
      screen.getByRole("heading", { level: 2, name: "Mars" }),
    ).toBeInTheDocument();
  });

  it("jumps to the first and last tab with Home and End", async () => {
    const user = userEvent.setup();
    render(<DestinationPicker />);

    await user.tab();
    await user.keyboard("{End}");
    expect(selectedTab()).toHaveAccessibleName("Titan");
    expect(selectedTab()).toHaveFocus();

    await user.keyboard("{Home}");
    expect(selectedTab()).toHaveAccessibleName("Moon");
    expect(selectedTab()).toHaveFocus();
  });
});
