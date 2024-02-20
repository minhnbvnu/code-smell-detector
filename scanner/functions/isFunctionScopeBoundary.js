function isFunctionScopeBoundary(node) {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.FunctionType:
                return 1 /* Function */;
            case ts.SyntaxKind.SourceFile:
                // if SourceFile is no module, it contributes to the global scope and is therefore no scope boundary
                return ts.isExternalModule(node) ? 1 /* Function */ : 0 /* None */;
            default:
                return 0 /* None */;
        }
    }