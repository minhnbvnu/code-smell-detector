function resolveSymbol(symbol, dontResolveAlias) {
                return !dontResolveAlias && isNonLocalAlias(symbol) ? resolveAlias(symbol) : symbol;
            }