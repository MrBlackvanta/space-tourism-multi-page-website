import { PageBackground } from "@/components/layout";
import { pageMetadata } from "@/lib";

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
      <h1>{title}</h1>
    </>
  );
}
