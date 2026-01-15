import { useState } from "react";

import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import ViewSelector, { type ViewSelectorItemProps } from "./ViewSelector";
import PackageAnalysisView from "./PackageAnalysisCard";
import MarkdownFileView from "./MarkdownFileView";

import markdownPaths from '@/data/markdownPaths.json';



/** Container of package analysis results, each have their own tab */
function PackageAnalysesContainer() {
	const [overviewOpened, setOverviewOpened] = useState(true);

    const { analyzedPkgs, removePkg } = useAnalyzedPackages();


    const viewNodes: ViewSelectorItemProps[] = analyzedPkgs.map(p => ({
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



export default PackageAnalysesContainer;