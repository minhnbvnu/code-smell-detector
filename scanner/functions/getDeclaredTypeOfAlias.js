function getDeclaredTypeOfAlias(symbol) {
                const links = getSymbolLinks(symbol);
                return links.declaredType || (links.declaredType = getDeclaredTypeOfSymbol(resolveAlias(symbol)));
            }