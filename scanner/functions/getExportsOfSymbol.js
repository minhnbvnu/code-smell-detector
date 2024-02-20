function getExportsOfSymbol(symbol) {
                return symbol.flags & 6256 /* LateBindingContainer */ ? getResolvedMembersOrExportsOfSymbol(symbol, "resolvedExports" /* resolvedExports */) : symbol.flags & 1536 /* Module */ ? getExportsOfModule(symbol) : symbol.exports || emptySymbols;
            }