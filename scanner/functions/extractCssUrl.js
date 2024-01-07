function extractCssUrl(str) {
    const test = isCssUrl(str);
    let matches;
    if (test === 3) {
        return str;
    } else if (test === 1) {
        matches = cssUrlRe.exec(str);
        return matches[1];
    } else if (test === 2) {
        matches = cssUrlReWithQuote.exec(str);
        return matches[2];
    } else {
        // return as is if not an css url
        return str;
    }
}