function canQualifySymbol(symbolFromSymbolTable, meaning2) {
                    return !needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning2) || // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                        !!getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning2), useOnlyExternalAliasing, visitedSymbolTablesMap);
                }