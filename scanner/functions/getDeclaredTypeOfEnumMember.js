function getDeclaredTypeOfEnumMember(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.declaredType) {
                    const enumType = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
                    if (!links.declaredType) {
                        links.declaredType = enumType;
                    }
                }
                return links.declaredType;
            }