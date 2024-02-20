function isConditionalTypeNode(node) {
        return node.kind === ts.SyntaxKind.ConditionalType;
    }