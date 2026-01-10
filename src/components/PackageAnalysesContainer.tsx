import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageAnalysisCard from "@/components/PackageAnalysisCard";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useRef, useState } from "react";

import useDraggableScroll from "use-draggable-scroll";



/** Container of package analysis results, each have their own tab */
function PackageAnalysesContainer() {
    const tabsListRef = useRef<HTMLDivElement>(null);

    const { onMouseDown } = useDraggableScroll(tabsListRef as React.RefObject<HTMLElement>, {
        direction: "horizontal",
    });
    const { analyzedPkgs, removePkg } = useAnalyzedPackages();

    const [activeTab, setActiveTab] = useState<string | null>(null);
    

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (!tabsListRef.current) return;
        e.preventDefault();
        tabsListRef.current.scrollLeft += e.deltaY;
    };


    const handleTabClick = (pkgFilename: string) => {
        setActiveTab(pkgFilename);
    };


    const handleTabClose = (pkgFilename: string) => {
        removePkg(pkgFilename);
        if (activeTab === pkgFilename)
            setActiveTab(null);
    };


    if (!analyzedPkgs.length) return;


    return (
        <Tabs
            value={activeTab ?? analyzedPkgs[0].filename}
            className='flex gap-2 h-full'
        >
            <TabsList
                className='w-auto overflow-x-scroll justify-baseline scrollbar-none'
                ref={tabsListRef}
                onMouseDown={onMouseDown}
                onWheel={handleWheel}
            >
                {analyzedPkgs.map(p => (
                    <TabsTrigger
                        key={p.filename}
                        value={p.filename}
                        className='cursor-pointer'
                        onClick={() => handleTabClick(p.filename)}
                        onMouseUp={e => {
                            if (e.button === 1)
                                handleTabClose(p.filename);
                        }}
                    >
                        <p>{p.filename}</p>
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

            {analyzedPkgs.map(p => (
                <TabsContent key={p.filename} value={p.filename} className='h-[80%]'>
                    <PackageAnalysisCard analyzedPkg={p} />
                </TabsContent>
            ))}
        </Tabs>
    )
}



export default PackageAnalysesContainer;