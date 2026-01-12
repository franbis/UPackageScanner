import { cva } from "class-variance-authority";



const cardVariants = cva(
  "flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground gap-6 border rounded-xl py-6 shadow-sm",
        file: "w-fit px-3 py-1.5 bg-file text-file-foreground border border-3 rounded-[.5em] border-input/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


export {
    cardVariants
}