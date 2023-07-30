import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button";
import { VariantProps, cva } from "class-variance-authority";
import { typographyVariants } from "./typography";
import { Icon, IconProps, iconVariants } from "./icons";


const inputVariants = cva(
  "transition-all duration-500 px-2 focus:border-blue-400 p-3 border w-full border-gray-300",
  {
    variants: {
      variant: {
        default: typographyVariants({ size: "default", bold: "semibold" }),
        search: cn(typographyVariants({ size: "sm" }), "rounded-full"),
        authInput: typographyVariants({ size: "default", bold: "semibold" })
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  buttonLeft?: React.ReactNode;
  buttonRight?: React.ReactNode;
  iconLeft?: boolean
  iconRight?: boolean
  iconVariantLeft?: IconProps["variant"]
  iconVariantRight?: IconProps["variant"]
  buttonVariant?: string;
  iconLeftType?: IconProps["type"];
  iconRightType?: IconProps["type"];
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, buttonVariant, iconVariantRight, iconVariantLeft, buttonLeft, iconLeftType, iconRightType, iconLeft, iconRight, buttonRight, ...props }, ref) => {
    return (
      <div className="flex relative w-full">
        {buttonLeft && <Button variant={"inputButtonLeftBtn"}>{buttonLeft}</Button>}
        <input
          type={type}
          className={cn(inputVariants({ variant }),
            ` ${iconLeft ? "pl-12" : ""} ${iconRight ? "pr-12" : ""}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {iconLeft && <Icon size={"default"} type={iconLeftType} variant={iconVariantLeft} />}
        {iconRight && <Icon size={"sm"} type={iconRightType} variant={iconVariantRight} />}
        {buttonRight && <Button variant={"inputRightBtn"}>{buttonRight}</Button>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
