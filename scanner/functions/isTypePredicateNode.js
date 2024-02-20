function isTypePredicateNode(node) {
        return node.kind === ts.SyntaxKind.TypePredicate;
    }