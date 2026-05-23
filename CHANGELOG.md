# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> 以下文本由 LLM 生成，且未经人工检查，请谨慎对待

## [Unreleased]

## [0.1.0] - 2026-05-23

First public release. Components were extracted from [njmetro-railmap-creator](https://github.com/kyuri-metro/njmetro-railmap-creator) for reuse across Umamichi sites.

### Added

- **`presence`**: `useOverlayPresence`, `withOverlayOpen`, `mergeOverlayRefs` — mount/open transitions without the overlay stack.
- **`overlay`**: `OverlayStackProvider`, `useOverlayStack`, `useOverlayStackEntry`, `SiteOverlayBackdrop` — z-index stacking, Escape to dismiss top layer, browser History API sync (`pushState` / `popstate`).
- **`icons`**: `ChevronLeftIcon`, `ChevronRightIcon`, `DropdownMenuChevron`, `InfoCircleIcon`.
- **`menu`**: `FloatingMenu` (viewport-positioned dropdown, outside-click and Escape); `MobileActionSheet` and `MobileActionSheetContent` (bottom sheet with optional submenu slide); `computeFloatingMenuGeometry`, `useFloatingMenuGeometry`.
- **`dialog`**: `ConfirmDialog` (title/body/actions shell); `ConfirmDialogOverlay`; configurable `AboutDialog` template.
- **`styles.css`**: overlay backdrop layout, mobile action sheet, and about-dialog styles (expects `@umamichi-ui/common-css` design tokens).
- Subpath exports: `@umamichi-ui/common-components`, `/presence`, `/overlay`, `/icons`, `/menu`, `/dialog`, `/styles.css`.
- README dependency diagram (Mermaid) and module coupling notes.

### Peer dependencies

- `react`, `react-dom` (^18 || ^19)
- `@umamichi-ui/common-css` (>=0.8.0)

[Unreleased]: https://github.com/umamichi-ui/common-components/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/umamichi-ui/common-components/releases/tag/v0.1.0
