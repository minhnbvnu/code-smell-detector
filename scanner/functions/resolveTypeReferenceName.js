function resolveTypeReferenceName(typeReference, meaning, ignoreErrors) {
                const name = getTypeReferenceName(typeReference);
                if (!name) {
                    return unknownSymbol;
                }
                const symbol = resolveEntityName(name, meaning, ignoreErrors);
                return symbol && symbol !== unknownSymbol ? symbol : ignoreErrors ? unknownSymbol : getUnresolvedSymbolForEntityName(name);
            }