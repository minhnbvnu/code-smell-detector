function isLastIndexExpression(node, expectedObjectNode) {
                return (node.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
                    node.operator === '-' &&
                    isLengthExpression(node.left, expectedObjectNode) &&
                    isNumber(node.right, 1));
            }