function isGrandparentTSUnionType(node) {
        var _a, _b;
        if (((_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.TSUnionType) {
            return isGrandparentTSTypeAliasDeclaration(node.parent);
        }
        return false;
    }