function isDeprecatedAliasedSymbol(symbol) {
                return !!symbol.declarations && every(symbol.declarations, (d) => !!(getCombinedNodeFlags(d) & 268435456 /* Deprecated */));
            }