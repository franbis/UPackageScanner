const pkgAsysSectionsData: PackageAnalysisSection[] = [
    {
        name: 'file_embedding',
        title: 'File Embedding',
        description: 'Along with media, packages can embed any kind of file (DLLs, executables, etc) through an exploit. These often come in separate packages of which sole purpose is to embed files, another package is often used to extract and execute.',
        contentSeverity: 'dangerous',
        analysisKeys: [
            'embeddedFiles',
            'extractsEmbeddedFiles',
        ]
    },
    {
        name: 'file_reading',
        title: 'File Reading',
        description: "UnrealScript can read files from anywhere on both the server and client machines, this isn't limited to 'INI' and localization files.",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'fileReadingClues',
        ]
    },
    {
        name: 'file_writing',
        title: 'File Writing & Deleting',
        description: "UnrealScript can write files anywhere on both the server and client machines. Since deletion involves writing, this means UnrealScript can also delete files and directories (e.g. 'System32' on Windows).",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'fileWritingClues',
        ]
    },
    {
        name: 'file_executing',
        title: 'File Executing',
        description: "UnrealScript can run any kind of file from anywhere on both the server and client machines. A malicious package could execute a software with specific parameters to take full control of the machine.",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'fileExecutingClues',
        ]
    },
    {
        name: 'console_reading',
        title: 'Console Reading',
        description: "Packages can read anything that was typed in the console window, either by direct reading or by keylogging.",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'accessesConsole',
            'consoleReadingClues',
            'takesScreenshots',
        ]
    },
    {
        name: 'information_sending',
        title: 'Information Sending',
        description: "Some functions and variables in UnrealScript can be used to retrieve personal information that is stored outside of the game.",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'readsComputerName',
            'readsFromClipboard',
            'fileReadingClues',
        ]
    },
    {
        name: 'game_controlling',
        title: 'Game Controlling',
        description: "A malicious package could take control of the game instance and files partially or fully. When that happens, switching server or rebooting the game may not be enough to get rid of the malicious code.",
        contentSeverity: 'dangerous',
        analysisKeys: [
            'accessesEntryLevel',
            'accessesRootWindow',
            'accessesMenuWindow',
        ]
    },
    {
        name: 'command_sending',
        title: 'Command Sending',
        description: "Any package can send commands on the behalf of both the server and client machine.",
        contentSeverity: 'suspicious',
        analysisKeys: [
            'consoleCommands',
        ]
    },
    {
        name: 'dialog_opening',
        title: 'Dialog Opening',
        description: "UnrealScript can open a dialog window in foreground, this is more of an inconvenience than a dangerous exploit.",
        contentSeverity: 'suspicious',
        analysisKeys: [
            'opensOSWindow',
        ]
    },
    {
        name: 'browser_opening',
        title: 'Browser Opening',
        description: "The engine provides developers with functions to easily open a webpage. A malicious package could open webpages non-stop, or send information along with the URL.",
        contentSeverity: 'neutral',
        analysisKeys: [
            'urls',
        ]
    },
]



export default pkgAsysSectionsData;