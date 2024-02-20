function getInstanceTypeOfClassLikeDeclaration(node, checker) {
        return node.kind === ts.SyntaxKind.ClassDeclaration
            ? checker.getTypeAtLocation(node)
            : checker.getDeclaredTypeOfSymbol(getSymbolOfClassLikeDeclaration(node, checker));
    }