function isEnumDeclaration(node) {
        return node.kind === ts.SyntaxKind.EnumDeclaration;
    }