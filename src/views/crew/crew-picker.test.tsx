import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import CrewPicker from "./crew-picker";

vi.mock("@/data", () => ({
  crew: [
    ["Commander", "Neil Armstrong"],
    ["Pilot", "Buzz Aldrin"],
    ["Engineer", "Michael Collins"],
  ].map(([role, name]) => ({
    name,
    role,
    bio: `${name} bio`,
    portrait: { src: `/${name}.webp`, width: 500, height: 640 },
  })),
}));

function selectedDot() {
  return screen.getByRole("tab", { selected: true });
}

function visiblePortraits(container: HTMLElement) {
  return [...container.querySelectorAll("img:not([hidden])")].map((image) =>
    image.getAttribute("src"),
  );
}

describe("CrewPicker", () => {
  it("opens on the first member, reading the role and name as one heading", () => {
    const { container } = render(<CrewPicker />);

    const panel = screen.getByRole("tabpanel", { name: "Neil Armstrong" });

    expect(selectedDot()).toHaveAccessibleName("Neil Armstrong");
    expect(
      within(panel).getByRole("heading", {
        level: 2,
        name: "Commander Neil Armstrong",
      }),
    ).toBeInTheDocument();
    expect(within(panel).getByRole("paragraph")).toHaveTextContent(
      "Neil Armstrong bio",
    );
    expect(visiblePortraits(container)).toEqual(["/Neil Armstrong.webp"]);
  });

  it("swaps the heading, bio and portrait when another dot is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<CrewPicker />);

    await user.click(screen.getByRole("tab", { name: "Michael Collins" }));

    const panel = screen.getByRole("tabpanel", { name: "Michael Collins" });

    expect(
      within(panel).getByRole("heading", {
        level: 2,
        name: "Engineer Michael Collins",
      }),
    ).toBeInTheDocument();
    expect(within(panel).getByRole("paragraph")).toHaveTextContent(
      "Michael Collins bio",
    );
    expect(visiblePortraits(container)).toEqual(["/Michael Collins.webp"]);
  });

  it("tabs to the bio before the dots, matching the visual order", async () => {
    const user = userEvent.setup();
    render(<CrewPicker />);

    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("tab", { name: "Neil Armstrong" })).toHaveFocus();

    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("moves focus and selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<CrewPicker />);

    await user.click(screen.getByRole("tab", { name: "Neil Armstrong" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Buzz Aldrin" })).toHaveFocus();
    expect(
      screen.getByRole("heading", { level: 2, name: "Pilot Buzz Aldrin" }),
    ).toBeInTheDocument();
  });
});
