function isTaggedTemplateExpression(node) {
        return node.kind === ts.SyntaxKind.TaggedTemplateExpression;
    }