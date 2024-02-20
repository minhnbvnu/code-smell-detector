function createUniqueESSymbolType(symbol) {
                const type = createTypeWithSymbol(8192 /* UniqueESSymbol */, symbol);
                type.escapedName = `__@${type.symbol.escapedName}@${getSymbolId(type.symbol)}`;
                return type;
            }