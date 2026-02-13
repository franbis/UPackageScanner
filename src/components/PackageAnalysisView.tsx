import type { ReactNode } from "react";

import { getCluesCount } from "@/lib/analysis_utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { WithTooltip } from "@/components/GeneralWrappers";
import { CountBadge, DangerousBadge, NeutralBadge, SuspiciousBadge } from "@/components/Badges";
import BaseView from "@/components/BaseView";

import clsx from "clsx";

import { toast } from "react-toastify";

import { BoxIcon, Copy, Download, FileBracesCornerIcon, PackageIcon, SquareFunctionIcon } from "lucide-react";
import { normalizeObjType, normalizeOuterType } from "@/lib/package_utils";



/** Base interface for clue list item components properties */
interface ClueListItemProps<T> {
    subject: T
    helpText?: string
}


interface PackageAnalysisViewProps {
    /** Analyzed package's data */
    analyzedPkg: AnalyzedPackage
}
/**
 * A view to display a package's analysis results divided by sections
 * rendered as part of an accordion
 */
function PackageAnalysisView({ analyzedPkg }: PackageAnalysisViewProps) {
    const expandedSections = analyzedPkg.analysis.sections.filter(s => {
        const { contentCount } = getCluesCount(s);
        return contentCount;
    }).map(s => s.name);
    

    return (
        <BaseView
            content={(
                <div className='flex flex-col gap-8'>
                    <GUIDDisplay guid={analyzedPkg.guid} />

                    <Accordion
                        type="multiple"
                        defaultValue={expandedSections}
                    >
                        {analyzedPkg.analysis.sections.map(s => (
                            <PackageAnalysisViewSection key={s.name} section={s} />
                        ))}
                    </Accordion>
                </div>
            )}
        />
    );
}


interface PackageAnalysisViewSectionProps {
    section: PackageAnalysisSection
}
/** Render a package analysis's section as an accordion item */
function PackageAnalysisViewSection({ section }: PackageAnalysisViewSectionProps) {
    const getContentSeverityBadge = () => {
        if (section.contentSeverity === 'neutral') return <NeutralBadge className='hidden lg:inline-flex' />;
        if (section.contentSeverity === 'suspicious') return <SuspiciousBadge className='hidden lg:inline-flex' />;
        if (section.contentSeverity === 'dangerous') return <DangerousBadge className='hidden lg:inline-flex' />;
    };

    /**
     * Return an array of clue items of which subjects are of type `S`
     * 
     * @param getClues Must return the array of clues given a clue group
     * @param getSubjects Must return the array of clue subjects given a clue of type `C`
     */
    function buildClueArr<C extends (PresenceClue | MatchesClue<S>), S>(
        getClues: (group: ClueGroup) => C[],
        getSubjects: (clue: C) => S[]
    ) {
        const items: ClueListItemProps<S>[] = [];

        for (const group of section.clueGroups)
            for (const clue of getClues(group))
                for (const match of getSubjects(clue))
                    items.push({
                        subject: match,
                        helpText: group.description
                    });

        return items;
    }


    const { contentCount } = getCluesCount(section);
    
    const embFileClueListItems = buildClueArr<EmbeddedFileMatchesClue, EmbeddedFile>(
        group => group.embeddedFileMatchesClues ?? [],
        clue => clue.matches ?? []
    );

    const objClueListItems = buildClueArr<ObjectPresenceClue, ObjectPresenceClue>(
        group => group.objPresenceClues ?? [],
        clue => [clue]
    );

    const strParamClueListItems = buildClueArr<StringMatchesClue, string>(
        group => group.strParamMatchesClues ?? [],
        clue => clue.matches ?? []
    );
    const ccClueListItems = buildClueArr<StringMatchesClue, string>(
        group => group.ccMatchesClues ?? [],
        clue => clue.matches ?? []
    );
    const urlClueListItems = buildClueArr<StringMatchesClue, string>(
        group => group.URLMatchesClues ?? [],
        clue => clue.matches ?? []
    );
    

    return (
        <AccordionItem value={section.name}>
            <AccordionTrigger className='flex-row-reverse justify-end hover:no-underline cursor-pointer'>
                <CountBadge count={contentCount} />
                {getContentSeverityBadge()}
                {section.title}
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-6 pl-10 pb-10'>
                <p className='text-sm text-muted-foreground'>{section.description}</p>

                {contentCount
                    ?
                        <>
                            {embFileClueListItems.length > 0 &&
                                <EmbeddedFileClueList entries={embFileClueListItems} />
                            }

                            {objClueListItems.filter(c => c.subject.present).length > 0 &&
                                <ObjectClueList entries={objClueListItems} />
                            }

                            {strParamClueListItems.length > 0 &&
                                <StrClueList title='String Parameters' entries={strParamClueListItems} />
                            }
                            {ccClueListItems.length > 0 &&
                                <StrClueList title='Console Commands' entries={ccClueListItems} />
                            }
                            {urlClueListItems.length > 0 &&
                                <StrClueList title='URLs' entries={urlClueListItems} />
                            }
                        </>
                    :
                        <div className='flex justify-center w-full'>
                            <h1 className='pr-20 text-justify text-muted-foreground/50 text-[1.25em]'>
                                No suspicious content of this category was found in the package
                            </h1>
                        </div>
                }
            </AccordionContent>
        </AccordionItem>
    );
}


interface ObjectClueListProps {
    entries: ClueListItemProps<ObjectPresenceClue>[]
}
/** Render a list of object clues */
function ObjectClueList({ entries }: ObjectClueListProps) {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-md'>Objects & Names</h1>
            <ul className='list-none pl-5 flex flex-col md:gap-1 gap-3'>
                {entries.map((e, idx) => (
                    <ObjectClueListItem key={idx} subject={e.subject} helpText={e.helpText} />
                ))}
            </ul>
        </div>
    );
}


/**
 * Render information about an object clue and a checkbox that
 * specifies if an object of the same kind has been found in the
 * package.
 */
function ObjectClueListItem({ subject, helpText }: ClueListItemProps<ObjectPresenceClue>) {
    return (
        <li className='list-item'>
            <div className="flex items-center gap-3">
                <Checkbox checked={subject.present} />
                <ObjectInfoBreadcrumb type={subject.type} outerName={subject.outer} objectName={subject.name} helpText={helpText} />
            </div>
        </li>
    );
}


interface ObjectInfoBreadcrumbProps {
    /** Object's type */
    type?: string
    /** Object outer's name */
    outerName?: string
    /** Object's name */
    objectName: string
    /** Object description */
    helpText?: string
}
/** Render an object's heritage as a breadcrumb */
function ObjectInfoBreadcrumb({ outerName, objectName, helpText, type='object' }: ObjectInfoBreadcrumbProps) {
    return (
        <Breadcrumb>
            <WithTooltip tooltipText={helpText}>
                <BreadcrumbList className='gap-0.5!'>
                    {outerName && (type !== 'package') &&
                        <>
                            <ObjectInfoBreadcrumbItem
                                type={normalizeOuterType(type)}
                                name={outerName}
                            />
                            <BreadcrumbSeparator className='hidden md:flex' />
                        </>
                    }
                    <ObjectInfoBreadcrumbItem
                        type={normalizeObjType(type)}
                        isMain={true}
                        name={objectName}
                    />
                </BreadcrumbList>
            </WithTooltip>
        </Breadcrumb>
    );
}


interface ObjectInfoBreadcrumbItemProps {
    /** Object's heritage part type */
    type: NormalizedObjectType
    /** If `true`, this is the last descendent in the object's heritage */
    isMain?: boolean
    /** Object's name */
    name: string
}
/** Render a part of an object's heritage as a breadcrumb item */
function ObjectInfoBreadcrumbItem({ name, type='object', isMain=false }: ObjectInfoBreadcrumbItemProps) {
    let TypeIcon = BoxIcon;
    if (type === 'package') TypeIcon = PackageIcon;
    else if (type === 'class') TypeIcon = FileBracesCornerIcon;
    else if (type === 'function') TypeIcon = SquareFunctionIcon;


    return (
        <BreadcrumbItem className={clsx(
            'flex gap-0.5 rounded hover:text-card-foreground transition-colors cursor-default',
            {
                'text-card-foreground': isMain,
                'text-card-foreground/50 hidden md:flex': !isMain,
            }
        )}>
            <TypeIcon className='scale-75 opacity-50' />
            <p className='wrap-anywhere'>{name}</p>
        </BreadcrumbItem>
    );
}


interface StrClueListProps {
    title: string
    entries: ClueListItemProps<string>[]
}
/** Render a list of strings that have been found in a package */
function StrClueList({ title, entries }: StrClueListProps) {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-md'>{title}</h1>
            <ul className='list-none pl-5 flex flex-col gap-1'>
                {entries.map((e, idx) => (
                    <StrClueListItem key={idx} subject={e.subject} helpText={e.helpText} />
                ))}
            </ul>
        </div>
    );
}


/**
 * Render a string that has been found in a package, and a button
 * to copy it
 */
function StrClueListItem({ subject, helpText }: ClueListItemProps<string>) {
    const copyStr = () => {
        navigator.clipboard.writeText(subject);
        toast.success("String copied!");
    };


    return (
        <li className='flex gap-3 items-center'>
            <WithTooltip tooltipText={helpText}>
                <div className='flex w-fit px-2 py-1 gap-1 italic rounded bg-gray-800'>
                    <p className='italic wrap-anywhere'>{subject}</p>
                    <Button
                        onClick={copyStr}
                        variant='ghost'
                        className="p-0 w-5 h-auto cursor-pointer opacity-50"
                    >
                        <Copy className='transform scale-x-[-1] rotate-180' />
                    </Button>
                </div>
            </WithTooltip>
        </li>
    );
}


interface EmbeddedFileClueListProps {
    entries: ClueListItemProps<EmbeddedFile>[]
}
/**
 * Component to render a list of files that have been found embedded in a
 * package.
 */
function EmbeddedFileClueList({ entries }: EmbeddedFileClueListProps) {
    return (
        <div className='flex flex-col gap-2.5'>
            <h1 className='text-xl'>Embedded Files</h1>
            <ul className='list-none pl-5 flex flex-wrap gap-2.5 wrap-anywhere'>
                {entries.map((e, idx) => (
                    <EmbeddedFileClueListItem key={idx} subject={e.subject} helpText={e.helpText} />
                ))}
            </ul>
        </div>
    );
}


/**
 * Component to render a file that has been found embedded in a package,
 * and a button to download it
 */
function EmbeddedFileClueListItem({ subject, helpText }: ClueListItemProps<EmbeddedFile>) {
    function dloadFile() {
        const file = new File([subject.content], subject.name);
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(file);
        anchor.download = subject.name;
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
                        <p>{subject.name}</p>
                        <div className='flex flex-nowrap gap-[.25ch] text-muted-foreground'>
                            <p>{Math.round(subject.size / 1000)}</p>
                            <p>Kb</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
}


interface GUIDDisplayProps {
    guid?: string
}
/** 
 * Component to render a package's GUID in a card and a button to copy
 * it
 */
function GUIDDisplay({ guid }: GUIDDisplayProps) {
    const copyGUID = () => {
        navigator.clipboard.writeText(guid as string);
        toast.success("Package's GUID copied!");
    };


    return (
        <div className='flex items-center gap-2 text-sm'>
            <p>GUID</p>
            <Card className='flex flex-row items-center p-2 gap-3 text-muted-foreground'>
                <p className='wrap-anywhere'>{guid ?? 'Not available'}</p>
                {guid &&
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
    )
}



export default PackageAnalysisView;