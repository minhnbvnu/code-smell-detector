function getSymbolTarget(symbol, checker) {
            let next = symbol;
            while (isAliasSymbol(next) || isTransientSymbol(next) && next.links.target) {
                if (isTransientSymbol(next) && next.links.target) {
                    next = next.links.target;
                }
                else {
                    next = skipAlias(next, checker);
                }
            }
            return next;
        }