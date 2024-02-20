function validateBinaryExpression(node) {
                validateNode(node, node.right, node.operator);
            }