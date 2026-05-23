import { useLayoutEffect, useRef, useState } from 'react';
import { computeFloatingMenuGeometry, type FloatingMenuGeometry } from './computeFloatingMenuGeometry';

export type UseFloatingMenuGeometryOptions = {
  menuOpen: boolean;
  menuMounted: boolean;
  /** 额外监听 scroll 的容器选择器（如 `.app-main`） */
  scrollRootSelector?: string;
};

export function useFloatingMenuGeometry({
  menuOpen,
  menuMounted,
  scrollRootSelector,
}: UseFloatingMenuGeometryOptions) {
  const menuPanelRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [menuGeometry, setMenuGeometry] = useState<FloatingMenuGeometry | null>(null);

  useLayoutEffect(() => {
    if (!menuOpen || !menuMounted) {
      setMenuGeometry(null);
      return;
    }

    const update = () => {
      const trigger = triggerRef.current;
      const menu = menuPanelRef.current;
      if (!trigger || !menu) {
        return;
      }
      setMenuGeometry(computeFloatingMenuGeometry(trigger, menu));
    };

    update();

    const scrollRoots: HTMLElement[] = [];
    if (scrollRootSelector) {
      const root = document.querySelector<HTMLElement>(scrollRootSelector);
      if (root) {
        scrollRoots.push(root);
      }
    }

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    for (const root of scrollRoots) {
      root.addEventListener('scroll', update, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      for (const root of scrollRoots) {
        root.removeEventListener('scroll', update);
      }
    };
  }, [menuOpen, menuMounted, scrollRootSelector]);

  return { menuPanelRef, triggerRef, menuGeometry };
}
