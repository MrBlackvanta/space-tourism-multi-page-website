import { installMatchMedia, setMediaMatch } from "@/test/media";
import { swipe } from "@/test/touch";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import TechnologyPicker from "./technology-picker";

vi.mock("@/data", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/data")>()),
  technology: ["Rocket", "Launch pad", "Lander"].map((name) => ({
    name,
    description: `${name} description`,
    images: {
      landscape: { src: `/${name}-landscape.webp`, width: 768, height: 310 },
      portrait: { src: `/${name}-portrait.webp`, width: 515, height: 527 },
    },
  })),
}));

const desktop = "(min-width: 64rem)";

function visibleImages(container: HTMLElement) {
  return [...container.querySelectorAll("picture:not([hidden]) img")].map(
    (image) => image.getAttribute("src"),
  );
}

describe("TechnologyPicker", () => {
  it("opens on the first term, reading the eyebrow and name as one heading", () => {
    const { container } = render(<TechnologyPicker />);

    const panel = screen.getByRole("tabpanel", { name: "1 Rocket" });

    expect(
      within(panel).getByRole("heading", {
        level: 2,
        name: "The terminology… Rocket",
      }),
    ).toBeInTheDocument();
    expect(within(panel).getByRole("paragraph")).toHaveTextContent(
      "Rocket description",
    );
    expect(visibleImages(container)).toEqual(["/Rocket-landscape.webp"]);
  });

  it("swaps the heading, description and image when another number is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<TechnologyPicker />);

    await user.click(screen.getByRole("tab", { name: "3 Lander" }));

    const panel = screen.getByRole("tabpanel", { name: "3 Lander" });

    expect(
      within(panel).getByRole("heading", {
        level: 2,
        name: "The terminology… Lander",
      }),
    ).toBeInTheDocument();
    expect(within(panel).getByRole("paragraph")).toHaveTextContent(
      "Lander description",
    );
    expect(visibleImages(container)).toEqual(["/Lander-landscape.webp"]);
  });

  it("swipes to the next term from the image", () => {
    const { container } = render(<TechnologyPicker />);

    swipe(container.querySelector("picture:not([hidden]) img")!, -80);

    expect(screen.getByRole("tab", { selected: true })).toHaveAccessibleName(
      "2 Launch pad",
    );
    expect(visibleImages(container)).toEqual(["/Launch pad-landscape.webp"]);
  });

  it("serves the portrait crop from desktop up", () => {
    const { container } = render(<TechnologyPicker />);

    const source = container.querySelector("picture:not([hidden]) source");

    expect(source).toHaveAttribute("media", desktop);
    expect(source).toHaveAttribute("srcset", "/Rocket-portrait.webp");
  });

  it("steps through the numbers with the left and right arrows below desktop", async () => {
    const user = userEvent.setup();
    render(<TechnologyPicker />);

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "horizontal",
    );

    await user.click(screen.getByRole("tab", { name: "1 Rocket" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "2 Launch pad" })).toHaveFocus();
    expect(
      screen.getByRole("heading", { name: "The terminology… Launch pad" }),
    ).toBeInTheDocument();
  });

  it("stacks vertically on desktop and steps with the up and down arrows", async () => {
    installMatchMedia([desktop]);
    const user = userEvent.setup();
    render(<TechnologyPicker />);

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );

    await user.click(screen.getByRole("tab", { name: "1 Rocket" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "1 Rocket" })).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("tab", { name: "3 Lander" })).toHaveFocus();
  });

  it("switches orientation when the viewport crosses the desktop breakpoint", () => {
    render(<TechnologyPicker />);

    act(() => setMediaMatch(desktop, true));

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });
});
