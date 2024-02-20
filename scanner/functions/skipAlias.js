function skipAlias(symbol, checker) {
            return symbol.flags & 2097152 /* Alias */ ? checker.getAliasedSymbol(symbol) : symbol;
        }