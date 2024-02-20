function isTypeAliasDeclaration(node) {
        return node.kind === ts.SyntaxKind.TypeAliasDeclaration;
    }