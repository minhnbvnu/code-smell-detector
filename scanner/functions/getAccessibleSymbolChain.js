function getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing, visitedSymbolTablesMap = /* @__PURE__ */ new Map()) {
                if (!(symbol && !isPropertyOrMethodDeclarationSymbol(symbol))) {
                    return void 0;
                }
                const links = getSymbolLinks(symbol);
                const cache = links.accessibleChainCache || (links.accessibleChainCache = /* @__PURE__ */ new Map());
                const firstRelevantLocation = forEachSymbolTableInScope(enclosingDeclaration, (_, __, ___, node) => node);
                const key = `${useOnlyExternalAliasing ? 0 : 1}|${firstRelevantLocation && getNodeId(firstRelevantLocation)}|${meaning}`;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const id = getSymbolId(symbol);
                let visitedSymbolTables = visitedSymbolTablesMap.get(id);
                if (!visitedSymbolTables) {
                    visitedSymbolTablesMap.set(id, visitedSymbolTables = []);
                }
                const result = forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolChainFromSymbolTable);
                cache.set(key, result);
                return result;
                function getAccessibleSymbolChainFromSymbolTable(symbols, ignoreQualification, isLocalNameLookup) {
                    if (!pushIfUnique(visitedSymbolTables, symbols)) {
                        return void 0;
                    }
                    const result2 = trySymbolTable(symbols, ignoreQualification, isLocalNameLookup);
                    visitedSymbolTables.pop();
                    return result2;
                }
                function canQualifySymbol(symbolFromSymbolTable, meaning2) {
                    return !needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning2) || // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                        !!getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning2), useOnlyExternalAliasing, visitedSymbolTablesMap);
                }
                function isAccessible(symbolFromSymbolTable, resolvedAliasSymbol, ignoreQualification) {
                    return (symbol === (resolvedAliasSymbol || symbolFromSymbolTable) || getMergedSymbol(symbol) === getMergedSymbol(resolvedAliasSymbol || symbolFromSymbolTable)) && // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                        // and if symbolFromSymbolTable or alias resolution matches the symbol,
                        // check the symbol can be qualified, it is only then this symbol is accessible
                        !some(symbolFromSymbolTable.declarations, hasNonGlobalAugmentationExternalModuleSymbol) && (ignoreQualification || canQualifySymbol(getMergedSymbol(symbolFromSymbolTable), meaning));
                }
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
                function getCandidateListForSymbol(symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification) {
                    if (isAccessible(symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification)) {
                        return [symbolFromSymbolTable];
                    }
                    const candidateTable = getExportsOfSymbol(resolvedImportedSymbol);
                    const accessibleSymbolsFromExports = candidateTable && getAccessibleSymbolChainFromSymbolTable(candidateTable, 
                    /*ignoreQualification*/
                    true);
                    if (accessibleSymbolsFromExports && canQualifySymbol(symbolFromSymbolTable, getQualifiedLeftMeaning(meaning))) {
                        return [symbolFromSymbolTable].concat(accessibleSymbolsFromExports);
                    }
                }
            }