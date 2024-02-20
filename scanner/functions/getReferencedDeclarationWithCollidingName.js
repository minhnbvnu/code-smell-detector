function getReferencedDeclarationWithCollidingName(nodeIn) {
                if (!isGeneratedIdentifier(nodeIn)) {
                    const node = getParseTreeNode(nodeIn, isIdentifier);
                    if (node) {
                        const symbol = getReferencedValueSymbol(node);
                        if (symbol && isSymbolOfDeclarationWithCollidingName(symbol)) {
                            return symbol.valueDeclaration;
                        }
                    }
                }
                return void 0;
            }