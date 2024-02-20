function getReferencedSymbolsForSymbol(originalSymbol, node, sourceFiles, sourceFilesSet, checker, cancellationToken, options) {
                        const symbol = node && skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker, 
                        /*useLocalSymbolForExportSpecifier*/
                        !isForRenameWithPrefixAndSuffixText(options)) || originalSymbol;
                        const searchMeaning = node ? getIntersectingMeaningFromDeclarations(node, symbol) : 7 /* All */;
                        const result = [];
                        const state = new State(sourceFiles, sourceFilesSet, node ? getSpecialSearchKind(node) : 0 /* None */, checker, cancellationToken, searchMeaning, options, result);
                        const exportSpecifier = !isForRenameWithPrefixAndSuffixText(options) || !symbol.declarations ? void 0 : find(symbol.declarations, isExportSpecifier);
                        if (exportSpecifier) {
                            getReferencesAtExportSpecifier(exportSpecifier.name, symbol, exportSpecifier, state.createSearch(node, originalSymbol, 
                            /*comingFrom*/
                            void 0), state, 
                            /*addReferencesHere*/
                            true, 
                            /*alwaysGetReferences*/
                            true);
                        }
                        else if (node && node.kind === 88 /* DefaultKeyword */ && symbol.escapedName === "default" /* Default */ && symbol.parent) {
                            addReference(node, symbol, state);
                            searchForImportsOfExport(node, symbol, { exportingModuleSymbol: symbol.parent, exportKind: 1 /* Default */ }, state);
                        }
                        else {
                            const search = state.createSearch(node, symbol, 
                            /*comingFrom*/
                            void 0, { allSearchSymbols: node ? populateSearchSymbolSet(symbol, node, checker, options.use === 2 /* Rename */, !!options.providePrefixAndSuffixTextForRename, !!options.implementations) : [symbol] });
                            getReferencesInContainerOrFiles(symbol, state, search);
                        }
                        return result;
                    }