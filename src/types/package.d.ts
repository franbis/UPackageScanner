type NormalizedObjectType = 'object' | 'package' | 'class' | 'function';


/** Package name table's item */
interface NameTableItem {
    name: string
    flags: number
}