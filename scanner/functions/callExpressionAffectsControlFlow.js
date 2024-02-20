function callExpressionAffectsControlFlow(node, checker) {
        var _a, _b, _c;
        if (!node_1.isExpressionStatement(node.parent) ||
            ts.isOptionalChain(node) ||
            !isDottedNameWithExplicitTypeAnnotation(node.expression, checker))
            return;
        const signature = checker.getResolvedSignature(node);
        if ((signature === null || signature === void 0 ? void 0 : signature.declaration) === undefined)
            return;
        const typeNode = ts.isJSDocSignature(signature.declaration)
            ? (_b = (_a = signature.declaration.type) === null || _a === void 0 ? void 0 : _a.typeExpression) === null || _b === void 0 ? void 0 : _b.type
            : (_c = signature.declaration.type) !== null && _c !== void 0 ? _c : (util_1.isNodeFlagSet(signature.declaration, ts.NodeFlags.JavaScriptFile)
                ? ts.getJSDocReturnType(signature.declaration)
                : undefined);
        if (typeNode === undefined)
            return;
        if (node_1.isTypePredicateNode(typeNode) && typeNode.assertsModifier !== undefined)
            return 2 /* Asserts */;
        return util_1.isTypeFlagSet(checker.getTypeFromTypeNode(typeNode), ts.TypeFlags.Never) ? 1 /* Never */ : undefined;
    }