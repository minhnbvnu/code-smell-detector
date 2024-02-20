function isTSNumericLiteralType(node) {
        var _a;
        // For negative numbers, use the parent node
        if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.UnaryExpression &&
            node.parent.operator === '-') {
            node = node.parent;
        }
        // If the parent node is not a TSLiteralType, early return
        if (!isParentTSLiteralType(node)) {
            return false;
        }
        // If the grandparent is a TSTypeAliasDeclaration, ignore
        if (isGrandparentTSTypeAliasDeclaration(node)) {
            return true;
        }
        // If the grandparent is a TSUnionType and it's parent is a TSTypeAliasDeclaration, ignore
        if (isGrandparentTSUnionType(node)) {
            return true;
        }
        return false;
    }