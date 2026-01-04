import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../../lib/utils';

const buttonVariants = cva(
  'font-base cursor-pointer disabled:cursor-not-allowed focus:outline-0 flex items-center justify-center font-normal text-base rounded-full h-10',
  {
    variants: {
      variant: {
        primary: 'text-gray-800',
        secondary: 'text-gray-900',
        accent: 'text-blue-1100',
        negative: 'text-red-900',
      },
      style: {
        solid: '',
        outlined: 'bg-transparent border-3',
      },
      size: {
        default: 'px-4 text-body-s font-strong',
        icon: 'p-0 w-10 p-3',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        style: 'solid',
        class: 'bg-gray-800 text-white hover:bg-gray-800 disabled:bg-gray-200',
      },
      {
        variant: 'primary',
        style: 'outlined',
        class: 'border-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-200',
      },
      {
        variant: 'secondary',
        style: 'solid',
        class: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100',
      },
      {
        variant: 'secondary',
        style: 'outlined',
        class: 'border-gray-300 hover:bg-gray-100 active:bg-gray-200 disabled:border-gray-200 disabled:text-gray-200',
      },
      {
        variant: 'accent',
        style: 'solid',
        class: 'bg-blue-900 text-white hover:bg-blue-1000 active:bg-blue-1100 disabled:bg-gray-200',
      },
      {
        variant: 'accent',
        style: 'outlined',
        class: 'border-blue-900 hover:bg-blue-200 active:bg-blue-300 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent',
      },
      {
        variant: 'negative',
        style: 'solid',
        class: 'bg-red-900 text-white hover:bg-red-1000 active:bg-red-1100 disabled:bg-gray-200',
      },
      {
        variant: 'negative',
        style: 'outlined',
        class: 'border-red-900 hover:bg-red-50 active:bg-red-100 disabled:border-gray-200 disabled:text-gray-200',
      },
      {
        style: 'outlined',
        class: 'focus:border-3 focus:shadow-[0_0_0_2px_var(--color-gray-50),0_0_0_5px_var(--color-blue-800)]',
      },
      {
        style: 'solid',
        class: 'focus:shadow-[0_0_0_2px_var(--color-gray-50),0_0_0_5px_var(--color-blue-800)]',
      },
      {
        variant: 'accent',
        style: 'outlined',
        class: 'focus:border-transparent',
      },
    ],
    defaultVariants: {
      variant: 'accent',
      style: 'solid',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  style,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={cn(buttonVariants({ variant, style, size }), className)} {...props} />
  );
}

export { Button };