function getAccessibility(node) {
        var _a;
        if ('accessibility' in node && node.accessibility) {
            return node.accessibility;
        }
        if ('key' in node && ((_a = node.key) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.PrivateIdentifier) {
            return '#private';
        }
        return 'public';
    }