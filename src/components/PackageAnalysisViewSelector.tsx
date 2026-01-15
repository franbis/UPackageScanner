import { useState } from "react";

import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import type { ViewSelectorItem } from '@/components/ViewSelector';
import ViewSelector from "@/components/ViewSelector";
import PackageAnalysisView from "@/components/PackageAnalysisView";
import MarkdownFileView from "@/components/MarkdownFileView";

import markdownPaths from '@/data/markdownPaths.json';



/** Selector of package analysis views */
function PackageAnalysisViewSelector() {
	const [overviewOpened, setOverviewOpened] = useState(true);

    const { analyzedPkgs, removePkg } = useAnalyzedPackages();


    const viewNodes: ViewSelectorItem[] = analyzedPkgs.map(p => ({
        tabName: p.filename,
        onTabClose: () => {removePkg(p.filename)},
        viewNode: <PackageAnalysisView
            analyzedPkg={p}
        />
    }));
    if (overviewOpened) {
        viewNodes.unshift({
            tabName: markdownPaths.overview.split('/').pop() as string,
            onTabClose: () => setOverviewOpened(false),
            viewNode: <MarkdownFileView uri={markdownPaths.overview} />
        });
    }


    return (
        <ViewSelector
            itemsData={viewNodes}
        />
    )
}



export default PackageAnalysisViewSelector;