/** Return the filename in a path or undefined if no filename is present */
function basename(path: string) {
    return path.split('/').pop();
}


/** Return the URL string from a URI */
function buildURL(uri: string) {
    return new URL(uri.replace(/^\/+/, ''), window.location.origin + import.meta.env.BASE_URL).toString();
}



export {
    basename,
    buildURL,
}