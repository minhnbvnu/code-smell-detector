function isQualifiedName(node) {
        return node.kind === ts.SyntaxKind.QualifiedName;
    }