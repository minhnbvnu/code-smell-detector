function isEmptyFunction(node) {
        var _a;
        return (((_a = node.body) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.BlockStatement &&
            node.body.body.length === 0);
    }