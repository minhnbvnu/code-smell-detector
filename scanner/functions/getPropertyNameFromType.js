function getPropertyNameFromType(type) {
        // string or number literal. bigint is intentionally excluded
        if (type.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral)) {
            const value = String(type.value);
            return { displayName: value, symbolName: ts.escapeLeadingUnderscores(value) };
        }
        if (type_1.isUniqueESSymbolType(type))
            return {
                displayName: `[${type.symbol
                    ? `${isKnownSymbol(type.symbol) ? 'Symbol.' : ''}${type.symbol.name}`
                    : type.escapedName.replace(/^__@|@\d+$/g, '')}]`,
                symbolName: type.escapedName,
            };
    }