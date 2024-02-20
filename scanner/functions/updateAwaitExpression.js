function updateAwaitExpression(node, expression) {
                return node.expression !== expression ? update(createAwaitExpression(expression), node) : node;
            }