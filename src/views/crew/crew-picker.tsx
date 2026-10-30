"use client";

import { crew } from "@/data";
import { useTabs } from "@/hooks";

export default function CrewPicker() {
  const { selected, swipeProps, tabListProps, tabProps, panelProps } = useTabs(
    crew.length,
  );
  const { name, role } = crew[selected];

  return (
    <div
      {...swipeProps}
      className="grid grid-rows-[auto_1fr] gap-8 lg:grid-cols-2 lg:grid-rows-[1fr]"
    >
      <div className="grid gap-6 pt-10 md:mx-auto md:max-w-lg lg:max-w-none lg:grid-rows-[1fr_auto] lg:gap-10 lg:pt-0 lg:pb-12">
        <div
          {...panelProps}
          className="grid gap-6 text-center lg:self-center lg:text-left"
        >
          <h2 className="grid gap-2 font-serif uppercase v-tab-title md:gap-4">
            <span className="text-preset-4-mobile text-white/52 md:text-preset-4-tablet lg:text-preset-4">
              {role}
            </span>{" "}
            <span className="text-preset-3-mobile md:text-preset-3-tablet lg:text-preset-3">
              {name}
            </span>
          </h2>
          <div className="grid v-tab-copy">
            {crew.map((member, index) => (
              <p
                key={member.name}
                aria-hidden={index !== selected}
                className="col-start-1 row-start-1 text-preset-9-mobile text-muted aria-hidden:invisible md:text-preset-9-tablet lg:text-preset-9 lg:aria-hidden:hidden"
              >
                {member.bio}
              </p>
            ))}
          </div>
        </div>

        <div
          {...tabListProps}
          aria-label="Crew"
          className="flex justify-center gap-4 lg:justify-start lg:gap-10"
        >
          {crew.map((member, index) => (
            <button
              key={member.name}
              type="button"
              {...tabProps(index)}
              aria-label={member.name}
              className="relative size-2.5 rounded-full bg-white/17 transition-[background-color] duration-300 before:absolute before:-inset-2 hover:bg-white/50 aria-selected:bg-white motion-reduce:transition-none lg:size-3.75 lg:before:-inset-5"
            />
          ))}
        </div>
      </div>

      <div className="grid place-items-center v-tab-portrait md:-mb-10 md:items-start md:overflow-y-clip lg:mb-0 lg:grid-rows-1 lg:items-center lg:contain-size">
        {crew.map((member, index) => (
          <img
            key={member.name}
            src={member.portrait.src}
            width={member.portrait.width}
            height={member.portrait.height}
            alt=""
            hidden={index !== selected}
            className="h-85 w-auto mask-b-from-77% object-contain object-bottom md:-mb-15 md:h-140 md:mask-b-to-90% lg:mb-0 lg:h-full lg:max-h-169"
          />
        ))}
      </div>
    </div>
  );
}
