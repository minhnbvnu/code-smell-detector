function copyLocallyVisibleExportSymbols(source, meaning2) {
                    if (meaning2) {
                        source.forEach((symbol) => {
                            if (!getDeclarationOfKind(symbol, 278 /* ExportSpecifier */) && !getDeclarationOfKind(symbol, 277 /* NamespaceExport */)) {
                                copySymbol(symbol, meaning2);
                            }
                        });
                    }
                }