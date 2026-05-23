import type { ReactNode } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { ConfirmDialogOverlay } from './ConfirmDialogOverlay';

export type AboutDialogLink = {
  label: string;
  href: string;
};

export type AboutDialogSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export type AboutDialogProps = {
  open: boolean;
  overlayId: string;
  onClose: () => void;
  appName: string;
  version: string;
  channelLabel?: ReactNode;
  tagline?: ReactNode;
  copyrightYear: number;
  copyrightHolder?: string;
  sections?: AboutDialogSection[];
  links?: AboutDialogLink[];
  dialogTitle?: string;
  closeLabel?: string;
};

export function AboutDialog({
  open,
  overlayId,
  onClose,
  appName,
  version,
  channelLabel,
  tagline,
  copyrightYear,
  copyrightHolder = 'Umamichi',
  sections = [],
  links = [],
  dialogTitle = '关于',
  closeLabel = '确定',
}: AboutDialogProps) {
  return (
    <ConfirmDialogOverlay open={open} overlayId={overlayId} onDismiss={onClose}>
      <ConfirmDialog
        title={dialogTitle}
        titleId="about-dialog-title"
        className="confirm-dialog about-dialog"
        bodyClassName="confirm-dialog-body about-dialog-body"
        onClick={(event) => event.stopPropagation()}
        actionsClassName="confirm-dialog-actions about-dialog-actions"
        actions={
          <button type="button" className="primary-button" onClick={onClose}>
            {closeLabel}
          </button>
        }
      >
        <div className="about-dialog-product">
          <p className="about-dialog-app-name">{appName}</p>
          <p className="about-dialog-version">
            版本 {version}
            {channelLabel ? <span className="about-dialog-channel">{channelLabel}</span> : null}
          </p>
          {tagline ? <p className="about-dialog-tagline">{tagline}</p> : null}
        </div>

        <p className="about-dialog-copyright">
          © {copyrightYear} {copyrightHolder}
        </p>

        {sections.length > 0 || links.length > 0 ? <hr className="about-dialog-divider" /> : null}

        {sections.map((section) => (
          <section key={section.id} className="about-dialog-section" aria-labelledby={section.id}>
            <h3 id={section.id} className="about-dialog-section-title">
              {section.title}
            </h3>
            <div className="about-dialog-section-text">{section.content}</div>
          </section>
        ))}

        {links.length > 0 ? (
          <dl className="about-dialog-meta">
            {links.map((link) => (
              <div key={link.label} className="about-dialog-meta-row">
                <dt>{link.label}</dt>
                <dd>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.href}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </ConfirmDialog>
    </ConfirmDialogOverlay>
  );
}
