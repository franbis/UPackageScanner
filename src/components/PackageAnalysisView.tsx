import { getContentCounts, getPresenceEntries, getStrArrays } from "@/lib/analysis_utils";

import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CountBadge, DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";

import BaseView from "@/components/BaseView";

import { toast } from "react-toastify";

import pkgAsysSectionsData from "@/data/packageAnalysisSectionsData";

import { Copy, Download } from "lucide-react";



interface PackageAnalysisViewProps {
    /** Analyzed package's data */
    analyzedPkg: AnalyzedPackage
}
/** A view to render a package's analysis results */
function PackageAnalysisView({ analyzedPkg }: PackageAnalysisViewProps) {
    const expandedSections = pkgAsysSectionsData.filter(s => {
        const obj = Object.fromEntries(
            s.analysisKeys.map(k => [k, analyzedPkg.analysis[k]])
        );
        const { contentCount } = getContentCounts(obj);
        return contentCount;
    }).map(s => s.name);


    const copyGUID = () => {
        navigator.clipboard.writeText(analyzedPkg.guid as string);
        toast.success("Package's GUID copied!");
    };
    

    return (
        <BaseView
            content={(
                <div className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2 text-sm'>
                        <p>GUID</p>
                        <Card className='flex flex-row items-center p-2 gap-3 text-muted-foreground'>
                            <p className='wrap-anywhere'>{analyzedPkg.guid ?? 'Not available'}</p>
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
                    </div>

                    <Accordion
                        type="multiple"
                        defaultValue={expandedSections}
                    >
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
                </div>
            )}
        />
    );
}


interface PackageAnalysisItemProps extends Omit<PackageAnalysisSection, 'analysisKeys'> {
    /** Package's analysis data */
    analysisData: Partial<PackageAnalysis>
}
/** A dashboard's item to display part of a package's analysis results */
function PackageAnalysisCardItem({ name, title, description, contentSeverity, analysisData }: PackageAnalysisItemProps) {
    const getContentSeverityBadge = () => {
        if (contentSeverity === 'neutral') return <NeutralBadge className='hidden lg:inline-flex' />;
        if (contentSeverity === 'suspicious') return <SuspiciousBadge className='hidden lg:inline-flex' />;
        if (contentSeverity === 'dangerous') return <DangerousBadge className='hidden lg:inline-flex' />;
    };


    const presenceObj = getPresenceEntries(analysisData);
    const strArrs = getStrArrays(analysisData);

    const {
        strCluesCount,
        embeddedFilesCount,
        contentCount
    } = getContentCounts(analysisData);


    return (
        <AccordionItem value={name}>
            <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'>
                <CountBadge count={contentCount} />
                {getContentSeverityBadge()}
                {title}
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-3 pl-10 pb-10'>
                <p className='text-sm text-muted-foreground'>{description}</p>
                {Boolean(embeddedFilesCount) && <>
                    <Separator className='opacity-50' />
                    <ClueFileList entries={analysisData.embeddedFiles as EmbeddedFile[]} />
                </>}
                {Boolean(Object.keys(presenceObj).length) && <>
                    <Separator className='opacity-50' />
                    <CluePresenceList entries={presenceObj} />
                </>}
                {Boolean(strCluesCount) && <>
                    <Separator className='opacity-50' />
                    <ClueStrList entries={strArrs} />
                </>}
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


interface ClueStrListProps {
    entries: Record<string, string[]>
}
function ClueStrList({ entries }: ClueStrListProps) {
    return (
        <ul className='flex flex-col'>
            {Object.entries(entries).map(([k, v]) => (
                <li key={k} className='flex flex-col gap-1'>
                    <h1 className='text-xl'>{k}</h1>
                    <ul className='list-none pl-5 flex flex-col gap-2'>
                        {Object.entries(v).map(([k2, v2]) => (
                            <ClueStrListItem key={k2} s={v2} />
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}


interface ClueStrListItemProps {
    s: string
}
function ClueStrListItem({ s }: ClueStrListItemProps) {
    const copyStr = () => {
        navigator.clipboard.writeText(s);
        toast.success("String copied!");
    };


    return (
        <li className='flex w-fit px-2 py-1 gap-1 italic rounded bg-gray-800'>
            <p className='italic'>{s}</p>
            <Button
                onClick={copyStr}
                variant='ghost'
                className="p-0 w-5 h-auto cursor-pointer opacity-50"
            >
                <Copy className='transform scale-x-[-1] rotate-180' />
            </Button>
        </li>
    );
}


interface ClueFileListProps {
    entries: EmbeddedFile[]
}
function ClueFileList({ entries }: ClueFileListProps) {
    return (
        <div className='flex flex-col gap-2.5'>
            <h1 className='text-xl'>Embedded Files</h1>
            <ul className='list-none pl-5 flex flex-wrap gap-2.5'>
                {entries.map((f, idx) => (
                    <ClueFileListItem key={idx} embFile={f} />
                ))}
            </ul>
        </div>
    );
}


interface ClueFileListItemProps {
    embFile: EmbeddedFile
}
function ClueFileListItem({ embFile }: ClueFileListItemProps) {
    function dloadFile() {
        const file = new File([embFile.content], embFile.name);
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(file);
        anchor.click();
        URL.revokeObjectURL(anchor.href);
    };

    
    return (
        <li className='list-item'>
            <Card variant='file'>
                <CardContent className='flex gap-2.5 items-center p-0'>
                    <Button
                        onClick={dloadFile}
                        variant='download'
                        className='py-5! cursor-pointer'
                    >
                        <Download />
                    </Button>
                    <div className='flex flex-col'>
                        <p>{embFile.name}</p>
                        <div className='flex flex-nowrap gap-[.25ch] text-muted-foreground'>
                            <p>{Math.round(embFile.size / 1000)}</p>
                            <p>Kb</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
}



export default PackageAnalysisView;