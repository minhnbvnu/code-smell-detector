function createLiteralConstValue(node, tracker) {
                const type = getTypeOfSymbol(getSymbolOfDeclaration(node));
                return literalTypeToNode(type, node, tracker);
            }