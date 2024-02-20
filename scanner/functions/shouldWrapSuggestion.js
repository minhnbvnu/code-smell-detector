function shouldWrapSuggestion(parent) {
                if (!parent) {
                    return false;
                }
                switch (parent.type) {
                    case utils_1.AST_NODE_TYPES.TSUnionType:
                    case utils_1.AST_NODE_TYPES.TSIntersectionType:
                    case utils_1.AST_NODE_TYPES.TSArrayType:
                        return true;
                    default:
                        return false;
                }
            }