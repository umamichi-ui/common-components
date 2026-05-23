import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { mergeOverlayRefs, useOverlayPresence, withOverlayOpen } from '../presence/useOverlayPresence';
import { DropdownMenuChevron } from '../icons/DropdownMenuChevron';
import { useFloatingMenuGeometry } from './useFloatingMenuGeometry';

export type FloatingMenuItem = {
  kind: 'item';
  id: string;
  label: ReactNode;
  disabled?: boolean;
  title?: string;
  onSelect: () => void;
};

export type FloatingMenuSeparator = {
  kind: 'separator';
  id: string;
};

export type FloatingMenuEntry = FloatingMenuItem | FloatingMenuSeparator;

export type FloatingMenuTriggerVariant = 'labeled' | 'icon';

export type FloatingMenuProps = {
  menuAriaLabel: string;
  items: FloatingMenuEntry[];
  triggerLabel?: ReactNode;
  triggerIcon?: ReactNode;
  triggerVariant?: FloatingMenuTriggerVariant;
  triggerClassName?: string;
  triggerAriaLabel?: string;
  scrollRootSelector?: string;
  wrapClassName?: string;
};

function IconDropdownTriggerContent({ icon }: { icon: ReactNode }) {
  return (
    <>
      {icon}
      <span className="dropdown-menu-trigger-caret" aria-hidden="true">
        <DropdownMenuChevron />
      </span>
    </>
  );
}

export function FloatingMenu({
  menuAriaLabel,
  items,
  triggerLabel,
  triggerIcon,
  triggerVariant = 'labeled',
  triggerClassName,
  triggerAriaLabel,
  scrollRootSelector,
  wrapClassName = 'dropdown-menu',
}: FloatingMenuProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const { mounted: menuMounted, isOpen: menuShown, overlayRef: menuOverlayRef } =
    useOverlayPresence<HTMLUListElement>(menuOpen);
  const { menuPanelRef, triggerRef, menuGeometry } = useFloatingMenuGeometry({
    menuOpen,
    menuMounted,
    scrollRootSelector,
  });

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || menuPanelRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, [menuOpen, menuPanelRef]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [menuOpen]);

  const menuPanel = menuMounted ? (
    <ul
      ref={mergeOverlayRefs(menuOverlayRef, menuPanelRef)}
      id={menuId}
      className={withOverlayOpen('dropdown-menu-panel', menuShown && menuGeometry !== null)}
      role="menu"
      aria-label={menuAriaLabel}
      style={{
        top: menuGeometry?.top ?? -9999,
        left: menuGeometry?.left ?? -9999,
        maxHeight: menuGeometry?.maxHeight,
        overflowY: menuGeometry?.maxHeight ? 'auto' : undefined,
      }}
    >
      {items.map((entry) => {
        if (entry.kind === 'separator') {
          return (
            <li key={entry.id} className="dropdown-menu-separator" role="separator" aria-orientation="horizontal" />
          );
        }

        return (
          <li key={entry.id} role="none">
            <button
              type="button"
              className="dropdown-menu-item"
              role="menuitem"
              disabled={entry.disabled}
              title={entry.title}
              onClick={() => {
                if (entry.disabled) {
                  return;
                }
                entry.onSelect();
                setMenuOpen(false);
              }}
            >
              {entry.label}
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  const resolvedTriggerClassName =
    triggerClassName ??
    (triggerVariant === 'icon'
      ? 'icon-button dropdown-menu-trigger dropdown-menu-trigger--icon'
      : 'secondary-button dropdown-menu-trigger');

  return (
    <div className={wrapClassName} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={resolvedTriggerClassName}
        aria-label={triggerAriaLabel ?? (triggerVariant === 'icon' ? menuAriaLabel : undefined)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {triggerVariant === 'icon' ? (
          <IconDropdownTriggerContent icon={triggerIcon} />
        ) : (
          <>
            {triggerLabel}
            {' '}
            <DropdownMenuChevron />
          </>
        )}
      </button>
      {menuPanel ? createPortal(menuPanel, document.body) : null}
    </div>
  );
}
