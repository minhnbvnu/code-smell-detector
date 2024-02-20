function updateDeleteExpression(node, expression) {
                return node.expression !== expression ? update(createDeleteExpression(expression), node) : node;
            }