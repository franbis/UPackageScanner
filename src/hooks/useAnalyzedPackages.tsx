import { useContext } from "react";

// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { PackagesContext } from "@/contexts";

import { analyzePkg } from "@/lib/analysis_utils";



/** Return package analyses and a function to analyze one in
 * the context of PackageAnalysesContext */
function useAnalyzedPackages() {
    const pkgsCtx = useContext(PackagesContext);

    const _analyzePkg = async (pkg: UTReader.reader) => {
        const asys = await analyzePkg(pkg);
        pkgsCtx?.setAnalyzedPkgs(pkgs => {
            return [...pkgs, {
                filename: 'test',
                guid: 'test',
                analysis: asys,
            }];
        });
    }

    return {
        analyzedPkgs: pkgsCtx?.analyzedPkgs ?? [],
        analyzePkg: _analyzePkg
    }
}



export {
    useAnalyzedPackages
}