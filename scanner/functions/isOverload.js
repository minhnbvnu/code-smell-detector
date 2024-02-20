function isOverload(node) {
                return ((node.type === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition ||
                    node.type === utils_1.AST_NODE_TYPES.MethodDefinition) &&
                    node.value.type === utils_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression);
            }