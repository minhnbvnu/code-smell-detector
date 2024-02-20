function referenceContainsTypeQuery(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSTypeQuery:
                return true;
            case utils_1.AST_NODE_TYPES.TSQualifiedName:
            case utils_1.AST_NODE_TYPES.Identifier:
                if (!node.parent) {
                    return false;
                }
                return referenceContainsTypeQuery(node.parent);
            default:
                // if we find a different node, there's no chance that we're in a TSTypeQuery
                return false;
        }
    }