function isSpreadAssignment(node) {
        return node.kind === ts.SyntaxKind.SpreadAssignment;
    }