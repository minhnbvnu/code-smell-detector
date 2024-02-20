function updatePrefixUnaryExpression(node, operand) {
                return node.operand !== operand ? update(createPrefixUnaryExpression(node.operator, operand), node) : node;
            }