function getGlobalESSymbolConstructorTypeSymbol(reportErrors2) {
                return deferredGlobalESSymbolConstructorTypeSymbol || (deferredGlobalESSymbolConstructorTypeSymbol = getGlobalTypeSymbol("SymbolConstructor", reportErrors2));
            }