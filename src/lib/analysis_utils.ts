// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { extractEmbeddedFiles, findBuiltInImport, findName, findStr } from "@/lib/package_utils";

import pkgAsysSectionsData from '@/data/packageAnalysisSectionsData';



/** Check a package for suspicious content and return the results */
async function analyzePkg(pkg: UTReader.reader) {

    /**
     * Return true if a filename extension respects inclusion and exclusion
     * clue criteria
     */
    const isValidExt = (ext: string, clue: EmbeddedFileMatchesClue) => (
        (!clue.includedExtensions.length || clue.includedExtensions.includes(ext))
        && (!clue.excludedExtensions.length || !clue.excludedExtensions.includes(ext))
    );

    /**
     * Return true if an object or name that follows a clue criteria
     * is present in the package or name table
     */
    const hasObj = (clue: ObjectPresenceClue) => (
        clue.outer
            ?
                Boolean(findBuiltInImport({
                    pkg,
                    outer: clue.outer,
                    type: clue.type,
                    name: clue.name,
                }))
            :
                Boolean(findName(pkg, clue.name,))
    );

    /** Return an array of strings that follow a clue criteria in the package */
    const getStrings = (clue: StringMatchesClue) => {
        type AvailableParts = StringMatchesClue['part'][];
        return findStr({
            pkg,
            s: clue.substring,
            fromStart: (['left', 'whole'] as AvailableParts).includes(clue.part),
            toEnd: (['right', 'whole'] as AvailableParts).includes(clue.part),
        }).map(m => m[1]);
    };


    const asys: PackageAnalysis = {
        sections: Array.from(pkgAsysSectionsData)
    };

    
    const embFiles = extractEmbeddedFiles({ pkg });

    for (const sec of asys.sections) {
        for (const clueGroup of sec.clueGroups) {
            // Look for matches for all the clue types.
            
            for (const embFileMatchesClue of clueGroup.embeddedFileMatchesClues ?? []) {
                embFileMatchesClue.matches = [];
                for (const f of embFiles) {
                    // 'extractEmbeddedFiles' appends the extension
                    const ext = (f.name.split('.').pop() as string).toLowerCase();
                    if (isValidExt(ext, embFileMatchesClue)) {
                        embFileMatchesClue.matches.push({
                            name: f.name,
                            ext,
                            size: f.size,
                            content: await f.arrayBuffer()
                        });
                    }
                }
            }

            clueGroup.objPresenceClues?.map(c => c.present = hasObj(c));

            const strMatchesClues = [
                ...(clueGroup.strParamMatchesClues ?? []),
                ...(clueGroup.ccMatchesClues ?? []),
                ...(clueGroup.URLMatchesClues ?? []),
            ];
            strMatchesClues?.map(c => c.matches = getStrings(c));
        }
    }

    return asys;
}


/**
 * Get the count of presence clues which have `present` set to `true`
 * within an analysis section
 */
function getPresencesCount(analysisSection: PackageAnalysisSection) {
    let count = 0;

    for (const group of analysisSection.clueGroups)
        count += [
            ...(group.objPresenceClues ?? []),
        ]?.filter(c => c.present).length ?? 0;

    return count;
}


/**
 * Get the count of matches clues which have a non-empty `matches`
 * array within an analysis section
 */
function getMatchesCount(analysisSection: PackageAnalysisSection) {
    let count = 0;

    for (const group of analysisSection.clueGroups)
        count += [
            ...(group.embeddedFileMatchesClues ?? []),
            ...(group.strParamMatchesClues ?? []),
            ...(group.ccMatchesClues ?? []),
            ...(group.URLMatchesClues ?? []),
        ]?.reduce((prev, cur) => prev + (cur.matches?.length ?? 0), 0);
    
    return count;
}


/**
 * Get the count of presence and matches evidences within an analysis section
 */
function getCluesCount(analysisSection: PackageAnalysisSection) {
    const presencesCount = getPresencesCount(analysisSection);
    const matchesCount = getMatchesCount(analysisSection);
    
    return {
        presencesCount,
        matchesCount,
        contentCount: presencesCount + matchesCount
    }
}



export {
    analyzePkg,
    getCluesCount,
}