// @ts-expect-error Third party JS library
import UTReader from '@/lib/third_party/UTPackage.js/UTReader';

import { extractEmbeddedFiles, findBuiltInImport, findName, findStr } from "@/lib/package_utils";



/** Check a package for suspicious content and return the results */
async function analyzePkg(pkg: UTReader.reader) {
    const embFiles: EmbeddedFile[] = [];
    for (const d of extractEmbeddedFiles({ pkg })) {
        embFiles.push({
            name: d.name,
            // 'extractEmbeddedFiles' appends the extension
            ext: d.name.split('.').pop() as string,
            size: d.size,
            content: await d.arrayBuffer()
        })
    }


    /** Return true if an object is present in the package */
    const hasObj = (name: string, type?: string, outer?: string) => (
        Boolean(findBuiltInImport({pkg, outer, type, name}))
    );

    /** Return true if a name is present in the package's name table */
    const hasName = (name: string) => (
        Boolean(findName(pkg, name))
    );

    /** Return true if a string is present in the package */
    const hasStr = (s: string) => (
        Boolean(findStr({pkg, s, fromStart: true, toEnd: true}).length)
    );
    /** Return true if a string is present in the package */
    const hasStrStart = (s: string) => (
        Boolean(findStr({pkg, s, fromStart: true}).length)
    );
    /** Return true if a string is present in the package */
    const hasSubStr = (s: string) => (
        Boolean(findStr({pkg, s}).length)
    );

    /** Return URL-formatted strings present in the package */
    const findUrls = () => [
        ...findStr({pkg, s: 'http://', fromStart: true}).map(m => m[1]),
        ...findStr({pkg, s: 'https://', fromStart: true}).map(m => m[1]),
    ];

    /** Return suspicious console commands present in the package */
    const findConsoleCmds = () => [
        ...findStr({pkg, s: 'get ini:', fromStart: true}).map(m => m[1]),
        ...findStr({pkg, s: 'set ini:', fromStart: true}).map(m => m[1]),
    ];


    const asys: PackageAnalysis = {
        embeddedFiles: embFiles,
        fileReadingHints: {
            includeBinaryFile: hasObj('includeBinaryFile', 'Function', 'WebResponse'),
            includePath: hasObj('includePath', 'StrProperty', 'WebResponse'),
            webResponse: hasObj('WebResponse', 'Class', 'UWeb'),
            sendBinary: hasObj('sendBinary', 'Function', 'WebResponse'),
        },
        fileWritingHints: {
            statLog: hasObj('StatLog', 'Class', 'Engine'),
            statLogFile: hasObj('StatLogFile', 'Class', 'Engine'),
            saveTimeDemo: hasName('saveTimeDemo'),
        },
        fileExecutingHints: {
            executeLocalLogBatcher: hasObj('ExecuteLocalLogBatcher', 'Function', 'StatLog'),
            executeWorldLogBatcher: hasObj('ExecuteWorldLogBatcher', 'Function', 'StatLog'),
            fileProtocol: hasStrStart('file:///'),
        },
        consoleKeyloggingHints: {
            eInputKey: hasObj('EInputKey', 'Enum', 'Console'),
            eInputAction: hasObj('EInputAction', 'Enum', 'Console'),
            keyEvent: hasObj('keyEvent', 'Function', 'Console')
        },
        urls: findUrls(),
        readsFromClipboard: hasName('pasteFromClipboard'),
        takesScreenshots: hasStr('shot') || hasName('sshot'),
        accessesEntryLevel: hasObj('getEntryLevel', 'Function', 'PlayerPawn'),
        accessesMenuWindow: hasObj('UMenuRootWindow', 'Class', 'UWindow'),
        accessesRootWindow: hasObj('UWindowRootWindow', 'Class', 'UWindow'),
        accessesConsole: hasObj('WindowConsole', 'Class', 'UWindow'),
        consoleCommands: findConsoleCmds(),
        readsComputerName: hasObj('computerName', 'StrProperty', 'LevelInfo'),
        opensOSWindow: hasName('badParameters'),
        extractsEmbeddedFiles: hasSubStr('BatchExportCommandlet'),
    };

    return asys;
}



export {
    analyzePkg
}