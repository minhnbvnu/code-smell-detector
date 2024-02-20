function getDeclarationOfAliasSymbol(symbol) {
                return symbol.declarations && findLast(symbol.declarations, isAliasSymbolDeclaration2);
            }