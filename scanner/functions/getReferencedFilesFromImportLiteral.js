function getReferencedFilesFromImportLiteral(checker, importName) {
                        const symbol = checker.getSymbolAtLocation(importName);
                        return symbol && getReferencedFilesFromImportedModuleSymbol(symbol);
                    }