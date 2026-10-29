import { backgrounds, type PageName } from "@/data";

export default function PageBackground({ page }: { page: PageName }) {
  const { mobile, tablet, desktop } = backgrounds[page];

  return (
    <picture className="absolute inset-0 -z-10 overflow-clip">
      <source
        media="(min-width: 64rem)"
        srcSet={desktop.src}
        width={desktop.width}
        height={desktop.height}
      />
      <source
        media="(min-width: 48rem)"
        srcSet={tablet.src}
        width={tablet.width}
        height={tablet.height}
      />
      <img
        src={mobile.src}
        width={mobile.width}
        height={mobile.height}
        alt=""
        fetchPriority="high"
        className="size-full object-cover motion-safe:animate-settle"
      />
    </picture>
  );
}
