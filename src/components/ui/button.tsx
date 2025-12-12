import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer border-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-blue to-accent-cyan text-white shadow-md hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-0.5 active:shadow-md",
        secondary: "bg-white/90 backdrop-blur-sm border border-primary-blue/30 text-primary-blue shadow-sm hover:bg-white hover:border-primary-blue hover:shadow-md hover:-translate-y-0.5",
        accent: "bg-gradient-to-r from-light-blue to-accent-cyan/20 border border-accent-cyan/30 text-dark-blue shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-cyan",
        outline: "bg-transparent border border-gray text-very-dark hover:bg-light-blue/50 hover:border-primary-blue hover:text-primary-blue",
        ghost: "bg-transparent text-primary-blue hover:bg-light-blue/50 hover:text-dark-blue",
        success: "bg-gradient-to-r from-success to-success/80 text-white shadow-md hover:shadow-lg hover:shadow-success/30 hover:-translate-y-0.5",
        destructive: "bg-gradient-to-r from-error to-error/80 text-white shadow-md hover:shadow-lg hover:shadow-error/30 hover:-translate-y-0.5",
        water: "bg-gradient-to-br from-primary-blue via-accent-cyan to-light-blue text-white shadow-lg hover:shadow-xl hover:shadow-primary-blue/40 hover:-translate-y-1 hover:scale-[1.02]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        water: "h-12 px-6 rounded-full",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        pill: "rounded-3xl",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
    compoundVariants: [
      {
        variant: "water",
        size: "water",
        className: "rounded-full"
      }
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    asChild = false, 
    leftIcon,
    rightIcon,
    isLoading,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }