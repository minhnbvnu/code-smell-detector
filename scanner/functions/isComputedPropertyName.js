function isComputedPropertyName(node) {
        return node.kind === ts.SyntaxKind.ComputedPropertyName;
    }