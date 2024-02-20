function isNumericOrStringLikeLiteral(node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                return true;
            default:
                return false;
        }
    }