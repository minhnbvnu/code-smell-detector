function visitParenthesizedExpression(node, valueIsDiscarded) {
                return factory2.updateParenthesizedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }