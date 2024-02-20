function isObjectBindingPattern(node) {
        return node.kind === ts.SyntaxKind.ObjectBindingPattern;
    }