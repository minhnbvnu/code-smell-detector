function parseCompilerLineDirective(line) {
    const urlCharIndex = line.indexOf('/*ට');
    if (urlCharIndex === -1) { return undefined; }
    
    let endCharIndex = line.indexOf('*/', urlCharIndex + 1);
    let url = line.substring(urlCharIndex + 4, endCharIndex);
    endCharIndex = url.lastIndexOf(':');
    const quoteIndex = url.lastIndexOf('"');
    let offset = 0;

    let lineNumber = 0;
    if ((endCharIndex !== -1) && (quoteIndex < endCharIndex)) {
        // of the form "url":line
        lineNumber = parseInt(url.substring(endCharIndex + 1));
        url = url.substring(0, endCharIndex);
    }
    if (url[url.length - 1] === '"') {
        url = url.substring(0, url.length - 1);
    }

    return {url: url, lineNumber: lineNumber};
}