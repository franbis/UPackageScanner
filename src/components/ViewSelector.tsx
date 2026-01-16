import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from "react";

import ScrollContainer from 'react-indiana-drag-scroll';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { XIcon } from "lucide-react";
import BaseView from './BaseView';



interface ViewSelectorItem {
    tabName: string
    onTabClose: () => void
    viewNode: ReactNode
}


interface ViewSelectorProps {
    itemsData: ViewSelectorItem[]
    emptyText?: string
}
/** Container of views that render when their tab is active */
function ViewSelector({ itemsData = [], emptyText = 'No tabs present' }: ViewSelectorProps) {
    const scrollContRef = useRef<HTMLElement>(null);
    const prevItemsDataLenRef = useRef(itemsData.length);

    const [activeTab, setActiveTab] = useState<string>();


    /** Construct a tab ID string */
    const buildTabId = (name: string) => {
        return `tabs-trigger-${name}`;
    };


    /** Set the active tab and scroll it into view */
    const setActiveTabWrapper = (name: typeof activeTab) => {
        setActiveTab(name);
        if (name)
            if (scrollContRef.current) {
                const id = buildTabId(name);
                const tab = scrollContRef.current.querySelector(`[tab-id="${id}"]`);
                tab?.scrollIntoView();
            }
    };


    const handleTabClick = (name: string) => {
        setActiveTabWrapper(name);
    };


    const handleTabClose = (name: string) => {
        itemsData.find((d => d.tabName === name))?.onTabClose();
        if (activeTab === name)
            setActiveTabWrapper(undefined);
    };


    // Allow scrolling through tabs horizontally
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


    // Find and trigger the best tab based on new insertions
    useEffect(() => {
        const setBestTab = (tabIdx: number) => {
            setActiveTabWrapper(itemsData.at(tabIdx)?.tabName);
            prevItemsDataLenRef.current = itemsData.length;
        };
        
        
        let timeout: number | undefined;

        const newItemsLen = Math.max(0, itemsData.length - prevItemsDataLenRef.current);

        if (itemsData.length && !newItemsLen)
            // No new items added, only default ones are present
            setBestTab(0);
        else if (newItemsLen === 1)
            // Single item added, trigger its tab immediately
            setBestTab(-1);
        else if (newItemsLen > 1)
            // Multiple items added, don't trigger each tab individually.
            // Instead, wait some time for all the views to be ready and
            // trigger the last tab
            timeout = setTimeout(() => {
                setBestTab(-1);
            }, 300);


        return () => clearTimeout(timeout);
    }, [itemsData]);


    if (!itemsData.length)
        // No views to render, render a dummy one instead.
        return (
            <Tabs className='flex gap-2 h-full' value=''>
                <TabsList className='w-auto invisible'>
                        <TabsTrigger value=''></TabsTrigger>
                </TabsList>
                <TabsContent value='' className='h-[80%]'>
                    <BaseView
                        content={
                            <div className='flex w-full h-full justify-center items-center'>
                                <p className='text-muted-foreground'>
                                    {emptyText}
                                </p>
                            </div>
                        }
                    />
                </TabsContent>
            </Tabs>
        );


    return (
        <Tabs value={activeTab} className='flex gap-2 h-full'>
            <ScrollContainer innerRef={scrollContRef} className="scroll-container scroll-smooth">
                <TabsList className='w-auto overflow-x-scroll justify-baseline scrollbar-none'>
                        {itemsData.map(vData => (
                            <TabsTrigger
                                key={vData.tabName}
                                tab-id={buildTabId(vData.tabName)}
                                value={vData.tabName}
                                onClick={() => handleTabClick(vData.tabName)}
                                onMouseUp={e => {
                                    if (e.button === 1)
                                        handleTabClose(vData.tabName);
                                }}
                            >
                                <p>{vData.tabName}</p>
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

            {itemsData.map(iData => (
                <TabsContent key={iData.tabName} value={iData.tabName} className='h-[80%]'>
                    {iData.viewNode}
                </TabsContent>
            ))}
        </Tabs>
    )
}



export {
    type ViewSelectorItem
}
export default ViewSelector;