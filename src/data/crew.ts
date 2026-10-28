import douglasHurley from "@/assets/crew/image-douglas-hurley.webp";
import gregoryOlsen from "@/assets/crew/image-gregory-olsen.webp";
import markShuttleworth from "@/assets/crew/image-mark-shuttleworth.webp";
import victorGlover from "@/assets/crew/image-victor-glover.webp";
import type { CrewMember } from "./types";

export const crew: CrewMember[] = [
  {
    name: "Douglas Hurley",
    role: "Commander",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    portrait: douglasHurley,
  },
  {
    name: "Mark Shuttleworth",
    role: "Mission Specialist",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    portrait: markShuttleworth,
  },
  {
    name: "Victor Glover",
    role: "Pilot",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    portrait: victorGlover,
  },
  {
    name: "Gregory Olsen",
    role: "Flight Engineer",
    bio: "Gregory Olsen is an American engineer and co-founder of Sensors Unlimited. Olsen was the third self-funded space tourist, flying to the ISS aboard Soyuz TMA-7 in 2005 and spending nearly ten days in orbit.",
    portrait: gregoryOlsen,
  },
];
