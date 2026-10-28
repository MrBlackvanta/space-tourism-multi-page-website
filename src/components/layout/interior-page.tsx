type InteriorPageProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export default function InteriorPage({
  number,
  title,
  children,
}: InteriorPageProps) {
  return (
    <div className="grid p-6 md:p-10 lg:py-12">
      <div className="mx-auto grid w-full max-w-277.5 grid-rows-[auto_1fr] gap-6">
        <h1 className="flex justify-center gap-6 font-condensed text-preset-5-mobile uppercase md:justify-start md:text-preset-5-tablet lg:text-preset-5">
          <span
            aria-hidden="true"
            className="mr-[-0.15em] font-bold text-white/50 md:text-white/35 lg:text-white/50"
          >
            {number}
          </span>
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
