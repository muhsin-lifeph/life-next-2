import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";


const typographyVariants = cva(
    "",
    {
        variants: {
            variant: {
                primary: "text-primary",
                secondary: "text-white",
                ghost:"text-slate-700",
                default: "text-life",

            },
            verticalAlign: {
                center: "my-auto"
            },
            lineClamp: {
                one: "line-clamp-1",
                two: "line-clamp-2"
            },
            bold: {
                default: "font-normal",
                light: "font-[300]",
                semibold: "font-semibold",
                bold: "font-bold",
                extrabold: "font-[600]"
            },
            size: {
                default: "sm:text-base text-sm",
                xl: "",
                sm: "sm:text-sm text-xs ",
                lg: "h-11 px-8 rounded-md",
                xs: "sm:text-xs text-[10px]",
            }
        },
        defaultVariants: {
            size: "default",
            variant: "default",
            bold: "default"
        },
    }
)

 interface TypographyProps extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "small";
    centered?: boolean
}

const Typography: React.FC<TypographyProps> = ({ type, size, className, children, variant, lineClamp, bold }) => {
    return (
        <Element type={type}
            className={cn(typographyVariants({ size, variant, lineClamp, bold, className }))}
        >
            {children}
        </Element>
    );
};

export { Typography };

const Element: React.FC<TypographyProps> = ({ type, ...props }) => {
    switch (type) {
        case "h1":
            return <h1 {...props}></h1>
        case "h2":
            return <h2 {...props}></h2>
        case "h3":
            return <h3 {...props}></h3>
        case "h4":
            return <h4 {...props}></h4>
        case "h5":
            return <h5 {...props}></h5>
        case "h6":
            return <h6 {...props}></h6>
        case "p":
            return <p {...props}></p>
        case "span":
            return <span {...props}></span>
        case "small":
            return <small {...props}></small>
        default:
            return <span {...props}></span>
    }
}

export {
    Element, typographyVariants
} 