import type { ReactElement } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";



interface BaseViewProps {
    header?: ReactElement
    content: ReactElement
    footer?: ReactElement
}
/** A card to render any type of ReactElement as its content */
function BaseView({ header, content, footer }: BaseViewProps) {
    return (
        <Card className='flex flex-col w-full h-full'>
            {header && <CardHeader className='grow'>{header}</CardHeader>}
            <CardContent className='grow overflow-y-scroll scrollbar-thin'>{content}</CardContent>
            {footer && <CardFooter className='grow'>{footer}</CardFooter>}
        </Card>
    );
}



export {
    type BaseViewProps
}
export default BaseView;