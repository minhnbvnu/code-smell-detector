function getSymbolId(symbol) {
            if (!symbol.id) {
                symbol.id = nextSymbolId;
                nextSymbolId++;
            }
            return symbol.id;
        }