import { setMediaMatch } from "@/test/media";
import {
  removeViewTransitions,
  stubViewTransitions,
} from "@/test/view-transitions";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import RouteTransitions from "./route-transitions";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => "/",
}));

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function renderLinks() {
  render(
    <>
      <RouteTransitions />
      <a href="/">Home</a>
      <a href="/crew">Crew</a>
      <dialog open>
        <a href="/technology">Technology</a>
      </dialog>
    </>,
  );
}

afterEach(() => {
  push.mockClear();
  removeViewTransitions();
  window.history.replaceState(null, "", "/");
  delete document.documentElement.dataset.transition;
  delete document.documentElement.dataset.direction;
});

describe("RouteTransitions", () => {
  it("moves forward through a view transition to a later page", async () => {
    const { start, started } = stubViewTransitions();
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Crew" }));

    expect(start).toHaveBeenCalledOnce();
    expect(started[0].dataset).toMatchObject({
      transition: "route",
      direction: "forward",
    });
    expect(push).toHaveBeenCalledWith("/crew");
  });

  it("moves back to an earlier page", async () => {
    const { started } = stubViewTransitions();
    window.history.replaceState(null, "", "/crew");
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Home" }));

    expect(started[0].dataset.direction).toBe("back");
    expect(push).toHaveBeenCalledWith("/");
  });

  it("keeps the page in the menu's frame until the route updates", async () => {
    const { started, updates } = stubViewTransitions({ runUpdate: false });
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Technology" }));

    expect(started[0].dataset.fromMenu).toBe("");
    void updates[0]();
    expect(document.documentElement.dataset.fromMenu).toBeUndefined();
    expect(push).toHaveBeenCalledWith("/technology");
  });

  it("leaves a link to the current page alone", async () => {
    const { start } = stubViewTransitions();
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Home" }));

    expect(start).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("leaves the click to the router when motion is reduced", async () => {
    const { start } = stubViewTransitions();
    setMediaMatch(REDUCED_MOTION, true);
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Crew" }));

    expect(start).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("leaves the click to the router without view transition support", async () => {
    renderLinks();

    await userEvent.click(screen.getByRole("link", { name: "Crew" }));

    expect(push).not.toHaveBeenCalled();
  });
});
