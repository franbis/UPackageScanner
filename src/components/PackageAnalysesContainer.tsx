import { useAnalyzedPackages } from "@/hooks/useAnalyzedPackages";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageAnalysis from "@/components/PackageAnalysis";



// TODO - Populate the tabs with data provided by 'PackageAnalysesContext'
/** Container of package analysis results, each have their own tab */
function PackageAnalysesContainer() {
    const { analyzedPkgs } = useAnalyzedPackages();

    if (!analyzedPkgs.length) return;

    return (
        <Tabs defaultValue={analyzedPkgs[0].filename} className='flex gap-2 h-full'>
            <TabsList>
                {analyzedPkgs.map(p => (
                    <TabsTrigger value={p.filename}>{p.filename}</TabsTrigger>
                ))}
            </TabsList>

            {analyzedPkgs.map(p => (
                <TabsContent value={p.filename}>
                    <PackageAnalysis analyzedPkg={p} />
                </TabsContent>
            ))}
        </Tabs>
    )
}



export default PackageAnalysesContainer;