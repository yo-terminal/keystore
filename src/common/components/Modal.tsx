import clsx from "clsx";
import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
};

type Props = {
  className?: string;
  size?: keyof typeof sizes;
  title?: string;
  open: boolean;
  onClose?: () => void;
  closable?: boolean;
};

export function Modal({
  className,
  size = "lg",
  title,
  open,
  onClose,
  closable,
  children,
}: PropsWithChildren<Props>) {
  // const initialFocus = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Dialog
        open={open}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => closable && onClose?.()}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-slate-950/25 px-2 py-2 transition duration-100 focus:outline-0 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-slate-950/50"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={clsx(
                className,
                sizes[size],
                "w-full rounded-xl bg-white dark:bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              )}
            >
              <div className="flex items-start">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-950 dark:text-white"
                >
                  {title}
                </DialogTitle>
                <button
                  type="button"
                  className="ml-auto rounded-sm text-slate-600 hover:text-slate-500 focus:outline-none focus-within:ring-2 focus-within:ring-slate-500"
                  onClick={() => onClose?.()}
                  // ref={initialFocus}
                >
                  <XMarkIcon
                    className="w-5 h-5 text-current"
                    aria-hidden="true"
                  />
                </button>
              </div>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
