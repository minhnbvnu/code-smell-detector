function updateBinaryExpression(node, left, operator, right) {
                return node.left !== left || node.operatorToken !== operator || node.right !== right ? update(createBinaryExpression(left, operator, right), node) : node;
            }