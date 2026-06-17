type TickIconProps = {
  className?: string;
};

export function TickIcon({ className }: TickIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 9.54546L4.63349 11.4553C5.05711 11.7625 5.64594 11.6912 5.98395 11.2917L13 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
