function unparse(x, level) {
    if (level === undefined) { level = 1; }

    const colon = level === 0 ? ':' : ': ';
    const closingBraceOnNewLine = level >= 3;
    const inlineShortContainers = level < 4;

    return $unparse(x, new Map(), colon, closingBraceOnNewLine, inlineShortContainers, level === 0, '', '', false);
}