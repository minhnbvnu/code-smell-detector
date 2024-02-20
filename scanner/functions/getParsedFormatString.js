function getParsedFormatString(formatStr) {
    return parsedFormatStrCache[formatStr] ||
        (parsedFormatStrCache[formatStr] = parseFormatString(formatStr));
}