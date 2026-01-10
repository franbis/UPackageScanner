import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";
import pkgAsysSectionsData from "@/data/packageAnalysisSectionsData";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { getPresenceEntries } from "@/lib/analysis_utils";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";



interface PackageAnalysisCardProps {
    /** Analyzed package's data */
    analyzedPkg: AnalyzedPackage
}
/** A dashboard to display a package's analysis results */
function PackageAnalysisCard({ analyzedPkg }: PackageAnalysisCardProps) {
    const expandedSections = pkgAsysSectionsData.map(e => e.name);


    const copyGUID = () => {
        navigator.clipboard.writeText(analyzedPkg.guid as string);
        toast.success("Package's GUID copied!");
    };
    

    return (
        <Card className='h-full'>
            <CardHeader>
                <p className='flex items-center gap-2 text-sm'>
                    <p>GUID</p>
                    <Card className='flex flex-row items-center p-2 gap-3 text-muted-foreground'>
                        {analyzedPkg.guid ?? 'Not available'}
                        {analyzedPkg.guid &&
                            <Button
                                variant='ghost'
                                className="p-0 w-5 h-auto cursor-pointer opacity-50"
                                onClick={copyGUID}
                            >
                                <Copy className='transform scale-x-[-1] rotate-180' />
                            </Button>
                        }
                    </Card>
                </p>
            </CardHeader>
            <CardContent className='overflow-y-scroll scrollbar-thin'>
                <Accordion type="multiple" defaultValue={expandedSections}>
                    {pkgAsysSectionsData.map(s => {
                        const { analysisKeys, ...dRest } = s;
                        const d = Object.fromEntries(
                            s.analysisKeys.map(k => [k, analyzedPkg.analysis[k]])
                        );
                        return (
                            <PackageAnalysisCardItem
                                {...dRest}
                                analysisData={d}
                            />
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}


interface PackageAnalysisItemProps extends Omit<PackageAnalysisSection, 'analysisKeys'> {
    /** Package's analysis data */
    analysisData: Partial<PackageAnalysis>
}
/** A dashboard's item to display part of a package's analysis results */
function PackageAnalysisCardItem({ name, title, description, contentSeverity, analysisData }: PackageAnalysisItemProps) {
    const getBadge = () => {
        if (contentSeverity === 'neutral') return <NeutralBadge />;
        if (contentSeverity === 'suspicious') return <SuspiciousBadge />;
        if (contentSeverity === 'dangerous') return <DangerousBadge />;
    };


    const presenceObj = getPresenceEntries(analysisData);
    // TODO - Get the string and file arrays and render them.
    const strArrs = {};
    const fileArrs = {};


    return (
        <AccordionItem value={name}>
            <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'>{getBadge()} {title}</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-2 pl-10'>
                <p className='text-sm text-muted-foreground'>{description}</p>
                <Separator className='opacity-50' />
                <CluePresenceList entries={presenceObj} />

            </AccordionContent>
        </AccordionItem>
    );
}


interface CluePresenceListProps {
    entries: Record<string, boolean>
}
function CluePresenceList({ entries }: CluePresenceListProps) {
    return (
        <div className='flex flex-col gap-1'>
            <h1 className='text-xl'>Clues</h1>
            <ul className='list-none pl-5 flex flex-col gap-1'>
                {Object.entries(entries).map(([k, v]) => (
                    <CluePresenceListItem key={k} name={k} present={v} />
                ))}
            </ul>
        </div>
    );
}


interface CluePresenceListItemProps {
    name: string
    present: boolean
}
function CluePresenceListItem({ name, present }: CluePresenceListItemProps) {
    return (
        <li className='list-item'>
            <div className="flex items-center gap-3">
                <Checkbox checked={present} />
                <p>{name}</p>
            </div>
        </li>
    );
}



export default PackageAnalysisCard;
export {
    type PackageAnalysisItemProps
}