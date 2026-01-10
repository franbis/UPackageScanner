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
    };


    const removePkg = (filename: AnalyzedPackage['filename']) => {
        pkgsCtx?.setAnalyzedPkgs(pkgs => {
            const idx = pkgs.findIndex(p => p.filename === filename);
            pkgs.splice(idx, 1);
            return [...pkgs];
        });
    };


    return {
        analyzedPkgs: pkgsCtx?.analyzedPkgs ?? [],
        analyzePkg: _analyzePkg,
        removePkg,
    }
}



export {
    useAnalyzedPackages
}