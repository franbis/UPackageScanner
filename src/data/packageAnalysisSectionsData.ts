import commonContentData from '@/data/commonPackageContentData.json';



const objClues: Record<string, ObjectPresenceClue> = {
    includeBinaryFile:          { name: 'includeBinaryFile', type: 'Function', outer: 'WebResponse' },
    includePath:                { name: 'includePath', type: 'StrProperty', outer: 'WebResponse' },
    WebResponse:                { name: 'WebResponse', type: 'Class', outer: 'UWeb' },
    sendBinary:                 { name: 'sendBinary', type: 'Function', outer: 'WebResponse' },
    StatLog:                    { name: 'StatLog', type: 'Class', outer: 'Engine' },
    StatLogFile:                { name: 'StatLogFile', type: 'Class', outer: 'Engine' },
    localBatcherURL:            { name: 'localBatcherURL', type: 'StrProperty', outer: 'StatLog' },
    worldBatcherURL:            { name: 'worldBatcherURL', type: 'StrProperty', outer: 'StatLog' },
    worldBatcherParams:         { name: 'worldBatcherParams', type: 'StrProperty', outer: 'StatLog' },
    localLogDir:                { name: 'localLogDir', type: 'StrProperty', outer: 'StatLog' },
    executeLocalLogBatcher:     { name: 'executeLocalLogBatcher', type: 'Function', outer: 'StatLog' },
    executeWorldLogBatcher:     { name: 'executeWorldLogBatcher', type: 'Function', outer: 'StatLog' },
    executeSilentLogBatcher:    { name: 'executeSilentLogBatcher', type: 'Function', outer: 'StatLog' },
    batchLocal:                 { name: 'batchLocal', type: 'Function', outer: 'StatLog' },
    typedStr:                   { name: 'typedStr', type: 'StrProperty', outer: 'Console' },
    history:                    { name: 'history', type: 'StrProperty', outer: 'Console' },
    eInputKey:                  { name: 'EInputKey', type: 'Enum', outer: 'Console' },
    eInputAction:               { name: 'EInputAction', type: 'Enum', outer: 'Console' },
    keyEvent:                   { name: 'keyEvent', type: 'Function', outer: 'Console' },
    getEntryLevel:              { name: 'getEntryLevel', type: 'Function', outer: 'PlayerPawn' },
    UMenuRootWindow:            { name: 'UMenuRootWindow', type: 'Class', outer: 'UWindow' },
    UWindowRootWindow:          { name: 'UWindowRootWindow', type: 'Class', outer: 'UWindow' },
    WindowConsole:              { name: 'WindowConsole', type: 'Class', outer: 'UWindow' },
    computerName:               { name: 'computerName', type: 'StrProperty', outer: 'LevelInfo' },
};

const nameClues: Record<string, Pick<ObjectPresenceClue, 'name'>> = {
    badParameters:      { name: 'badParameters' },
    saveTimeDemo:       { name: 'saveTimeDemo' },
    pasteFromClipboard: { name: 'pasteFromClipboard' },
    sshot:              { name: 'sshot' },
};

const strParamClues: Record<string, StringMatchesClue> = {
    BatchExportCommandlet:  { substring: 'BatchExportCommandlet', part: 'anywhere' },
}

const URLClues: Record<string, StringMatchesClue> = {
    http:           { substring: 'http://', part: 'left' },
    https:          { substring: 'https://', part: 'left' },
    fileProtocol:   { substring: 'file:///', part: 'left' },
}

const ccClues: Record<string, StringMatchesClue> = {
    getIni: { substring: 'get ini:', part: 'left' },
    setIni: { substring: 'set ini:', part: 'left' },
    shot:   { substring: 'shot', part: 'whole' },
}

const embFileClues: Record<string, EmbeddedFileMatchesClue> = {
    nonMusicFiles: { includedExtensions: [], excludedExtensions: commonContentData.musicFileExtensions }
}


/** Files and features that, if present in a package, can be seen as
 * evidences of file game software / OS manipulation */
const fileEmbeddingClueGroups: ClueGroup[] = [
    {
        embeddedFileMatchesClues: [
            embFileClues.nonMusicFiles,
        ],
    },
    {
        description: 'May extract embedded files',
        strParamMatchesClues: [
            strParamClues.BatchExportCommandlet,
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of file reading */
const fileReadingClueGroups: ClueGroup[] = [
    {
        description: 'May read files',
        objPresenceClues: [
            objClues.WebResponse,
            objClues.includeBinaryFile,
            objClues.sendBinary,
        ],
    },
    {
        description: 'May allow reading files from any path',
        objPresenceClues: [
            objClues.includePath,
        ]
    }
];

/** Features that, if present in a package, can be seen as
 * evidences of file writing */
const fileWritingClueGroups: ClueGroup[] = [
    {
        description: 'May write files',
        objPresenceClues: [
            objClues.StatLog,
            objClues.StatLogFile,
            nameClues.saveTimeDemo,
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of file executing */
const fileExecutingClueGroups: ClueGroup[] = [
    {
        description: 'May execute files',
        objPresenceClues: [
            objClues.executeLocalLogBatcher,
            objClues.executeWorldLogBatcher,
            objClues.executeSilentLogBatcher,
            objClues.batchLocal,
        ],
        URLMatchesClues: [
            URLClues.fileProtocol,
        ],
    },
    {
        description: 'May specify the filepath',
        objPresenceClues: [
            objClues.localBatcherURL,
            objClues.worldBatcherURL,
            objClues.localLogDir,
        ]
    },
    {
        description: 'May set the execution parameters',
        objPresenceClues: [
            objClues.worldBatcherParams,
        ]
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of console reading or keylogging */
const consoleReadingClueGroups: ClueGroup[] = [
    {
        description: 'May read the input sent to the console',
        objPresenceClues: [
            objClues.typedStr,
            objClues.eInputKey,
            objClues.eInputAction,
            objClues.keyEvent,
        ],
    },
    {
        description: "May read the console's history",
        objPresenceClues: [
            objClues.history,
        ],
    },
    {
        description: 'May take screenshots of the console',
        objPresenceClues: [
            nameClues.sshot,
        ],
        ccMatchesClues: [
            ccClues.shot,
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of information being stolen */
const infoSendingClueGroups: ClueGroup[] = [
    ...fileReadingClueGroups,
    {
        description: "May read the computer's name",
        objPresenceClues: [
            objClues.computerName,
        ],
    },
    {
        description: "May read from the clipboard",
        objPresenceClues: [
            nameClues.pasteFromClipboard,
        ],
    },
    {
        description: "May read from the game's configuration file",
        ccMatchesClues: [
            ccClues.getIni
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of game software takeover */
const gameControllingClueGroups: ClueGroup[] = [
    {
        description: "May take control of the game software until it closes",
        objPresenceClues: [
            objClues.getEntryLevel,
            objClues.UWindowRootWindow,
            objClues.UMenuRootWindow,
        ],
    },
    {
        description: "May take control of the game software permanently",
        ccMatchesClues: [
            ccClues.setIni
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of dialogs opening */
const dialogOpeningClueGroups: ClueGroup[] = [
    {
        description: 'May open dialogs',
        objPresenceClues: [
            nameClues.badParameters,
        ],
    },
];

/** Features that, if present in a package, can be seen as
 * evidences of URL opening */
const urlClueGroups: ClueGroup[] = [
    {
        description: 'May open the default browser',
        URLMatchesClues: [
            URLClues.http,
            URLClues.https,
        ],
    },
];


/** Package analysis sections array with unprocessed clues.
 * This can be used as a template for a package analysis by
 * processing the clues */
const pkgAsysSectionsData: PackageAnalysisSection[] = [
    {
        name: 'file_embedding',
        title: 'File Embedding',
        description: 'Along with media, packages can embed any kind of file (DLLs, executables, etc) through an exploit. These often come in separate packages of which sole purpose is to embed files, another package is often used to extract and execute.',
        contentSeverity: 'dangerous',
        clueGroups: fileEmbeddingClueGroups,
    },
    {
        name: 'file_reading',
        title: 'File Reading',
        description: "UnrealScript can read files from anywhere on both the server and client machines, this isn't limited to 'INI' and localization files.",
        contentSeverity: 'dangerous',
        clueGroups: fileReadingClueGroups,
    },
    {
        name: 'file_writing',
        title: 'File Writing & Deleting',
        description: "UnrealScript can write files anywhere on both the server and client machines. Since deletion involves writing, this means UnrealScript can also delete files and directories (e.g. 'System32' on Windows).",
        contentSeverity: 'dangerous',
        clueGroups: fileWritingClueGroups,
    },
    {
        name: 'file_executing',
        title: 'File Executing',
        description: "UnrealScript can run any kind of file from anywhere on both the server and client machines. A malicious package could execute a software with specific parameters to take full control of the machine.",
        contentSeverity: 'dangerous',
        clueGroups: fileExecutingClueGroups,
    },
    {
        name: 'console_reading',
        title: 'Console Reading',
        description: "Packages can read anything that was typed in the console window, either by direct reading or by keylogging.",
        contentSeverity: 'dangerous',
        clueGroups: consoleReadingClueGroups,
    },
    {
        name: 'information_sending',
        title: 'Information Sending',
        description: "Some functions and variables in UnrealScript can be used to retrieve personal information that is stored outside of the game.",
        contentSeverity: 'dangerous',
        clueGroups: infoSendingClueGroups,
    },
    {
        name: 'game_controlling',
        title: 'Game Controlling',
        description: "A malicious package could take control of the game instance and files partially or fully. When that happens, switching server or rebooting the game may not be enough to get rid of the malicious code.",
        contentSeverity: 'dangerous',
        clueGroups: gameControllingClueGroups,
    },
    {
        name: 'dialog_opening',
        title: 'Dialog Opening',
        description: "UnrealScript can open a dialog window in foreground, this is more of an inconvenience than a dangerous exploit.",
        contentSeverity: 'suspicious',
        clueGroups: dialogOpeningClueGroups,
    },
    {
        name: 'browser_opening',
        title: 'Browser Opening',
        description: "The engine provides developers with functions to easily open a webpage. A malicious package could open webpages non-stop, or send information along with the URL.",
        contentSeverity: 'neutral',
        clueGroups: urlClueGroups,
    },
]



export default pkgAsysSectionsData;