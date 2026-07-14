export type FloatingMenuGeometry = {
  top: number;
  left: number;
  maxHeight?: number;
};

export type ComputeFloatingMenuGeometryOptions = {
  pad?: number;
  gap?: number;
  minScrollHeight?: number;
};

/** Read full content height even if the panel is currently height-constrained. */
function readUnconstrainedMenuHeight(menu: HTMLElement): number {
  const previousMaxHeight = menu.style.maxHeight;
  const previousOverflowY = menu.style.overflowY;
  menu.style.maxHeight = 'none';
  menu.style.overflowY = 'visible';
  const height = menu.offsetHeight;
  menu.style.maxHeight = previousMaxHeight;
  menu.style.overflowY = previousOverflowY;
  return height;
}

/**
 * Cap scrollable panel height to the chosen side's available space (never past the viewport pad).
 * `minScrollHeight` is only used when available space collapses to ~0.
 */
function resolveMaxHeight(available: number, minScrollHeight: number, vh: number, pad: number): number {
  const viewportCap = Math.max(0, vh - 2 * pad);
  const usable = Math.max(0, Math.min(available, viewportCap));
  if (usable > 0) {
    return usable;
  }
  return Math.min(minScrollHeight, viewportCap);
}

export function computeFloatingMenuGeometry(
  trigger: HTMLElement,
  menu: HTMLElement,
  options: ComputeFloatingMenuGeometryOptions = {},
): FloatingMenuGeometry {
  const pad = options.pad ?? 8;
  const gap = options.gap ?? 4;
  const minScrollHeight = options.minScrollHeight ?? 120;
  const rect = trigger.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const menuWidth = menu.offsetWidth;
  const contentHeight = readUnconstrainedMenuHeight(menu);

  let left = rect.right - menuWidth;
  if (left < pad) {
    left = rect.left;
  }
  left = Math.max(pad, Math.min(left, vw - menuWidth - pad));

  const topBelow = rect.bottom + gap;
  const spaceBelow = vh - pad - topBelow;
  const spaceAbove = rect.top - gap - pad;

  if (contentHeight <= spaceBelow) {
    return { top: topBelow, left };
  }

  if (contentHeight <= spaceAbove) {
    return { top: rect.top - gap - contentHeight, left };
  }

  // Content taller than both sides — open toward the larger side and scroll inside.
  if (spaceBelow >= spaceAbove) {
    return {
      top: topBelow,
      left,
      maxHeight: resolveMaxHeight(spaceBelow, minScrollHeight, vh, pad),
    };
  }

  const maxHeight = resolveMaxHeight(spaceAbove, minScrollHeight, vh, pad);
  return {
    top: Math.max(pad, rect.top - gap - maxHeight),
    left,
    maxHeight,
  };
}
