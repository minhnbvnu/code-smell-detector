function getCorrectionString(string, n) {
    let matches = string.match(/(\r?\n[ \t]*)/g);
    if (!matches) {
        return eol.repeat(n + 1);
    }
    let number = Math.max(0, n + 1 - matches.length);
    return eol.repeat(number);
}