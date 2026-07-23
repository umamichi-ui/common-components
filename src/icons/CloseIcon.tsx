export type CloseIconProps = {
  className?: string;
};

const closePathProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
};

export function CloseIcon({ className = 'close-icon' }: CloseIconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
      <path d="M4 4 L12 12 M12 4 L4 12" {...closePathProps} />
    </svg>
  );
}
