import { useEffect, useRef, useState } from "react";

import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import PackageAnalysisCard from "@/components/PackageAnalysisCard";

import ScrollContainer from 'react-indiana-drag-scroll';

import { XIcon } from "lucide-react";



/** Container of package analysis results, each have their own tab */
function PackageAnalysesContainer() {
    const scrollContRef = useRef<HTMLElement>(null);
    
    const { analyzedPkgs, removePkg } = useAnalyzedPackages();

    const [activeTab, setActiveTab] = useState<string | null>(null);


    const handleTabClick = (pkgFilename: string) => {
        setActiveTab(pkgFilename);
    };


    const handleTabClose = (pkgFilename: string) => {
        removePkg(pkgFilename);
        if (activeTab === pkgFilename)
            setActiveTab(null);
    };


    useEffect(() => {
        const element = scrollContRef.current;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (element)
                element.scrollLeft += e.deltaY;
        };
        element?.addEventListener('wheel', onWheel);
        return () => element?.removeEventListener('wheel', onWheel);
    }, [scrollContRef.current]);


    if (!analyzedPkgs.length) return;


    return (
        <Tabs
            value={activeTab ?? analyzedPkgs[0].filename}
            className='flex gap-2 h-full'
        >
            <ScrollContainer
                className="scroll-container scroll-smooth"
                innerRef={scrollContRef}
            >
                <TabsList
                    className='w-auto overflow-x-scroll justify-baseline scrollbar-none'
                >
                        {analyzedPkgs.map(p => (
                            <TabsTrigger
                                key={p.filename}
                                value={p.filename}
                                onClick={() => handleTabClick(p.filename)}
                                onMouseUp={e => {
                                    if (e.button === 1)
                                        handleTabClose(p.filename);
                                }}
                                //className='grow-0 w-30 cursor-pointer'
                            >
                                <p
                                    //className='overflow-auto text-ellipsis scrollbar-none'
                                >
                                    {p.filename}
                                </p>
                                <Button
                                    variant='ghost'
                                    className='p-0 w-1 h-auto opacity-50 cursor-pointer'
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleTabClose(p.filename);
                                    }}
                                    // button cannot be a descendent of button
                                    // and TabsTrigger is one.
                                    asChild
                                >
                                    <div>
                                        <XIcon />
                                    </div>
                                </Button>
                            </TabsTrigger>
                        ))}
                </TabsList>
            </ScrollContainer>

            {analyzedPkgs.map(p => (
                <TabsContent key={p.filename} value={p.filename} className='h-[80%]'>
                    <PackageAnalysisCard analyzedPkg={p} />
                </TabsContent>
            ))}
        </Tabs>
    )
}



export default PackageAnalysesContainer;