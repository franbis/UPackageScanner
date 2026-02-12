import { useState } from "react";

import { basename } from "@/lib/path_utils";

import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import type { ViewSelectorItem } from '@/components/ViewSelector';
import ViewSelector from "@/components/ViewSelector";
import PackageAnalysisView from "@/components/PackageAnalysisView";
import MarkdownFileView from "@/components/MarkdownFileView";

import staticPaths from '@/data/staticPaths.json';



/** Selector of package analysis views */
function PackageAnalysisViewSelector() {
    // Used to show the overview view as default one when none is
    // present.
	const [overviewTabActive, setOverviewTabActive] = useState(true);

    const { analyzedPkgs, removePkg } = useAnalyzedPackages();


    const viewNodes: ViewSelectorItem[] = analyzedPkgs.map(p => ({
        tabName: p.filename,
        onTabClose: () => {removePkg(p.filename)},
        viewNode: <PackageAnalysisView
            analyzedPkg={p}
        />
    }));
    if (overviewTabActive) {
        // Prepend the overview view.
        viewNodes.unshift({
            // Get the filename
            tabName: basename(staticPaths.markdownFiles.overview) as string,
            onTabClose: () => setOverviewTabActive(false),
            viewNode: <MarkdownFileView uri={staticPaths.markdownFiles.overview} />
        });
    }


    return (
        <ViewSelector
            items={viewNodes}
            emptyText='No package analysis to show'
        />
    )
}



export default PackageAnalysisViewSelector;