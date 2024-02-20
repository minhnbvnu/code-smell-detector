function isImportCall(node) {
        return typescript_1.default.isCallExpression(node) && node.expression.kind == typescript_1.default.SyntaxKind.ImportKeyword;
    }