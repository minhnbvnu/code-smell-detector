function isClassLikeDeclaration(node) {
        return node.kind === ts.SyntaxKind.ClassDeclaration ||
            node.kind === ts.SyntaxKind.ClassExpression;
    }