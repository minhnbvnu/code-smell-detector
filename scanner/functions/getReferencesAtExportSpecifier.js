function getReferencesAtExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, search, state, addReferencesHere, alwaysGetReferences) {
                        Debug.assert(!alwaysGetReferences || !!state.options.providePrefixAndSuffixTextForRename, "If alwaysGetReferences is true, then prefix/suffix text must be enabled");
                        const { parent: parent2, propertyName, name } = exportSpecifier;
                        const exportDeclaration = parent2.parent;
                        const localSymbol = getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, state.checker);
                        if (!alwaysGetReferences && !search.includes(localSymbol)) {
                            return;
                        }
                        if (!propertyName) {
                            if (!(state.options.use === 2 /* Rename */ && name.escapedText === "default" /* Default */)) {
                                addRef();
                            }
                        }
                        else if (referenceLocation === propertyName) {
                            if (!exportDeclaration.moduleSpecifier) {
                                addRef();
                            }
                            if (addReferencesHere && state.options.use !== 2 /* Rename */ && state.markSeenReExportRHS(name)) {
                                addReference(name, Debug.checkDefined(exportSpecifier.symbol), state);
                            }
                        }
                        else {
                            if (state.markSeenReExportRHS(referenceLocation)) {
                                addRef();
                            }
                        }
                        if (!isForRenameWithPrefixAndSuffixText(state.options) || alwaysGetReferences) {
                            const isDefaultExport = referenceLocation.escapedText === "default" || exportSpecifier.name.escapedText === "default";
                            const exportKind = isDefaultExport ? 1 /* Default */ : 0 /* Named */;
                            const exportSymbol = Debug.checkDefined(exportSpecifier.symbol);
                            const exportInfo = getExportInfo(exportSymbol, exportKind, state.checker);
                            if (exportInfo) {
                                searchForImportsOfExport(referenceLocation, exportSymbol, exportInfo, state);
                            }
                        }
                        if (search.comingFrom !== 1 /* Export */ && exportDeclaration.moduleSpecifier && !propertyName && !isForRenameWithPrefixAndSuffixText(state.options)) {
                            const imported = state.checker.getExportSpecifierLocalTargetSymbol(exportSpecifier);
                            if (imported)
                                searchForImportedSymbol(imported, state);
                        }
                        function addRef() {
                            if (addReferencesHere)
                                addReference(referenceLocation, localSymbol, state);
                        }
                    }