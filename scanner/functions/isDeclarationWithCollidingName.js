function isDeclarationWithCollidingName(nodeIn) {
                const node = getParseTreeNode(nodeIn, isDeclaration);
                if (node) {
                    const symbol = getSymbolOfDeclaration(node);
                    if (symbol) {
                        return isSymbolOfDeclarationWithCollidingName(symbol);
                    }
                }
                return false;
            }