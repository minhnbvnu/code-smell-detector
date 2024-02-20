function isParentTSReadonlyPropertyDefinition(node) {
        const parent = getLiteralParent(node);
        if ((parent === null || parent === void 0 ? void 0 : parent.type) === utils_1.AST_NODE_TYPES.PropertyDefinition && parent.readonly) {
            return true;
        }
        return false;
    }