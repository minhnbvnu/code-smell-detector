function getDeclaredTypeOfTypeParameter(symbol) {
                const links = getSymbolLinks(symbol);
                return links.declaredType || (links.declaredType = createTypeParameter(symbol));
            }