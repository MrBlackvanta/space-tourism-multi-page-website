import { PageBackground } from "@/components/layout";
import { pageMetadata } from "@/lib";

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
      <h1>{title}</h1>
    </>
  );
}
