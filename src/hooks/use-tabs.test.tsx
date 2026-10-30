import { setMediaMatch } from "@/test/media";
import { swipe } from "@/test/touch";
import {
  removeViewTransitions,
  rootDataset,
  stubViewTransitions,
} from "@/test/view-transitions";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { useTabs } from "./use-tabs";

const planets = ["Moon", "Mars", "Titan"];

function Planets() {
  const { selected, swipeProps, tabListProps, tabProps, panelProps } = useTabs(
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
      <p {...panelProps} {...swipeProps}>
        {planets[selected]}
      </p>
    </>
  );
}

function selectedTab() {
  return screen.getByRole("tab", { selected: true });
}

function swipePanel(dx: number, dy?: number) {
  swipe(screen.getByRole("tabpanel"), dx, dy);
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

  it("follows the finger: a swipe left goes forward, a swipe right goes back", () => {
    const { started } = stubViewTransitions();
    render(<Planets />);

    swipePanel(-80);
    expect(selectedTab()).toHaveAccessibleName("Mars");

    swipePanel(80);
    expect(selectedTab()).toHaveAccessibleName("Moon");

    expect(started.map(({ dataset }) => dataset.direction)).toEqual([
      "forward",
      "back",
    ]);
  });

  it("stops at both ends instead of wrapping on a swipe", () => {
    const { start } = stubViewTransitions();
    render(<Planets />);

    swipePanel(80);
    expect(selectedTab()).toHaveAccessibleName("Moon");
    expect(start).not.toHaveBeenCalled();

    swipePanel(-80);
    swipePanel(-80);
    swipePanel(-80);
    expect(selectedTab()).toHaveAccessibleName("Titan");
    expect(start).toHaveBeenCalledTimes(2);
  });

  it("ignores short swipes, vertical scrolls and pinches", () => {
    render(<Planets />);
    const panel = screen.getByRole("tabpanel");

    swipePanel(-30);
    swipePanel(-80, 120);
    fireEvent.touchStart(panel, {
      touches: [
        { clientX: 200, clientY: 200 },
        { clientX: 300, clientY: 200 },
      ],
    });
    fireEvent.touchEnd(panel, {
      changedTouches: [{ clientX: 100, clientY: 200 }],
    });

    expect(selectedTab()).toHaveAccessibleName("Moon");
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
