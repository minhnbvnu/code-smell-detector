function isChildUnwrappableOptionalChain(node, child) {
        return (isChainExpression(child) &&
            // (x?.y).z is semantically different, and as such .z is no longer optional
            node.expression.kind !== ts.SyntaxKind.ParenthesizedExpression);
    }