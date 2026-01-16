/** Return the filename in a path or undefined if no filename is present */
function basename(path: string) {
    return path.split('/').pop();
}



export {
    basename
}