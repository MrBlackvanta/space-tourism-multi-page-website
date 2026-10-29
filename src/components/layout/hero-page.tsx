import Link from "next/link";

type HeroPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  link: { label: string; href: string };
};

export default function HeroPage({
  eyebrow,
  title,
  description,
  link,
}: HeroPageProps) {
  return (
    <div className="grid overflow-x-clip p-6 v-page md:px-10 md:py-32">
      <div className="mx-auto flex w-full max-w-277.5 flex-col items-center lg:flex-row lg:justify-between lg:self-end">
        <div className="grid gap-6 text-center md:max-w-lg lg:max-w-135 lg:text-left">
          <h1 className="grid gap-6 uppercase">
            <span className="v-focus-in font-condensed text-preset-5-mobile text-muted md:text-preset-5 lg:text-muted-light">
              {eyebrow}
            </span>{" "}
            <span className="v-focus-in font-serif text-preset-1-mobile [--delay:0.1s] md:text-preset-1">
              {title}
            </span>
          </h1>
          <p className="v-focus-in text-preset-9-mobile text-muted [--delay:0.25s] md:text-preset-9-tablet lg:text-preset-9">
            {description}
          </p>
        </div>

        <div className="grid flex-1 place-items-center py-8 md:items-end md:pb-0 lg:flex-none lg:py-0">
          <Link
            href={link.href}
            className="v-orbit relative grid size-36 v-pop-in place-items-center rounded-full bg-white font-serif text-preset-4-mobile text-night uppercase ring-white/10 transition-[box-shadow,color] duration-300 [--delay:0.45s] hover:text-night/50 hover:ring-88 motion-reduce:transition-none md:size-68 md:text-preset-4"
          >
            {link.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
