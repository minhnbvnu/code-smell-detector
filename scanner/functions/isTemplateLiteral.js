function isTemplateLiteral(node) {
        return node.kind === ts.SyntaxKind.TemplateExpression ||
            node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
    }