function isTypeAssertion(node) {
        return node.kind === ts.SyntaxKind.TypeAssertionExpression;
    }