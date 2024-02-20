function visitAssertionExpression(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                return factory2.createPartiallyEmittedExpression(expression, node);
            }