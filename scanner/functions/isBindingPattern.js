function isBindingPattern(node) {
        return node.kind === ts.SyntaxKind.ArrayBindingPattern ||
            node.kind === ts.SyntaxKind.ObjectBindingPattern;
    }