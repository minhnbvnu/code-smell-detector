function getBaseOfClassLikeExpression(node) {
        var _a;
        if (((_a = node.heritageClauses) === null || _a === void 0 ? void 0 : _a[0].token) === ts.SyntaxKind.ExtendsKeyword)
            return node.heritageClauses[0].types[0];
    }