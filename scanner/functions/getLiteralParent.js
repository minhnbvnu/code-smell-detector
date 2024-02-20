function getLiteralParent(node) {
        var _a;
        if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.UnaryExpression &&
            ['-', '+'].includes(node.parent.operator)) {
            return node.parent.parent;
        }
        return node.parent;
    }