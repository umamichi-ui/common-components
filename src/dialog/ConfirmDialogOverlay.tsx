import type { ReactNode, RefObject } from 'react';
import { FullscreenOverlay, type FullscreenOverlaySize } from '../overlay/FullscreenOverlay';

export type ConfirmDialogOverlayProps = {
  open: boolean;
  overlayId: string;
  onDismiss: () => void;
  /** Shell title (mobile fullscreen / desktop dialog chrome). */
  title: ReactNode;
  onExited?: () => void;
  children: ReactNode;
  /** Desktop size. Mobile is always fullscreen. Default: `compact`. */
  size?: FullscreenOverlaySize;
  dismissOnEscape?: boolean;
  focusManagement?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeAriaLabel?: string;
  titleId?: string;
  bodyClassName?: string;
  panelClassName?: string;
};

export function ConfirmDialogOverlay({
  open,
  overlayId,
  onDismiss,
  title,
  onExited,
  children,
  size = 'compact',
  dismissOnEscape = true,
  focusManagement = true,
  initialFocusRef,
  closeAriaLabel,
  titleId,
  bodyClassName,
  panelClassName,
}: ConfirmDialogOverlayProps) {
  return (
    <FullscreenOverlay
      open={open}
      overlayId={overlayId}
      onDismiss={onDismiss}
      title={title}
      size={size}
      onExited={onExited}
      dismissOnEscape={dismissOnEscape}
      focusManagement={focusManagement}
      initialFocusRef={initialFocusRef}
      closeAriaLabel={closeAriaLabel}
      titleId={titleId}
      bodyClassName={bodyClassName}
      panelClassName={panelClassName}
    >
      {children}
    </FullscreenOverlay>
  );
}
