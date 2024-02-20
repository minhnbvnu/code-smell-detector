function canContainDirective(node) {
        if (node.kind === ts.SyntaxKind.Block) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                    return true;
                default:
                    return false;
            }
        }
        return true;
    }