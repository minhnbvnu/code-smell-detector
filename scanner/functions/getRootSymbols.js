function getRootSymbols(symbol) {
                const roots = getImmediateRootSymbols(symbol);
                return roots ? flatMap(roots, getRootSymbols) : [symbol];
            }