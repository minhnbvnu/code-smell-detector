function isAncestorTSIndexedAccessType(node) {
        var _a, _b, _c;
        // Handle unary expressions (eg. -4)
        let ancestor = getLiteralParent(node);
        // Go up another level while we’re part of a type union (eg. 1 | 2) or
        // intersection (eg. 1 & 2)
        while (((_a = ancestor === null || ancestor === void 0 ? void 0 : ancestor.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.TSUnionType ||
            ((_b = ancestor === null || ancestor === void 0 ? void 0 : ancestor.parent) === null || _b === void 0 ? void 0 : _b.type) === utils_1.AST_NODE_TYPES.TSIntersectionType) {
            ancestor = ancestor.parent;
        }
        return ((_c = ancestor === null || ancestor === void 0 ? void 0 : ancestor.parent) === null || _c === void 0 ? void 0 : _c.type) === utils_1.AST_NODE_TYPES.TSIndexedAccessType;
    }