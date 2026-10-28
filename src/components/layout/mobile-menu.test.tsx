import { setMediaMatch } from "@/test/media";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import MobileMenu from "./mobile-menu";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const TABLET = "(min-width: 48rem)";

async function openMenu() {
  const user = userEvent.setup();
  render(<MobileMenu />);
  const toggle = screen.getByRole("button", { name: "Open menu" });
  await user.click(toggle);
  return { user, toggle, dialog: screen.getByRole("dialog", { name: "Menu" }) };
}

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("keeps the dialog closed until the toggle is pressed", () => {
    render(<MobileMenu />);

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the page links as a modal dialog", async () => {
    const { toggle, dialog } = await openMenu();

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", dialog.id);
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getAllByRole("link")).toHaveLength(4);
  });

  it("leads with the close button, which showModal focuses first", async () => {
    const { dialog } = await openMenu();

    expect(dialog.querySelector("a, button")).toHaveAccessibleName(
      "Close menu",
    );
  });

  it("closes when the browser closes the dialog, then refocuses the toggle", async () => {
    const { toggle, dialog } = await openMenu();

    act(() => (dialog as HTMLDialogElement).close());

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes from its close button", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(
      within(dialog).getByRole("button", { name: "Close menu" }),
    );

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dialog).not.toHaveAttribute("open");
  });

  it("closes on a click beside the panel but not on the panel", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(within(dialog).getByRole("navigation"));
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(dialog.querySelector('[aria-hidden="true"]')!);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes once a page is chosen", async () => {
    const { user, toggle, dialog } = await openMenu();

    await user.click(within(dialog).getByRole("link", { name: "Crew" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the browser goes back", async () => {
    const { toggle } = await openMenu();

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("pins the page without hiding its scrollbar, then restores the scroll", async () => {
    const { user, dialog } = await openMenu();

    expect(document.body.style.position).toBe("fixed");
    expect(document.documentElement.style.overflow).toBe("");

    await user.click(
      within(dialog).getByRole("button", { name: "Close menu" }),
    );

    expect(document.body.style.position).toBe("");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "instant",
    });
  });

  it("closes itself when the viewport widens to the tablet layout", async () => {
    const { toggle } = await openMenu();

    act(() => setMediaMatch(TABLET, true));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.position).toBe("");
  });
});
