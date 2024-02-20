function createSymbolWithType(source, type) {
                const symbol = createSymbol(source.flags, source.escapedName, getCheckFlags(source) & 8 /* Readonly */);
                symbol.declarations = source.declarations;
                symbol.parent = source.parent;
                symbol.links.type = type;
                symbol.links.target = source;
                if (source.valueDeclaration) {
                    symbol.valueDeclaration = source.valueDeclaration;
                }
                const nameType = getSymbolLinks(source).nameType;
                if (nameType) {
                    symbol.links.nameType = nameType;
                }
                return symbol;
            }