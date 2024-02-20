function isNegativeIndexExpression(node, expectedIndexedNode) {
                return ((node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
                    node.operator === '-') ||
                    (node.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
                        node.operator === '-' &&
                        isLengthExpression(node.left, expectedIndexedNode)));
            }