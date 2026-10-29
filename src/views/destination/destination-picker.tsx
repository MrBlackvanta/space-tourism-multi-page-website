"use client";

import { destinations } from "@/data";
import { useTabs } from "@/hooks";

export default function DestinationPicker() {
  const { selected, tabListProps, tabProps, panelProps } = useTabs(
    destinations.length,
  );
  const { name, description, distance, travelTime } = destinations[selected];
  const stats = [
    { label: "Avg. distance", value: distance },
    { label: "Est. travel time", value: travelTime },
  ];

  return (
    <div className="grid content-start gap-8 md:grid-rows-[1fr_1fr] lg:grid-cols-2 lg:grid-rows-[1fr]">
      <div className="grid place-items-center py-6.5 v-tab-planet md:py-0">
        {destinations.map((destination, index) => (
          <img
            key={destination.name}
            src={destination.image.src}
            width={destination.image.width}
            height={destination.image.height}
            alt=""
            hidden={index !== selected}
            className="w-37.5 motion-safe:animate-float md:w-75 lg:w-120"
          />
        ))}
      </div>

      <div className="grid w-full gap-6 self-center justify-self-center text-center md:max-w-128.5 lg:max-w-111.25 lg:gap-10 lg:text-left">
        <div
          {...tabListProps}
          aria-label="Destinations"
          className="flex justify-center gap-8 lg:justify-start"
        >
          {destinations.map((destination, index) => (
            <button
              key={destination.name}
              type="button"
              {...tabProps(index)}
              className="flex h-8 border-b-3 border-transparent font-condensed text-preset-8-mobile text-muted uppercase transition-[border-color,color] duration-300 hover:border-white/50 hover:text-white aria-selected:border-white aria-selected:text-white motion-reduce:transition-none md:text-preset-8"
            >
              <span className="mr-[-0.15em]">{destination.name}</span>
            </button>
          ))}
        </div>

        <div {...panelProps} className="grid gap-4">
          <h2 className="font-serif text-preset-2-mobile uppercase v-tab-title md:text-preset-2-tablet lg:text-preset-2">
            {name}
          </h2>
          <p className="text-preset-9-mobile text-muted v-tab-copy md:text-preset-9-tablet lg:text-preset-9">
            {description}
          </p>
          <dl className="mt-2 grid gap-6 border-t border-white/25 pt-6 md:grid-cols-2 lg:mt-6 lg:pt-10">
            {stats.map(({ label, value }) => (
              <div key={label} className="grid gap-3">
                <dt className="font-condensed text-preset-7 text-muted uppercase">
                  {label}
                </dt>
                <dd className="font-serif text-preset-6 uppercase">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
