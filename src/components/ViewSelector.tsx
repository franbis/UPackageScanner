import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from "react";

import ScrollContainer from 'react-indiana-drag-scroll';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { XIcon } from "lucide-react";



interface ViewSelectorItem {
    tabName: string
    onTabClose: () => void
    viewNode: ReactNode
}


interface ViewSelectorProps {
    itemsData: ViewSelectorItem[]
}
/** Container of views that render when their tab is active */
function ViewSelector({ itemsData }: ViewSelectorProps) {
    const scrollContRef = useRef<HTMLElement>(null);

    const [activeTab, setActiveTab] = useState<string | null>(null);


    const handleTabClick = (name: string) => {
        setActiveTab(name);
    };


    const handleTabClose = (name: string) => {
        itemsData.find((d => d.tabName === name))?.onTabClose();
        if (activeTab === name)
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


    if (!itemsData.length) return;


    return (
        <Tabs
            value={activeTab ?? itemsData[0].tabName}
            className='flex gap-2 h-full'
        >
            <ScrollContainer
                className="scroll-container scroll-smooth"
                innerRef={scrollContRef}
            >
                <TabsList
                    className='w-auto overflow-x-scroll justify-baseline scrollbar-none'
                >
                        {itemsData.map(vData => (
                            <TabsTrigger
                                key={vData.tabName}
                                value={vData.tabName}
                                onClick={() => handleTabClick(vData.tabName)}
                                onMouseUp={e => {
                                    if (e.button === 1)
                                        handleTabClose(vData.tabName);
                                }}
                                //className='grow-0 w-30 cursor-pointer'
                            >
                                <p
                                    //className='overflow-auto text-ellipsis scrollbar-none'
                                >
                                    {vData.tabName}
                                </p>
                                <Button
                                    variant='ghost'
                                    className='p-0 w-1 h-auto opacity-50 cursor-pointer'
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleTabClose(vData.tabName);
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

            {itemsData.map(iData => {
                return (
                    <TabsContent key={iData.tabName} value={iData.tabName} className='h-[80%]'>
                        {iData.viewNode}
                    </TabsContent>
                );
            })}
        </Tabs>
    )
}



export {
    type ViewSelectorItem
}
export default ViewSelector;