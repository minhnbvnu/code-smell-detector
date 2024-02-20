function isExplicitlyTypedThis(node) {
        var _a;
        do {
            node = node.parent;
            if (node_1.isDecorator(node)) {
                // `this` in decorators always resolves outside of the containing class
                if (node.parent.kind === ts.SyntaxKind.Parameter && node_1.isClassLikeDeclaration(node.parent.parent.parent)) {
                    node = node.parent.parent.parent.parent;
                }
                else if (node_1.isClassLikeDeclaration(node.parent.parent)) {
                    node = node.parent.parent.parent;
                }
                else if (node_1.isClassLikeDeclaration(node.parent)) {
                    node = node.parent.parent;
                }
            }
        } while (util_1.isFunctionScopeBoundary(node) !== 1 /* Function */ || node.kind === ts.SyntaxKind.ArrowFunction);
        return util_1.isFunctionWithBody(node) &&
            (util_1.isNodeFlagSet(node, ts.NodeFlags.JavaScriptFile)
                ? ((_a = ts.getJSDocThisTag(node)) === null || _a === void 0 ? void 0 : _a.typeExpression) !== undefined
                : node.parameters.length !== 0 && util_1.isThisParameter(node.parameters[0]) && node.parameters[0].type !== undefined) ||
            node_1.isClassLikeDeclaration(node.parent);
    }