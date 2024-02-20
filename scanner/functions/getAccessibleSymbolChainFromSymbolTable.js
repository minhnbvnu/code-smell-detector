function getAccessibleSymbolChainFromSymbolTable(symbols, ignoreQualification, isLocalNameLookup) {
                    if (!pushIfUnique(visitedSymbolTables, symbols)) {
                        return void 0;
                    }
                    const result2 = trySymbolTable(symbols, ignoreQualification, isLocalNameLookup);
                    visitedSymbolTables.pop();
                    return result2;
                }