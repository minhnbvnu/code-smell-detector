function isAliasSymbol(symbol) {
            return (symbol.flags & 2097152 /* Alias */) !== 0;
        }