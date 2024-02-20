function getUniqueSymbolId(symbol, checker) {
            return getSymbolId(skipAlias(symbol, checker));
        }