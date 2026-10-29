import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("titles the page apart from the home page", () => {
    expect(metadata.title).toBe("Page not found");
  });

  it("names the error in its heading and offers one way home", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found 404" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
