/**
 * Freeze page scroll while an overlay is open without `position: fixed` on body.
 * Fixed body breaks `backdrop-filter` sampling (milky white instead of blur),
 * especially after mobile→desktop layout changes.
 *
 * Technique: always reserve the scrollbar gutter, then `overflow: hidden` on html.
 * Pair with styles from `@umamichi-ui/common-components/styles.css`.
 */

const holders = new Set<string>();
let preservedScrollY = 0;

function applyPreservedScrollbar(): void {
  preservedScrollY = window.scrollY;
  document.documentElement.dataset.sitePreserveScrollbar = 'true';
}

function clearPreservedScrollbar(): void {
  delete document.documentElement.dataset.sitePreserveScrollbar;
  window.scrollTo(0, preservedScrollY);
}

export function acquirePreservedScrollbar(reason: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const wasEmpty = holders.size === 0;
  holders.add(reason);

  if (wasEmpty) {
    applyPreservedScrollbar();
  }
}

export function releasePreservedScrollbar(reason: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (!holders.delete(reason) || holders.size > 0) {
    return;
  }

  clearPreservedScrollbar();
}
