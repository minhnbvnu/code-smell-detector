function getConstructorTypeOfClassLikeDeclaration(node, checker) {
        return node.kind === ts.SyntaxKind.ClassExpression
            ? checker.getTypeAtLocation(node)
            : checker.getTypeOfSymbolAtLocation(getSymbolOfClassLikeDeclaration(node, checker), node);
    }