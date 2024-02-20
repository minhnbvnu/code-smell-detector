function getWriteTypeOfSymbol(symbol) {
                const checkFlags = getCheckFlags(symbol);
                if (symbol.flags & 4 /* Property */) {
                    return checkFlags & 2 /* SyntheticProperty */ ? checkFlags & 65536 /* DeferredType */ ? getWriteTypeOfSymbolWithDeferredType(symbol) || getTypeOfSymbolWithDeferredType(symbol) : (
                    // NOTE: cast to TransientSymbol should be safe because only TransientSymbols can have CheckFlags.SyntheticProperty
                    symbol.links.writeType || symbol.links.type) : getTypeOfSymbol(symbol);
                }
                if (symbol.flags & 98304 /* Accessor */) {
                    return checkFlags & 1 /* Instantiated */ ? getWriteTypeOfInstantiatedSymbol(symbol) : getWriteTypeOfAccessors(symbol);
                }
                return getTypeOfSymbol(symbol);
            }