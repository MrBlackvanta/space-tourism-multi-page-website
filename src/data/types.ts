import type { StaticImageData } from "next/image";

export type CrewMember = {
  name: string;
  role: string;
  bio: string;
  portrait: StaticImageData;
};
