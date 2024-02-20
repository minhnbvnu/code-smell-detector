function isEntityName(node) {
        return node.kind === ts.SyntaxKind.Identifier || isQualifiedName(node);
    }