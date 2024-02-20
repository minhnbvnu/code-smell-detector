function createDefaultPropertyWrapperForModule(symbol, originalSymbol, anonymousSymbol) {
                const memberTable = createSymbolTable();
                const newSymbol = createSymbol(2097152 /* Alias */, "default" /* Default */);
                newSymbol.parent = originalSymbol;
                newSymbol.links.nameType = getStringLiteralType("default");
                newSymbol.links.aliasTarget = resolveSymbol(symbol);
                memberTable.set("default" /* Default */, newSymbol);
                return createAnonymousType(anonymousSymbol, memberTable, emptyArray, emptyArray, emptyArray);
            }