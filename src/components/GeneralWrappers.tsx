import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { InfoIcon } from "lucide-react";



interface WithTooltipProps {
    children: ReactNode
    tooltipText?: string
}
function WithTooltip({ children, tooltipText }: WithTooltipProps) {
    return (
        <div className='flex gap-3 items-center'>
            {children}

            {tooltipText &&
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='scale-90 opacity-40 hover:opacity-100 transition-opacity cursor-help hidden md:block'>
                            <InfoIcon />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                        <p className='font-[Arial]'>{tooltipText}</p>
                    </TooltipContent>
                </Tooltip>
            }
        </div>
    );
}



export {
    WithTooltip
}