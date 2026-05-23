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
  const menuHeight = menu.offsetHeight;

  let left = rect.right - menuWidth;
  if (left < pad) {
    left = rect.left;
  }
  left = Math.max(pad, Math.min(left, vw - menuWidth - pad));

  let top = rect.bottom + gap;
  let maxHeight: number | undefined;
  if (top + menuHeight > vh - pad) {
    const topIfAbove = rect.top - gap - menuHeight;
    if (topIfAbove >= pad) {
      top = topIfAbove;
    } else {
      maxHeight = Math.max(minScrollHeight, vh - pad - top);
    }
  }
  return { top, left, maxHeight };
}
