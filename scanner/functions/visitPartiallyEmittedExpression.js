function visitPartiallyEmittedExpression(node, valueIsDiscarded) {
                return factory2.updatePartiallyEmittedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }