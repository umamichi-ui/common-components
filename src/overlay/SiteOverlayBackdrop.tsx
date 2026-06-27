import type { MouseEventHandler, ReactNode, RefObject } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayPresence, withOverlayOpen } from '../presence/useOverlayPresence';
import { useOverlayStackEntry } from './useOverlayStackEntry';
import { useOverlayFocus } from './useOverlayFocus';

export type SiteOverlayAlign = 'centered' | 'top' | 'bottom';

const alignClassName: Record<SiteOverlayAlign, string> = {
  centered: 'site-overlay-backdrop site-overlay-backdrop--centered',
  top: 'site-overlay-backdrop site-overlay-backdrop--top',
  bottom: 'site-overlay-backdrop site-overlay-backdrop--bottom',
};

export type SiteOverlayBackdropProps = {
  open: boolean;
  overlayId: string;
  align?: SiteOverlayAlign;
  onDismiss: () => void;
  onExited?: () => void;
  dismissOnEscape?: boolean;
  focusManagement?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
};

export function SiteOverlayBackdrop({
  open,
  overlayId,
  align = 'centered',
  onDismiss,
  onExited,
  dismissOnEscape = true,
  focusManagement = true,
  initialFocusRef,
  children,
}: SiteOverlayBackdropProps) {
  const { mounted, isOpen, overlayRef } = useOverlayPresence<HTMLDivElement>(open);
  const { isBackdropActive, zIndex } = useOverlayStackEntry({
    id: overlayId,
    open,
    onDismiss,
    dismissOnEscape,
  });

  useOverlayFocus(overlayRef, open, open && isBackdropActive && isOpen, {
    enabled: focusManagement,
    initialFocusRef,
  });

  useEffect(() => {
    if (!mounted) {
      onExited?.();
    }
  }, [mounted, onExited]);

  if (!mounted) {
    return null;
  }

  const onBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isBackdropActive || event.target !== event.currentTarget) {
      return;
    }

    onDismiss();
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={withOverlayOpen(
        `${alignClassName[align]}${isBackdropActive ? '' : ' site-overlay-backdrop-inactive'}`,
        isOpen,
      )}
      style={{ zIndex }}
      role="presentation"
      onClick={onBackdropClick}
    >
      {children}
    </div>,
    document.body,
  );
}
