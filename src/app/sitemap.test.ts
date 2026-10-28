import { SITE_URL } from "@/data";
import { describe, expect, it } from "vite-plus/test";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists every page once, home first", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      SITE_URL,
      `${SITE_URL}/destination`,
      `${SITE_URL}/crew`,
      `${SITE_URL}/technology`,
    ]);
  });
});
