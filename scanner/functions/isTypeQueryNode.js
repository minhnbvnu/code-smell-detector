function isTypeQueryNode(node) {
        return node.kind === ts.SyntaxKind.TypeQuery;
    }