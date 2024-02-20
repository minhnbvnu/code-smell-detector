function getCalleeName(node) {
                if (node.type === utils_1.AST_NODE_TYPES.Identifier) {
                    return node.name;
                }
                if (node.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                    GLOBAL_CANDIDATES.has(node.object.name)) {
                    if (node.property.type === utils_1.AST_NODE_TYPES.Identifier) {
                        return node.property.name;
                    }
                    if (node.property.type === utils_1.AST_NODE_TYPES.Literal &&
                        typeof node.property.value === 'string') {
                        return node.property.value;
                    }
                }
                return null;
            }