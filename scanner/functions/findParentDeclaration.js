function findParentDeclaration(node) {
        if (node.parent && node.parent.type !== utils_1.AST_NODE_TYPES.TSTypeAnnotation) {
            if (node.parent.type === utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration) {
                return node.parent;
            }
            return findParentDeclaration(node.parent);
        }
        return undefined;
    }