import {
  type ComponentProps,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../../lib/utils';
import { useFocus, useOnClickOutside, useOnKeyDown, useReturnFocus } from '../../../../hooks';
import { Divider } from '../Divider/Divider';
import { Button } from '../Button';

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
  actionButtons,
}: Readonly<{
  children: React.ReactNode;
  actionButtons?: React.ReactNode;
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
    <div data-testid="backdrop" className={cn("bg-black/40 fixed inset-0 flex items-center justify-center p-0 sm:p-20 transition-opacity duration-200 ease-out opacity-0", { ['opacity-100']: visible })}>
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className={cn(
          "flex flex-col justify-between p-8 transition-transform duration-200 ease-out bg-white opacity-0 scale-95 rounded-sm w-full max-w-116 m-1",
          "max-h-[80vh] overflow-hidden",
          { ['opacity-100 scale-100']: visible })}
        role="dialog"
        ref={dialogRef}>
        <div className="flex flex-col min-h-0">
          <div className="sticky top-0 bg-white">
            <h1 className="m-0 text-gray-900 text-body-l font-strong" id={titleId}>
              {title}
            </h1>
            <Divider />
          </div>
          <div id={contentId} className='text-body-s grow overflow-y-auto'>
            {children}
          </div>
        </div>
        <div className='self-end flex items-center gap-4'>
          <Button variant={'secondary'} style={'outlined'} onClick={onClose}>Cancel</Button>
          {actionButtons && <>{actionButtons}</>}
        </div>
      </div>
    </div>,
    document.body,
  );
}
