function jsToPyxlLineNumber(lineNumber, lineArray) {
    // If the line array was not precomputed
    lineArray = lineArray || compiledProgram.split('\n');

    // Look backwards from error.lineNumber for '/*@"'
    let urlLineIndex, urlCharIndex = -1;

    for (urlLineIndex = Math.min(Math.max(0, lineNumber - 1), lineArray.length - 1); (urlLineIndex >= 0) && (urlCharIndex === -1); --urlLineIndex) {
        urlCharIndex = lineArray[urlLineIndex].indexOf('/*ට"');
    }

    // Always overshoots by one
    ++urlLineIndex;

    const result = parseCompilerLineDirective(lineArray[urlLineIndex]);

    return {url: result.url, lineNumber: lineNumber - urlLineIndex - 3 + result.lineNumber};
}