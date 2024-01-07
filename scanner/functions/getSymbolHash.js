function getSymbolHash(symbol, prefix) {
    if (!symbol) {
        return 1;
    }
    const keys = [];
    if (Array.isArray(symbol)) {
        for (let i = 0; i < symbol.length; i++) {
            keys.push(getSymbolHash(symbol[i], prefix));
        }
        return keys.sort().join(',');
    }
    const sortedKeys = Object.keys(symbol).sort();
    const sortedSymbol = sortedKeys.reduce((accumulator, curValue) => {
        if (!prefix || curValue.indexOf(prefix) === 0) {
            accumulator[curValue] = symbol[curValue];
        }
        return accumulator;
    }, {});
    const hash = hashCode(JSON.stringify(sortedSymbol));
    return hash;
}