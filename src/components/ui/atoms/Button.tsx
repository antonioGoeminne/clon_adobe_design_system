import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../lib/utils';

const baseClasses = 'font-base cursor-pointer focus:ring-2 focus:outline focus:outline-3 focus:outline-offset-3 disabled:cursor-not-allowed px-4 outline-blue-800';
const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      accent: '',
      negative: '',
      primary: '',
    },
    style: {
      solid: '',
      outlined: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      style: 'solid',
      class: 'bg-gray-800 text-white hover:bg-gray-800 disabled:bg-gray-200 focus:outline-blue-800',
    },
    {
      variant: 'primary',
      style: 'outlined',
      class: 'bg-transparent border-3 border-gray-800 hover:bg-gray-300 active:bg-gray-400 text-gray-800 disabled:bg-gray-200  focus:border-0 focus:outline-offset-4',
    },
    {
      variant: 'accent',
      style: 'solid',
      class: 'bg-blue-900 text-white hover:bg-blue-1000 active:bg-blue-1100 disabled:bg-gray-200 focus:outline-blue-800',
    },
    {
      variant: 'accent',
      style: 'outlined',
      class: 'bg-transparent border-3 border-blue-900 text-blue-1100 hover:bg-blue-200 active:bg-blue-300 disabled:border-gray-300 disabled:text-gray-400 focus:border-transparent focus:outline-offset-4 disabled:hover:bg-transparent',
    },
    {
      variant: 'negative',
      style: 'solid',
      class: 'bg-red-900 text-white hover:bg-red-1000 active:bg-red-1100 disabled:bg-gray-200',
    },
    {
      variant: 'negative',
      style: 'outlined',
      class: 'bg-transparent border-3 border-red-900 text-red-900 hover:bg-red-50 active:bg-red-100 disabled:border-gray-200 disabled:text-gray-200 focus:border-0 focus:outline-offset-4',
    },
  ],
  defaultVariants: {
    variant: 'accent',
    style: 'solid',
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = 'accent',
  style = 'solid',
  asChild = false,
  ...props
}: ButtonProps) {

  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, style }), className, 'font-normal text-base rounded-full h-10 min-w-22.75')} {...props} />
  );
}

export { Button };