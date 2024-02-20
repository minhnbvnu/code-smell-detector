function getTypeOfInstantiatedSymbol(symbol) {
                const links = getSymbolLinks(symbol);
                return links.type || (links.type = instantiateType(getTypeOfSymbol(links.target), links.mapper));
            }