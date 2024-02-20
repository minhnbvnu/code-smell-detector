function getSymbol(node, checker, stopAtAlias) {
            const symbol = checker.getSymbolAtLocation(node);
            let failedAliasResolution = false;
            if ((symbol == null ? void 0 : symbol.declarations) && symbol.flags & 2097152 /* Alias */ && !stopAtAlias && shouldSkipAlias(node, symbol.declarations[0])) {
                const aliased = checker.getAliasedSymbol(symbol);
                if (aliased.declarations) {
                    return { symbol: aliased };
                }
                else {
                    failedAliasResolution = true;
                }
            }
            return { symbol, failedAliasResolution };
        }