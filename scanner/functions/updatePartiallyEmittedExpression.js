function updatePartiallyEmittedExpression(node, expression) {
                return node.expression !== expression ? update(createPartiallyEmittedExpression(expression, node.original), node) : node;
            }