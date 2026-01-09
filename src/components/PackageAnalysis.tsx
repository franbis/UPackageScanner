import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";
import type { VariantProps } from "class-variance-authority";
import type { Badge } from "./ui/badge";



interface PackageAnalysisProps {
    /** Analyzed package's data */
    analyzedPkg: AnalyzedPackage
}
/** A dashboard to display a package's analysis results */
function PackageAnalysis({ analyzedPkg: data }: PackageAnalysisProps) {
    return (
        <Card className='h-full'>
            <CardHeader>
                <p>GUID: {data.guid ?? '[Not available]'}</p>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']}>
                    <PackageAnalysisItem
                        name='aaa'
                        title='aaa'
                        analysisData={data.analysis}
                        contentSeverity='neutral'
                    />
                    <PackageAnalysisItem
                        name='bbb'
                        title='bbb'
                        analysisData={data.analysis}
                        contentSeverity='neutral'
                    />
                    <PackageAnalysisItem
                        name='ccc'
                        title='ccc'
                        analysisData={data.analysis}
                        contentSeverity='neutral'
                    />
                </Accordion>
            </CardContent>
        </Card>
    );
}


interface PackageAnalysisItemProps {
    name: string
    title: string
    /** Package's analysis data */
    analysisData: Partial<PackageAnalysis>
    contentSeverity: Extract<
        VariantProps<typeof Badge>['variant'],
        'neutral' | 'suspicious' | 'dangerous'
    >
}
/** A dashboard's item to display part of a package's analysis results */
function PackageAnalysisItem({ name, title, analysisData, contentSeverity }: PackageAnalysisItemProps) {
    const getBadge = () => {
        if (contentSeverity === 'neutral') return <NeutralBadge />;
        if (contentSeverity === 'suspicious') return <SuspiciousBadge />;
        if (contentSeverity === 'dangerous') return <DangerousBadge />;
    }

    return (
        <AccordionItem value={name}>
            <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'>{getBadge()} {title}</AccordionTrigger>
            <AccordionContent>
                <div className='pl-10'>
                    Text
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}



export default PackageAnalysis;
export {
    type PackageAnalysisItemProps
}