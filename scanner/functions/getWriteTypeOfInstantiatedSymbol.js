function getWriteTypeOfInstantiatedSymbol(symbol) {
                const links = getSymbolLinks(symbol);
                return links.writeType || (links.writeType = instantiateType(getWriteTypeOfSymbol(links.target), links.mapper));
            }