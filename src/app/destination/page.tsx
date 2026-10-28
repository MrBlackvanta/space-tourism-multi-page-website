import { InteriorPage, PageBackground } from "@/components/layout";
import { pageMetadata } from "@/lib";
import { DestinationPicker } from "@/views/destination";

const title = "Pick your destination";

export const metadata = pageMetadata({
  title,
  description:
    "Compare the Moon, Mars, Europa and Titan: how far each one is, how long the trip takes, and what waits for you when you land.",
  path: "/destination",
});

export default function Destination() {
  return (
    <>
      <PageBackground page="destination" />
      <InteriorPage number="01" title={title}>
        <DestinationPicker />
      </InteriorPage>
    </>
  );
}
