import { useContext } from "react";

// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { PackageAnalysesContext } from "@/contexts";

import { analyzePkg } from "@/lib/analysis_utils";



/** Return package analyses and a function to analyze one in
 * the context of PackageAnalysesContext */
function usePackageAnalyses() {
    const asesCtx = useContext(PackageAnalysesContext);

    const analyzePackage = async (pkg: UTReader.reader) => {
        const asys = await analyzePkg(pkg);
        asesCtx?.setAnalyses(ases => {
            return [...ases, asys];
        });
    }

    return {
        analyses: asesCtx?.analyses ?? [],
        analyzePackage
    }
}



export {
    usePackageAnalyses
}