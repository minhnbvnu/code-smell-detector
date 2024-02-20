function getVariableDeclarationOfObjectLiteral(symbol, meaning) {
                const firstDecl = !!length(symbol.declarations) && first(symbol.declarations);
                if (meaning & 111551 /* Value */ && firstDecl && firstDecl.parent && isVariableDeclaration(firstDecl.parent)) {
                    if (isObjectLiteralExpression(firstDecl) && firstDecl === firstDecl.parent.initializer || isTypeLiteralNode(firstDecl) && firstDecl === firstDecl.parent.type) {
                        return getSymbolOfDeclaration(firstDecl.parent);
                    }
                }
            }