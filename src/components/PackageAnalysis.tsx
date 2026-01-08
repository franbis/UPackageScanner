import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";



// TODO - Populate the card with actual analysis results data
/** A dashboard to display a package's analysis results */
function PackageAnalysis() {
    return (
        <Card className='h-full'>
            <CardContent>
                <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'><NeutralBadge /> Item 1</AccordionTrigger>
                        <AccordionContent>
                            <div className='pl-10'>
                                Text
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'><SuspiciousBadge /> Item 2</AccordionTrigger>
                        <AccordionContent>
                            <div className='pl-10'>
                                Text
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'><DangerousBadge /> Item 3</AccordionTrigger>
                        <AccordionContent>
                            <div className='pl-10'>
                                Text
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}



export default PackageAnalysis;