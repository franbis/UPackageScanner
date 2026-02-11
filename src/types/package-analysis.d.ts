/** File that is embedded within a package */
interface EmbeddedFile {
    name: string
    ext: string
    size: number
    content: ArrayBuffer
}


/** Base interface for any clue that could be found only once within a
 * package */
interface PresenceClue {
    /** If `true`, the package contains the evidence */
    present?: boolean
}

/** Base interface for any clue that may be found multiple times within
 * a package */
interface MatchesClue<T> {
    /** Array of content that matches the evidence type */
    matches?: T[]
}


interface EmbeddedFileMatchesClue extends MatchesClue<EmbeddedFile> {
    includedExtensions: string[]
    excludedExtensions: string[]
}


interface ObjectPresenceClue extends PresenceClue {
    name: string
    type?: string
    outer?: string
    package?: string
}


interface StringMatchesClue extends MatchesClue<string> {
    substring: string
    part: 'left' | 'right' | 'anywhere' | 'whole'
}


interface ClueGroup {
    description?: string
    
    embeddedFileMatchesClues?: EmbeddedFileMatchesClue[]
    objPresenceClues?: ObjectPresenceClue[]
    strParamMatchesClues?: StringMatchesClue[]
    ccMatchesClues?: StringMatchesClue[]
    URLMatchesClues?: StringMatchesClue[]
}


interface PackageAnalysisSection {
    name: string
    title: string
    description: string
    contentSeverity: Extract<
        VariantProps<typeof Badge>['variant'],
        'neutral' | 'suspicious' | 'dangerous'
    >
    clueGroups: ClueGroup[]
}


interface PackageAnalysis {
    sections: PackageAnalysisSection[]
}


interface AnalyzedPackage {
    filename: string
    // Old packages do not have a GUID
    guid?: string,
    analysis: PackageAnalysis
}