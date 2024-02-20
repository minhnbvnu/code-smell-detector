function visitWhileStatement(node) {
                return factory2.updateWhileStatement(node, visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
            }