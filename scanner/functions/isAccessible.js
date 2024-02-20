function isAccessible(symbolFromSymbolTable, resolvedAliasSymbol, ignoreQualification) {
                    return (symbol === (resolvedAliasSymbol || symbolFromSymbolTable) || getMergedSymbol(symbol) === getMergedSymbol(resolvedAliasSymbol || symbolFromSymbolTable)) && // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                        // and if symbolFromSymbolTable or alias resolution matches the symbol,
                        // check the symbol can be qualified, it is only then this symbol is accessible
                        !some(symbolFromSymbolTable.declarations, hasNonGlobalAugmentationExternalModuleSymbol) && (ignoreQualification || canQualifySymbol(getMergedSymbol(symbolFromSymbolTable), meaning));
                }