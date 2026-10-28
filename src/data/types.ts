import type { StaticImageData } from "next/image";

export type PageName = "home" | "destination" | "crew" | "technology";

export type BackgroundSet = Record<
  "mobile" | "tablet" | "desktop",
  StaticImageData
>;

export type CrewMember = {
  name: string;
  role: string;
  bio: string;
  portrait: StaticImageData;
};

export type Destination = {
  name: string;
  description: string;
  distance: string;
  travelTime: string;
  image: StaticImageData;
};
