function isNodeRestElementInFunction(node) {
                return (node.type === utils_1.AST_NODE_TYPES.RestElement &&
                    node.parent !== undefined &&
                    isNodeValidFunction(node.parent));
            }