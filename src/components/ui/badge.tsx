import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-blue/10 text-primary-blue border border-primary-blue/20",
        secondary: "bg-gray/20 text-very-dark border border-gray/30",
        accent: "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
        destructive: "bg-error/10 text-error border border-error/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }