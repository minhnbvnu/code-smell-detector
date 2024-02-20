function isExpandoFunctionDeclaration(node) {
                const declaration = getParseTreeNode(node, isFunctionDeclaration);
                if (!declaration) {
                    return false;
                }
                const symbol = getSymbolOfDeclaration(declaration);
                if (!symbol || !(symbol.flags & 16 /* Function */)) {
                    return false;
                }
                return !!forEachEntry(getExportsOfSymbol(symbol), (p) => p.flags & 111551 /* Value */ && p.valueDeclaration && isPropertyAccessExpression(p.valueDeclaration));
            }