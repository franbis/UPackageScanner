// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { caseInsCompare } from '@/lib/string_utils';



/**
 * Read a package and return the contextualized UTReader instance
 * 
 * @param blob Package file
 */
async function parsePkg(blob: Blob) {
    return new Promise<UTReader.reader | null>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            try {
                const reader  = new UTReader(this.result);
                resolve(reader.readPackage());
            } catch {
                reject(null);
            }
        };
        fileReader.onerror = () => reject(null);
        fileReader.readAsArrayBuffer(blob);
    });
}


interface ExtractEmbeddedFilesArgs {
    /** Package instance */
    pkg: UTReader.reader
    /** File's format */
    format?: string
    /** File's MIME type */
    mimeType?: string
}
/** Extract files embedded in a package */
function extractEmbeddedFiles({ pkg, format, mimeType }: ExtractEmbeddedFilesArgs) {
    const files: File[] = [];

    for (const mObj of pkg.getMusicObjects()) {
        const data = mObj.readData();
        const filename = `${mObj.objectName}.${data.format}`;

        if (format ? caseInsCompare(data.format, format) : true) {
            files.push(new File(
                [data.audio_data],
                filename,
                {type: mimeType }
            ));
        }
    }

    return files;
}


/**
 * Return a name's data if the name is present in a package's name table
 * 
 * @param pkg Package instance
 * @param name Name to look for
 */
function findName(pkg: UTReader.reader, name: string) {
    return pkg.getNameTable().find((e: NameTableItem) => e.name.toLowerCase() === name.toLowerCase());
}


interface FindBuiltInImportArgs {
    /** Package instance */
    pkg: UTReader.reader
    /** Outer object's name */
    outer?: string
    /** UnrealScript class of the object */
    type?: string
    /** Name of the object to look for */
    name: string
}
/** Return data for an object if a package imports it */
function findBuiltInImport({ pkg, outer, type, name }: FindBuiltInImportArgs) {
    return pkg.importTable.find((e: UTReader.ImportTableObject) =>
        (outer ? (caseInsCompare(e.className, 'package') ? true : caseInsCompare(e.packageName, outer)) : true)
        && (type ? caseInsCompare(e.className, type) : true)
        && caseInsCompare(e.objectName, name)
    );
}


interface FindStrArgs {
    /** Package instance */
    pkg: UTReader.reader
    /** String to look for */
    s: string
    /** If true, the start of the substring must match the
     * start of the string */
    fromStart?: boolean
    /** If true, the end of the substring must match the
     * end of the string */
    toEnd?: boolean
    /** If true, the substring casing must match the
     * string one */
    caseSensitive?: boolean
}
/** Given a substring, return an array of regex matches for strings
 * present in a package */
function findStr({
    pkg,
    s,
    fromStart=false,
    toEnd=false,
    caseSensitive=false
}: FindStrArgs) {
    let dataStr: string = pkg.decodeText(pkg.dataView, 'ascii')
    // Escape the substring as there could be StrProperty strings that
    // contain regex special characters.
    s = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (!caseSensitive)
        dataStr = dataStr.toLowerCase();
        s = s.toLowerCase();

    const partial = '[^\\x00]*';
    const reStart = fromStart ? '' : partial;
    const reEnd = toEnd ? '' : partial;

    const re = new RegExp(`\\x1F(${reStart}${s}${reEnd})\\x00`, 'g');

    return Array.from(dataStr.matchAll(re));
}



export {
    parsePkg,
    findName,
    findBuiltInImport,
    findStr,
    extractEmbeddedFiles
}