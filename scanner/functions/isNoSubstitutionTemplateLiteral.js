function isNoSubstitutionTemplateLiteral(node) {
        return node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
    }