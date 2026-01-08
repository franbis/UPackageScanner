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
    executeLocalLogBatcher: boolean
    executeWorldLogBatcher: boolean
    fileProtocol: boolean
}


/** Features that, if present in a package, can be seen as
 * evidences of console keylogging */
interface ConsoleKeyloggingHints {
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
    consoleKeyloggingHints: ConsoleKeyloggingHints
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