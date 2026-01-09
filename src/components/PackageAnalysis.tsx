import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";
import packageAnalysisItemsData from "@/data/packageAnalysisItemsData";



interface PackageAnalysisProps {
    /** Analyzed package's data */
    analyzedPkg: AnalyzedPackage
}
/** A dashboard to display a package's analysis results */
function PackageAnalysis({ analyzedPkg }: PackageAnalysisProps) {
    return (
        <Card className='h-full'>
            <CardHeader>
                <p>GUID: {analyzedPkg.guid ?? '[Not available]'}</p>
            </CardHeader>
            <CardContent className='overflow-y-scroll scrollbar-thin'>
                <Accordion type="multiple" /*defaultValue={['item-1', 'item-2', 'item-3']}*/>
                    {packageAnalysisItemsData.map(d => (
                        <PackageAnalysisItem
                            analysisSection={d}
                            analysisData={analyzedPkg.analysis}
                        />
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}


interface PackageAnalysisItemProps {
    analysisSection: PackageAnalysisSection
    /** Package's analysis data */
    analysisData: Partial<PackageAnalysis>
}
/** A dashboard's item to display part of a package's analysis results */
function PackageAnalysisItem({ analysisSection, analysisData }: PackageAnalysisItemProps) {
    const getBadge = () => {
        if (analysisSection.contentSeverity === 'neutral') return <NeutralBadge />;
        if (analysisSection.contentSeverity === 'suspicious') return <SuspiciousBadge />;
        if (analysisSection.contentSeverity === 'dangerous') return <DangerousBadge />;
    }

    return (
        <AccordionItem value={analysisSection.name}>
            <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'>{getBadge()} {analysisSection.title}</AccordionTrigger>
            <AccordionContent>
                <div className='pl-10'>
                    {analysisSection.description}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}



export default PackageAnalysis;
export {
    type PackageAnalysisItemProps
}