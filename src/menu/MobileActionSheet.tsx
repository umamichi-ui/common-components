import { SiteOverlayBackdrop } from '../overlay/SiteOverlayBackdrop';
import {
  MobileActionSheetContent,
  type MobileActionSheetContentProps,
  type MobileActionSheetEntry,
} from './MobileActionSheetContent';

export type MobileActionSheetProps = {
  open: boolean;
  overlayId: string;
  onDismiss: () => void;
} & Omit<MobileActionSheetContentProps, 'onRequestDismiss' | 'open'>;

export function MobileActionSheet({ open, overlayId, onDismiss, ...contentProps }: MobileActionSheetProps) {
  return (
    <SiteOverlayBackdrop open={open} overlayId={overlayId} align="bottom" onDismiss={onDismiss}>
      <MobileActionSheetContent {...contentProps} open={open} onRequestDismiss={onDismiss} />
    </SiteOverlayBackdrop>
  );
}

export type { MobileActionSheetEntry };
