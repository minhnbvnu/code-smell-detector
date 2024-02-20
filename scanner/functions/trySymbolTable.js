function trySymbolTable(symbols, ignoreQualification, isLocalNameLookup) {
                    if (isAccessible(symbols.get(symbol.escapedName), 
                    /*resolvedAliasSymbol*/
                    void 0, ignoreQualification)) {
                        return [symbol];
                    }
                    const result2 = forEachEntry(symbols, (symbolFromSymbolTable) => {
                        if (symbolFromSymbolTable.flags & 2097152 /* Alias */ && symbolFromSymbolTable.escapedName !== "export=" /* ExportEquals */ && symbolFromSymbolTable.escapedName !== "default" /* Default */ && !(isUMDExportSymbol(symbolFromSymbolTable) && enclosingDeclaration && isExternalModule(getSourceFileOfNode(enclosingDeclaration))) && (!useOnlyExternalAliasing || some(symbolFromSymbolTable.declarations, isExternalModuleImportEqualsDeclaration)) && (isLocalNameLookup ? !some(symbolFromSymbolTable.declarations, isNamespaceReexportDeclaration) : true) && (ignoreQualification || !getDeclarationOfKind(symbolFromSymbolTable, 278 /* ExportSpecifier */))) {
                            const resolvedImportedSymbol = resolveAlias(symbolFromSymbolTable);
                            const candidate = getCandidateListForSymbol(symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification);
                            if (candidate) {
                                return candidate;
                            }
                        }
                        if (symbolFromSymbolTable.escapedName === symbol.escapedName && symbolFromSymbolTable.exportSymbol) {
                            if (isAccessible(getMergedSymbol(symbolFromSymbolTable.exportSymbol), 
                            /*aliasSymbol*/
                            void 0, ignoreQualification)) {
                                return [symbol];
                            }
                        }
                    });
                    return result2 || (symbols === globals ? getCandidateListForSymbol(globalThisSymbol, globalThisSymbol, ignoreQualification) : void 0);
                }