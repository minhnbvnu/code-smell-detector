function getAliasedSymbol(symbol, checker) {
        return tsutils.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias)
            ? checker.getAliasedSymbol(symbol)
            : symbol;
    }