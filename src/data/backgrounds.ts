import crewDesktop from "@/assets/crew/background-crew-desktop.webp";
import crewMobile from "@/assets/crew/background-crew-mobile.webp";
import crewTablet from "@/assets/crew/background-crew-tablet.webp";
import destinationDesktop from "@/assets/destination/background-destination-desktop.webp";
import destinationMobile from "@/assets/destination/background-destination-mobile.webp";
import destinationTablet from "@/assets/destination/background-destination-tablet.webp";
import homeDesktop from "@/assets/home/background-home-desktop.webp";
import homeMobile from "@/assets/home/background-home-mobile.webp";
import homeTablet from "@/assets/home/background-home-tablet.webp";
import technologyDesktop from "@/assets/technology/background-technology-desktop.webp";
import technologyMobile from "@/assets/technology/background-technology-mobile.webp";
import technologyTablet from "@/assets/technology/background-technology-tablet.webp";
import type { BackgroundSet, PageName } from "./types";

export const backgrounds: Record<PageName, BackgroundSet> = {
  home: { mobile: homeMobile, tablet: homeTablet, desktop: homeDesktop },
  destination: {
    mobile: destinationMobile,
    tablet: destinationTablet,
    desktop: destinationDesktop,
  },
  crew: { mobile: crewMobile, tablet: crewTablet, desktop: crewDesktop },
  technology: {
    mobile: technologyMobile,
    tablet: technologyTablet,
    desktop: technologyDesktop,
  },
};
