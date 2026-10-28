import { describe, expect, it } from "vite-plus/test";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("gives a page its canonical URL and a share title carrying the site name", () => {
    const metadata = pageMetadata({
      title: "Meet your crew",
      description: "The crew.",
      path: "/crew",
    });

    expect(metadata.title).toBe("Meet your crew");
    expect(metadata.alternates?.canonical).toBe("/crew");
    expect(metadata.openGraph).toMatchObject({
      title: "Meet your crew | Space tourism",
      description: "The crew.",
      url: "/crew",
    });
  });
});
