function getLateBoundSymbol(symbol) {
                if (symbol.flags & 106500 /* ClassMember */ && symbol.escapedName === "__computed" /* Computed */) {
                    const links = getSymbolLinks(symbol);
                    if (!links.lateSymbol && some(symbol.declarations, hasLateBindableName)) {
                        const parent2 = getMergedSymbol(symbol.parent);
                        if (some(symbol.declarations, hasStaticModifier)) {
                            getExportsOfSymbol(parent2);
                        }
                        else {
                            getMembersOfSymbol(parent2);
                        }
                    }
                    return links.lateSymbol || (links.lateSymbol = symbol);
                }
                return symbol;
            }