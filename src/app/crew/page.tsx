import { InteriorPage, PageBackground } from "@/components/layout";
import { pageMetadata } from "@/lib";
import { CrewPicker } from "@/views/crew";

const title = "Meet your crew";

export const metadata = pageMetadata({
  title,
  description:
    "Meet the commander, mission specialist, pilot and flight engineer who will fly your trip into space.",
  path: "/crew",
});

export default function Crew() {
  return (
    <>
      <PageBackground page="crew" />
      <InteriorPage number="02" title={title}>
        <CrewPicker />
      </InteriorPage>
    </>
  );
}
