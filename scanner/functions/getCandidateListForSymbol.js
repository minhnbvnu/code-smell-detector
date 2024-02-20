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