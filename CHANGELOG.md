# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> 以下文本由 LLM 生成，且未经人工检查，请谨慎对待

## [Unreleased]

### Changed

- `FullscreenOverlay` 桌面面板：声明 `--chromatic-fringe-border: var(--site-border-strong)`，配合 `@umamichi-ui/chromatic-fringe` ≥ `0.4.4` 的 dialog 盒缘 fade（由应用侧 `initChromaticFringe` 扫描挂载；本包不硬依赖 init）。

## [0.4.5] - 2026-08-06

### Fixed

- `.mobile-action-sheet-item-icon`：改为 `color: inherit`，不再使用 `--site-header-fg`。暗色模式下 sheet 为深色表面时，条目图标会与正文同为浅色。

## [0.4.4] - 2026-08-06

### Changed

- 下列可点面设置 `-webkit-tap-highlight-color: transparent`：`.fullscreen-overlay__chrome-button`、`.fullscreen-overlay-root`、`.site-overlay-backdrop`、`.mobile-action-sheet-back`。

## [0.4.3] - 2026-08-06

### Changed

- `.mobile-action-sheet-item`：设置 `-webkit-tap-highlight-color: transparent`，避免与已有 `:active` 背景反馈叠系统灰闪。

## [0.4.2] - 2026-08-03

### Fixed

- `FloatingMenu`：把 `overflow-y` / `overscroll-behavior` 移到内层 `.dropdown-menu-panel__list`，外壳只负责定位、chrome 与 chromatic fringe。避免 Android Chromium 上 fringe 伪元素卡在内容滚动偏移。需配合 `@umamichi-ui/common-css` ≥ `0.19.3`。

### Changed

- peer / 开发依赖 `@umamichi-ui/common-css` 升至 `>=0.19.3` / `^0.19.3`（下拉内层滚动列表样式）。

## [0.4.1] - 2026-07-24

### Fixed

- `preserveScrollbar`：不再把 `body` 设为 `position: fixed`（改用 `scrollbar-gutter: stable` + `html { overflow: hidden }`），避免毛玻璃采不到页面、拉宽后变白雾。
- `FullscreenOverlay`：毛玻璃改为独立层，并在桌面断点切换时重挂载以强制重绘。
- `FullscreenOverlay`：桌面面板用 `width: min(100%, …)` + `flex: none` 居中；避免 `100vw`（会含滚动条宽度，导致面板偏左、右侧多出一块毛玻璃）。

## [0.4.0] - 2026-07-24

### Added

- `FullscreenOverlay`：移动端全屏 / 桌面居中对话框壳，可选 WPM 进出场。
- `preserveScrollbar` / `usePreservedScrollbar`：叠层打开时保留滚动条槽位。

### Changed

- `ConfirmDialogOverlay` / `AboutDialog` 改为基于 `FullscreenOverlay`。

## [0.3.3] - 2026-07-15

### Fixed

- `FloatingMenu` / `computeFloatingMenuGeometry`：按未限高的内容高度与上下可用空间决定开合方向与 `maxHeight`，避免限高后重算误清 `maxHeight` 导致底部项无法点选。
- `useFloatingMenuGeometry`：忽略菜单面板自身的 `scroll`，避免滚菜单时反复重算位置而抖动。
- `FloatingMenu`：可滚动时设置 `overscroll-behavior: contain`，减轻滚轮/触控溢出传到页面。

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

[Unreleased]: https://github.com/umamichi-ui/common-components/compare/v0.3.3...HEAD
[0.3.3]: https://github.com/umamichi-ui/common-components/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/umamichi-ui/common-components/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/umamichi-ui/common-components/compare/v0.2.0...v0.3.1
[0.2.0]: https://github.com/umamichi-ui/common-components/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/umamichi-ui/common-components/releases/tag/v0.1.0
