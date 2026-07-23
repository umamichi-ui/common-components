import { useEffect } from 'react';
import { acquirePreservedScrollbar, releasePreservedScrollbar } from './preserveScrollbar';

/**
 * While `active`, hold a named scroll-lock slot (ref-counted across overlays).
 */
export function usePreservedScrollbar(reason: string, active: boolean): void {
  useEffect(() => {
    if (!active) {
      return;
    }

    acquirePreservedScrollbar(reason);
    return () => releasePreservedScrollbar(reason);
  }, [active, reason]);
}
