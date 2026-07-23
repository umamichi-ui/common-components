import { useEffect, useId, type MouseEventHandler, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeftIcon } from '../icons/ChevronIcons';
import { CloseIcon } from '../icons/CloseIcon';
import { mergeOverlayRefs, useOverlayPresence, withOverlayOpen } from '../presence/useOverlayPresence';
import { useOverlayFocus } from './useOverlayFocus';
import { useOverlayStackEntry } from './useOverlayStackEntry';
import { usePreservedScrollbar } from './usePreservedScrollbar';

export type FullscreenOverlaySize = 'compact' | 'page';

export type FullscreenOverlayProps = {
  open: boolean;
  overlayId: string;
  onDismiss: () => void;
  title: ReactNode;
  children: ReactNode;
  /** Desktop max-width preset. Mobile is always edge-to-edge fullscreen. Default: `page`. */
  size?: FullscreenOverlaySize;
  /**
   * Desktop only: give the panel a definite height and let the body fill remaining space
   * (split panes / iframes). Pair with a height rule on `panelClassName`.
   */
  fill?: boolean;
  onExited?: () => void;
  dismissOnEscape?: boolean;
  focusManagement?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeAriaLabel?: string;
  titleId?: string;
  /** Extra class on the panel (alongside `fullscreen-overlay`). */
  panelClassName?: string;
  /** Extra class on the scrollable body. */
  bodyClassName?: string;
  /** When false, omit toolbar + title; children fill the panel. */
  chrome?: boolean;
};

/**
 * Responsive overlay shell: mobile edge-to-edge fullscreen (slide up + back),
 * desktop centered dialog (close X). Title typography follows `.confirm-dialog-title`.
 * Chrome button placement follows umamichi.moe history window.
 * Frosted glass lives on the portal root (same pattern as `SiteOverlayBackdrop`).
 */
export function FullscreenOverlay({
  open,
  overlayId,
  onDismiss,
  title,
  children,
  size = 'page',
  fill = false,
  onExited,
  dismissOnEscape = true,
  focusManagement = true,
  initialFocusRef,
  closeAriaLabel = '关闭',
  titleId: titleIdProp,
  panelClassName,
  bodyClassName,
  chrome = true,
}: FullscreenOverlayProps) {
  const generatedTitleId = useId();
  const titleId = titleIdProp ?? generatedTitleId;
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

  usePreservedScrollbar(overlayId, mounted);

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

  const sizeClass = size === 'compact' ? ' fullscreen-overlay--compact' : ' fullscreen-overlay--page';
  const fillClass = fill ? ' fullscreen-overlay--fill' : '';
  const chromeClass = chrome ? '' : ' fullscreen-overlay--no-chrome';
  const inactiveClass = isBackdropActive ? '' : ' fullscreen-overlay-root-inactive';
  const panelClasses = withOverlayOpen(
    `fullscreen-overlay${sizeClass}${fillClass}${chromeClass}${panelClassName ? ` ${panelClassName}` : ''}`,
    isOpen,
  );

  return createPortal(
    <div
      ref={mergeOverlayRefs(overlayRef)}
      className={withOverlayOpen(`fullscreen-overlay-root${inactiveClass}`, isOpen)}
      style={{ zIndex }}
      role="presentation"
      onClick={onBackdropClick}
    >
      <div
        className={panelClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={chrome ? titleId : undefined}
        aria-label={chrome ? undefined : typeof title === 'string' ? title : closeAriaLabel}
        onClick={(event) => event.stopPropagation()}
      >
        {chrome ? (
          <>
            <header className="fullscreen-overlay__toolbar">
              <button
                type="button"
                className="fullscreen-overlay__chrome-button fullscreen-overlay__back"
                aria-label={closeAriaLabel}
                onClick={onDismiss}
              >
                <ChevronLeftIcon className="fullscreen-overlay__chrome-icon" />
              </button>
              <button
                type="button"
                className="fullscreen-overlay__chrome-button fullscreen-overlay__close"
                aria-label={closeAriaLabel}
                onClick={onDismiss}
              >
                <CloseIcon className="fullscreen-overlay__chrome-icon" />
              </button>
            </header>
            <h2 id={titleId} className="fullscreen-overlay__title">
              {title}
            </h2>
          </>
        ) : null}
        <div className={bodyClassName ? `fullscreen-overlay__body ${bodyClassName}` : 'fullscreen-overlay__body'}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
