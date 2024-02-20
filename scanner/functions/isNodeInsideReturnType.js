function isNodeInsideReturnType(node) {
        var _a;
        return !!(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.TSTypeAnnotation &&
            node.parent.parent &&
            (util.isFunctionType(node.parent.parent) ||
                util.isFunction(node.parent.parent)));
    }