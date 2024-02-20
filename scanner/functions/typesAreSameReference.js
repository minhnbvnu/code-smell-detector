function typesAreSameReference(a, b) {
                    return a === b || !!a.symbol && a.symbol === b.symbol || !!a.aliasSymbol && a.aliasSymbol === b.aliasSymbol;
                }