function getPropertyNameForUniqueESSymbol(symbol) {
            return `__@${getSymbolId(symbol)}@${symbol.escapedName}`;
        }