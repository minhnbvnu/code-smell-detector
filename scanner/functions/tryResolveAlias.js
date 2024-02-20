function tryResolveAlias(symbol) {
                const links = getSymbolLinks(symbol);
                if (links.aliasTarget !== resolvingSymbol) {
                    return resolveAlias(symbol);
                }
                return void 0;
            }