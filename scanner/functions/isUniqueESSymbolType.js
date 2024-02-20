function isUniqueESSymbolType(type) {
        return (type.flags & ts.TypeFlags.UniqueESSymbol) !== 0;
    }