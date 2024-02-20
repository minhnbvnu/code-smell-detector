function isDeprecatedSymbol(symbol) {
                if (length(symbol.declarations) > 1) {
                    const parentSymbol = getParentOfSymbol(symbol);
                    if (parentSymbol && parentSymbol.flags & 64 /* Interface */) {
                        return some(symbol.declarations, (d) => !!(getCombinedNodeFlags(d) & 268435456 /* Deprecated */));
                    }
                }
                return !!(getDeclarationNodeFlagsFromSymbol(symbol) & 268435456 /* Deprecated */);
            }