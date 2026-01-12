import { cva } from "class-variance-authority"



const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-2 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-primary [--dot:theme(colors.primary.DEFAULT)]",
        secondary: "border-secondary [--dot:theme(colors.secondary.DEFAULT)]",
        destructive: "border-destructive [--dot:theme(colors.destructive.DEFAULT)]",
        outline: "border-foreground [--dot:theme(colors.foreground)]",

        count: "bg-gray-700 border-none",
        
        neutral: "border-muted-foreground [--dot:theme(colors.muted.foreground)]",
        suspicious: "border-suspicious [--dot:theme(colors.suspicious.DEFAULT)]",
        dangerous: "border-dangerous [--dot:theme(colors.dangerous.DEFAULT)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)



export {
    badgeVariants
}