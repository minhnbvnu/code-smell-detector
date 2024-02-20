function getPropertiesOfContainerFunction(node) {
                const declaration = getParseTreeNode(node, isFunctionDeclaration);
                if (!declaration) {
                    return emptyArray;
                }
                const symbol = getSymbolOfDeclaration(declaration);
                return symbol && getPropertiesOfType(getTypeOfSymbol(symbol)) || emptyArray;
            }