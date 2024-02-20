function getDirectImports(moduleSymbol) {
                return allDirectImports.get(getSymbolId(moduleSymbol).toString());
            }