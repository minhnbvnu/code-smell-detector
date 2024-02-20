function visitDoStatement(node) {
                return factory2.updateDoStatement(node, visitIterationBody(node.statement, topLevelNestedVisitor, context), visitNode(node.expression, visitor, isExpression));
            }