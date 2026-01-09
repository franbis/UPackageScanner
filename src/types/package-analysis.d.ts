/** File that is embedded within a package */
interface EmbeddedFile {
    name: string
    ext: string
    size: number
    content: ArrayBuffer
}


/** Features that, if present in a package, can be seen as
 * evidences of file reading */
interface FileReadingHints {
    webResponse: boolean
    includeBinaryFile: boolean
    includePath: boolean
    sendBinary: boolean
}


/** Features that, if present in a package, can be seen as
 * evidences of file writing */
interface FileWritingHints {
    statLog: boolean
    statLogFile: boolean
    saveTimeDemo: boolean
}


/** Features that, if present in a package, can be seen as
 * evidences of file executing */
interface FileExecutingHints {
    localBatcherURL: boolean
    worldBatcherURL: boolean
    worldBatcherParams: boolean
    localLogDir: boolean
    executeLocalLogBatcher: boolean
    executeWorldLogBatcher: boolean
    executeSilentLogBatcher: boolean
    batchLocal: boolean
    fileProtocol: boolean
    // Unused
    //localBatcherParams
    //localStatsURL
    //worldStatsURL
    //worldLogDir
}


/** Features that, if present in a package, can be seen as
 * evidences of console reading or keylogging */
interface ConsoleReadingHints {
    typedStr: boolean
    history: boolean
    eInputKey: boolean
    eInputAction: boolean
    keyEvent: boolean
}


/** Package analysis result about suspicious content */
interface PackageAnalysis {
    embeddedFiles: EmbeddedFile[]
    fileReadingHints: FileReadingHints
    fileWritingHints: FileWritingHints
    fileExecutingHints: FileExecutingHints
    consoleReadingHints: ConsoleReadingHints
    /** URLs that may be opened without user's consent */
    urls: string[]
    readsFromClipboard: boolean
    takesScreenshots: boolean
    /** The entry level can be used to run scripts that
     * persist through server switches */
    accessesEntryLevel: boolean
    /** 'UWindowRootWindow' can be used to take full control
     * of the client game */
    accessesRootWindow: boolean
    /** 'UWindowMenuWindow' can be used to run code that persists
     * through reboots */
    accessesMenuWindow: boolean
    accessesConsole: boolean
    consoleCommands: string[]
    readsComputerName: boolean
    opensOSWindow: boolean
    extractsEmbeddedFiles: boolean
}


interface PackageAnalysisSection {
    name: string
    title: string
    description: string
    contentSeverity: Extract<
        VariantProps<typeof Badge>['variant'],
        'neutral' | 'suspicious' | 'dangerous'
    >
    analysisKeys: (keyof PackageAnalysis)[]
}


interface AnalyzedPackage {
    filename: string
    // Old packages do not have a GUID
    guid?: string,
    analysis: PackageAnalysis
}