function instantiateSymbol(symbol, mapper) {
                const links = getSymbolLinks(symbol);
                if (links.type && !couldContainTypeVariables(links.type)) {
                    return symbol;
                }
                if (getCheckFlags(symbol) & 1 /* Instantiated */) {
                    symbol = links.target;
                    mapper = combineTypeMappers(links.mapper, mapper);
                }
                const result = createSymbol(symbol.flags, symbol.escapedName, 1 /* Instantiated */ | getCheckFlags(symbol) & (8 /* Readonly */ | 4096 /* Late */ | 16384 /* OptionalParameter */ | 32768 /* RestParameter */));
                result.declarations = symbol.declarations;
                result.parent = symbol.parent;
                result.links.target = symbol;
                result.links.mapper = mapper;
                if (symbol.valueDeclaration) {
                    result.valueDeclaration = symbol.valueDeclaration;
                }
                if (links.nameType) {
                    result.links.nameType = links.nameType;
                }
                return result;
            }