function isPropertySignature(node) {
        return node.kind === ts.SyntaxKind.PropertySignature;
    }