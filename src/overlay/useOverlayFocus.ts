import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1,
  );
}

export type UseOverlayFocusOptions = {
  enabled?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Stack-aware focus management for modal overlays: initial focus, Tab trap while active,
 * restore focus when the overlay session closes. Only traps while `active` (typically top layer).
 */
export function useOverlayFocus(
  containerRef: RefObject<HTMLElement | null>,
  open: boolean,
  active: boolean,
  { enabled = true, initialFocusRef }: UseOverlayFocusOptions = {},
) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const openSessionRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!open) {
      const toRestore = previouslyFocusedRef.current;
      previouslyFocusedRef.current = null;
      openSessionRef.current = false;
      toRestore?.focus();
      return;
    }

    if (!openSessionRef.current) {
      previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      openSessionRef.current = true;
    }

    if (!active) {
      return;
    }

    const focusInitial = () => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      getFocusableElements(container)[0]?.focus();
    };

    const raf = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const focusables = getFocusableElements(container);
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, containerRef, enabled, initialFocusRef, open]);
}
