import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid p-6 md:px-10 md:py-32">
      <div className="mx-auto flex w-full max-w-277.5 flex-col items-center lg:flex-row lg:justify-between lg:self-end">
        <div className="grid gap-6 text-center md:max-w-lg lg:max-w-135 lg:text-left">
          <h1 className="grid gap-6 uppercase">
            <span className="font-condensed text-preset-5-mobile text-muted md:text-preset-5">
              So, you want to travel to
            </span>{" "}
            <span className="font-serif text-preset-1-mobile md:text-preset-1">
              Space
            </span>
          </h1>
          <p className="text-preset-9-mobile text-muted md:text-preset-9-tablet lg:text-preset-9">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>

        <div className="grid flex-1 place-items-center py-8 md:items-end md:pb-0 lg:flex-none lg:py-0">
          <Link
            href="/destination"
            className="grid size-36 place-items-center rounded-full bg-white font-serif text-preset-4-mobile text-night uppercase ring-white/10 transition-[box-shadow,color] duration-300 hover:text-night/50 hover:ring-88 motion-reduce:transition-none md:size-68 md:text-preset-4"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
