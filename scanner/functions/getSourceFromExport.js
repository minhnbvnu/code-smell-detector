function getSourceFromExport(node) {
        var _a;
        if (((_a = node.source) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Literal &&
            typeof node.source.value === 'string') {
            return node.source.value;
        }
        return undefined;
    }