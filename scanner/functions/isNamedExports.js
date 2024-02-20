function isNamedExports(reference) {
        var _a;
        const { identifier } = reference;
        return (((_a = identifier.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ExportSpecifier &&
            identifier.parent.local === identifier);
    }