import { InteriorPage, PageBackground } from "@/components/layout";
import { pageMetadata } from "@/lib";
import { TechnologyPicker } from "@/views/technology";

const title = "Space launch 101";

export const metadata = pageMetadata({
  title,
  description:
    "How you get off the ground: the launch vehicle, the spaceport and the space capsule that carry you into orbit.",
  path: "/technology",
});

export default function Technology() {
  return (
    <>
      <PageBackground page="technology" />
      <InteriorPage number="03" title={title}>
        <TechnologyPicker />
      </InteriorPage>
    </>
  );
}
