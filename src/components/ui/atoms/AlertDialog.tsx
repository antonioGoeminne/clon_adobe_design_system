import {
  type ComponentProps,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';
import { useFocus, useOnClickOutside, useOnKeyDown, useReturnFocus } from '../../../hooks';

export const AlertDialog = ({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) => {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}


function ModalDialogImpl({
  children,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}>) {
  const titleId = useId();
  const contentId = useId();
  const dialogRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useOnKeyDown('Escape', onClose);
  useOnClickOutside(dialogRef, onClose);
  useReturnFocus();
  useFocus(dialogRef);

  return createPortal(
    <div className={cn("bg-black/40 fixed inset-0 flex items-center justify-center p-20  transition-opacity duration-200 ease-out opacity-0", { ['opacity-100']: visible })}>
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className={cn("flex flex-col p-8 transition-transform duration-200 ease-out bg-white opacity-0 scale-95 h-53 rounded-sm min-w-116", { ['opacity-100 scale-100']: visible })}
        role="dialog"
        ref={dialogRef}>
        <h1 className="m-0 text-gray-900 text-body-l font-strong" id={titleId}>
          {title}
        </h1>
        <div id={contentId}>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
