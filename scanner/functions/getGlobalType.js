function getGlobalType(name, arity, reportErrors2) {
                const symbol = getGlobalTypeSymbol(name, reportErrors2);
                return symbol || reportErrors2 ? getTypeOfGlobalSymbol(symbol, arity) : void 0;
            }