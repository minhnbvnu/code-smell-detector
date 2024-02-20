function getMembersOfSymbol(symbol) {
                return symbol.flags & 6256 /* LateBindingContainer */ ? getResolvedMembersOrExportsOfSymbol(symbol, "resolvedMembers" /* resolvedMembers */) : symbol.members || emptySymbols;
            }