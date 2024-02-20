function isPropertyAssignment(node) {
        return node.kind === ts.SyntaxKind.PropertyAssignment;
    }