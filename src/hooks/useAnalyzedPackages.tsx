import { useContext } from "react";

// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { PackagesContext } from "@/contexts";

import { analyzePkg } from "@/lib/analysis_utils";



/** Return package analyses and a function to analyze one in
 * the context of PackageAnalysesContext */
function useAnalyzedPackages() {
    const pkgsCtx = useContext(PackagesContext);

    interface _AnalyzePkgArgs {
        filename: AnalyzedPackage['filename']
        pkg: UTReader.reader
    }
    const _analyzePkg = async ({ filename, pkg }: _AnalyzePkgArgs) => {
        const analysis = await analyzePkg(pkg);
        pkgsCtx?.setAnalyzedPkgs(pkgs => [
            ...pkgs,
            {filename, guid: pkg.header.guid, analysis}
        ]);
    }

    return {
        analyzedPkgs: pkgsCtx?.analyzedPkgs ?? [],
        analyzePkg: _analyzePkg
    }
}



export {
    useAnalyzedPackages
}