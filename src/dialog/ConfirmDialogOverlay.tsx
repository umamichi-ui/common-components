import type { ReactNode, RefObject } from 'react';
import { SiteOverlayBackdrop, type SiteOverlayAlign } from '../overlay/SiteOverlayBackdrop';

export type ConfirmDialogOverlayProps = {
  open: boolean;
  overlayId: string;
  onDismiss: () => void;
  onExited?: () => void;
  children: ReactNode;
  align?: SiteOverlayAlign;
  dismissOnEscape?: boolean;
  focusManagement?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

export function ConfirmDialogOverlay({
  open,
  overlayId,
  onDismiss,
  onExited,
  children,
  align = 'centered',
  dismissOnEscape = true,
  focusManagement = true,
  initialFocusRef,
}: ConfirmDialogOverlayProps) {
  return (
    <SiteOverlayBackdrop
      open={open}
      overlayId={overlayId}
      align={align}
      onDismiss={onDismiss}
      onExited={onExited}
      dismissOnEscape={dismissOnEscape}
      focusManagement={focusManagement}
      initialFocusRef={initialFocusRef}
    >
      {children}
    </SiteOverlayBackdrop>
  );
}
