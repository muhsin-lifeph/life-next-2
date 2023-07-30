import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LucideRefreshCw, RefreshCcwIcon, RefreshCwOffIcon } from "lucide-react"
import { Icon, IconProps } from "./icons"
import { typographyVariants } from "./typography"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md duration-200 transition-all ",
  {
    variants: {
      variant: {
        default: cn("bg-primary disabled:bg-blue-400 disabled:cursor-not-allowed text-white p-2 rounded-lg hover:bg-blue-500", typographyVariants({ variant: "secondary" })),
        outline: cn("btn-primary", typographyVariants({ variant: "primary" })),
        ghost: cn("border-[#39f] border hover:border-slate-100 text-[#39f]", typographyVariants({ variant: "ghost" })),
        normal: "hover:bg-slate-300 bg-slate-200",
        inputButtonLeftBtn: "flex items-center rounded-r-none",
        inputRightBtn: "flex items-center rounded-l-none",
      },
      size: {
        default: cn(typographyVariants({ size: "default" }), "py-3 px-5"),
        sm: cn(typographyVariants({ size: "sm" }), "py-1.5 px-3"),
        lg: cn(typographyVariants({ size: "lg" }), "p-4"),
        xs: cn(typographyVariants({ size: "xs" }), "p-0.5"),
        icon: "h-10 w-10",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded",
        sm: "rounded-sm",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        txl: "rounded-3xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  disableBtn?: boolean
  iconLeft?: React.ReactNode
  iconType?: IconProps["type"];

}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, children, isLoading, disableBtn, iconLeft, iconType, ...props }, ref) => {

    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || disableBtn}
      >
        {isLoading ? null : iconLeft ? <Icon type={iconType} className="mr-2">{iconLeft}</Icon> : null}
        {isLoading ? <LucideRefreshCw className='mr-2 h-3 w-3 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }


