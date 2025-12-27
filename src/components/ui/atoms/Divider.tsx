import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const baseClasses = "bg-gray-300 w-full rounded-xl border-none my-2"
const dividerVariants = cva(baseClasses, {
    variants: {
        size: {
            small: 'h-[1px]',
            medium: 'h-[2px]',
            large: 'h-[4px] bg-gray-800',
        }
    },
    defaultVariants: {
        size: 'small',
    }
})

type DividerProps = {
    size?: 'small' | 'large' | 'medium'
} & VariantProps<typeof dividerVariants>

export const Divider = ({ size = 'small' }: DividerProps) => {
    return (
        <hr className={cn(dividerVariants({ size }))} />
    )
}