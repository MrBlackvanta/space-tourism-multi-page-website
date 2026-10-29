import { setMediaMatch } from "@/test/media";
import {
  removeViewTransitions,
  rootDataset,
  stubViewTransitions,
} from "@/test/view-transitions";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { useTabs } from "./use-tabs";

const planets = ["Moon", "Mars", "Titan"];

function Planets() {
  const { selected, tabListProps, tabProps, panelProps } = useTabs(
    planets.length,
  );

  return (
    <>
      <div {...tabListProps}>
        {planets.map((planet, index) => (
          <button key={planet} type="button" {...tabProps(index)}>
            {planet}
          </button>
        ))}
      </div>
      <p {...panelProps}>{planets[selected]}</p>
    </>
  );
}

function selectedTab() {
  return screen.getByRole("tab", { selected: true });
}

afterEach(removeViewTransitions);

describe("useTabs", () => {
  it("swaps the panel through a view transition, forward then back", async () => {
    const { started } = stubViewTransitions();
    render(<Planets />);

    await userEvent.click(screen.getByRole("tab", { name: "Titan" }));
    await userEvent.click(screen.getByRole("tab", { name: "Mars" }));

    expect(started.map(({ dataset }) => dataset)).toEqual([
      { transition: "tab", direction: "forward" },
      { transition: "tab", direction: "back" },
    ]);
    expect(selectedTab()).toHaveAccessibleName("Mars");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Mars");
  });

  it("starts nothing when the selected tab is clicked again", async () => {
    const { start } = stubViewTransitions();
    render(<Planets />);

    await userEvent.click(screen.getByRole("tab", { name: "Moon" }));

    expect(start).not.toHaveBeenCalled();
  });

  it("clears its marks only when the latest transition finishes", async () => {
    const { started } = stubViewTransitions();
    render(<Planets />);

    await userEvent.click(screen.getByRole("tab", { name: "Mars" }));
    await userEvent.click(screen.getByRole("tab", { name: "Moon" }));
    started[0].finish();
    await Promise.resolve();

    expect(document.documentElement.dataset.direction).toBe("back");

    started[1].finish();
    await Promise.resolve();

    expect(rootDataset()).toEqual({});
  });

  it("switches at once when motion is reduced", async () => {
    const { start } = stubViewTransitions();
    setMediaMatch("(prefers-reduced-motion: reduce)", true);
    render(<Planets />);

    await userEvent.click(screen.getByRole("tab", { name: "Titan" }));

    expect(start).not.toHaveBeenCalled();
    expect(selectedTab()).toHaveAccessibleName("Titan");
  });
});
