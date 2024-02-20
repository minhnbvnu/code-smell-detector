function tryGetAliasedSymbol(symbol, checker) {
                return tsutils.isSymbolFlagSet(symbol, ts.SymbolFlags.Alias)
                    ? checker.getAliasedSymbol(symbol)
                    : null;
            }