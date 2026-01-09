import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";



interface PackagesContextArgs {
    /** Packages data */
    analyzedPkgs: AnalyzedPackage[]
    /** Function to add a package to 'pkgs' */
    setAnalyzedPkgs: Dispatch<SetStateAction<AnalyzedPackage[]>>
}
/** Context for package analyses */
const PackagesContext = createContext<PackagesContextArgs | null>(null);



export {
    PackagesContext
}