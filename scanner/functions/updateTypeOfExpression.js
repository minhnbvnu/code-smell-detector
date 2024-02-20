function updateTypeOfExpression(node, expression) {
                return node.expression !== expression ? update(createTypeOfExpression(expression), node) : node;
            }