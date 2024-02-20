function findPossiblyReturnedNodes(node) {
                if (node.type === utils_1.AST_NODE_TYPES.ConditionalExpression) {
                    return [
                        ...findPossiblyReturnedNodes(node.alternate),
                        ...findPossiblyReturnedNodes(node.consequent),
                    ];
                }
                return [node];
            }