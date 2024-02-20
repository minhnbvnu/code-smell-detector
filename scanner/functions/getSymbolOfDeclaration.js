function getSymbolOfDeclaration(node) {
                return getMergedSymbol(node.symbol && getLateBoundSymbol(node.symbol));
            }