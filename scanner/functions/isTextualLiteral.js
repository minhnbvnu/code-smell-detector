function isTextualLiteral(node) {
        return node.kind === ts.SyntaxKind.StringLiteral ||
            node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
    }