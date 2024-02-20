function getGlobalESSymbolConstructorSymbol(reportErrors2) {
                return deferredGlobalESSymbolConstructorSymbol || (deferredGlobalESSymbolConstructorSymbol = getGlobalValueSymbol("Symbol", reportErrors2));
            }