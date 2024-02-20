function isPlainParam(node) {
                return !(node.type === utils_1.AST_NODE_TYPES.AssignmentPattern ||
                    node.type === utils_1.AST_NODE_TYPES.RestElement ||
                    isOptionalParam(node));
            }