import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/ChevronIcons';

export type MobileActionSheetActionItem = {
  kind: 'item';
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  title?: string;
  onSelect: () => void;
};

export type MobileActionSheetSubmenuItem = {
  kind: 'submenu';
  id: string;
  label: string;
  icon: ReactNode;
  items: MobileActionSheetActionItem[];
};

export type MobileActionSheetSeparatorItem = {
  kind: 'separator';
  id: string;
};

export type MobileActionSheetEntry =
  | MobileActionSheetActionItem
  | MobileActionSheetSubmenuItem
  | MobileActionSheetSeparatorItem;

export type MobileActionSheetContentProps = {
  ariaLabel: string;
  entries: MobileActionSheetEntry[];
  open: boolean;
  onRequestDismiss: () => void;
  backAriaLabel?: string;
};

const ROOT_PANEL = 'root';

export function MobileActionSheetContent({
  ariaLabel,
  entries,
  open,
  onRequestDismiss,
  backAriaLabel = '返回',
}: MobileActionSheetContentProps) {
  const [activePanel, setActivePanel] = useState(ROOT_PANEL);

  useEffect(() => {
    if (!open) {
      setActivePanel(ROOT_PANEL);
    }
  }, [open]);

  const handleDismiss = () => {
    setActivePanel(ROOT_PANEL);
    onRequestDismiss();
  };

  const submenuById = new Map(
    entries.filter((e): e is MobileActionSheetSubmenuItem => e.kind === 'submenu').map((e) => [e.id, e]),
  );
  const activeSubmenu = activePanel === ROOT_PANEL ? null : submenuById.get(activePanel);

  const renderActionItem = (item: MobileActionSheetActionItem, closeOnSelect: boolean) => (
    <li key={item.id} className="mobile-action-sheet-list-item" role="none">
      <button
        type="button"
        className="mobile-action-sheet-item"
        role="menuitem"
        disabled={item.disabled}
        title={item.title}
        onClick={() => {
          if (item.disabled) {
            return;
          }
          item.onSelect();
          if (closeOnSelect) {
            handleDismiss();
          }
        }}
      >
        {item.icon ? (
          <span className="mobile-action-sheet-item-icon" aria-hidden="true">
            {item.icon}
          </span>
        ) : null}
        <span className="mobile-action-sheet-item-label">{item.label}</span>
      </button>
    </li>
  );

  const rootPanel = (
    <div className="mobile-action-sheet-panel" role="menu" aria-label={ariaLabel}>
      <ul className="mobile-action-sheet-list">
        {entries.map((entry) => {
          if (entry.kind === 'separator') {
            return (
              <li key={entry.id} className="mobile-action-sheet-list-item" role="none">
                <div className="mobile-action-sheet-separator" role="separator" />
              </li>
            );
          }

          if (entry.kind === 'submenu') {
            return (
              <li key={entry.id} className="mobile-action-sheet-list-item" role="none">
                <button
                  type="button"
                  className="mobile-action-sheet-item mobile-action-sheet-item--submenu"
                  role="menuitem"
                  aria-haspopup="menu"
                  onClick={() => setActivePanel(entry.id)}
                >
                  <span className="mobile-action-sheet-item-icon" aria-hidden="true">
                    {entry.icon}
                  </span>
                  <span className="mobile-action-sheet-item-label">{entry.label}</span>
                  <ChevronRightIcon className="mobile-action-sheet-item-chevron" />
                </button>
              </li>
            );
          }

          return renderActionItem(entry, true);
        })}
      </ul>
    </div>
  );

  const hasSubmenus = entries.some((e) => e.kind === 'submenu');
  const onSubmenu = activeSubmenu !== null && activeSubmenu !== undefined;

  return (
    <div
      className="mobile-action-sheet"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={
          hasSubmenus ? 'mobile-action-sheet-panels mobile-action-sheet-panels--slide' : 'mobile-action-sheet-panels'
        }
        style={hasSubmenus ? { transform: onSubmenu ? 'translateX(-50%)' : 'none' } : undefined}
      >
        {rootPanel}
        {hasSubmenus ? (
          <div
            className="mobile-action-sheet-panel"
            role="menu"
            aria-label={activeSubmenu?.label}
            aria-hidden={!onSubmenu}
          >
            {activeSubmenu ? (
              <>
                <div className="mobile-action-sheet-subheader">
                  <button
                    type="button"
                    className="mobile-action-sheet-back"
                    aria-label={backAriaLabel}
                    onClick={() => setActivePanel(ROOT_PANEL)}
                  >
                    <ChevronLeftIcon className="mobile-action-sheet-back-chevron" />
                  </button>
                  <span className="mobile-action-sheet-subheader-title">{activeSubmenu.label}</span>
                </div>
                <ul className="mobile-action-sheet-list">
                  {activeSubmenu.items.map((item) => renderActionItem(item, true))}
                </ul>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
