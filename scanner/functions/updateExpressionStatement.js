function updateExpressionStatement(node, expression) {
                return node.expression !== expression ? update(createExpressionStatement(expression), node) : node;
            }