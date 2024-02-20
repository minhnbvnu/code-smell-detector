function getSymbolPath(symbol) {
                return symbol.parent ? `${getSymbolPath(symbol.parent)}.${symbol.escapedName}` : symbol.escapedName;
            }