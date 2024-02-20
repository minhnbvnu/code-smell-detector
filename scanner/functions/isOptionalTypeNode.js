function isOptionalTypeNode(node) {
        return node.kind === ts.SyntaxKind.OptionalType;
    }