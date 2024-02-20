function visitNonNullExpression(node) {
                const expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
                Debug.assert(expression);
                return factory2.createPartiallyEmittedExpression(expression, node);
            }