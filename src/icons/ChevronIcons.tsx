export type ChevronIconProps = {
  className?: string;
};

const chevronPathProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
};

export function ChevronRightIcon({ className = 'chevron-icon' }: ChevronIconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
      <path d="M6 4 L10 8 L6 12" {...chevronPathProps} />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'chevron-icon' }: ChevronIconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
      <path d="M10 4 L6 8 L10 12" {...chevronPathProps} />
    </svg>
  );
}
