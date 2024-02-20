function symbolsAreEqual(accessed, inScope) {
                return accessed === checker.getExportSymbolOfSymbol(inScope);
            }