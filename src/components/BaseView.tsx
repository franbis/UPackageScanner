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
        <Card className='h-full'>
            {header && <CardHeader>{header}</CardHeader>}
            <CardContent className='overflow-y-scroll scrollbar-thin'>
                {content}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}



export {
    type BaseViewProps
}
export default BaseView;