# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> 以下文本由 LLM 生成，且未经人工检查，请谨慎对待

## [Unreleased]

## [0.3.2] - 2026-06-30

### Changed

- 开发依赖 `@umamichi-ui/common-css` 升至 `^0.18.0`（按钮 `:active` scale 按下反馈）。

## [0.3.1] - 2026-06-28

### Fixed

- `useOverlayPresence`：打开叠层时改用 `useLayoutEffect` + 强制 layout + 单帧 `requestAnimationFrame` 再添加 `is-open`，避免移动端偶发跳过 CSS 进出场过渡（原 `useEffect` + 双 `rAF` 竞态）。

## [0.2.0] - 2026-06-27

### Changed

- `about-dialog.css`、`mobile-action-sheet.css`：字号与字重对齐 common-css `--site-weight-*` 尺度（应用名/菜单项 `regular`，分区小标题 `semibold`；次要文案 `0.875rem`）。

### Peer dependencies

- `@umamichi-ui/common-css` 升至 `>=0.16.0`（壳层字重 token）。

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

[Unreleased]: https://github.com/umamichi-ui/common-components/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/umamichi-ui/common-components/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/umamichi-ui/common-components/releases/tag/v0.1.0
