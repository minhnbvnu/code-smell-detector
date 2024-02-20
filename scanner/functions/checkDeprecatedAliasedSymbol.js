function checkDeprecatedAliasedSymbol(symbol, location) {
                if (!(symbol.flags & 2097152 /* Alias */))
                    return symbol;
                const targetSymbol = resolveAlias(symbol);
                if (targetSymbol === unknownSymbol)
                    return targetSymbol;
                while (symbol.flags & 2097152 /* Alias */) {
                    const target = getImmediateAliasedSymbol(symbol);
                    if (target) {
                        if (target === targetSymbol)
                            break;
                        if (target.declarations && length(target.declarations)) {
                            if (isDeprecatedAliasedSymbol(target)) {
                                addDeprecatedSuggestion(location, target.declarations, target.escapedName);
                                break;
                            }
                            else {
                                if (symbol === targetSymbol)
                                    break;
                                symbol = target;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
                return targetSymbol;
            }