function isShorthandPropertyAssignment(node) {
        return node.kind === ts.SyntaxKind.ShorthandPropertyAssignment;
    }