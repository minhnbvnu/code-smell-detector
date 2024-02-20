function getTypeOfEnumMember(symbol) {
                const links = getSymbolLinks(symbol);
                return links.type || (links.type = getDeclaredTypeOfEnumMember(symbol));
            }