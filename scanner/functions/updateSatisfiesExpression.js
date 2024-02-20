function updateSatisfiesExpression(node, expression, type) {
                return node.expression !== expression || node.type !== type ? update(createSatisfiesExpression(expression, type), node) : node;
            }