import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageAnalysis from "@/components/PackageAnalysis";



// TODO - Populate the tabs with data provided by 'PackageAnalysesContext'
/** Container of package analysis results, each have their own tab */
function PackageAnalysesContainer() {
    return (
        <Tabs defaultValue="package_1" className='flex gap-2 h-full'>
            <TabsList>
                <TabsTrigger value="package_1">Package 1</TabsTrigger>
                <TabsTrigger value="package_2">Package 2</TabsTrigger>
            </TabsList>

            <TabsContent value="package_1">
                <PackageAnalysis />
            </TabsContent>
            <TabsContent value="package_2">
                <PackageAnalysis />
            </TabsContent>
        </Tabs>
    )
}



export default PackageAnalysesContainer;