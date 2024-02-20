function getSymbolOfNode(node) {
                return canHaveSymbol(node) ? getSymbolOfDeclaration(node) : void 0;
            }