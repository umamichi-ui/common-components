import type { FormEventHandler, MouseEventHandler, ReactNode } from 'react';

export type ConfirmDialogProps = {
  title: ReactNode;
  titleId?: string;
  children: ReactNode;
  actions: ReactNode;
  className?: string;
  bodyClassName?: string;
  actionsClassName?: string;
  role?: 'dialog' | 'alertdialog';
  ariaDescribedBy?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  as?: 'div' | 'form';
};

export function ConfirmDialog({
  title,
  titleId,
  children,
  actions,
  className = 'confirm-dialog',
  bodyClassName = 'confirm-dialog-body',
  actionsClassName = 'confirm-dialog-actions',
  role = 'dialog',
  ariaDescribedBy,
  onClick,
  onSubmit,
  as = 'div',
}: ConfirmDialogProps) {
  const resolvedTitleId = titleId ?? 'confirm-dialog-title';
  const sharedProps = {
    className,
    role,
    'aria-modal': true as const,
    'aria-labelledby': resolvedTitleId,
    ...(ariaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {}),
    onClick,
  };

  const inner = (
    <>
      <h2 id={resolvedTitleId} className="confirm-dialog-title">
        {title}
      </h2>
      <div className={bodyClassName}>{children}</div>
      <div className={actionsClassName}>{actions}</div>
    </>
  );

  if (as === 'form') {
    return (
      <form {...sharedProps} onSubmit={onSubmit}>
        {inner}
      </form>
    );
  }

  return <div {...sharedProps}>{inner}</div>;
}
