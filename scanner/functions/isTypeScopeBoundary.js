function isTypeScopeBoundary(node) {
        switch (node.kind) {
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.MappedType:
                return 4 /* Type */;
            case ts.SyntaxKind.ConditionalType:
                return 8 /* ConditionalType */;
            default:
                return 0 /* None */;
        }
    }