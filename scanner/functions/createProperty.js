function createProperty(name, type) {
                const symbol = createSymbol(4 /* Property */, name);
                symbol.links.type = type;
                return symbol;
            }