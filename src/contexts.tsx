import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";



interface PackageAnalysesContextArgs {
    /** Package analysis results */
    analyses: PackageAnalysis[]
    /** Function to analyze a package */
    setAnalyses: Dispatch<SetStateAction<PackageAnalysis[]>>
}
/** Context for package analyses */
const PackageAnalysesContext = createContext<PackageAnalysesContextArgs | null>(null);



export {
    type PackageAnalysesContextArgs,
    
    PackageAnalysesContext
}