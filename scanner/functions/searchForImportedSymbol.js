function searchForImportedSymbol(symbol, state) {
                        if (!symbol.declarations)
                            return;
                        for (const declaration of symbol.declarations) {
                            const exportingFile = declaration.getSourceFile();
                            getReferencesInSourceFile(exportingFile, state.createSearch(declaration, symbol, 0 /* Import */), state, state.includesSourceFile(exportingFile));
                        }
                    }