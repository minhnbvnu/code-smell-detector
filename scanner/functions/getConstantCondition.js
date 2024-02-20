function getConstantCondition(node) {
        switch (node.kind) {
            case ts.SyntaxKind.TrueKeyword:
                return true;
            case ts.SyntaxKind.FalseKeyword:
                return false;
            default:
                return;
        }
    }