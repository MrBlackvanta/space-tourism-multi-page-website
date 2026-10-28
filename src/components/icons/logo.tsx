export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fillRule="evenodd"
      aria-hidden="true"
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="#fff" />
      <path
        fill="#0b0d17"
        d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
      />
    </svg>
  );
}
