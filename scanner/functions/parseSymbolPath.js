function parseSymbolPath(symbol, replacer) {
    for (const p in symbol) {
        if (symbol.hasOwnProperty(p) && p !== 'textName') {
            if (isString(symbol[p]) && symbol[p].length > 2) {
                symbol[p] = symbol[p].replace(URL_PATTERN, replacer);
            } else if (isFunctionDefinition(symbol[p])) {
                symbol[p] = parseStops(symbol[p], replacer);
            } else if (isObject(symbol[p])) {
                parseSymbolPath(symbol[p], replacer);
            }
        }
    }
}