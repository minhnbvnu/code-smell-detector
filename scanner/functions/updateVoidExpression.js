function updateVoidExpression(node, expression) {
                return node.expression !== expression ? update(createVoidExpression(expression), node) : node;
            }