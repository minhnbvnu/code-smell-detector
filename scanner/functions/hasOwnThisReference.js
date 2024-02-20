function hasOwnThisReference(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.FunctionExpression:
                return true;
            case ts.SyntaxKind.FunctionDeclaration:
                return node.body !== undefined;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression;
            default:
                return false;
        }
    }