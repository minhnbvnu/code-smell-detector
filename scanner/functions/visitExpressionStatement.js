function visitExpressionStatement(node) {
                return factory2.updateExpressionStatement(node, visitNode(node.expression, discardedValueVisitor, isExpression));
            }