function getImportOrExportReferences(referenceLocation, referenceSymbol, search, state) {
                        const importOrExport = getImportOrExportSymbol(referenceLocation, referenceSymbol, state.checker, search.comingFrom === 1 /* Export */);
                        if (!importOrExport)
                            return;
                        const { symbol } = importOrExport;
                        if (importOrExport.kind === 0 /* Import */) {
                            if (!isForRenameWithPrefixAndSuffixText(state.options)) {
                                searchForImportedSymbol(symbol, state);
                            }
                        }
                        else {
                            searchForImportsOfExport(referenceLocation, symbol, importOrExport.exportInfo, state);
                        }
                    }