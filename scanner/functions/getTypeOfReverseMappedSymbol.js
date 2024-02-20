function getTypeOfReverseMappedSymbol(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    links.type = inferReverseMappedType(symbol.links.propertyType, symbol.links.mappedType, symbol.links.constraintType);
                }
                return links.type;
            }