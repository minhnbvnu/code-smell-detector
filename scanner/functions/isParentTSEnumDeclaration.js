function isParentTSEnumDeclaration(node) {
        const parent = getLiteralParent(node);
        return (parent === null || parent === void 0 ? void 0 : parent.type) === utils_1.AST_NODE_TYPES.TSEnumMember;
    }