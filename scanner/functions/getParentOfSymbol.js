function getParentOfSymbol(symbol) {
                return getMergedSymbol(symbol.parent && getLateBoundSymbol(symbol.parent));
            }