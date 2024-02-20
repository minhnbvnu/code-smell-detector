function updatePostfixUnaryExpression(node, operand) {
                return node.operand !== operand ? update(createPostfixUnaryExpression(operand, node.operator), node) : node;
            }