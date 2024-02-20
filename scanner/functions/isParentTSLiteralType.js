function isParentTSLiteralType(node) {
        var _a;
        return ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.TSLiteralType;
    }