"use client";

import { technology } from "@/data";
import { useMediaQuery, useTabs } from "@/hooks";

const desktop = "(min-width: 64rem)";

export default function TechnologyPicker() {
  const vertical = useMediaQuery(desktop);
  const { selected, tabListProps, tabProps, panelProps } = useTabs(
    technology.length,
    vertical ? "vertical" : "horizontal",
  );

  return (
    <div className="grid content-start gap-8 md:content-center lg:mr-[calc(50%-50cqw-2.5rem)] lg:grid-cols-[minmax(0,auto)_minmax(0,38rem)] lg:justify-between">
      <div className="-mx-6 mt-16 grid md:-mx-10 lg:col-start-2 lg:row-start-1 lg:m-0 lg:self-center">
        {technology.map(({ name, images }, index) => (
          <picture key={name} hidden={index !== selected}>
            <source
              media={desktop}
              srcSet={images.portrait.src}
              width={images.portrait.width}
              height={images.portrait.height}
            />
            <img
              src={images.landscape.src}
              width={images.landscape.width}
              height={images.landscape.height}
              alt=""
              className="h-64.5 w-full object-cover md:h-89.25 lg:h-150"
            />
          </picture>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-16 lg:self-center">
        <div
          {...tabListProps}
          aria-label="Technology"
          className="flex justify-center gap-4 lg:flex-col lg:gap-8"
        >
          {technology.map(({ name }, index) => (
            <button
              key={name}
              type="button"
              {...tabProps(index)}
              aria-label={`${index + 1} ${name}`}
              className="grid size-10 place-items-center rounded-full border border-white/25 font-serif text-preset-4-tablet transition-[background-color,border-color,color] duration-300 hover:border-white aria-selected:bg-white aria-selected:text-night motion-reduce:transition-none md:size-14 lg:size-20 lg:text-preset-4"
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div
          {...panelProps}
          className="grid gap-4 text-center md:mx-auto md:max-w-lg lg:mx-0 lg:max-w-123 lg:gap-6 lg:text-left"
        >
          <h2 className="grid gap-4 font-serif uppercase">
            <span className="text-preset-4-mobile text-white/50 md:text-preset-4-tablet lg:text-preset-4">
              The terminology…
            </span>{" "}
            <span className="grid text-preset-3-mobile md:text-preset-3-tablet lg:text-preset-3">
              {technology.map(({ name }, index) => (
                <span
                  key={name}
                  aria-hidden={index !== selected}
                  className="col-start-1 row-start-1 aria-hidden:invisible"
                >
                  {name}
                </span>
              ))}
            </span>
          </h2>
          <div className="grid">
            {technology.map(({ name, description }, index) => (
              <p
                key={name}
                aria-hidden={index !== selected}
                className="col-start-1 row-start-1 text-preset-9-mobile text-muted aria-hidden:invisible md:text-preset-9-tablet lg:text-preset-9"
              >
                {description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
