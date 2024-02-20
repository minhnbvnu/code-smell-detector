function isMatchingParentType(parent, returnType) {
                if (parent &&
                    'id' in parent &&
                    parent.id &&
                    parent.id.type === utils_1.AST_NODE_TYPES.Identifier) {
                    return getTypeReferenceName(returnType) === parent.id.name;
                }
                return false;
            }