import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";


const iconVariants = cva(
    "block",
    {
        variants: {
            variant: {
                inputIconRight: "absolute right-2 inset-y-0  pl-2 flex my-auto pointer-events-none",
                inputLoadingIcon: "absolute right-2 inset-y-0  ml-2 flex my-auto pointer-events-none text-life animate-spin",
                inputIconLeft: "absolute left-2 inset-y-0  pl-2 my-auto pointer-events-none"
            },
            size: {
                default: "sm:w-6 sm:h-6 w-5 h-5",
                sm: "sm:w-5 sm:h-5 w-4 h-4",
                lg: "h-11 px-8 rounded-md"
            }
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export interface IconProps extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
    type?: "crossIcon" | "searchIcon" | "loadingIcon";
}

const Icon: React.FC<IconProps> = ({ type, size, className, variant, ...props }) => {
    return (
        <Icons type={type}
            {...props}

            className={cn(iconVariants({ size, className, variant }))}
        />
    );
};

export { Icon };


const Icons: React.FC<IconProps> = ({ type, ...props }) => {
    switch (type) {
        case "crossIcon":
            return <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                {...props}
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        case "searchIcon":
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  {...props} viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        case "loadingIcon":
            return <svg {...props} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
        default:
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    {...props}
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )
    }

}

export {
    Icons, iconVariants
} 