function searchForImportsOfExport(exportLocation, exportSymbol, exportInfo, state) {
                        const { importSearches, singleReferences, indirectUsers } = state.getImportSearches(exportSymbol, exportInfo);
                        if (singleReferences.length) {
                            const addRef = state.referenceAdder(exportSymbol);
                            for (const singleRef of singleReferences) {
                                if (shouldAddSingleReference(singleRef, state))
                                    addRef(singleRef);
                            }
                        }
                        for (const [importLocation, importSymbol] of importSearches) {
                            getReferencesInSourceFile(importLocation.getSourceFile(), state.createSearch(importLocation, importSymbol, 1 /* Export */), state);
                        }
                        if (indirectUsers.length) {
                            let indirectSearch;
                            switch (exportInfo.exportKind) {
                                case 0 /* Named */:
                                    indirectSearch = state.createSearch(exportLocation, exportSymbol, 1 /* Export */);
                                    break;
                                case 1 /* Default */:
                                    indirectSearch = state.options.use === 2 /* Rename */ ? void 0 : state.createSearch(exportLocation, exportSymbol, 1 /* Export */, { text: "default" });
                                    break;
                                case 2 /* ExportEquals */:
                                    break;
                            }
                            if (indirectSearch) {
                                for (const indirectUser of indirectUsers) {
                                    searchForName(indirectUser, indirectSearch, state);
                                }
                            }
                        }
                    }