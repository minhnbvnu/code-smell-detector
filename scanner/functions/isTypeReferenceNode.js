function isTypeReferenceNode(node) {
        return node.kind === ts.SyntaxKind.TypeReference;
    }